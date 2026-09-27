    _eventmanager.actionSheetEventManager.publish("onclose_" + sheetId, data || payloadRef.current || data, currentContext);
              } else {
                hiding.current = false;
              }
            } else {
              returnAnimation();
            }
          }
        });
      }, 1);

      if (_reactNative.Platform.OS === 'web') {
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
      }
    }, [closable, hideAnimation, props.onClose, returnAnimation, setVisible]);

    var onHardwareBackPress = _react.default.useCallback(function () {
      var _routerRef$current2;

      if (visible && enableRouterBackNavigation && ((_routerRef$current2 = routerRef.current) == null ? undefined : _routerRef$current2.canGoBack())) {
        var _routerRef$current3;

        (_routerRef$current3 = routerRef.current) == null ? undefined : _routerRef$current3.goBack();
        return true;
      }

      if (visible && closable && closeOnPressBack) {
        hideSheet();
        return true;
      }

      return false;
    }, [closable, closeOnPressBack, hideSheet, enableRouterBackNavigation, visible]);

    var snapForward = _react.default.useCallback(function (vy) {
      if (currentSnapIndex.current === snapPoints.length - 1) {
        initialValue.current = getNextPosition(currentSnapIndex.current);
        returnAnimation(vy);
        return;
      }

      var nextSnapPoint = 0;
      var nextSnapIndex = 0;

      if (getCurrentPosition() === 0) {
        nextSnapPoint = snapPoints[nextSnapIndex = snapPoints.length - 1];
      } else {
        for (var i = currentSnapIndex.current; i < snapPoints.length; i++) {
          if (getNextPosition(i) < getCurrentPosition()) {
            nextSnapPoint = snapPoints[nextSnapIndex = i];
            break;
          }
        }
      }

      if (nextSnapPoint > 100) {
        returnAnimation(vy);
        return;
      }

      currentSnapIndex.current = nextSnapIndex;
      initialValue.current = getNextPosition(currentSnapIndex.current);
      returnAnimation(vy);
    }, [getCurrentPosition, getNextPosition, returnAnimation, snapPoints]);

    var snapBackward = _react.default.useCallback(function (vy) {
      if (currentSnapIndex.current === 0) {
        if (closable) {
          initialValue.current = dimensions.height * 1.3;
          hideSheet(vy);
        } else {
          initialValue.current = getNextPosition(currentSnapIndex.current);
          returnAnimation(vy);
        }

        return;
      }

      var nextSnapPoint = 0;
      var nextSnapIndex = 0;

      for (var i = currentSnapIndex.current; i > -1; i--) {
        if (getNextPosition(i) > getCurrentPosition()) {
          nextSnapPoint = snapPoints[nextSnapIndex = i];
          break;
        }
      }

      if (nextSnapPoint < 0) {
        returnAnimation(vy);
        return;
      }

      currentSnapIndex.current = nextSnapIndex;
      initialValue.current = getNextPosition(currentSnapIndex.current);
      returnAnimation(vy);
    }, [closable, dimensions.height, getCurrentPosition, getNextPosition, hideSheet, returnAnimation, snapPoints]);

    var handlers = _react.default.useMemo(function () {
      return !gestureEnabled ? {
        panHandlers: {}
      } : _reactNative.PanResponder.create({
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(event, gesture) {
          if (sheetId && !(0, _sheetmanager.isRenderedOnTop)(sheetId, currentContext)) return false;
          var vy = gesture.vy < 0 ? gesture.vy * -1 : gesture.vy;
          var vx = gesture.vx < 0 ? gesture.vx * -1 : gesture.vx;

          if (vy < 0.05 || vx > 0.05) {
            return false;
          }

          var gestures = true;

          for (var _id in gestureBoundaries.current) {
            var gestureBoundary = gestureBoundaries.current[_id];

            if (getCurrentPosition() > 3 || !gestureBoundary) {
              gestures = true;
              break;
            }

            var _scrollOffset = (gestureBoundary == null ? undefined : gestureBoundary.scrollOffset) || 0;

            if (event.nativeEvent.locationY < (gestureBoundary == null ? undefined : gestureBoundary.y) || gesture.vy > 0 && _scrollOffset <= 0 || getCurrentPosition() !== 0) {
              if (!props.enableGesturesInScrollView && _reactNative.Platform.OS !== 'web' && event.nativeEvent.locationY > (gestureBoundary == null ? undefined : gestureBoundary.y)) {
                return false;
              } else {
                gestures = true;
              }
            } else {
              gestures = false;
              break;
            }
          }

          if (_reactNative.Platform.OS === 'web') {
            if (!gestures) {
              panViewRef.current.style.touchAction = 'none';
            } else {
              panViewRef.current.style.touchAction = 'auto';
            }
          }

          return gestures;
        },
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder(event, _gesture) {
          if (sheetId && !(0, _sheetmanager.isRenderedOnTop)(sheetId, currentContext)) return false;
          var gestures = true;

          for (var _id in gestureBoundaries.current) {
            var gestureBoundary = gestureBoundaries.current[_id];

            if (getCurrentPosition() > 3 || !gestureBoundary) {
              gestures = true;
            }

            var _scrollOffset2 = (gestureBoundary == null ? undefined : gestureBoundary.scrollOffset) || 0;

            if (event.nativeEvent.locationY < (gestureBoundary == null ? undefined : gestureBoundary.y) || _scrollOffset2 <= 0 && getCurrentPosition() !== 0) {
              if (_reactNative.Platform.OS !== 'web') {
                return false;
              } else {
                gestures = true;
              }
            } else {
              gestures = false;
            }
          }

          return gestures;
        },
        onPanResponderMove: function onPanResponderMove(_event, gesture) {
          var value = initialValue.current + gesture.dy;
          var correctedValue = value <= minTranslateValue.current ? minTranslateValue.current - value : value;

          if (correctedValue / overdrawFactor >= overdrawSize && gesture.dy <= 0) {
            return;
          }

          animations.translateY.setValue(value <= minTranslateValue.current ? overdrawEnabled ? minTranslateValue.current - correctedValue / overdrawFactor : minTranslateValue.current : value);
        },
        onPanResponderEnd: function onPanResponderEnd(_event, gesture) {
          var isMovingUp = getCurrentPosition() < initialValue.current;

          if (!isMovingUp && getCurrentPosition() < initialValue.current + springOffset || isMovingUp && getCurrentPosition() > initialValue.current - springOffset) {
            returnAnimation(gesture.vy);
            return;
          }

          if (!isMovingUp) {
            snapBackward(gesture.vy);
          } else {
            snapForward(gesture.vy);
          }
        }
      });
    }, [gestureEnabled, sheetId, currentContext, getCurrentPosition, props.enableGesturesInScrollView, overdrawFactor, overdrawSize, animations.translateY, overdrawEnabled, springOffset, returnAnimation, snapBackward, snapForward]);

    var onTouch = function onTouch() {
      if (enableRouterBackNavigation && router.canGoBack()) {
        router.goBack();
        return;
      }

      if (closeOnTouchBackdrop && closable) {
        hideSheet();
      }
    };

    var onSheetLayout = _react.default.useCallback(function (event) {
      var _deviceContainerRef$c;

      if (isOrientationChanging.current) return;
      var safeMarginFromTop = _reactNative.Platform.OS === 'ios' ? safeAreaPaddingTop.current || 0 : _reactNative.StatusBar.currentHeight || 0;

      var windowDimensions = _reactNative.Dimensions.get('window');

      var height = windowDimensions.height - safeMarginFromTop;
      var orientationChanged = dimensions.portrait !== windowDimensions.width < windowDimensions.height;
      if (orientationChanged) isOrientationChanging.current = true;
      (_deviceContainerRef$c = deviceContainerRef.current) == null ? undefined : _deviceContainerRef$c.setNativeProps({
        style: {
          height: _reactNative.Dimensions.get('screen').height - safeMarginFromTop
        }
      });
      setDimensions(function (dim) {
        return (0, _objectSpread2.default)({}, dim, {
          height: height,
          portrait: windowDimensions.width < windowDimensions.height
        });
      });
      actionSheetHeight.current = event.nativeEvent.layout.height > height ? height : event.nativeEvent.layout.height;
      minTranslateValue.current = height - actionSheetHeight.current;

      if (initialValue.current < 0) {
        animations.translateY.setValue(height * 1.1);
      }

      var nextInitialValue = actionSheetHeight.current + minTranslateValue.current - actionSheetHeight.current * snapPoints[currentSnapIndex.current] / 100;
      initialValue.current = (keyboard.keyboardShown || keyboardWasVisible.current) && initialValue.current <= nextInitialValue && initialValue.current >= minTranslateValue.current ? initialValue.current : nextInitialValue;

      if (keyboard.keyboardShown) {
        keyboardAnimation();
        keyboardWasVisible.current = true;
        prevKeyboardHeight.current = keyboard.keyboardHeight;
      } else {
        keyboardWasVisible.current = false;
      }

      opacityAnimation(1);
      returnAnimation();

      if (isOrientationChanging.current) {
        setTimeout(function () {
          isOrientationChanging.current = false;
        }, 300);
      }

      if (initialValue.current > 100) {
        if (lock.current) return;
        animations.underlayTranslateY.setValue(100);
      }

      if (_reactNative.Platform.OS === 'web') {
        document.body.style.overflowY = 'hidden';
        document.documentElement.style.overflowY = 'hidden';
      }
    }, [snapPoints, keyboard.keyboardShown, keyboard.keyboardHeight, opacityAnimation, returnAnimation, keyboardAnimation, animations.translateY, animations.underlayTranslateY, dimensions.portrait]);

    var _getRef = (0, _react.useCallback)(function () {
      return {
        show: function show() {
          var _routerRef$current4;

          _onBeforeShow == null ? undefined : _onBeforeShow();
          (_routerRef$current4 = routerRef.current) == null ? undefined : _routerRef$current4.initialNavigation();
          setVisible(true);
        },
        hide: function hide(data) {
          hideSheet(undefined, data, true);
        },
        setModalVisible: function setModalVisible(_visible) {
          if (_visible) {
            setVisible(true);
          } else {
            hideSheet();
          }
        },
        snapToOffset: function snapToOffset(offset) {
          initialValue.current = actionSheetHeight.current + minTranslateValue.current - actionSheetHeight.current * offset / 100;

          _reactNative.Animated.spring(animations.translateY, (0, _objectSpread2.default)({
            toValue: initialValue.current,
            useNativeDriver: true
          }, props.openAnimationConfig)).start();
        },
        snapToRelativeOffset: function snapToRelativeOffset(offset) {
          if (offset === 0) {
            _getRef().snapToIndex(currentSnapIndex.current);

            return;
          }

          var availableHeight = actionSheetHeight.current + minTranslateValue.current;
          initialValue.current = initialValue.current + initialValue.current * (offset / 100);

          if (initialValue.current > availableHeight) {
            _getRef().snapToOffset(100);

            return;
          }

          _reactNative.Animated.spring(animations.translateY, (0, _objectSpread2.default)({
            toValue: initialValue.current,
            useNativeDriver: true
          }, props.openAnimationConfig)).start();
        },
        snapToIndex: function snapToIndex(index) {
          if (index > snapPoints.length || index < 0) return;
          currentSnapIndex.current = index;
          initialValue.current = getNextPosition(index);

          _reactNative.Animated.spring(animations.translateY, (0, _objectSpread2.default)({
            toValue: initialValue.current,
            useNativeDriver: true
          }, props.openAnimationConfig)).start();
        },
        handleChildScrollEnd: function handleChildScrollEnd() {},
        modifyGesturesForLayout: function modifyGesturesForLayout(_id, layout, scrollOffset) {
          gestureBoundaries.current[_id] = (0, _objectSpread2.default)({}, layout, {
            scrollOffset: scrollOffset
          });
        },
        isGestureEnabled: function isGestureEnabled() {
          return gestureEnabled;
        },
        isOpen: function isOpen() {
          return visible;
        },
        ev: internalEventManager
      };
    }, [internalEventManager, setVisible, hideSheet, animations.translateY, props.openAnimationConfig, snapPoints.length, getNextPosition, gestureEnabled, visible, _onBeforeShow]);

    (0, _react.useImperativeHandle)(ref, _getRef, [_getRef]);
    (0, _react.useEffect)(function () {
      if (sheetId) {
        _sheetmanager.SheetManager.registerRef(sheetId, currentContext, {
          current: _getRef()
        });
      }
    }, [currentContext, _getRef, sheetId]);

    var onRequestClose = _react.default.useCallback(function () {
      var _routerRef$current5;

      if (enableRouterBackNavigation && ((_routerRef$current5 = routerRef.current) == null ? undefined : _routerRef$current5.canGoBack())) {
        var _routerRef$current6;

        (_routerRef$current6 = routerRef.current) == null ? undefined : _routerRef$current6.goBack();
        return;
      }

      hideSheet();
    }, [hideSheet, enableRouterBackNavigation]);

    var rootProps = _react.default.useMemo(function () {
      var _props$testIDs, _props$testIDs2;

      return isModal && !props.backgroundInteractionEnabled ? {
        visible: true,
        animationType: 'none',
        testID: ((_props$testIDs = props.testIDs) == null ? undefined : _props$testIDs.modal) || props.testID,
        supportedOrientations: _utils.SUPPORTED_ORIENTATIONS,
        onShow: props.onOpen,
        onRequestClose: onRequestClose,
        transparent: true,
        statusBarTranslucent: true
      } : {
        testID: ((_props$testIDs2 = props.testIDs) == null ? undefined : _props$testIDs2.root) || props.testID,
        onLayout: function onLayout() {
          hardwareBackPressEvent.current = _reactNative.BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
          props == null ? undefined : props.onOpen == null ? undefined : props.onOpen();
        },
        style: {
          position: 'absolute',
          zIndex: zIndex ? zIndex : sheetId ? (0, _sheetmanager.getZIndexFromStack)(sheetId, currentContext) : 999,
          width: '100%',
          height: initialWindowHeight.current
        },
        pointerEvents: (props == null ? undefined : props.backgroundInteractionEnabled) ? 'box-none' : 'auto'
      };
    }, [currentContext, isModal, onHardwareBackPress, onRequestClose, props, zIndex, sheetId]);

    var renderRoute = (0, _react.useCallback)(function (route) {
      var _router$currentRoute;

      var RouteComponent = route.component;
      return _react.default.createElement(_reactNative.Animated.View, {
        key: route.name,
        style: {
          display: route.name !== ((_router$currentRoute = router.currentRoute) == null ? undefined : _router$currentRoute.name) ? 'none' : 'flex',
          opacity: animations.routeOpacity
        }
      }, _react.default.createElement(_useRouter.RouterParamsContext.Provider, {
        value: route == null ? undefined : route.params
      }, _react.default.createElement(RouteComponent, {
        router: router,
        params: route == null ? undefined : route.params,
        payload: payloadRef.current
      })));
    }, [animations.routeOpacity, router]);

    var getPaddingBottom = function getPaddingBottom() {
      var _props$containerStyle2, _props$containerStyle3, _props$containerStyle4, _props$containerStyle5;

      if (!props.useBottomSafeAreaPadding && !props.containerStyle) return 0;
      var topPadding = !props.useBottomSafeAreaPadding ? 0 : _reactNative.Platform.OS === 'android' ? _reactNative.StatusBar.currentHeight && _reactNative.StatusBar.currentHeight > 35 ? 35 : _reactNative.StatusBar.currentHeight : (safeAreaPaddingTop.current || 0) > 30 ? 30 : safeAreaPaddingTop.current;

      if (!props.useBottomSafeAreaPadding && props.containerStyle) {
        var _props$containerStyle;

        return ((_props$containerStyle = props.containerStyle) == null ? undefined : _props$containerStyle.paddingBottom) || props.containerStyle.padding || 0;
      }

      if (!props.containerStyle && (props == null ? undefined : props.useBottomSafeAreaPadding)) {
        return topPadding;
      }

      if (typeof ((_props$containerStyle2 = props.containerStyle) == null ? undefined : _props$containerStyle2.paddingBottom) === 'string') return props.containerStyle.paddingBottom;
      if (typeof ((_props$containerStyle3 = props.containerStyle) == null ? undefined : _props$containerStyle3.padding) === 'string') return props.containerStyle.padding;

      if ((_props$containerStyle4 = props.containerStyle) == null ? undefined : _props$containerStyle4.paddingBottom) {
        return topPadding + props.containerStyle.paddingBottom;
      }

      if ((_props$containerStyle5 = props.containerStyle) == null ? undefined : _props$containerStyle5.padding) {
        return topPadding + props.containerStyle.padding;
      }

      return topPadding;
    };

    var paddingBottom = getPaddingBottom() || 0;
    return _react.default.createElement(_react.default.Fragment, null, _reactNative.Platform.OS === 'ios' && !safeAreaInsets ? _react.default.createElement(_reactNative.SafeAreaView, {
      pointerEvents: "none",
      collapsable: false,
      onLayout: function onLayout(event) {
        var height = event.nativeEvent.layout.height;

        if (height !== undefined) {
          safeAreaPaddingTop.current = height;
          clearTimeout(onDeviceLayoutReset.current.timer);
          onDeviceLayoutReset.current.timer = setTimeout(function () {
            internalEventManager.publish('safeAreaLayout');
          }, 64);
        }
      },
      style: {
        position: 'absolute',
        width: 1,
        left: 0,
        top: 0,
        backgroundColor: 'transparent'
      }
    }, _react.default.createElement(_reactNative.View, null)) : null, visible ? _react.default.createElement(Root, rootProps, _react.default.createElement(_reactNative.Animated.View, {
      onLayout: onDeviceLayout,
      ref: deviceContainerRef,
      pointerEvents: (props == null ? undefined : props.backgroundInteractionEnabled) ? 'box-none' : 'auto',
      style: [_styles.styles.parentContainer, {
        opacity: animations.opacity,
        width: '100%',
        justifyContent: 'flex-end',
        transform: [{
          translateY: animations.keyboardTranslate
        }]
      }]
    }, !(props == null ? undefined : props.backgroundInteractionEnabled) ? _react.default.createElement(_reactNative.TouchableOpacity, (0, _extends2.default)({
      onPress: onTouch,
      activeOpacity: defaultOverlayOpacity,
      testID: (_props$testIDs3 = props.testIDs) == null ? undefined : _props$testIDs3.backdrop,
      style: {
        height: dimensions.height + (safeAreaPaddingTop.current || 0) + 100,
        width: '100%',
        position: 'absolute',
        backgroundColor: overlayColor,
        opacity: defaultOverlayOpacity
      }
    }, props.backdropProps ? props.backdropProps : {})) : null, _react.default.createElement(_reactNative.Animated.View, {
      pointerEvents: "box-none",
      style: (0, _objectSpread2.default)({
        borderTopRightRadius: ((_props$containerStyle6 = props.containerStyle) == null ? undefined : _props$containerStyle6.borderTopRightRadius) || 10,
        borderTopLeftRadius: ((_props$containerStyle7 = props.containerStyle) == null ? undefined : _props$containerStyle7.borderTopLeftRadius) || 10,
        backgroundColor: ((_props$containerStyle8 = props.containerStyle) == null ? undefined : _props$containerStyle8.backgroundColor) || 'white',
        borderBottomLeftRadius: ((_props$containerStyle9 = props.containerStyle) == null ? undefined : _props$containerStyle9.borderBottomLeftRadius) || undefined,
        borderBottomRightRadius: ((_props$containerStyle10 = props.containerStyle) == null ? undefined : _props$containerStyle10.borderBottomRightRadius) || undefined,
        borderRadius: ((_props$containerStyle11 = props.containerStyle) == null ? undefined : _props$containerStyle11.borderRadius) || undefined,
        width: ((_props$containerStyle12 = props.containerStyle) == null ? undefined : _props$containerStyle12.width) || '100%'
      }, (0, _utils.getElevation)(typeof elevation === 'number' ? elevation : 5), {
        flex: undefined,
        height: dimensions.height,
        maxHeight: dimensions.height,
        paddingBottom: keyboard.keyboardShown ? keyboard.keyboardHeight || 0 : 0,
        transform: [{
          translateY: animations.translateY
        }]
      })
    }, dimensions.height === 0 ? null : _react.default.createElement(_reactNative.Animated.View, (0, _extends2.default)({}, handlers.panHandlers, {
      onLayout: onSheetLayout,
      ref: panViewRef,
      testID: (_props$testIDs4 = props.testIDs) == null ? undefined : _props$testIDs4.sheet,
      style: [_styles.styles.container, {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
      }, props.containerStyle, {
        paddingBottom: keyboard.keyboardShown && typeof paddingBottom !== 'string' ? paddingBottom + 2 : paddingBottom,
        maxHeight: keyboard.keyboardShown ? dimensions.height - keyboard.keyboardHeight : dimensions.height
      }, {
        overflow: 'hidden'
      }]
    }), drawUnderStatusBar ? _react.default.createElement(_reactNative.Animated.View, {
      style: {
        height: 100,
        position: 'absolute',
        top: -50,
        backgroundColor: ((_props$containerStyle13 = props.containerStyle) == null ? undefined : _props$containerStyle13.backgroundColor) || 'white',
        width: '100%',
        borderTopRightRadius: ((_props$containerStyle14 = props.containerStyle) == null ? undefined : _props$containerStyle14.borderRadius) || 10,
        borderTopLeftRadius: ((_props$containerStyle15 = props.containerStyle) == null ? undefined : _props$containerStyle15.borderRadius)