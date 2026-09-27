 = {};
          var currentTransitionValues = (0, _getStyleValues.default)(transitionKeys, this.props.style);
          Object.keys(currentTransitionValues).forEach(function (key) {
            var value = currentTransitionValues[key];

            if (INTERPOLATION_STYLE_PROPERTIES.indexOf(key) !== -1 || typeof value !== 'number') {
              transitionValues[key] = new _reactNative.Animated.Value(0);
              styleValues[key] = value;
            } else {
              var animationValue = new _reactNative.Animated.Value(value);
              transitionValues[key] = animationValue;
              styleValues[key] = animationValue;
            }
          });
          return {
            currentTransitionValues: currentTransitionValues,
            transitionStyle: styleValues,
            transitionValues: transitionValues
          };
        }
      }, {
        key: "getTransitionState",
        value: function getTransitionState(keys) {
          var _this2 = this;

          var transitionKeys = typeof keys === 'string' ? [keys] : keys;
          var _this$state = this.state,
              transitionValues = _this$state.transitionValues,
              currentTransitionValues = _this$state.currentTransitionValues,
              transitionStyle = _this$state.transit