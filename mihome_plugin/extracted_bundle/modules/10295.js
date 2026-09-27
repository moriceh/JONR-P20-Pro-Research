SimplifyAP(points) {
    var tolerance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var highestQuality = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (points.length <= 2) {
      return points;
    }

    var sqTolerance = tolerance * tolerance;
    points = highestQuality ? points : simplifyRadialDistAP(points, sqTolerance);
    points = simplifyDouglasPeuckerAP(points, sqTolerance);
    return poi