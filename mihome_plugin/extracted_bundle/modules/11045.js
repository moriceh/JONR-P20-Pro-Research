     return _context2.abrupt("return", new Promise(function (resolve) {
                  var isRegisteredWithSheetProvider = false;

                  for (var _iterator2 = _provider.providerRegistryStack.reverse(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator"]();;) {
                    var _ref2;

                    if (_isArray2) {
                      if (_i2 >= _iterator2.length) break;
                      _ref2 = _iterator2[_i2++];
                    } else {
                      _i2 = _iterator2.next();
                      if (_i2.done) break;
                      _ref2 = _i2.value;
                    }

                    var _ctx2 = _ref2;

                    for (var _id in _provider.sheetsRegistry[_ctx2]) {
                      if (_id === id && ids.includes(id + ":" + _ctx2)) {
                        isRegisteredWithSheetProvider = true;
                        currentContext