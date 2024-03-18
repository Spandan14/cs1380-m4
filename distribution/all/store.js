let store = (config) => {
  let context = {};
  const util = global.distribution.util;
  context.gid = config.gid || 'all';
  context.hash = config.hash || util.id.naiveHash;

  return {
    'get': function(key, callback) {
      callback = callback || function() {};

      distribution.local.groups.get(context.gid, (e, v) => {
        if (e) {
          return callback(e, null);
        }

        // accesses the node with the NID that is responsible for the key
        let nodeToCheck = v[context.hash(util.id.getID(key), Object.keys(v))];

        key = {
          key: key,
          gid: context.gid,
        };

        let payload = [key];
        let remote = {
          node: nodeToCheck,
          service: 'store',
          method: 'get',
        };

        if (!key.key) {
          distribution[context.gid].comm.send(payload, remote, (e, v) => {
            callback(e, Object.values(v).flat());
          });
          return;
        }

        distribution.local.comm.send(payload, remote, (e, v) => {
          callback(e, v);
        });
      });
    },
    'put': function(value, key, callback) {
      callback = callback || function() {};

      distribution.local.groups.get(context.gid, (e, v) => {
        if (e) {
          return callback(e, v.flat());
        }

        if (!key) {
          key = util.id.getID(value);
        }

        // accesses the node with the NID that is responsible for the key
        let nodeToCheck = v[context.hash(util.id.getID(key), Object.keys(v))];

        key = {
          key: key,
          gid: context.gid,
        };

        let payload = [value, key];
        let remote = {
          node: nodeToCheck,
          service: 'store',
          method: 'put',
        };

        distribution.local.comm.send(payload, remote, (e, v) => {
          callback(e, v);
        });
      });
    },
    'del': function(key, callback) {
      callback = callback || function() {};

      distribution.local.groups.get(context.gid, (e, v) => {
        if (e) {
          return callback(e, null);
        }

        // accesses the node with the NID that is responsible for the key
        let nodeToCheck = v[context.hash(util.id.getID(key), Object.keys(v))];

        key = {
          key: key,
          gid: context.gid,
        };

        let payload = [key];
        let remote = {
          node: nodeToCheck,
          service: 'store',
          method: 'del',
        };

        distribution.local.comm.send(payload, remote, (e, v) => {
          callback(e, v);
        });
      });
    },
  };
};

module['exports'] = store;
