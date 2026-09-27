  }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          id: _enum.DryingTimeType.TwoHours,
          type: 'choice',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword136,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword137,
          checked: checkedId === _enum.DryingTimeType.TwoHours,
          onValueChange: function onValueChange(res) {
            res && onChoiceItem(_enum.DryingTimeType.TwoHours);
          }
        }, {
          id: _enum.DryingTimeType.ThreeHours,
          type: 'choice',
          title: _multilingual.defa