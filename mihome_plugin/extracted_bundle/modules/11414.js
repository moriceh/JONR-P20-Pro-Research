nChoiceItem = function onChoiceItem(id) {
      if (id === checkedId) {
        return;
      }

      _logger.default.d("setmopWashTemp ", id);

      exeCmd(function () {
        return _resourceManager.actions.setMopWashTemp(id);
      }, function () {
        return _resourceManager.propertys.getMopWashTemp(function (value) {
          robotStore.setMopWashTemp(value);
          setCheckedId(value);
        });
      });
    };

    return _react.default.createElement(_reactNative.View, {
      style: styles.base_root
    }, _react.default.createElement(_reactNative.ScrollView, null, _react.default.createElement(_list.ListCards, {
      listData: [{
        type: 'choice',
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword143,
        subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword144,
        checked: checkedId === _enum.MopWashTempType.Room,
        onValueChange: function onValueChange(res) {
          res && onChoiceItem(_enum.MopWashTempType.Room);
        }
      }, {
        type: 'choice',
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword145,
        subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword146,
        checked: checkedId === _enum.MopWashTempType.Low,
        onValueChange: function onValueChange(res) {
          res && onChoiceItem(_enum.MopWashTempType.Low);
        }
      }, {
        type: 'cho