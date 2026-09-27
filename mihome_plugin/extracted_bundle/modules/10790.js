               _reactNative.Animated.parallel([_reactNative.Animated.timing(_this.animatedScale, {
                  toValue: _this.scale,
                  duration: 100,
                  useNativeDriver: !!_this.props.useNativeDriver
                }), _reactNative.Animated.timing(_this.animatedPositionX, {
                  toValue: _this.positionX,
                  duration: 100,
                  useNativeDriver: !!_this.props.useNativeDriver
    