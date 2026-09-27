1.5));
      return scale;
    }, [scaleRatio]);
    var toRatioValue = (0, _react.useCallback)(function (value) {
      return value / scaleRatio;
    }, [scaleRatio]);
    var colorTheme = "#FFAB47";

    var delIcon = _$$_REQUIRE(_dependencyMap[13]);

    var moveIcon = _$$_REQUIRE(_dependencyMap[14]);

    var startPoint = (0, _react.useRef)({
      x: ((_points$ = points[0]) == null ? undefined : _points$.x) || 0,
      y: ((_points$2 = points[0]) == null ?