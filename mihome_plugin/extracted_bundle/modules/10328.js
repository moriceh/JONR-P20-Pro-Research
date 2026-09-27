Data({
        startPoint: {
          x: ((_points$9 = points[0]) == null ? undefined : _points$9.x) || 0,
          y: ((_points$10 = points[0]) == null ? undefined : _points$10.y) || 0
        },
        endPoint: {
          x: ((_points$11 = points[1]) == null ? undefined : _points$11.x) || 0,
          y: ((_points$12 = points[1]) == null ? undefined : _points$12.y) || 0
        }
      });
    }, [points]);
    var distance = (0, _react.useMemo)(function () {
 