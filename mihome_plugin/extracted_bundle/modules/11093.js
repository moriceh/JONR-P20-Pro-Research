   });
          });
        }
      }, {
        key: "stopAnimation",
        value: function stopAnimation() {
          this.setState({
            scheduledAnimation: false,
            animationStyle: {}
          });
          this.state.animationValue.stopAnimation();

          if (this.delayTimer) {
            clearTimeout(this.delayTimer);
            this.delayTimer = null;
          }
        }
      }, {
        key: "startAnimation",
        value: function startAnimation(duration, iteration, iterationDelay, callback) {
          var _this6 = this;

          var _this$state2 = this.state,
              animationValue = _this$state2.animationValue,
              compiledAnimation = _this$state2.compiledAnimation;
          var _this$props2 = this.props,
              direction = _this$props2.direction,
              iterationCount = _this$props2.iterationCount,
              useNativeDriver = _this$props2.useNativeDriver,
              isInteraction = _this$props2.isInteraction;
          var easing = this.props.easing || compiledAnimation.easing || 'ease';
          var currentIteration = iteration || 0;
          var fromValue = getAnimationOrigin(currentIteration, direction);
          var toValue = getAnimationTarget(currentIteration, direc