 === undefined ? [] : _ref5$highlightMapCol;
            MAP_CACHE_KEY = "mapCache-" + _miot.Device.deviceID + "-" + JSON.stringify({
              mapId: mapId,
              width: width,
              height: height,
              selectedAreas: selectedAreas,
              areas: areas,
              timestamp: timestamp,
              highlightMapColorsAreaIds: highlightMapColorsAreaIds
            });
            mapColor = colorMapping({
              areas: areas,
           