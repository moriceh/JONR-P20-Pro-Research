":
            return _context3.stop();
        }
      }
    });
  };

  function colorGraph(graphRelations) {
    var coloredNodes = {};
    var colors = [0, 1, 2, 3];
    var colorUsage = colors.reduce(function (acc, color) {
      acc[color] = 0;
      return acc;
    }, {});

    function canColor(node, color) {
      var _ref7, _graphRelations$find;

      var neighbors = (_ref7 = (_graphRelations$find = graphRelations.find(function (item) {
        return item[node];
    