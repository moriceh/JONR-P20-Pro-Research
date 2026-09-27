(nativeProps) {
          if (this.ref) {
            this.ref.setNativeProps(nativeProps);
          }
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this3 = this;

          var _this$props = this.props,
              animation = _this$props.animation,
              duration = _this$props.duration,
              delay = _this$props.delay,
              onAnimationBegin = _this$props.onAnimationBegin,
              iterationDelay = _this$props.iterationDelay;

          if (animation) {
            var startAnimation = function startAnimation() {
              onAnimationBegin();

              _this3.startAnimation(duration, 0, iterati