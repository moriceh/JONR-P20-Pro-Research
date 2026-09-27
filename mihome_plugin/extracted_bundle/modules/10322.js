 undefined : _points$2.y) || 0
    });
    var endPoint = (0, _react.useRef)({
      x: ((_points$3 = points[1]) == null ? undefined : _points$3.x) || 0,
      y: ((_points$4 = points[1]) == null ? undefined : _points$4.y) || 0
    });
    var lastPosition = (0, _react.useRef)(null);

    var _useState = (0, _react.useState)({
      startPoint: {
        x: ((_points$5 = points[0]) == null ? undefined : _points$5.x) || 0,
        y: ((_points$6 = points[0]) == null ? und