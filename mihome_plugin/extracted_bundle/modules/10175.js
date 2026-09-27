 === "string" && virtualStr.trim() != "") {
      var segments = virtualStr.split(";").filter(Boolean);
      return segments == null ? undefined : segments.map(function (segment) {
        var parts = segment.split(",");
        var coordinatesArray = parts.slice(2);
        var coordinatesObjects = [];

        for (var i = 0; i < coordinatesArray.length; i += 2) {
          var x = parseInt(coordinatesArray[i], 10);
          var y = parseInt(coordinatesArray[i + 1], 10);
          coordinatesObjects.push({
            x: x,
            y: y
          });
        }

        var object = {
          id: parseInt(parts[0], 10),
          type: parseInt(parts[1], 10),
          points: coordinatesObjects,
          mapId: mapId,
          action: _enum.VirtualActionType.Normal
        };
        return object;
      });
    } else {
      return [];
    }
  };

  exports.stringConvertVirtuals = stringConvertVirtuals;

  var carpetStringConvertVirtuals = function carpetStringConvertVirtuals(virtualStr, mapId) {
    if (typeof virtualStr === "string" && virtualStr.trim() != "") {
      var segments = virtualStr.split(";");
      return segments == null ? undefined : segments.map(function (segment) {
        var parts = segment.split(",");
        var coordinatesArray = parts.slice(3);
        var coordinatesObjects = [];

        for (var i = 0; i < coordinatesArray.length; i += 2) {
          var x = parseInt(coordinatesArray[i], 10);
          var y = parseInt(coordinatesArray[i + 1], 10);
          coordinatesObjects.push({
            x: x,
            y: y
          });
        }

        var object = {
          id: parseInt(parts[0], 10),
          type: parseInt(parts[1], 10),
          points: coordinatesObjects,
          mapId: mapId,
          action: _enum.VirtualActionType.Normal
        };
        return object;
      });
    } else {
      return [];
    }
  };

  exports.carpetStringConvertVirtuals = carpetStringConvertVirtuals;

  var stringConvertPointObject = function stringConvertPointObject(str) {
    if (typeof str === "string" && str.trim() !== "") {
      var _str$split;

      var coords = (_str$split = str.split(",")) == null ? undefined : _str$split.map(Number);
      var pointsArray = [];

      for (var i = 0; i < coords.length; i += 2) {
        pointsArray.push({
          x: Math.round(coords[i]),
          y: Math.round(coords[i + 1])
        });
      }

      return pointsArray;
    } else {
      return [];
    }
  };

  exports.stringConvertPointObject = stringConvertPointObject;

  function pointArrToString(points) {
    if (points && points.length) {
      var pointStr = points == null ? undefined : points.map(function (_ref) {
        var x = _ref.x,
            y = _ref.y;
        return x + "," + y;
      }).join(",");
      return pointStr;
    } else {
      return "";
    }
  }

  function moveToLastById(collection, id) {
    var selectedIndex = collection.findIndex(function (item) {
      return item.id === id;
    });

    if (selectedIndex !== -1) {
      var selectedElement = collection.splice(selectedIndex, 1)[0];
      collection.push(selectedElement);
    }
  }

  function cleanValuesConvertZoning(cleanValues) {
    try {
      if (cleanValues && cleanValues.length) {
        var outputArray = [];

        for (var i = 0; i < cleanValues.length; i += 8) {
          var points = cleanValues.slice(i, i + 8);
          var coordinatesObjects = [];

          for (