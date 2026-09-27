onDelay, function (endState) {
                return _this3.props.onAnimationEnd(endState);
              });

              _this3.delayTimer = null;
            };

            if (delay) {
              this.delayTimer = setTimeout(startAnimation, delay);
            } else {
              startAnimation();
            }
          }
        }
      }, {
        key: "UNSAFE_componentWillReceiveProps",
        value: function UNSAFE_componentWillReceiveProps(props) {
          var _this4 = this;

          var animation = props.animation,
              delay = props.delay,
              duration = props.duration,
              easing = props.easing,
              iterationDelay = props.iterationDelay,
              transition = props.transition,
              onAnimationBegin = props.onAnimationBegin;

          if (transition) {
            var values = (0, _getStyleValues.default)(transition, props.style);
            this.transitionTo(values, duration, easing, delay);
          } else if (!deepEquals(animation, this.props.animation)) {
            if (animation) {
              if (this.delayTimer) {
                this.setAnimation(animation);
              } else {
                onAnimationBegin();
                this.animate(animation, duration, iterationDelay).then(function (endState) {
                  return _this4.props.onAnimationEnd(endState);
                });
              }
            } else {
              this.stopAnimation();
            }
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          if (this.delayTimer) {
            clearTimeout(this.delayTimer);
          }
        }
      }, {
        key: "setAnimation",
        value: function setAnimation(animation, callback) {
          var compiledAnimation = getCompiledAnimation(animation);
          this.setState(function (state) {
            return {
              animationStyle: makeInterpolatedStyle(compiledAnimation, state.animationValue),
              compiledAnimation: compiledAnimation
            };
          }, callback);
        }
      }, {
        key: "animate",
        value: function animate(animation, duration, iterationDelay) {
          var _this5 = this;

          return new Promise(function (resolve) {
            _this5.setAnimation(animation, function () {
              _this5.startAnimation(duration, 0, iterationDelay, resolve);
         