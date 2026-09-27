ore.hideLoading(errorMessage);

              _logger.default.e("actions\u5F02\u5E38:", _context.t1);

              return _context.abrupt("return", false);

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[6, 22]]);
    };

    var _stopClean = function _stopClean() {
      var task = function task() {
        return _resourceManager.manager.getSpec([{
          param: _resourceManager.propertyCodes["robot-status"],
          fn: function fn(value) {
            return robotStore.setCurRobotStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes["return-status"],
          fn: function fn(value) {
            return robotStore.setReturnStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes["clean-type-status"],
          fn: function fn(value) {
            return robotStore.setStatus(value);
          }
        }]);
      };

      return exeCmd(_resourceManager.actions.stopClean, task);
    };

    var _changeCollectDust = function _changeCollectDust(change) {
      return exeCmd(function () {
        return _resourceManager.actions.setCollectDust(change);
      }, function () {
        return _resourceManager.propertys.getCurRobotStatus(function (value) {
          return robotStore.setCurRobotStatus(value);
        });
      });
    };

    var _changeWashMop = function _changeWashMop(change) {
      return exeCmd(function () {
        return _resourceManager.actions.setWashMop(change);
      }, function () {
        return _resourceManager.propertys.getCurRobotStatus(function (value) {
          return robotStore.setCurRobotStatus(value);
        });
      });
    };

    var _changeDryMop = function _changeDryMop(change) {
      return exeCmd(function () {
        return _resourceManager.actions.setDryMop(change);
      }, function () {
        return _resourceManager.propertys.getCurRobotStatus(function (value) {
          return robotStore.setCurRobotStatus(value);
        });
      });
    };

    function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    var onClickSetUp = function onClickSetUp() {
      setShowStationFunctionDialog(false);
      onGoStationSet && onGoStationSet();
    };

    var changeMode = function changeMode(type) {
      return _regenerator.default.async(function changeMode$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = robotStore.stationStatus;
              _context3.next = _context3.t0 === _enum.StationStatus.Emptying ? 3 : _context3.t0 === _enum.StationStatus.Drying ? 5 : _context3.t0 === _enum.StationStatus.Washing ? 19 : 21;
              break;

            case 3:
              if (type === _enum.StationStatus.Drying || type === _enum.StationStatus.Washing) {
                toastRef.current.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword315);
              } else {
                _changeCollectDust(false);
              }

              return _context3.abrupt("break", 23);

            case 5:
              if (!(type === _enum.StationStatus.Emptying)) {
                _context3.next = 11;
                break;
              }

              _context3.next = 8;
              return _regenerator.default.awrap(_changeDryMop(false));

            case 8:
              _changeCollectDust(true);

              _context3.next = 18;
              break;

            case 11:
              if (!(type === _enum.StationStatus.Washing)) {
                _context3.next = 17;
                break;
              }

              _context3.next = 14;
              return _regenerator.default.awrap(_changeDryMop(false));

            case 14:
              _changeWashMop(true);

              _context3.next = 18;
              break;

            case 17:
              _changeDryMop(false);

            case 18:
              return _context3.abrupt("break", 23);

            case 19:
              if (type === _enum.StationStatus.Emptying || type === _enum.StationStatus.Drying) {
                toastRef.current.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword316);
              } else {
                _changeWashMop(false);
              }

              return _context3.abrupt("break", 23);

            case 21:
              if (type === _enum.StationStatus.Emptying) {
                _changeCollectDust(true);
              } else if (type === _enum.StationStatus.Washing) {
                _changeWashMop(true);
              } else if (type === _enum.StationStatus.Drying) {
                _changeDryMop(true);
              }

              return _context3.abrupt("break", 23);

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      });
    };

    var StationModelItem = function StationModelItem(_ref2) {
      var onPress = _ref2.onPress,
          icon = _ref2.icon,
          name = _ref2.name;
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: onPress,
        style: {
          flexDirection: "row",
          alignItems: "center",
          width: "28%",
          borderRadius: 12,
          marginTop: 8,
          backgroundColor: "#fff",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#fff"
        }
      }, _react.default.createElement(_reactNativeLinearGradient.default, {
        colors: _miot.DarkMode.getColorScheme() === "dark" ? ["#101010", "#101010"] : ["#FFFFFF", "#F1F7F7"],
        style: {
          paddingHorizontal: (0, _screenAdapte.sizeW)(16),
          paddingTop: (0, _screenAdapte.sizeH)(12),
          paddingBottom: (0, _screenAdapte.sizeH)(20),
          width: "100%",
          height: "100%"
        }
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(28),
          height: (0, _screenAdapte.sizeH)(28)
        },
        source: icon
      }), _react.default.createElement(_reactNative.Text, {
        style: [styles.titleNames, {
          marginTop: (0, _screenAdapte.sizeH)(4),
          marginLeft: (0, _screenAdapte.sizeW)(4),
          width: "100%"
        }]
      }, name)));
    };

    var EquipmentItem = function EquipmentItem(_ref3) {
      var state = _ref3.state,
          title = _ref3.title,
          type = _ref3.type;
      var errorText = "";

      switch (state) {
        case _enum.BaseStationEquipState.Uninstalled:
          {
            if (type === 0) {
              e