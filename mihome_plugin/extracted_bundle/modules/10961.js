             };
            }));

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);

            _logger.default.d('getRemote SpecValues:fail', _context3.t0, specs);

            return _context3.abrupt("return", null);

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 9]]);
  }

  function doSpecAction(spec, ins) {
    var param, value;
    return _regenerator.default.async(function doSpecAction$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _logger.default.d('Action spec:', spec);

            _logger.default.d('Action ins:', ins);

            param = {
              did: _miot.Device.deviceID,
              in: ins || []
            };

            if (spec.siid) {
              param.siid = spec.siid;
            }

            if (spec.aiid) {
              param.aiid = spec.aiid;
            }

            if (!(!param.siid || !param.aiid)) {
              _context4.next = 8;
              break;
            }

            _logger.default.e('doAction error param', param);

            return _context4.abrupt("return", false);

          case 8:
            _context4.prev = 8;
            _context4.next = 11;
            return _regenerator.default.awrap(_miot.Service.spec.doAction(param));

          case 11:
            value = _context4.sent;

            _logger.default.d('Action result:', value);

            if (!CODES.success(value.code)) {
              _context4.next = 17;
              break;
            }

            return _context4.abrupt("return", value.out || true);

          case 17:
            _logger.default.e('doSpecAction error message', value);

            return _context4.abrupt("return", false);

          case 19:
            _context4.next = 25;
            break;

          case 21:
            _context4.prev = 21;
            _context4.t0 = _context4["catch"](8);

            _logger.default.e('doSpecAction error code', _context4.t0);

            return _context4.abrupt("return", false);

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[8, 21]]);
  }

  function initSpec() {
    var _instance$services;

    var instance;
    return _regenerator.default.async(function initSpec$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _regenerator.default.awrap(getInstanceFromNet());

          case 2:
            instance = _context5.sent;

            if (instance) {
              _context5.next = 5;
              break;
            }

            return _context5.abrupt("return", false);

          case 5:
            (_instance$services = instance.services) == null ? undefined : _instance$services.forEach(function (service) {
              var _service$properties, _service$events;

              var siid = service.iid;
              (_service$properties = service.properties) == null ? undefined : _service$properties.forEach(function (_ref6) {
                var iid = _ref6.iid,
                    access = _ref6.access,
                    type = _ref6.type;

                if (access.includes('notify')) {
                  AllNotifySpecs.push(getSpecNotifyKey({
                    siid: siid,
                    piid: iid
                  }));
                }
              });
              (_service$events = service.events) == null ? undefined : _service$events.forEach(function (_ref7) {
                var iid = _ref7.iid,
                    type = _ref7.type;
                AllNotifySpecs.push(getSpecNotifyKey({
                  siid: siid,
                  eiid: iid
                }));
              });
            });
            _context5.next = 8;
            return _regenerator.default.awrap(subscribeRemoteSpecValues(AllNotifySpecs));

          case 8:
            return _context5.abrupt("return", true);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    });
  }

  function deinitSpec() {
    AllNotifySpecs = [];

    while (listeners.length) {
      var listener = listeners.pop();
      listener && listener.remove();
    }

    listenerReceivedMessage && listenerReceivedMessage.remove();
    listenerReceivedMessage = null;

    _logger.default.d('unlistenMessages 释放监听资源');
  }

  function updateSpecValues(pvs) {
    if (!pvs || !pvs.length) {
      return;
    }

    pvs.forEach(function (pv) {
      var _copyPv;

      var _ref8 = pv || {
        code: -999
      },
          siid = _ref8.siid,
          piid = _ref8.piid,
          eiid = _ref8.eiid,
          code = _ref8.code,
          value = _ref8.value;

      if (!CODES.success(code)) {
        return;
      }

      var copyPv = (_copyPv = {
        siid: siid
      }, (0, _defineProperty2.default)(_copyPv, eiid ? 'eiid' : 'piid', eiid || piid), (0, _defineProperty2.default)(_copyPv, "type", eiid ? SubTypesShort[2] : SubTypesShort[0]), _copyPv);
      var specEkey = getSpecEventkey(copyPv);

      _reactNative.DeviceEventEmitter.emit(specEkey, value);
    });
  }

  function subscribeRemoteSpecValues(specs) {
    var _Device$getDeviceWifi, listener;

    return _regenerator.default.async(function subscribeRemoteSpecValues$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            listenerReceivedMessage = _miot.DeviceEvent.deviceReceivedMessages.addListener(function (device, message, data) {
              _logger.default.d('监听到属性变化和事件:', data);

              if (device.deviceID !== _miot.Device.deviceID) {
                return;
              }

              var pvs = [];

              for (var _iterator = message, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator"]();;) {
                var _ref13;

                var _ref11;

                if (_isArray) {
                  if (_i >= _iterator.length) break;
                  _ref11 = _iterator[_i++];
                } else {
                  _i = _iterator.next();
                  if (_i.done) break;
                  _ref11 = _i.value;
                }

                var _ref12 = _ref11;

                var _ref10 = (0, _slicedToArray2.default)(_ref12, 2);

                var _key = _ref10[0];
                var _value = _r