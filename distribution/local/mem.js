const id = require('../util/id');

let memService = {};

global.memMap = new Map();

memService.get = function(key, callback) {
  callback = callback || function() {};

  if (!key) {
    let allKeys = global.memMap.keys();
    callback(null, Array.from(allKeys));
    return;
  }

  let value = global.memMap.get(key);
  value ? callback(null, value) : callback(new Error('Key not found'));
};

memService.put = function(value, key, callback) {
  callback = callback || function() {};

  if (!key) {
    key = id.getID(value);
  }

  global.memMap.set(key, value);
  callback(null, value);
};

memService.del = function(key, callback) {
  callback = callback || function() {};

  if (global.memMap.has(key)) {
    value = global.memMap.get(key);
    global.memMap.delete(key);
    callback(null, value);
  } else {
    callback(new Error('Key not found'), null);
  }
};

module.exports = memService;
