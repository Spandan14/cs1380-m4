/* eslint-disable */
/*
ATTENTION: This is an obfuscated file. You do not need to understand it.
Do NOT edit this file directly. Use it as a black box.

If you notice any issues with using this file, please contact the TAs.
*/
const http = require('http');
const serialization = require('../util/serialization');
const comm = {
  send: function (_0x2df79d, _0xa3cc8f, _0x2e5ebe) {
    const _0x3a060c = {
      'AXwWK': function (_0x96beb5, ..._0x48f7af) {
        return _0x96beb5(..._0x48f7af);
      },
      'lYSyY': 'end',
      'FCCyR': "error",
      'kKGSo': function (_0xac67d3, _0x1fb2a3) {
        return _0xac67d3(_0x1fb2a3);
      },
      'ArQtE': function (_0x2ef57a, _0x4fe417) {
        return _0x2ef57a instanceof _0x4fe417;
      },
      'bjhXU': "Message must be an array",
      'vuUAG': function (_0x15a2c7, _0x827493) {
        return _0x15a2c7 + _0x827493;
      },
      'fqbJY': function (_0x2d60f0, _0x2b1901) {
        return _0x2d60f0 + _0x2b1901;
      },
      'riaoV': "PUT",
      'OPhVj': "application/json"
    };
    if (!_0x2df79d instanceof Array) {
      throw new Error("Message must be an array");
    }
    let _0x2b9bd5 = _0xa3cc8f.node;
    let _0x357d78 = _0xa3cc8f.service;
    let _0x521ad4 = _0xa3cc8f.method;
    let _0x2781ce = serialization.serialize(_0x2df79d);
    const _0x16ab96 = {
      'hostname': _0x2b9bd5.ip,
      'port': _0x2b9bd5.port,
      'path': '/' + _0x357d78 + '/' + _0x521ad4,
      'method': "PUT",
      'headers': {
        'Content-Type': "application/json",
        'Content-Length': _0x2781ce.length
      }
    };
    const _0xc60829 = http.request(_0x16ab96, _0x464773 => {
      const _0x5300f3 = {
        'chtBq': function (_0x285aeb, ..._0x22c400) {
          return _0x3a060c.AXwWK(_0x285aeb, ..._0x22c400);
        }
      };
      let _0x275145 = '';
      _0x464773.on("data", function (_0x4bf7b5) {
        _0x275145 += _0x4bf7b5;
      });
      _0x464773.on('end', function () {
        if (_0x2e5ebe) {
          _0x5300f3.chtBq(_0x2e5ebe, ...serialization.deserialize(_0x275145));
        }
      });
      _0x464773.on("error", function (_0x7c3a77) {
        if (_0x2e5ebe) {
          _0x5300f3.chtBq(_0x2e5ebe, new Error("Error on response"));
        }
      });
    });
    _0xc60829.on("error", function (_0x5468d9) {
      if (_0x2e5ebe) {
        _0x2e5ebe(new Error(_0x5468d9));
      }
    });
    _0xc60829.write(_0x2781ce);
    _0xc60829.end();
  }
};
module.exports = comm; /* eslint-enable */
