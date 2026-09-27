olor);

    if (areas.length <= 4) {
      areas.forEach(function (item, index) {
        var _item$room_id;

        var roomId = (_item$room_id = item.room_id) != null ? _item$room_id : item.id + 2;
        var key = "" + roomId;
        var colors = highlightMapColorsAreaIds.concat(selectedAreas).includes(roomId) ? highlightMapColors : originMapColors;
        transformedColorMapping[key] = colors[index % 4];
      });
    } else {
      var graph = colorGraph(areas =