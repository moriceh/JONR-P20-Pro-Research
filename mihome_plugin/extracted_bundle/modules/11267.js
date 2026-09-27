on () {
        return _resourceManager.actions.setBreakCleanSwitch(res);
      }, function () {
        return _resourceManager.propertys.getBreakCleanSwitch(function (value) {
          return robotStore.setBreakCleanSwitch(value);
        });
      });
    };

    var onChangeChildLock = function onChangeChildLock(res) {
      _resourceManager.actions.setChildLock(res);
    };

    function getCarpetStr(carpetCleanPrefer) {
      switch (carpetCleanPrefer) {
        case _enum.CarpetCleanPrefer.Adaptive:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword86;

        case _enum.CarpetCleanPrefer.Evade:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword89;

        case _enum.CarpetCleanPrefer.Only:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword92;

        case _enum.CarpetCleanPrefer.Ignore:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword95;

        default:
          return '';
      }
    }

    return _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false
    }, _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: (0, _screenAdapte.sizeH)(34)
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_