tion);
          animationValue.setValue(fromValue);

          if (typeof easing === 'string') {
            easing = _easing.default[easing];
          }

          var reversed = direction === 'reverse' || direction === 'alternate' && !toValue || direction === 'alternate-reverse' && !toValue;

          if (reversed) {
            easing = _reactNative.Easing.out(easing);
          }

          var config = {
            toValue: toValue,
            easing: easing,
            isInteraction: typeof isInteraction !== 'undefined' ? isInteraction : iterationCount <= 1,
            duration: duration || this.props.duration || 1000,
            useNativeDriver: useNativeDriver,
            delay: iterationDelay && currentIteration > 0 ? iterationDelay : 0
          };

          _reactNative.Animated.timing(animationValue, config).start(function (endState) {
            currentIteration += 1;

            if (endState.finished && _this6.props.animation && (iterationCount === 'infinite' || currentIteration < iterationCount)) {
              _this6.startAnimation(duration, currentIteration, iterationDelay, callback);
            } else if (callback) {
              callback(endState);
            }
          });
        }
      }, {
        key: "transition",
        value: function transition(fromValues, toValues, duration, easing) {
          var _this7 = this;

          var fromValuesFlat = (0, _flattenStyle.default)(fromValues);
          var toValuesFlat = (0, _flattenStyle.default)(toValues);
          var transitionKeys = Object.keys(toValuesFlat);

          var _this$getTransitionSt = this.getTransitionState(transitionKeys),
              transitionValues = _this$getTransitionSt.transitionValues,
              currentTransitionValues = _this$getTransitionSt.currentTransitionValues,
              transitionStyle = _this$getTransitionSt.transitionStyle;

          transitionKeys.forEach(function (property) {
            var fromValue = fromValuesFlat[property];
            var toValue = toValuesFlat[property];
            var transitionValue = transitionValues[property];

            if (!transitionValue) {
              transitionValue = new _reactNative.Animated.Value(0);
            }

            var needsInterpolation = INTERPOLATION_STYLE_PROPERTIES.indexOf(property) !== -1 || typeof value !== 'number';
            var needsZeroClamping = ZERO_CLAMPED_STYLE_PROPERTIES.indexOf(property) !== -1;

            if (needsInterpolation) {
              transitionValue.setValue(0);
              transitionStyle[property] = transitionValue.interpolate({
                inputRange: [0, 1],
                outputRange: [fromValue, toValue]
              });
              currentTransitionValues[property] = toValue;
              toValuesFlat[property] = 1;
            } else {
              if (needsZeroClamping) {
                transitionStyle[property] = transitionValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp'
                });
                currentTransitionValues[property] = toValue;
              } else {
                transitionStyle[property] = transitionValue;
              }

              transitionValue.setValue(fromValue);
            }
          });
          this.setSta