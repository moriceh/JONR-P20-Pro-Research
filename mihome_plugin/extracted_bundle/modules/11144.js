.mopCloth : baseImages.mopClothNor,
        name: robotStore.stationStatus === _enum.StationStatus.Washing ? _multilingual.default == null ? undefined : _multilingual.default.keyword310 : _multilingual.default == null ? undefined : _multilingual.default.keyword306
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(StationModelItem, {
        onPress: function onPress() {
          return changeMode(_enum.StationStatus.Drying);
        },
        icon: robotStore.stationStatus === _enum.StationStatus.Drying ? baseImages.dryingStop : baseImages.dryingNor,
        name: robotStore.stationStatus === _enum.StationStatus.Drying ? _multilingual.default == null ? undefined : _multilingual.default.keyword311 : _multilingual.default == null ? undefined : _multilingual.default.keyword307
      });
    })), _react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _screenAdapte.sizeH)(35)
      }
    }))), _react.default.createElement(_index2.default, {
      ref: toastRef
    })));
  };

  BaseStationFunction.defaultProps = {
    onBackCharge: function onBackCharge() {},
    onGoStationSet: function onGoStationSet() {}
  };
  BaseStationFunction.propTypes = {
    onBackCharge: _propTypes.default.func,
    onGoStationSet: _propTypes.default.func
  };
  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    img_bgc: {
      height: "100%",
      backgroundColor: _styles.default.pageStyle.card_color,
      paddingLeft: 16,
      paddingTop: 16,
      paddingBottom: 21
    },
    basesRoot: {
      backgroundColor: _styles.default.pageStyle.base_color,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: _styles.default.pageStyle.borderColors
    },
    basesTopContent: {
      paddingHorizontal: