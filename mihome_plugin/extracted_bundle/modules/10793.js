            }), _reactNative.Animated.timing(_this.animatedPositionY, {
                  toValue: _this.positionY,
                  duration: 100,
                  useNativeDriver: !!_this.props.useNativeDriver
                })]).start();
              }
            } else {
              _this.lastClickTime = new Date().getTime();
            }
          }
        },
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
         