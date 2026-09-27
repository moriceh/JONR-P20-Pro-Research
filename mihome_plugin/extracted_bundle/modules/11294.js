this7 = this;

        _reactNative.Animated.spring(this._translateX, {
          toValue: toValue,
          friction: this.props.friction,
          tension: this.props.tension,
          restSpeedThreshold: this.props.restSpeedThreshold,
          restDisplacementThreshold: this.props.restDisplacementThreshold,
          useNativeDriver: this.props.useNativeDriver
        }).start(function () {
          _this7.ensureScrollEnabled();

          if (toValue === 0) {
            _this7.isOpen = false;
            _this7.props.onRowDidClose && _this7.props.onRowDidClose();
          } else {
            _this7.isOpen = true;
            _this7.props.onRowDidOpen && _this7.props.onRowDidOpen(toValue);
          }

          if (onAnimationEnd) {
            onAnimationEnd();
          }
        });

        if (toValue === 0) {
          this.props.onRowClose && this.props.onRowClose();
        } else {
          this.props.onRowOpen && this.props.onRowOpen(toValue);
        }

        this.swipeInitialX = null;
        this.horizontalSwipeGestureBegan = false;
      }
    }, {
      key: "renderVisibleContent",
      value: function renderVisibleContent() {
        if (!this.props.closeOnRowPress) {
          return _react.default.cloneElement(this.props.children[1], (0, _objectSpread2.default)({}, this.props.children[1].props, {
            leftActionActivated: this.state.leftActionActivated,
            rightActionActivated: this.state.rightActionActivated,
            leftActionState: this.state.leftActionState,
            rightActionState: this.state.rightActionState,
            swipeAnimatedValue: this._translateX
          }));
        }

        var onPress = this.props.children[1].props.onPress;

        if (onPress) {
          return _react.default.cloneElement(this.props.children[1], (0, _objectSpread2.default)({}, this.props.children[1].props, {
            onPress: this.combinedOnPress,
            leftActionActivated: this.state.leftActionActivated,
            rightActionActivated: this.state.rightActionActivated,
            leftActionState: this.state.leftActionState,
            rightActionState: this.state.rightActionState,
            swipeAnimatedValue: this._translateX
          }));
        }

        return _react.default.createElement(_reactNative.TouchableOpacity, {
          activeOpacity: 1,
          onPress: this.combinedOnPress,
          accessible: false
        }, _react.default.cloneElement(this.props.children[1], (0, _objectSpread2.default)({}, this.props.children[1].props, {
          leftActionActivated: this.state.leftActionActivated,
          rightActionActivated: this.state.rightActionActivated,
          leftActionState: this.state.leftActionState,
          rightActionState: this.state.rightActionState,
          swipeAnimatedValue: this._translateX
        })));
      }
    }, {
      key: "renderRowContent",
      value: function renderRowContent() {
        var _this8 = this;

        if (this.state.dimensionsSet) {
          return _react.default.createElement(_reactNative.Animated.View, (0, _extends2.default)({
            manipulationModes: ['translateX']
          }, this._panResponder.panHandlers, {
            style: {
              zIndex: 2,
              transform: [{
                translateX: this._translateX
              }]
            }
          }), this.renderVisibleContent());
        } else {
          return _react.default.createElement(_reactNative.Animated.View, (0, _extends2.default)({
            manipulationModes: ['translateX']
          }, this._panResponder.panHandlers, {
            onLayout: function onLayout(e) {
              return _this8.onContentLayout(e);
            },
            style: {
              zIndex: 2,
              transform: [{
                translateX: this._translateX
              }]
            }
          }), this.renderVisibleContent());
        }
      }
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(_reactNative.View, {
          style: this.props.style ? this.props.style : styles.container
        }, _react.default.createElement(_reactNative.View, {
          style: [styles.hidden, {
            height: this.state.hiddenHeight,
            width: this.state.hiddenWidth
          }]
        }, _react.default.cloneElement(this.props.children[0], (0, _objectSpread2.default)({}, this.props.children[0].props, {
          leftActionActivated: this.state.leftActionActivated,
          rightActionActivated: this.state.rightActionActivated,
          leftActionState: this.state.leftActionState,
          rightActionState: this.state.rightActionState,
          swipeAnimatedValue: this._translateX
        }))), this.renderRowContent());
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, prevState) {
        if (!nextProps.previewRepeat) {
          clearInterval(prevState.previewRepeatInterval);
          prevState.previewRepeatInterval = null;
        }

        prevState.timeBetweenPreviewRepeats = nextProps.previewDuration * 2 + nextProps.previewOpenDelay + PREVIEW_CLOSE_DELAY + nextProps.previewRepeatDelay;
        return prevState;
      }
    }]);
    return SwipeRow;
  }(_react.Component);

  var styles = _reactNative.StyleSheet.create({
    container: {},
    hidden: {
      zIndex: 1,
      bottom: 0,
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      top: 0
    }
  });

  SwipeRow.propTypes = {
    setScrollEnabled: _propTypes.default.func,
    swipeGestureBegan: _propTypes.default.func,
    swipeGestureEnded: _pr