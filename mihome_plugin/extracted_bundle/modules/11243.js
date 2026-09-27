tive.View, {
      style: styles.root
    }, _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: colorMode,
      style: styles.content
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword504), _react.default.createElement(_reactNative.Text, {
      style: styles.texts
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword505), _react.default.createElement(_reactNative.View, {
      style: {
        width: '100%',
        height: (0, _screenAdapte.sizeH)(224),
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: (0, _screenAdapte.sizeH)(18),
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, _react.default.createElement(_reactNative.Image, {
      resizeMode: "contain",
      style: {
        width: (0, _screenAdapte.sizeW)(223),
        height: (0, _screenAdapte.sizeH)(176)
      },
      source: plumbingImgaes.plumbingImg
    })), _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        marginBottom: (0, _screenAdapte.sizeH)(35),
        alignSelf: "center"
      },
      onPress: jump
    }, _react.default.createElement(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[13]),