tSpecEventkey(spec);
    return _reactNative.DeviceEventEmitter.addListener(specEkey, fn);
  }

  function getSpecValue(spec, callback) {
    var type,
        _response$,
        response,
        _args2 = arguments;

    return _regenerator.default.async(function getSpecValue$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            type = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 2;
            _context2.prev = 1;
            _context2.next = 4;
            return _regenerator.default.awrap(_miot.Service.spec.getPropertiesValue([(0, _objectSpread2.default)({
              did: _miot.Device.deviceID
            }, spec)], type));

          case 4:
            response = _context2.sent;

            if (!((response == null ? undefined : (_response$ = response[0]) == null ? undefined : _response$.code) === 0 && typeof callback === 'function')) {
              _context2.next = 9;
              break;
            }

            callback(response[0].value);
            _context2.next = 10;
            break;

          case 9:
            throw new Error('getSpecValue --- no valid response', response);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);

            _logger.default.d('getSpecValue --- fail', _context2.t0, spec);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 12]]);
  }

  function getSpecValues(specs) {
    var type,
        readSpecs,
        res,
        _args3 = arguments;
    return _regenerator.default.async(function getSpecValues$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            type = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 1;
            readSpecs = specs == null ? undefined : specs.map(function (spec) {
              return (0, _objectSpread2.default)({
                did: _miot.Device.deviceID
              }, spec);
            });
            _context3.prev = 2;
            _context3.next = 5;
            return _regenerator.default.awrap(_miot.Service.spec.getPropertiesValue(readSpecs, type));

          case 5:
            res = _context3.sent;
            return _context3.abrupt("return", res == null ? undefined : res.map(function (item) {
              return {
                code: item.code,
                key: getSpecKey(item),
                value: item.value
 