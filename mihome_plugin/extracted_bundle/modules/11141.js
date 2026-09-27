react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(StationModelItem, {
        onPress: function onPress() {
          return changeMode(_enum.StationStatus.Emptying);
        },
        icon: robotStore.stationStatus === _enum.StationStatus.Emptying ? baseImages.dustcollection : baseImages.dustCollectionnor,
        name: robotStore.stationStatus === _enum.StationStatus.Emptying ? _multilingual.default == null ? undefined : _multilingual.default.keyword309 : _multilingual.default == null ? undefined : _multilingual.default.keyword305
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(StationModelItem, {
        onPress: function onPress() {
          return changeMode(_enum.StationStatus.Washing);
        },
        icon: robotStore.stationStatus === _enum.StationStatus.Washing ? baseImages