$$_REQUIRE(_dependencyMap[2]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);

  var _miot = _$$_REQUIRE(_dependencyMap[5]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _resourceManager = _$$_REQUIRE(_dependencyMap[7]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[9]);

  var _card = _$$_REQUIRE(_dependencyMap[10]);

  var _DynamicColor = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var _CommonSetting = _$$_REQUIRE(_dependencyMap[13]);

  var _mhuiRn = _$$_REQUIRE(_dependencyMap[14]);

  var _index = _$$_REQUIRE(_dependencyMap[15]);

  var _netinfo = _$$_REQUIRE(_dependencyMap[16]);

  var _timeZone = _$$_REQUIRE(_dependencyMap[17]);

  var _consts = _$$_REQUIRE(_dependencyMap[18]);

  var _mobxReactLite = _$$_REQUIRE(_dependencyMap[19]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[20]);

  var _version = _$$_REQUIRE(_dependencyMap[21]);

  var first_options = _CommonSetting.SETTING_KEYS.first_options,
      second_options = _CommonSetting.SETTING_KEYS.second_options;

  var Setting = function Setting(_ref) {
    var navigation = _ref.navigation;

    var _useStore = (0, _index.useStore)(),
        deviceStore = _useStore.deviceStore,
        configStore = _useStore.configStore,
        robotStore = _useStore.robotStore,
        commonStore = _useStore.commonStore;

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        type = _useNetInfo.type,
        isConnected = _useNetInfo.isConnected;

    var list0 = [{
      title: _multilingual.default.keyword36,
      onPress: function onPress() {
        return navigation.navigate('MapManage', {
          title: _multilingual.default.keyword36
        });
      }
    }, {
      title: _multilingual.default.keyword56,
      animated: false,
      onPress: function onPress() {
        return navigation.navigate('AppointmentForCleaning', {
          title: _multilingual.default.keyword56
        });
      }
    }, {
      title: _multilingual.default.keyword83,
      onPress: function onPress() {
        return navigation.navigate('RobotSetting', {
          title: _multilingual.default.keyword83
        });
      }
    }, {
      title: _multilingual.default.keyword128,
      onPress: function onPress() {
        return navigation.navigate('BaseStation', {
          title: _multilingual.default.keyword128
        });
      }
    }];
    var list1 = !(0, _version.isNewerVersion439_681)() ? [{
      title: _multilingual.default.keyword166,
      onPress: function onPress() {
        return navigation.navigate('CleaningRecords', {
          title: _multilingual.default.keyword166,
          titleProps: {
            backgroundColor: styles.navigationBar.backgroundColor
          }
        });
      }
    }, {
      title: _multilingual.default.keyword176,
      onPress: function onPress() {
        return navigation.navigate('Consumables', {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword176
        });
      }
    }, {
      title: _multilingual.default.keyword34,
      onPress: function onPress() {
        return _regenerator.default.async(function onPress$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _logger.default.d('++++++++++++定位我的机器人');

                commonStore.showLoading();
                _context.next = 4;
                return _regenerator.default.awrap(_resourceManager.actions.seekRobotSwitch(true));

              case 4:
                setTimeout(function () {
                  commonStore.hideLoading();
                }, 500);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      isShow: true
    }] : [{
      title: _multilingual.default.keyword166,
      onPress: function onPress() {
        return navigation.navigate('CleaningRecords', {
          title: _multilingual.default.keyword166,
          titleProps: {
            backgroundColor: styles.navigationBar.backgroundColor
          }
        });
      }
    }, {
      title: _multilingual.default.keyword176,
      onPress: function onPress() {
        return navigation.navigate('Consumables', {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword176
        });
      }
    }, {
      title: _multilingual.default.keyword433,
      onPress: function onPress() {
        navigation.navigate('RemoteControlMode', {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword433
        });
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword558,
          confirm: _multilingual.default.keyword329,
          onConfirm: function onConfirm() {}
        });
      }
    }, {
      title: _multilingual.default.keyword34,
      onPress: function onPress() {
        return _regenerator.default.async(function onPress$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _logger.default.d('++++++++++++定位我的机器人');

                commonStore.showLoading();
                _context2.next = 4;
                return _regenerator.default.awrap(_resourceManager.actions.seekRobotSwitch(true));

              case 4:
                setTimeout(function () {
                  commonStore.hideLoading();
                }, 500);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        });
      },
      isShow: true
    }];
    (0, _react.useEffect)(function () {
      var specs = [{
        param: _consts.propertyCodes.manufacturer,
        fn: function fn(value) {
          return deviceStore.setManufacturer(value);
        }
      }, {
        param: _consts.propertyCodes.model,
        fn: function fn(value) {
          return deviceStore.setDeviceModel(value);
        }
      }, {
        param: _consts.propertyCodes['serial-number'],
        fn: function fn(value) {
          return deviceStore.setDeviceID(value);
        }
      }, {
        param: _consts.propertyCodes['firmware-revision'],
        fn: function fn(value) {
          return deviceStore.setFirmwareRevision(value);
        }
      }, {
        param: _consts.propertyCodes['serial-no'],
        fn: function fn(value) {
          return deviceStore.setSerialNo(value);
        }
      }];
      commonStore.showLoading();
      var isMounted = true;

      _resourceManager.manager.getSpec(specs).then(function () {
        if (isMounted) {
          commonStore.hideLoading();
        }
      });

      return function () {
        isMounted = false;
        commonStore.hideLoading();
      };
    }, []);
    (0, _react.useEffect)(function () {
      var abortController = new AbortController();

      function fetchData() {
        var response;
        return _regenerator.default.async(function fetchData$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _regenerator.default.awrap(fetch('your-api-endpoint', {
                  signal: abortController.signal
                }));

              case 3:
                response = _context3.sent;
                _context3.next = 9;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3["catch"](0);

                if (_context3.t0.name === 'AbortError') {} else {}

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, null, null, [[0, 6]]);
      }

      fetchData();
      return function () {
        abortController.abort();
      };
    }, []);

    var exeCmd = _react.default.useCallback(function _callee(asyncCmdFunc) {
      var errorMessage,
          res,
          _args4 = arguments;
      return _regenerator.default.async(function _callee$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              errorMessage = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : _multilingual.default == null ? undefined : _multilingual.default.keyword326;

              if (isConnected) {
                _context4.next = 4;
                break;
              }

              commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword321);
              return _context4.abrupt("return", false);

            case 4:
              commonStore.showLoading();
              _context4.next = 7;
              return _regenerator.default.awrap(asyncCmdFunc());

            case 7:
              res = _context4.sent;

              if (!res) {
                commonStore.showToast(errorMessage);

                _logger.default.e("命令错误", asyncCmdFunc.name, res);
              }

              setTimeout(function () {
                commonStore.hideLoading();
              }, 500);
              return _context4.abrupt("return", res);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      });
    }, [commonStore, isConnected]);

    var _stopClean = function _stopClean() {
      return exeCmd(_resourceManager.actions.stopClean);
    };

    var copyText = function copyText(data) {
      _reactNative.Clipboard.setString(data);

      commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword450);
    };

    var goUpdateFirmware = function goUpdateFirmware() {
      configStore.setNeedUpgrade(false);

      if (robotStore.isInBaseStation && !robotStore.isLowPower) {
        if (robotStore.runningState) {
          commonStore.showMessageDialog({
            message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
            onCancel: function onCancel() {},
            onConfirm: function onConfirm() {
              _stopClean().then(function (res) {
                if (res) {
                  _miot.Host.ui.openDeviceUpgradePage(0);
                }
              });
            }
          });
        } else {
          _miot.Host.ui.openDeviceUpgradePage(0);
        }
      } else {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword220);
      }
    };

    var firstOptions = [first_options.SHARE];
    return _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_reactNative.ScrollView, {
      style: {
        flex: 1
      },
      showsVerticalScrollIndicator: false
    }, _react.default.createElement(_reactNative.View, {
      style: styles.titleContainer
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword555)), list0.map(function (item, index) {
      return _react.default.createElement(_mhuiRn.ListItem, {
        allowFontScaling: false,
        key: index,
        title: item.title,
        showSeparator: false,
        onPress: item.onPress
      });
    }), _react.default.createElement(_reactNative.View, {
      style: styles.blank
    }), _react.default.createElement(_reactNative.View, {
      style: styles.titleContainer
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.title
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword556)), list1.map(function (item, index) {
      return _react.default.createElement(_mhuiRn.ListItem, {
        allowFontScaling: false,
        key: index,
        title: item.title,
        showSeparator: false,
        onPress: item.onPress
      });
    }), _react.default.createElement(_reactNative.View, {
      style: styles.blank
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_CommonSetting.CommonSetting, {
        navigation: navigation,
        firstOptions: firstOptions,
        secondOptions: [],
        extraOptions: {},
        firstCustomOptions: [{
          useNewType: true,
          key: 'firmwareRevision',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword199,
          value: deviceStore.firmwareRevision,
          showDot: configStore.showUpgradeDot,
          onPress: goUpdateFirmware,
          weight: 0
        }],
        secondCustomOptions: [{
          useNewType: true,
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword200,
          value: (0, _timeZone.getTimeZoneGMT)(deviceStore.timeZone),
          weight: 2,
          onPress: function onPress() {
            navigation.navigate('TimeSynchronization', {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword451,
              titleProps: {
                titleStyle: {
                  fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword451.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                }
              }
            });
          }
        }, {
          useNewType: true,
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword202,
          hideArrow: true,
          value: deviceStore.serialNo,
          valueMaxWidth: '50%',
          onPress: function onPress() {
            return copyText(deviceStore.serialNo);
          },
          weight: 5
        }],
        commonSettingStyle: {
          allowFontScaling: false,
          itemStyle: {
            valueMaxWidth: '50%',
            titleNumberOfLines: 4
          },
          moreSettingPageStyle: {
            itemStyle: {
              valueMaxWidth: '50%'
            }
          }
        }
      });
    }), _react.default.createElement(_reactNative.View, {
      style: styles.blank
    }), _react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _screenAdapte.sizeH)(16)
      }
    })));
  };

  Setting.defaultProps = {};
  Setting.propTypes = {};
  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    navigationBar: {
      backgroundColor: new _DynamicColor.default("#D6FEFD", "#000")
    },
    container: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    titleContainer: {
      minHeight: 32,
      backgroundColor: _styles.default.darkMode.backgroundColor,
      justifyContent: 'center',
      paddingLeft: _styles.default.common.padding
    },
    title: {
      fontSize: (0, _screenAdapte.pText)(12),
      color: new _DynamicColor.default('#8C93B0', 'rgba(255,255,255,0.5)'),
      lineHeight: 14,
      textAlign: 'left'
    },
    itemContainer: {
      backgroundColor: "#fff",
      borderRadius: 8
    },
    delButton: {
      backgroundColor: '#fff',
      borderRadius: 30,
      paddingVertical: 10,
      alignItems: 'center'
    },
    delText: {
      color: 'red',
      fontSize: (0, _screenAdapte.pText)(18)
    },
    blank: {
      height: 16
    }
  });
  var _default = Setting;
  exports.default = _default;
},11222,[14308,14305,14674,10297,10033,10074,10916,10925,10094,11016,11225,11013,10082,10353,22411,10010,14875,10154,10163,10013,10913,10340]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "MUCard", {
    enumerable: true,
    get: function get() {
      return _muCard.default;
    }
  });
  Object.defineProperty(exports, "MUListCard", {
    enumerable: true,
    get: function get() {
      return _muListCard.default;
    }
  });

  var _muCard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _muListCard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
},11225,[14305,11228,11231]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _card = _$$_REQUIRE(_dependencyMap[4]);

  var MUCard = function MUCard(props) {
    return _react.default.createElement(_card.MHCard, props);
  };

  MUCard.defaultProps = {
    title: '',
    subtitle: '',
    rightText: '',
    titleStyle: {},
    subtitleStyle: {},
    rightTextStyle: {},
    onPress: function onPress() {},
    switchValue: false,
    onValueChange: function onValueChange(value) {}
  };
  MUCard.propTypes = {
    title: _propTypes.default.string,
    subtitle: _propTypes.default.string,
    rightText: _propTypes.default.string,
    titleStyle: _propTypes.default.object,
    subtitleStyle: _propTypes.default.object,
    rightTextStyle: _propTypes.default.object,
    onPress: _propTypes.default.func,
    switchValue: _propTypes.default.bool,
    onValueChange: _propTypes.default.func
  };

  var styles = _reactNative.StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      borderRadius: 8
    }
  });

  var _default = MUCard;
  exports.default = _default;
},11228,[14305,10297,10033,10318,22861]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);

  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _card = _$$_REQUIRE(_dependencyMap[7]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[8]);

  var _mhuiRn = _$$_REQUIRE(_dependencyMap[9]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[11]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var MUListCard = function MUListCard(props) {
    var type = props.type,
        titleStyle = props.titleStyle,
        subtitleStyle = props.subtitleStyle,
        valueStyle = props.valueStyle,
        switchValue = props.switchValue,
        onSwitchValueChange = props.onSwitchValueChange,
        checked = props.checked,
        onValueChange = props.onValueChange,
        resetProp = (0, _objectWithoutProperties2.default)(props, ["type", "titleStyle", "subtitleStyle", "valueStyle", "switchValue", "onSwitchValueChange", "checked", "onValueChange"]);

    var titleMergedStyle = _reactNative.StyleSheet.flatten([styles.titleStyle, titleStyle]);

    var valueMergedStyle = _reactNative.StyleSheet.flatten([styles.valueStyle, valueStyle]);

    var subtitleMergedStyle = _reactNative.StyleSheet.flatten([styles.subtitleStyle, subtitleStyle]);

    return _react.default.createElement(_card.ListCard, (0, _extends2.default)({}, resetProp, {
      type: type,
      cardStyle: styles.card,
      unlimitedHeightEnable: true,
      titleNumberOfLines: 12,
      subtitleNumberOfLines: 16,
      valueNumberOfLines: 16,
      titleStyle: titleMergedStyle,
      valueStyle: valueMergedStyle,
      subtitleStyle: subtitleMergedStyle,
      separator: _react.default.createElement(_mhuiRn.Separator, {
        style: styles.line
      }),
      allowFontScaling: false,
      switchOption: {
        tintColor: _styles.default.listStyles.switchTintColor,
        onTintColor: _styles.default.listStyles.switchOnTintColor,
        switchValue: switchValue,
        onSwitchValueChange: onSwitchValueChange
      },
      choiceOption: {
        checked: checked,
        checkedColor: _styles.default.listStyles.checkedColor,
        onValueChange: onValueChange
      }
    }));
  };

  MUListCard.defaultProps = {
    type: _card.ListCard.TYPE.ARROW,
    title: '',
    subtitle: '',
    value: '',
    switchValue: false,
    onSwitchValueChange: null,
    checked: false,
    onValueChange: null,
    cardStyle: {},
    titleStyle: {},
    subtitleStyle: {},
    valueStyle: {}
  };
  MUListCard.propTypes = {
    type: _propTypes.default.string,
    title: _propTypes.default.string,
    subtitle: _propTypes.default.string,
    value: _propTypes.default.string,
    switchValue: _propTypes.default.bool,
    onSwitchValueChange: _propTypes.default.func,
    checked: _propTypes.default.bool,
    onValueChange: _propTypes.default.func,
    cardStyle: _propTypes.default.object,
    titleStyle: _propTypes.default.object,
    subtitleStyle: _propTypes.default.object,
    valueStyle: _propTypes.default.object
  };
  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    titleStyle: _styles.default.listTitles,
    subtitleStyle: (0, _objectSpread2.default)({}, _styles.default.subtitleStyles, {
      marginTop: (0, _screenAdapte.sizeH)(6),
      maxWidth: (0, _screenAdapte.sizeW)(220)
    }),
    valueStyle: _styles.default.subtitleStyles,
    card: {
      width: (0, _screenAdapte.sizeW)(358),
      backgroundColor: _styles.default.listStyles.backgroundColor
    },
    line: {
      marginLeft: (0, _screenAdapte.sizeW)(16),
      marginRight: (0, _screenAdapte.sizeW)(16),
      height: _styles.default.listStyles.lineHeight,
      backgroundColor: _styles.default.listStyles.borderColors
    },
    switchOptions: {
      backgroundColor: _styles.default.listStyles.switchTintColor
    }
  });
  var _default = MUListCard;
  exports.default = _default;
},11231,[14305,14314,14344,14407,10297,10033,10318,22861,10913,22411,10916,11016,10082]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[5]);

  var _store = _$$_REQUIRE(_dependencyMap[6]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[9]);

  var _mobxReactLite = _$$_REQUIRE(_dependencyMap[10]);

  var _enum = _$$_REQUIRE(_dependencyMap[11]);

  var _resourceManager = _$$_REQUIRE(_dependencyMap[12]);

  var _list = _$$_REQUIRE(_dependencyMap[13]);

  var _utils = _$$_REQUIRE(_dependencyMap[14]);

  var _netinfo = _$$_REQUIRE(_dependencyMap[15]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));

  var _version = _$$_REQUIRE(_dependencyMap[17]);

  var _ToolCard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));

  var RobotSetting = function RobotSetting(props) {
    var _useStore = (0, _store.useStore)(),
        robotStore = _useStore.robotStore,
        configStore = _useStore.configStore,
        commonStore = _useStore.commonStore;

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        type = _useNetInfo.type,
        isConnected = _useNetInfo.isConnected;

    (0, _react.useEffect)(function () {
      var specs = [{
        param: _resourceManager.propertyCodes['carpet-clean-prefer'],
        fn: function fn(value) {
          return robotStore.setCarpetCleanPrefer(value);
        }
      }, {
        param: _resourceManager.propertyCodes['carpet-boost-switch'],
        fn: function fn(value) {
          return robotStore.setAutoBoost(value);
        }
      }, {
        param: _resourceManager.propertyCodes['carpet-cleantwice'],
        fn: function fn(value) {
          return robotStore.setcarpetcleantwice(value);
        }
      }, {
        param: _resourceManager.propertyCodes['carpet-cleanchoice'],
        fn: function fn(value) {
          return robotStore.setcarpetcleanfirst(value);
        }
      }, {
        param: _resourceManager.propertyCodes['mop-augment-switch'],
        fn: function fn(value) {
          return robotStore.setMopAugmentSwitch(value);
        }
      }, {
        param: _resourceManager.propertyCodes['break-clean-switch'],
        fn: function fn(value) {
          return robotStore.setBreakCleanSwitch(value);
        }
      }, {
        param: _resourceManager.propertyCodes['disturb-switch'],
        fn: function fn(value) {
          return robotStore.setDisturbSwitch(value);
        }
      }, {
        param: _resourceManager.propertyCodes['disturb-time'],
        fn: function fn(value) {
          return robotStore.setDisturbTimeSet(value);
        }
      }, {
        param: _resourceManager.propertyCodes['child-lock'],
        fn: function fn(value) {
          return robotStore.setChildLock(value);
        }
      }, {
        param: _resourceManager.propertyCodes.volume,
        fn: function fn(value) {
          return robotStore.setVolume(value);
        }
      }, {
        param: _resourceManager.propertyCodes['language-voice'],
        fn: function fn(value) {
          return robotStore.setLanguage(value);
        }
      }];

      if ((0, _version.isNewerVersion439_698)()) {
        specs.push({
          param: _resourceManager.propertyCodes["language-ver"],
          fn: function fn(value) {
            return robotS