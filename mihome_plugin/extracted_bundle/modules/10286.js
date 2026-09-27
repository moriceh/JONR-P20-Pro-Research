ide;
      var crossProduct = (point.y - yi) * (xj - xi) - (point.x - xi) * (yj - yi);

      if (Math.abs(crossProduct) < Number.EPSILON) {
        var dotProduct = (point.x - xi) * (xj - xi) + (point.y - yi) * (yj - yi);

        if (dotProduct >= 0) {
          var squaredLength = Math.pow(xj - xi, 2) + Math.pow(yj - yi, 2);

          if (dotProduct <= squaredLength) {
            return true;
          }
        }
      }
    }

    return isInside;
  }
},102