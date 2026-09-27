dependencyMap[26]);

  var _screenAdapte2 = _$$_REQUIRE(_dependencyMap[27]);

  var MainPage = function MainPage(props) {
    var _useStore = (0, _store.useStore)(),
        configStore = _useStore.configStore;

    var _useStore2 = (0, _store.useStore)(),
        robotStore = _useStore2.robotStore,
        mapStore = _useStore2.mapStore,
        deviceStore = _useStore2.deviceStore,
        commonStore = _useStore2.commonStore;

    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        firstBoot = _useState2[0],
        setFirstBoot = _useState2[1];

    (0, _react.useEffect)(function () {
      var _Package$entryInfo;

      var initial = _reactNativeOrientation.default.getInitialOrientation();

      _logger.default.d("屏幕 方向：", initial);

      _reactNativeOrientation.default.lockToPortrait();

      configStore.initConfig();
      IOTSubscribes();
      fetchHomeSpec();
      var firstOpenDisposer = (0, _mobx.autorun)(function () {
        if (configStore.isFirstOpen) {
          if (_miot.Device.isOwner) {
            setFirstBoot(true);
          }

          _resourceManager.actions.syncTimeZone(configStore.phoneTimeZone);
        }
      });

      if (((_Package$entryInfo = _miot.Package.entryInfo) == null ? undefined : _Package$entryInfo.type) === "ScenePush") {
        var _Package$entryInfo2, _Package$entryInfo3, _Package$entryInfo4;

        if (((_Package$entryInfo2 = _miot.Package.entryInfo) == null ? undefined : _Package$entryInfo2.event) === "17.3" && Array.isArray((_Package$entryInfo3 = _miot.Package.entryInfo) == null ? undefined : _Package$entryInfo3.value) && ((_Package$entryInfo4 = _miot.Package.entryInfo) == null ? undefined : _Package$entryInfo4.value.length) > 0) {
          var _Package$entryInfo$va;

          var code = parseInt((_Package$entryInfo$va = _miot.Package.entryInfo.value[_miot.Package.entryInfo.value.length - 1]) == null ? undefined : _Package$entryInfo$va.value);

          if (code > 2000 && code < 3000) {
            props.navigation.navigate("Consumables", {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword176
            });
          } else if (code > 4000 && code < 5000) {
            _logger.default.d("故障详情", _consts.errorCodes.get(code));

            if (_consts.errorCodes.get(code)) {
              props.navigation.navigate("FaultDetails", {
                title: _multilingual.default == null ? undefined : _multilingual.default.keyword462,
                data: _consts.errorCodes.get(code)
              });
            }
          }
        }
      }

      return function () {
        firstOpenDisposer();

        _reactNativeOrientation.default.unlockAllOrientations();

        _resourceManager.manager.unWatchAll();

        _logger.default.d("MainPage unmount");
      };
    }, []);
    (0, _react.useEffect)(function () {
      var disposer = (0, _mobx.autorun)(function () {
        props.navigation.setParams({
          title: "" + _miot.Device.name,
          titleProps: {
            backgroundColor: _miot.DarkMode.getColorScheme() === "light" ? "transparent" : "#000000",
            left: [{
              key: _NavigationBar.default.ICON.BACK,
              onPress: function onPress() {
                return _miot.Package.exit();
              }
            }],
            right: [{
              key: _NavigationBar.default.ICON.MORE,
              onPress: function onPress() {
                return props.navigation.navigate("Setting", {
                  title: _multilingual.default == null ? undefined : _multilingual.default.keyword33
                });
              }
            }]
          }
        });
      });
      return function () {
        return disposer();
      };
    }, [robotStore.statusStr]);

    var fetchHomeSpec = function fetchHomeSpec() {
      var specsPart1, specsPart2;
      return _regenerator.default.async(function fetchHomeSpec$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              specsPart1 = [{
                param: _consts.propertyCodes["clean-area"],
                fn: function fn(value) {
                  return robotStore.setCleanArea(value);
                }
              }, {
                param: _consts.propertyCodes["clean-time"],
                fn: function fn(value) {
                  return robotStore.setCleanTime(value);
                }
              }, {
                param: _consts.propertyCodes["battery"],
                fn: function fn(value) {
                  return robotStore.setBattery(value);
                }
              }, {
                param: _consts.propertyCodes["clean-mode"],
                fn: function fn(value) {
                  return robotStore.setWorkMode(value);
                }
              }, {
                param: _consts.propertyCodes["robot-status"],
                fn: function fn(value) {
                  return robotStore.setCurRobotStatus(value);
                }
              }, {
                param: _consts.propertyCodes["return-status"],
                fn: function fn(value) {
                  return robotStore.setReturnStatus(value);
                }
              }, {
                param: _consts.propertyCodes["clean-type-status"],
                fn: function fn(value) {
                  return robotStore.setStatus(value);
                }
              }, {
                param: _consts.propertyCodes["clean-values"],
                fn: function fn(value) {
                  return robotStore.setCleanValues(value);
                }
              }, {
                param: _consts.propertyCodes["time-zone"],
                fn: function fn(value) {
                  return deviceStore.setTimeZone(value);
                }
              }, {
                param: _consts.propertyCodes.error,
                fn: function fn(value) {
                  return robotStore.setError(value);
                }
              }, {
                param: _consts.propertyCodes.message,
                fn: function fn(value) {
                  return robotStore.setMessage(value);
                }
              }, {
                param: _consts.propertyCodes["save-map-switch"],
                fn: function fn(value) {
                  return robotStore.setSaveMapSwitch(value);
                }
              }, {
                param: _consts.propertyCodes["multifloor-switch"],
                fn: function fn(value) {
                  return robotStore.setMultifloorSwitch(value);
                }
              }, {
                param: _consts.propertyCodes["fan-mode"],
                fn: 