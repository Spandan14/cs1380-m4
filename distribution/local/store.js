//  ________________________________________
// / NOTE: You should use absolute paths to \
// | make sure they are agnostic to where   |
// | your code is running from! Use the     |
// \ `path` module for that purpose.        /
//  ----------------------------------------
//         \   ^__^
//          \  (oo)\_______
//             (__)\       )\/\
//                 ||----w |
//                 ||     ||


const id = require('../util/id');
const serialize = require('../util/serialization');
const path = require('path');
const fs = require('fs');

let store = {};

store.get = function(key, callback) {
  callback = callback || function() {};

  if (!key) {
    let allKeys = fs.readdirSync(path.join(__dirname, '../../store/',
        id.getNID(global.nodeConfig)));
    callback(null, allKeys);
    return;
  }

  let filePath = path.join(__dirname, '../../store/',
      id.getNID(global.nodeConfig) + '/' + key);
  fs.readFile(filePath, 'utf8', function(err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        callback(new Error('Key not found'), null);
      } else {
        callback(err, null);
      }
    } else {
      callback(null, serialize.deserialize(data));
    }
  });
};

store.put = function(value, key, callback) {
  callback = callback || function() {};

  if (!key) {
    key = id.getID(value);
  }

  let fileDir = path.join(__dirname, '../../store/' +
      id.getNID(global.nodeConfig));
  let filePath = fileDir + '/' + key;

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  let options = {
    flag: 'w+',
  };

  fs.writeFile(filePath, serialize.serialize(value), options, function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, value);
    }
  });
};

store.del = function(key, callback) {
  callback = callback || function() {};

  let filePath = path.join(__dirname, '../../store/',
      id.getNID(global.nodeConfig) + '/' + key);
  store.get(key, function(err, value) {
    if (err) {
      callback(err, null);
    } else {
      fs.unlink(filePath, function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, value);
        }
      });
    }
  });
};

module.exports = store;
