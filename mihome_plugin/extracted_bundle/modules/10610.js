mbol.iterator : "@@iterator"]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var _char = _ref;

        if (chineseRegex.test(_char) || koreanRegex.test(_char)) {
          totoalWidth += 10.2;
        } else {
          totoalWidth += 6.1;
        }

     