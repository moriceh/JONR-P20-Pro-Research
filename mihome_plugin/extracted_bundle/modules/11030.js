ate6 = (0, _slicedToArray2.default)(_useState5, 2),
        keyboardHeight = _useState6[0],
        setKeyboardHeight = _useState6[1];

    var withTimeout = _react.default.useCallback(function (callback) {
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      if (isModal || _reactNative.Platform.OS === 'ios') return callback();
      setTimeout(callback, timeout);
    }, [isModal]);

    var handleKeyboardWillShow = function handleKeyboardWillShow(e) {
      setCoordinates({
        start: e.startCoordinates,
        end: e.endCoordinates
      });
    };

    var handleKeyboardDidShow = _react.default.useCallback(function (e) {
      onKeyboardShow == null ? undefined : onKeyboardShow(e.endCoordinates.height);
      withTimeout(function () {
        setShown(true);
        setCoordinates({
          start: e.startCoordinates,
          end: e.endCoordinates
        });
        setKeyboardHeight(e.endCoordinates.height);
      });
    }, [onKeyboardShow, withTimeout]);

    var handleKeyboardWillHide = function handleKeyboardWillHide(e) {
      setCoordinates({
        start: e.startCoordinates,
        end: e.endCoordinates
      });
    };

    var handleKeyboardDidHide = _react.default.useCallback(function (e) {
      onKeyboardHide == null ? undefined : onKeyboardHide();
      withTimeout(function () {
        setShown(false);

        if (e) {
          setCoordinates({
            start: e.startCoordinates,
            end: e.endCoordinates
          });
        } else {
          setCoordinates(initialValue);
          setKeyboardHeight(0);
        }
      }, 1);
    }, [onKeyboardHide, withTimeout]);

    (0, _react.useEffect)(function () {
      var subscriptions = [];

      if (enabled) {
        subscriptions = [_reactNative.Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow), _reactNative.Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow), _reactNative.Keyboard.addListener('keyboardWillHide', ha