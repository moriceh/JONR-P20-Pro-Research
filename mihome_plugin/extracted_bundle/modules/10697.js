 {
      var prefer = _ref6.prefer;
      return prefer && (prefer == null ? undefined : prefer.order) !== 0;
    }).sort(function (a, b) {
      return a.prefer.order - b.prefer.order;
    }).map(function (item) {
      return item.room_id;
    })) || [];
  }

  var getCachedMapImage = function getCachedMapImage(cacheKey) {
    var mapImage;
    return _regenerator.default.async(function getCachedMapImage$(_context2) {
      while (1) {
        switch (_context2