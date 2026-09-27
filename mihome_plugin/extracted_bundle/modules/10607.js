eRatio).toFixed(2));
      scale = Math.max(0.5, Math.min(scale, 1.5));
      return scale;
    }, [scaleRatio]);
    var estimateText = (0, _react.useMemo)(function () {
      var chineseRegex = /[\u4e00-\u9fa5]/;
      var koreanRegex = /[\uAC00-\uD7A3]/;
      var totoalWidth = 0;
      var text = '';

      for (var _iterator = name, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? Sy