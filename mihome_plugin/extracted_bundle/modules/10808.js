izontalWholeOuterCounter += 1e-10;
              }

              _this.animatedPositionY.setValue(_this.positionY);
            }
          } else if (evt.nativeEvent.changedTouches.length === 2) {
            if (_this.props.pinchToZoom) {
              var minX;
              var maxX;

              if (evt.nativeEvent.changedTouches[0].locationX > evt.nativeEvent.changedTouches[1].locationX) {
                minX = evt.nativeEvent.changedTouches