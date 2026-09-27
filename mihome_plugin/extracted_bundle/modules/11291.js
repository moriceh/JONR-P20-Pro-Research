Action(actionSide);
        this.manuallySwipeRow(toValue, action);
      }
    }, {
      key: "handleLeftSwipe",
      value: function handleLeftSwipe(projectedExtraPixels) {
        var toValue = 0;
        var actionSide;
        var rightActionValue = this.props.rightActionValue || 0;

        if (this.swipeInitialX > this.currentTranslateX) {
          if (this.currentTranslateX - projectedExtraPixels < this.props.rightOpenValue * (this.props.swipeToOpenPercent / 100)) {
            toValue = this.isForceClosing ? 0 : this.props.rightOpenValue;
          }

          if (this.currentTranslateX - projectedExtraPixels < this.props.rightActivationValue) {
            toValue = this.isForceClosing ? 0 : rightActionValue;
            actionSide = 'right';
          }
        } else {
          if (this.currentTranslateX - projectedExtraPixels < this.props.rightOpenValue) {
            toValue = this.isForceClosing ? 0 : this.props.rightOpenValue;
          }

          if (this.currentTranslateX - projectedExtraPixels < this.props.rightActivationValue * (1 - this.props.swipeToClosePercent / 100)) {
            toValue = this.isForceClosing ? 0 : rightActionValue;
            actionSide = 'right';
          }
        }

        var action = this.determineAction(actionSide);
        this.manuallySwipeRow(toValue, action);
      }
    }, {
      key: "determineAction",
      value: function determineAction(actionSide) {
        var _this5 = this;

        if (actionSide === 'right') {
          return function () {
            _this5.props.onRightAction && _this5.props.onRightAction();

            _this5.setState({
              rightActionState: !_this5.state.rightActionState
            });
          };
        }

        if (actionSide === 'left') {
          return function () {
            _this5.props.onLeftAction && _this5.props.onLeftAction();

            _this5.setState({
              leftActionState: !_this5.state.leftActionState
            });
          };
        }
      }
    }, {
      key: "closeRow",
      value: function closeRow() {
        this.manuallySwipeRow(0);
      }
    }, {
      key: "forceCloseRow",
      value: function forceCloseRow(direction) {
        var _this6 = this;

        this.manuallySwipeRow(0, function () {
          if (direction === 'right' && _this6.props.onForceCloseToRightEnd) {
            _this6.props.onForceCloseToRightEnd();
          } else if (direction === 'left' && _this6.props.onForceCloseToLeftEnd) {
            _this6.props.onForceCloseToLeftEnd();
          }
        });
      }
    }, {
      key: "closeRowWithoutAnimation",
      value: function closeRowWithoutAnimation() {
        this._translateX.setValue(0);

        this.ensureScrollEnabled();
        this.isOpen = false;
        this.props.onRowDidClose && this.props.onRowDidClose();
        this.props.onRowClose && this.props.onRowClose();
        this.swipeInitialX = null;
        this.horizontalSwipeGestureBegan = false;
      }
    }, {
      key: "manuallySwipeRow",
      value: function manuallySwipeRow(toValue, onAnimationEnd) {
        var _