const assert = require('assert');
var crypto = require('crypto');

// The ID is the SHA256 hash of the JSON representation of the object
function getID(obj) {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(obj));
  return hash.digest('hex');
}

// The NID is the SHA256 hash of the JSON representation of the node
function getNID(node) {
  node = {ip: node.ip, port: node.port};
  return getID(node);
}

// The SID is the first 5 characters of the NID
function getSID(node) {
  return getNID(node).substring(0, 5);
}


function idToNum(id) {
  let n = parseInt(id, 16);
  assert(!isNaN(n), 'idToNum: id is not in KID form!');
  return n;
}

function naiveHash(kid, nids) {
  nids.sort();
  return nids[idToNum(kid) % nids.length];
}

function consistentHash(kid, nids) {
  let kidNum = idToNum(kid);
  let nidNums = nids.map(idToNum);
  nidNums.push(kidNum);

  let mapping = {};
  for (let i = 0; i < nids.length; i++) {
    mapping[nidNums[i]] = nids[i];
  }
  mapping[kidNum] = kid;

  nidNums.sort();

  let index = nidNums.indexOf(kidNum);
  return mapping[nidNums[(index + 1) % (nids.length + 1)]];
}


function rendezvousHash(kid, nids) {
  let concatIDs = nids.map((nid) => kid + nid);
  let hashNums = concatIDs.map((id) => idToNum(getID(id)));
  let maxIndex = hashNums.indexOf(Math.max(...hashNums));

  return nids[maxIndex];
}

module.exports = {
  getNID: getNID,
  getSID: getSID,
  getID: getID,
  idToNum: idToNum,
  naiveHash: naiveHash,
  consistentHash: consistentHash,
  rendezvousHash: rendezvousHash,
};
