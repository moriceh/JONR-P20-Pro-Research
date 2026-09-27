hideModal = function hideModal() {
      setShowStationFunctionDialog(false);
    };

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      if (robotStore.curRobotStatus === "ClctDust") {
        return _react.default.createElement(_Hbutton.default, {
          onPress: function onPress() {
            return _changeCollectDust(false);
          },
          title: _multilingual.default.keyword309,
          imgData: baseImages.stopReturn
        });
      } else if (robotStore.curRobotStatus === "WashMop") {
        return _react.default.createElement(_Hbutton.default, {
          onPress: function onPress() {
        