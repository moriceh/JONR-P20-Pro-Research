 || 10,
        transform: [{
          translateY: animations.underlayTranslateY
        }]
      }
    }) : null, gestureEnabled || props.headerAlwaysVisible ? props.CustomHeaderComponent ? props.CustomHeaderComponent : _react.default.createElement(_reactNative.Animated.View, {
      style: [_styles.styles.indicator, props.indicatorStyle]
    }) : null, (router == null ? undefined : router.hasRoutes()) ? _react.default.createElement(_useRouter.RouterContext.Provider, {
      value: router
    }, router == null ? undefined : router.stack.map(renderRoute)) : props == null ? undefined : props.children), overdrawEnabled ? _react.default.createElement(_reactNative.Animated.View, {
      style: {
        position: 'absolute',
        height: overdrawSize,
        bottom: -overdrawSize,
        backgroundColor: ((_props$containerStyle16 = props.containerStyle) == null ? undefined : _props$containerStyle16.backgroundColor) || 'white',
        width: ((_props$containerStyle17