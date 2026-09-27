    case 3:
            _context3.next = 5;
            return _regenerator.default.awrap((0, _map.mapPointsToImage)(width, height, mapPoints.join(','), mapColor));

          case 5:
            mapImage = _context3.sent;

            if (mapImage) {
              _miot.Host.storage.set(cacheKey, mapImage, {
                expire: 86400000
              });
            }

            return _context3.abrupt("return", mapImage);

          case 8:
          case "end