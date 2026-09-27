   selectedAreas: selectedAreas,
              highlightMapColorsAreaIds: highlightMapColorsAreaIds
            });
            _context.next = 5;
            return _regenerator.default.awrap(getCachedMapImage(MAP_CACHE_KEY));

          case 5:
            mapImage = _context.sent;

            if (mapImage) {
              _context.next = 10;
              break;
            }

            _context.next = 9;
            return _regenerator.default.awrap(generateAndCac