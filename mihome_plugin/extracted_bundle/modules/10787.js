
                  locationY: evt.nativeEvent.changedTouches[0].locationY,
                  pageX: _this.doubleClickX,
                  pageY: _this.doubleClickY
                });
              }

              _this.isDoubleClick = true;

              if (_this.props.enableDoubleClickZoom) {
                _this.scale = 1;
                _this.positionX = 0;
                _this.positionY = 0;

                _this.imageDidMove('centerOn');

 