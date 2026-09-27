 if (_this.dropNextEvt > 0) {
            _this.dropNextEvt--;
            return;
          }

          if (Math.abs(gestureState.vx) + Math.abs(gestureState.vx) > 6) {
            _this.dropNextEvt++;
            return;
          }

          if (_this.isDoubleClick) {
            return;
          }

          if (evt.nativeEvent.changedTouches.length === 1) {
            var diffX = gestureState.dx - (_this.lastPositionX || 0);

            if (_this.last