ghlightMapColorsAreaIds.concat(selectedAreas).includes(parseInt(key, 10)) ? highlightMapColors : originMapColors;
        transformedColorMapping[key] = colors[value];
      });
    }

    return transformedColorMapping;
  }, function (args) {
    return JSON.stringify(args);
  });

  exports.colorMapping = colorMapping;

  function fetchMapImage(_ref5) {
    var mapId, mapPoints, width, height, timestamp, selectedAreas, areas, _ref5$highlightMapCol, highlightMapColorsAreaIds, MAP_CAC