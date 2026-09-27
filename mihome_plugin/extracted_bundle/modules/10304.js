derTerminationRequest: function onPanResponderTerminationRequest(evt, gestureState) {
          return evt.nativeEvent.touches.length > 1;
        }
      });
    }, [active, handleMoveShouldSetPanResponder, isEdit, isSafeMoveStart, onModClick, scaleRatio]);
    var endPointPanResponder = (0, _react.useMemo)(function () {
      return _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
         