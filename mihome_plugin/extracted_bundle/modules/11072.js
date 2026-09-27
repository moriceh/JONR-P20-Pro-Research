 deviceWidth: deviceWidth,
              deviceHeight: deviceHeight
            });
          }
        }
      };

      _this.open = function () {
        if (_this.isTransitioning) {
          return;
        }

        _this.isTransitioning = true;

        if (_this.backdropRef) {
          _this.backdropRef.transitionTo({
            opacity: _this.props.backdropOpacity
          }, _this.props.backdropTransitionInTiming);
        }

        if (_this.state.isSwipeable) {
          _this.state.pan.setValue({
            x: 0,
            y: 0
          });
        }

        if (_this.contentRef) {
          _this.props.onModalWillShow && _this.props.onModalWillShow();

          if (_this.interactionHandle == null) {
            _this.interactionHandle = _reactNative.InteractionManager.createInteractionHandle();
          }

          _this.contentRef.animate(_this.animationIn, _this.props.animationInTiming).then(function () {
            _this.isTransitioning = false;

            if (_this.interactionHandle) {
              _reactNative.InteractionManager.clearInteractionHandle(_this.interactionHandle);

              _this.interactionHandle = null;
            }

            if (!_this.props.isVisible) {
              _this.close();
            } else {
              _this.props.onModalShow();
            }
          });
        }
      };

      _this.close = function () {
        if (_this.isTransitioning) {
          return;
        }

        _this.isTransitioning = true;

        if (_this.backdropRef) {
          _this.backdropRef.transitionTo({
            opacity: 0
          }, _this.props.backdropTransitionOutTiming);
        }

        var animationOut = _this.animationOut;

        if (_this.inSwipeClosingState) {
          _this.inSwipeClosingState = false;

          if (_this.currentSwipingDirection === 'up') {
            animationOut = 'slideOutUp';
          } else if (_this.currentSwipingDirection === 'down') {
            animationOut = 'slideOutDown';
          } else if (_this.currentSwipingDirection === 'right') {
            animationOut = 'slideOutRight';
          } else if (_this.currentSwipingDirection === 'left') {
            animationOut = 'slideOutLeft';
          }
        }

        if (_this.contentRef) {
          _this.props.onModalWillHide && _this.props.onModalWillHide();

          if (_this.interactionHandle == null) {
            _this.interactionHandle = _reactNative.InteractionManager.createInteractionHandle();
          }

          _this.contentRef.animate(animationOut, _this.props.animationOutTiming).then(function () {
            _this.isTransitioning = false;

            if (_this.interactionHandle) {
              _reactNative.InteractionManager.clearInteractionHandle(_this.interactionHandle);

              _this.interactionHandle = null;
            }

            if (_this.props.isVisible) {
              _this.open();
            } else {
              _this.setState({
                showContent: false
              }, function () {
                _this.setState({
                  isVisible: false
                }, function () {
                  _this.props.onModalHide();
                });
              });
            }
          });
        }
      };

      _this.makeBackdrop = function () {
        if (!_this.props.hasBackdrop) {
          return null;
        }

        if (_this.props.customBackdrop && !React.isValidElement(_this.props.customBackdrop)) {}

        var _this$props = _this.props,
            customBackdrop = _this$props.customBackdrop,
            backdropColor = _this$props.backdropColor,
            useNativeDriver = _this$props.useNativeDriver,
            useNativeDriverForBackdrop = _this$props.useNativeDriverForBackdrop,
            onBackdropPress = _this$props.onBackdropPress;
        var hasCustomBackdrop = !!_this.props.customBackdrop;
        var backdropComputedStyle = [{
          width: _this.getDeviceWidth(),
          height: _this.getDeviceHeight(),
          backgroundColor: _this.state.showContent && !hasCustomBackdrop ? backdropColor : 'transparent'
        }];
        var backdropWrapper = React.createElement(animatable.View, {
          ref: function ref(_ref2) {
            return _this.backdropRef = _ref2;
          },
          useNativeDriver: useNativeDriverForBackdrop !== undefined ? useNativeDriverForBackdrop : useNativeDriver,
          style: [_modal.default.backdrop, backdropComputedStyle]
        }, hasCustomBackdrop && customBackdrop);

        if (hasCustomBackdrop) {
          return backdropWrapper;
        }

        return React.createElement(_reactNative.TouchableWithoutFeedback, {
          onPress: onBackdropPress
        }, backdropWrapper);
      };

      var _buildAnimations = (0, _utils.buildAnimations)(extractAnimationFromProps(props)),
          animationIn = _buildAnimations.animationIn,
          _animationOut = _buildAnimations.animationOut;

      _this.animationIn = animationIn;
      _this.animationOut = _animationOut;

      if (_this.state.isSwipeable) {
        _this.state = (0, _objectSpread2.default)({}, _this.state, {
          pan: new _reactNative.Animated.ValueXY()
        });

        _this.buildPanResponder();
      }

      if (props.isVisible) {
        _this.state = (0, _objectSpread2.default)({}, _this.state, {
          isVisible: true,
          showContent: true
        });
      }

      return _this;
    }

    (0, _createClass2.default)(ReactNativeModal, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        if (this.props.onSwipe) {}

        this.didUpdateDimensionsEmitter = _reactNative.DeviceEventEmitter.addListener('didUpdateDimensions', this.handleDimensionsUpdate);

        if (this.state.isVisible) {
          this.open();
        }

        this.backHandler = _backHandler.BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPress);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.backHandler) {
          this.backHandler.remove();
          this.backHandler = null;
        }

        if (this.didUpdateDimensionsEmitter) {
          this.didUpdateDimensionsEmitter.remove();
        }

        if (this.interactionHandle) {
          _reactNative.InteractionManager.clearInteractionHandle(this.interactionHandle);