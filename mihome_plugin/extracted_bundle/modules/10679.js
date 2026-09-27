= null ? undefined : areas.map(function (item) {
        var _item$room_id2, _item$neibs;

        return (0, _defineProperty2.default)({}, (_item$room_id2 = item.room_id) != null ? _item$room_id2 : item.id + 2, (_item$neibs = item.neibs) != null ? _item$neibs : []);
      }));
      Object.entries(graph).forEach(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        var colors = hi