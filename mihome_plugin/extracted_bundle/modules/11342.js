  case 19:
              throw new Error("actions\u53D1\u9001\u5931\u8D25:");

            case 20:
              _context.next = 27;
              break;

            case 22:
              _context.prev = 22;
              _context.t1 = _context["catch"](6);
              commonStore.hideLoading(errorMessage);

              _logger.default.e("actions\u5F02\u5E38:", _context.t1);

              return _context.abrupt("return", false);

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[6, 22]]);
    };

    var onChangeAutoDrying = function onChangeAutoDrying(value) {
      exeCmd(function () {
        return _resourceManager.actions.setAutoDryingSwitch(value);
      }, function () {
        return _resourceManager.propertys.getAutoDryingSwitch(function (value) {
          robotStore == null ? undefined : robotStore.setAutoDryingSwitch(value);
        });
      });
    };

    var onChangeAutoCleaningSolution = function onChangeAutoCleaningSolution(value) {
      exeCmd(function () {
        return _resourceManager.actions.setAutoCleaningSolution(value);
      }, function () {
        return _resourceManager.propertys.getAutoCleaningSolution(function (value) {
          robotStore == null ? undefined : robotStore.setAutoCleaningSolution(value);
        });
      });
    };

    var _autoSetText = function _autoSetText(dustCollectionAutoSet) {
      switch (dustCollectionAutoSet) {
        case _enum.DustCollectionAutoSetType.None:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword151;

        case _enum.DustCollectionAutoSetType.MediumFrequency:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword157;

        case _enum.DustCollectionAutoSetType.EveryTime:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword159;

        default:
          return "";
      }
    };

    var _autoDryingText = function _autoDryingText(dryingTime) {
      switch (dryingTime) {
        case _enum.DryingTimeType.TwoHours:
          return "2" + (_multilingual.default == null ? undefined : _multilingual.default.keyword152);

        case _enum.DryingTimeType.ThreeHours:
          return "3" + (_multilingual.default == null ? undefined : _multilingual.default.keyword152);

        case _enum.DryingTimeType.FourHours:
          return "4" + (_multilingual.default == null ? undefined : _multilingual.default.keyword152);

        default:
          return "";
      }
    };

    return _react.default.createElement(_reactNative.View, {
      style: styles.base_root
    }, _react.default.createElement(_reactNative.ScrollView, null, _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 8
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword129,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword130,
          value: "" + ((robotStore == null ? undefined : robotStore.mopWashFrequency) + (_multilingual.default == null ? undefined : _multilingual.default.keyword456)),
          onPress: function onPress() {
            return navigate('BwFreq', {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword129
            });
          }
        }]
      });
    })), _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 8,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff'
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          type: 'switch',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword149,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword430,
          switchValue: (robotStore == null ? undefined : robotStore.autoDryingSwitch) ? robotStore == null ? undefined : robotStore.autoDryingSwitch : '',
          onSwitchValueChange: onChangeAutoDrying
        }, {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword431,
          value: _autoDryingText((robotStore == null ? undefined : robotStore.dryingTime) ? robotStore == null ? undefined : robotStore.dryingTime : ''),
          onPress: function onPress() {
            return navigate('AutomaticDrying', {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword431,
              titleProps: {
                titleStyle: {
                  fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword431.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                }
              }
            });
          }
        }]
      });
    })), _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 8
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return (robotStore == null ? undefined : robotStore.autoWaterInstalled) ? _react.default.createElement(_list.ListCards, {
        listData: [{
          type: 'switch',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword153,
          subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword154,
          switchValue: (robotStore == null ? undefined : robotStore.autoCleaningSolution) ? robotStore == null ? undefined : robotStore.autoCleaningSolution : '',
          onSwitchValueChange: onChangeAutoCleaningSolution
        }]
      }) : null;
    })), _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 8
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword155,
          subtitle: dustCollectionAutoSet[robotStore == null ? undefined : robotStore.dustCollectionAutoSet],
          value: _autoSetText(robotStore == null ? undefined : robotStore.dustCollectionAutoSet),
          onPress: function onPress() {
            return navigate('AutomaticDustCollection', {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword155,
              titleProps: {
                titleStyle: {
                  fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword155.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                }
              }
            });
          }
        }]
      });
    })), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      if (!robotStore || !robotStore.upstreamDownstreamTesting || !(0, _version.isNewerVersion439_681)()) {
        return _react.default.createElement(_reactNative.View, null);
      }

      return _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multiling