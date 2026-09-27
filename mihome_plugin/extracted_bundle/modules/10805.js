is.animatedPositionX.setValue(_this.positionX);

              _this.positionY += diffY / _this.scale;
              var verticalMax = (SCREEN_HEIGHT - 100) / 2;

              if (_this.positionY < -verticalMax) {
                _this.positionY = -verticalMax;
                _this.horizontalWholeOuterCounter += -1e-10;
              } else if (_this.positionY > verticalMax) {
                _this.positionY = verticalMax;
                _this.hor