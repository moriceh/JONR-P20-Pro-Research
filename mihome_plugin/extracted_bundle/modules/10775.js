onPanResponderTerminationRequest,
        onPanResponderGrant: function onPanResponderGrant(evt, gestureState) {
          if (_this.prTargetSelf == null) {
            if (_this.prTargetOuter == null) {
              _this.prTargetOuter = evt.currentTarget;
            }

            if (evt.target !== evt.currentTarget) {
              _this.prTargetSelf = evt.target;
            }
          }

          _this.lastPositionX = null;
          _this.lastPosi