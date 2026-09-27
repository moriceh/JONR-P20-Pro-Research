  var onChangeStartTime = function onChangeStartTime(time) {
      var _time$split$map = time.split(':').map(Number),
          _time$split$map2 = (0, _slicedToArray2.default)(_time$split$map, 2),
          hours = _time$split$map2[0],
          minutes = _time$split$map2[1];

      exeCmd(function () {
        return _index.actions.setDisturbTimeSet({
          startHour: hours,
          startMin: minutes
        });
      }, function () {
        return _index.propertys.getDisturbTimeSet(function (value) {
          return robotStore.setDisturbTimeSet(value);
        });
      }).then(function () {
        store.setStartTime(time);
      });
    };

    var onChangeEndTime = function onChangeEndTime(time) {
      var _time$split$map3 = time.split(':').map(Number),
          _time$split$map4 = (0, _slicedToArray2.default)(_time$split$map3, 2),
          hours = _time$split$map4[0],
          minutes = _time$split$map4[1];

      exeCmd(function () {
        return _index.actions.setDisturbTimeSet({
          endHour: hours,
          endMin: minutes
        });
      }, function () {
        return _index.propertys.getDisturbTimeSet(function (value) {
          return robotStore.setDisturbTimeSet(value);
        });
      }).then(function () {
        store.setEndTime(time);
      });
    };

    var onChangeNotDust = function onChangeNotDust() {
      exeCmd(function () {
        return _index.actions.setDisturbTimeSet({
          notDust: store.notDust ? 0 : 1
        });
      }, function () {
        return _index.propertys.getDisturbTimeSet(function (value) {
          return robotStore.setDisturbTimeSet(value);
       