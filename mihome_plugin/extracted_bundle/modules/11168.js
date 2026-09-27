 function EditeStyleView(params) {
      return _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: "row",
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          zIndex: 1
        }
      }, _react.default.createElement(_reactNative.TouchableOpacity, {
        ref: targetRef,
        pointerEvents: "none",
        onPress: function onPress() {
          return measureElement();
        },
        disabled: isShowTitle,
        style: {
          flexDirection: "row",
          alignItems: 'center',
          width: '50%',
          position: 'relative',
          zIndex: 999
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.mapName
      }, mapName), !isShowTitle && _react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _screenAdapte.sizeW)(5),
          alignSelf: 'flex-end'
        }
      }, _react.default.createElement(_Polygon.default, null))), _react.default.createElement(RightTipView, {
        rightTipType: rightTipType
      })), isNewMap && _react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: 20,
          marginTop: (0, _screenAdapte.sizeH)(5)
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: [styles.titleNames, {
          color: 'xm#6F7C7B'
        }]
      }, _multilingual.default == null ? undefined : _multilingual.default.keyword44)), !isNewMap && _react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: 20,
          paddingVertical: (0, _screenAdapte.sizeH)(16)
        }
      }, _react.default.createElement(_reactNative.View, {
        style: {
          borderBottomWidth: 1,
          borderBottomColor: styles.lines.backgroundColor
        }
      })));
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.View, {
      style: styles.content
    }, _react.default.createElement(_reactNative.View, {
      style: {
        overflow: 'hidden',
        borderTopStartRadius: 12,
        borderTopEndRadius: 12
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.root_bgc
    }, _react.default.createElement(_reactNative.View