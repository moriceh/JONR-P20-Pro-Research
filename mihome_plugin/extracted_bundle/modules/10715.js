  })) == null ? undefined : _graphRelations$find[node]) != null ? _ref7 : [];
      return !neighbors.some(function (neighbor) {
        return coloredNodes[neighbor] === color;
      });
    }

    function colorNode(node) {
      var availableColors = colors.sort(function (a, b) {
        return colorUsage[a] - colorUsage[b];
      });

      for (var _iterator = availableColors, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof S