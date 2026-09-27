fileName) {
                _context2.next = 14;
                break;
              }

              mapStore.setCurMapInfo({});
              _context2.next = 18;
              break;

            case 14:
              _context2.next = 16;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapFileContent)(fileName));

            case 16:
              obj = _context2.sent;

              if (!(0, _is.isNull)(obj == null ? undefined : obj.mapId) && !(0, _is.isNull)(obj == null ? u