, {
      style: {
        paddingHorizontal: 16
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        marginTop: 25,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: (0, _screenAdapte.sizeH)(16),
        borderRadius: 12,
        zIndex: 2
      }
    }, _react.default.createElement(EditeStyleView, null), !isNewMap && _react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: "row"
      }
    }, cardFunData.map(function (item) {
      return !(0, _version.isNewerVersion439_681)() && item.key === 2 ? null : _react.default.createElement(_reactNative.View, {
        key: item.key,
        style: {
          flex: 1,
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return cardFunClick(item.key);
        },
        style: {
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, _react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        style: {
          width: (0, _screenAdapte.sizeW)(22),
          height: (0, _screenAdapte.sizeH)(22)
        },
        source: item.img
      }), _react.default.createElement(_reactNative.View, {
        style: {
          height: '100%',
          paddingBottom: (0, _screenAdapte.sizeH)(3)
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: [styles.titleNames, {
          marginTop: (0, _screenAdapte.sizeH)(4)
        }]
      }, item.title))));
    }))), _react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: "row",
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }
    }, (!isNewMap ? funData : temporaryFunData).map(function (item, index) {
      return !(0, _version.isNewerVersion439_681)() && (item.type === _enum.MapSettingType.Sequence || item.type === _enum.MapSettingType.CustomParameters) || !configStore.isSDepf && item.type === _enum.MapSettingType.Ground ? null : _react.default.createElement(_reactNative.TouchableOpacity, {
        key: index,
        onPress: function onPress() {
          return onMapSetIt