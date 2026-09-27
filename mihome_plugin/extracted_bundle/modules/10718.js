ymbol === "function" ? Symbol.iterator : "@@iterator"]();;) {
        var _ref8;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref8 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref8 = _i.value;
        }

        var _color = _ref8;

        if (canColor(node, _color)) {
          var _ref9, _graphRelations$find2;

          coloredNodes[node] = _color;
          colorUsage[_color]