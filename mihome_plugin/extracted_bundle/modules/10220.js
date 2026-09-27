= 0;
              _context6.next = 3;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapInfosFileContent)(fileName));

            case 3:
              obj = _context6.sent;

              _reactNative.DeviceEventEmitter.emit(_constants.NOTICEKEY_MAP_UPDATE_SUCC);

              mapStore.setMapInfos(obj);
              _context6.next = 11;
              break;

            case 8:
              _context6.prev = 8;
              _context6.t0 = _context6["catch"](0);

              _logger.default.e("event 地图列表错误 error:", _context6.t0);

            case 11:
            case "end":
              return _context6.st