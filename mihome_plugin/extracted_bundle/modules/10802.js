        _this.positionX += diffX / _this.scale;
              var horizontalMax = SCREEN_WIDTH / 2;

              if (_this.positionX < -horizontalMax) {
                _this.positionX = -horizontalMax;
                _this.horizontalWholeOuterCounter += -1e-10;
              } else if (_this.positionX > horizontalMax) {
                _this.positionX = horizontalMax;
                _this.horizontalWholeOuterCounter += 1e-10;
              }

              _th