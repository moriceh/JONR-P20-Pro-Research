    return _changeWashMop(false);
          },
          title: _multilingual.default.keyword310,
          imgData: baseImages.stopReturn
        });
      } else if (robotStore.curRobotStatus === "HotDry" || robotStore.curRobotStatus === "WindDry") {
        return _react.default.createElement(_Hbutton.default, {
          onPress: function onPress() {
            return _changeDryMop(false);
          },
          title: _multilingual.default.keyword311,
          imgData: baseImages.stopReturn
        });
      } else if (robotStore.curRobotStatus === "Charging" || robotStore.curRobotStatus === "ChargeAsleep") {
        return _react.default.createElement(_Hbutton.default, {
          onPress: showModal,
          title: _multilingual.default.keyword302,
          imgData: baseImages.stationFun
        });
      } else {
        return _react.default.createElement(_Hbutton.default, {
          onPress: onBackCharge,
          title: robotStore.isReturning ? _multilingual.default.keyword317 : _multilingual.default.keyword3,
          imgData: robotStore.isReturning ? baseImages.stopReturn : baseImages.returnStation
        });
      }
    })), _react.default.createElement(_reactNativeModal.default, {
      style: {
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent'
      },
      isVisible: showStationFunctionDialog,
      hideModalContentWhileAnimating: false,
      hasBackdrop: false,
      onRequestClose: hideModal
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: hideModal,
      style: {
        flex: 1
      }
    }), _react.default.createElement(_reactNative.View, {
      style: styles.basesRoot
    }, _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: _styles.default.dialogBoxColor,
      style: {
        overflow: "hidden",
        borderTopStartRadius: 12,
        borderTopEndRadius: 12
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.basesTopContent
    }, _react.default.createElement(_reactNative.View, {
      style: styles.basesTop
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.basesTitle
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword302), _react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.basesSetUpContainer,
      onPress: onClickSetUp
    }, _react.default.createElement(_setUp.default, null), _react.default.createElement(_reactNative.Text, {
      style: styles.basesSetUpText
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword304))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return (robotStore == null ? undefined : robotStore.autoWaterInstalled) ? _react.default.createElement(_reactNative.Text, {
        style: styles.basesSubtitle
      }, _multilingual.default == null ? undefined : _multilingual.default.keyword303) : _react.default.createElement(_reactNative.View, null);
    })), _react.default.createElement(_reactNative.View, {
      style: styles.equipmentStateContainer
    }, _react.default.createElement(_reactNative.View, {
      style: {
        justifyContent: "space-around",
      