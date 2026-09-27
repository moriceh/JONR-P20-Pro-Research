urn", res);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    var onChoiceItem = function onChoiceItem(id) {
      if (id === checkedId) {
        return;
      }

      _logger.default.d("同步机器dryingTime ", id);

      exeCmd(function () {
        return _index2.actions.setDryingTime(id);
      });
    };

    return _react.default.createElement(_reactNative.View, {
      style: styles.base_root
    }, _react.default.createElement(_reactNative.ScrollView, {
      style: {}
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          id: _enum.DryingTimeType.TwoHours,
          type: 'choice',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword599,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword600,
          checked: checkedId === _enum.DryingTimeType.TwoHours,
          onValueChange: function onValueChange(res) {
            res && onChoiceItem(_enum.DryingTimeType.TwoHours);
          }
        }, {
          id: _enum.DryingTimeType.ThreeHours,
          type: 'choice',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword136,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword601,
          checked: checkedId