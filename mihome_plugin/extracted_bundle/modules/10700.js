.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _regenerator.default.awrap(_miot.Host.storage.get(cacheKey));

          case 3:
            mapImage = _context2.sent;

            if (mapImage) {
              _context2.next = 6;
              break;
            }

            throw new Error('Instance Cache is empty');

          case 6:
            return _context2.abrupt("return", 