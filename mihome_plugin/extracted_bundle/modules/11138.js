  flex: 1
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(EquipmentItem, {
        state: robotStore.cleanWaterCistern,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword435,
        type: 0
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(EquipmentItem, {
        state: robotStore.drainCistern,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword436,
        type: 1
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(EquipmentItem, {
        state: robotStore.dustBag,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword186,
        type: 2
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(EquipmentItem, {
        state: robotStore.mopCleanTank,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword188,
        type: 3
      });
    })), _react.default.createElement(_reactNative.Image, {
      resizeMode: "contain",
      style: styles.equipmentStateImage,
      source: _Images.default.home.station
    })), _react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: "row",
        justifyContent: 'space-evenly',
        flexWrap: "wrap"
      }
    }, _