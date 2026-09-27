heMapImage(width, height, mapPoints, mapColor, MAP_CACHE_KEY));

          case 9:
            mapImage = _context.sent;

          case 10:
            return _context.abrupt("return", mapImage);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function getHighlightAreasIds(areas) {
    if (!(0, _version.isNewerVersion439_681)()) return [];
    return (areas == null ? undefined : areas.filter(function (_ref6)