 return isEdit && active;
        },
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
          var _lastPosition$current2;

          if (dropNextEvt.current > 0) {
            dropNextEvt.current--;
            return;
          }

          if (Math.abs(gestureState.vx) + Math.abs(gestureState.vx) > 6) {
            dropNextEvt.current++;
            return;
