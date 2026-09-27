  var minY = Math.min(points[0].y, points[1].y, points[2].y, points[3].y);
    var maxY = Math.max(points[0].y, points[1].y, points[2].y, points[3].y);
    var result = [];

    for (var x = Math.floor(minX); x <= Math.ceil(maxX); x++) {
      for (var y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
        if (isPointInOrOnPolygon({
          x: x,
          y: y
        }, points)) {
          result.push({
            x: x,
            y: y
          });
  