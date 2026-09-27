      }
      }
    }

    return result;
  }

  function isPointInOrOnPolygon(point, polygon) {
    var isInside = false;
    var n = polygon.length;

    for (var i = 0, j = n - 1; i < n; j = i++) {
      var xi = polygon[i].x,
          yi = polygon[i].y;
      var xj = polygon[j].x,
          yj = polygon[j].y;
      var intersect = yi > point.y !== yj > point.y && point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi;
      if (intersect) isInside = !isIns