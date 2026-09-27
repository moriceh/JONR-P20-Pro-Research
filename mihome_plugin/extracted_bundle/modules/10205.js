s.phoneTimeZone = (_phoneTimeZone = phoneTimeZone) != null ? _phoneTimeZone : 0;
                  _this.unitSet = unitSet || _enum.UnitType.SquareMeter;
                  _this.roomNameSet = roomNameSet === null || roomNameSet === undefined || roomNameSet === "" ? true : roomNameSet;
                  _this.cleaningPreferSet = cleaningPreferSet === null || cleaningPreferSet === undefined || cleaningPreferSet === "" ? true : cleaningPreferSet;
                  _this.goundEnvironmentSet = goundEnvironmentSet === null || goundEnvironmentSet === undefined || goundEnvironmentSet === "" ? true : goundEnvironmentSet;
                });
                _context.next = 18;
                return _regenerator.default.awrap(_storage.default.get(APP_FIRST_OPEN_KEY));

              case 18:
                oldSession = _context.sent;

                if ((0, _is.isNull)(oldSession)) {
                  _miot.Service.smarthome.getDeviceSettingV2({
                    did: _miot.Device.deviceID,
                    settings: ['deviceOwner']
                  }).then(function (res) {
                    var _res$result, _res$result$settings;

                    var yunOwner = (_res$result = res.result) == null ? undefined : (_res$result$settings = _res$result.settings) == null ? undefined : _res$result$settings.deviceOwner;

                    _logger.default.d('getDe