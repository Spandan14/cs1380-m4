const id = require('../util/id');

let memService = {};

global.memMap = new Map();

memService.get = function(key, callback) {
  callback = callback || function() {};

  if (typeof key !== 'object' || !key) {
    key = {
      key: key,
      gid: 'local',
    };
  }

  if (key.key == null) {
    if (!global.memMap.has(key.gid)) {
      global.memMap.set(key.gid, new Map());
    }

    let allKeys = global.memMap.get(key.gid).keys();
    callback(null, Array.from(allKeys));
    return;
  }

  if (!global.memMap.has(key.gid)) {
    callback(new Error('GID not found'), null);
    return;
  }

  let value = global.memMap.get(key.gid).get(key.key);
  value ? callback(null, value) : callback(new Error('Key not found'));
};

memService.put = function(value, key, callback) {
  callback = callback || function() {};

  if (typeof key !== 'object' || !key) {
    key = {
      key: key,
      gid: 'local',
    };
  }

  if (!key.key) {
    key.key = id.getID(value);
  }

  if (!global.memMap.has(key.gid)) {
    global.memMap.set(key.gid, new Map());
  }
  global.memMap.get(key.gid).set(key.key, value);

  callback(null, value);
};

memService.del = function(key, callback) {
  callback = callback || function() {};

  if (typeof key !== 'object' || !key) {
    key = {
      key: key,
      gid: 'local',
    };
  }

  if (!global.memMap.has(key.gid)) {
    callback(new Error('GID not found'), null);
    return;
  }

  if (!global.memMap.get(key.gid).has(key.key)) {
    callback(new Error('Key not found'), null);
    return;
  }

  value = global.memMap.get(key.gid).get(key.key);
  global.memMap.get(key.gid).delete(key.key);
  callback(null, value);
};

module.exports = memService;
