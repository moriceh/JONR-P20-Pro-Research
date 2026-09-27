onfirm]);

    var handleCancel = function handleCancel() {
      if (onCancel) {
        onCancel();
      } else {
        onConfirm();
      }
    };

    return _react.default.createElement(_reactNativeModal.default, {
      style: {
        margin: 0,
        padding: 0,
        backgroundColor: "transparent"
      },
      backdropOpacity: 0.4,
      hideModalContentWhileAnimating: false,
      useNativeDriver: true,
      isVisible: visible,
      onBackdropPress: handleCancel
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        justifyContent: 'flex-end'
      }
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        flex: 1
      },
      onPress: handleCancel,
      disabled: !canDismiss
    }), _react.default.createElement(_reactNative.View, {
      style: {
        borderWidth: 1,
        borderColor: '#fff',
        borderTopStartRadius: 12,
        borderTopEndRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden'
      }
    }, _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: _styles.defaul