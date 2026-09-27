));
          }
        },

        get choiceDialogTitle() {
          return this.choiceDialogType === ChoiceActionType.workMode ? _multilingual.default == null ? undefined : _multilingual.default.keyword560 : _multilingual.default == null ? undefined : _multilingual.default.keyword562;
        },

        get workModeStr() {
          return (0, _utils.getWorkModeStr)(this.workMode);
        },

        get modeImages() {
          return (0, _utils.getModeImages)({
            cleanCount: this.cleanCount,
            fanMode: this.workMode === _enum.WorkMode.OnlyMop ? null : this.fanMode,
            waterMode: this.workMode === _enum.WorkMode.OnlySweep ? null : this.waterMode,
            routePrefer: this.routePrefer
          });
        }

      };
    });
    var exeCmd = (0, _react.useCallback)(function _callee(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loadingMessage = _args.length > 2 && _args[2] !== undefined ? _args[2] : _multilingual.default.keyword474;
              errorMessage = _args.length > 3 && _args[3] !== undefined ? _args[3] : _multilingual.default.keyword326;

              if (isConnected) {
                _context.next = 5;
                break;
              }

              commonStore.showToast(_multilingual.default.keyword321);
              return _context.abrupt("return", false);

            case 5:
              commonStore.showLoading(loadingMessage);
              _context.prev = 6;
              _context.next = 9;
              return _regenerator.default.awrap(task());

            case 9:
              res = _context.sent;

              if (!res) {
                _context.next = 19;
                break;
              }

              _context.t0 = extraTask;

              if (!_context.t0) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return _regenerator.default.awrap(extraTask());

            case 15:
              commonStore.hideLoading();
              return _context.abrupt("return", true);

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
    }, [isConnected]);
    (0, _react.useEffect)(function () {
      var saveEdited = function saveEdited() {
        if (store.cleanType === CleanType.Area) {
          if (!store.mapInfo) {
            commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword77);
            return;
          }

          if (!store.selectedAreas.length) {
            commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword78);
            return;
          }
        }

        function handleScheduleClean() {
          var _store$mapId;

          var timer = {
            action: action,
            id: id,
            on: 1,
            type: store.cleanType,
            repeat: store.repeatValue,
            hour: Number(store.appoinHour),
            min: Number(store.appoinMin),
            workMode: store.workMode,
            fanMode: store.fanMode,
            waterMode: store.waterMode,
            routePrefer: store.routePrefer,
            cleanCount: store.cleanCount,
            mapId: (_store$mapId = store.mapId) != null ? _store$mapId : "",
            cleanValues: store.selectedAreas
          };
          exeCmd(function () {
            return _resourceManager.actions.setScheduleClean(timer);
          }, function () {
            return _resourceManager.propertys.getDeviceTimer(function (value) {
              var DeviceTimer = JSON.parse(value).sort(function (a, b) {
                if (a.hour !== b.hour) {
                  return a.hour - b.hour;
                }

                return a.min - b.min;
              });
              robotStore.setDeviceTimer(DeviceTimer);
            });
          }).then(function (res) {
            res && props.navigation.goBack();
          });
        }

        if (robotStore.disturbSwitch && _checkTimeWithinRange(robotStore.disturbTimeSet, Number(store.appoinHour), Number(store.appoinMin))) {
          commonStore.showMessageDialog({
            message: _multilingual.default == null ? undefined : _multilingual.default.keyword80,
            confirm: _multilingual.default == null ? undefined : _multilingual.default.keyword81,
            cancel: _multilingual.default == null ? undefined : _multilingual.default.keyword82,
            onCancel: function onCancel() {},
            onConfirm: function onConfirm() {
              handleScheduleClean();
            }
          });
        } else {
          handleScheduleClean();
        }
      };

      props.navigation.setParams({
        titleProps: {
          leftPress: hasEdited ? function () {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword76,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                props.navigation.goBack();
              }
            });
          } : null,
          right: [{
            key: _NavigationBar.default.ICON.COMPLETE,
            onPress: saveEdited
          }]
        }
      });
    }, [action, exeCmd, id, robotStore, robotStore.disturbSwitch, robotStore.disturbTimeSet, store, hasEdited]);

    var onClickArea = function onClickArea(curArea) {
      if (curArea === -1) return;
      setHasEdited(true);
      store.setSelectedAreas(curArea);
    };

    var onDatePickConfirm = function onDatePickConfirm(date) {
      var _ref4, _date$rawArray, _ref5, _date$rawArray2;

      setHasEdited(true);
      store.hideDatePickerDialog();
      store.setDateValue((_ref4 = date == null ? undefined : (_date$rawArray = date.rawArray) == null ? undefined : _date$rawArray[0]) != null ? _ref4 : "00", (_ref5 = date == null ? undefined : (_date$rawArray2 = date.rawArray) == null ? undefined : _date$rawArray2[1]) != null ? _ref5 : "00");
    };

    var onRepeatDialogConfirm = function onRepeatDialogConfirm(res) {
      setHasEdited(true);
      store.hideRepeatDialog();
      store.setSelectedRepeat(res);
    };

    var onChoiceConfirm = function onChoiceConfirm(res) {
      setHasEdited(true);
      store.hideChoiceDialog();
      store.setChoiceValue(res);
    };

    var onCleanModeChange = function onCleanModeChange(type, value) {
      setHasEdited(true);

      switch (type) {
        case _index.ComponentType.WORK:
          store.setWorkMode(value);
          break;

        case _index.ComponentType.FAN:
          store.setFanMode(value);
          break;

        case _index.ComponentType.WATER:
          store.setWaterMode(value);
          break;

        case _index.ComponentType.CLEAN_COUNT:
          store.setCleanCount(value);
          break;

        case _index.ComponentType.ROUTE:
          store.setRoutePrefer(value);
          break;
      }
    };

    function _checkTimeWithinRange(disturbTime, targetHour, targetMin) {
      var startHour = disturbTime.startHour,
          startMin = disturbTime.startMin,
          endHour = disturbTime.endHour,
          endMin = disturbTime.endMin;
      var startMinute = startHour * 60 + startMin;
      var endMinute = endHour * 60 + endMin;
      var targetMinute = targetHour * 60 + targetMin;
      return startMinute <= endMinute ? targetMinute >= startMinute && targetMinute <= endMinute : targetMinute >= startMinute || targetMinute <= endMinute;
    }

    function CleanPreferenceTip(_ref6) {
      var title = _ref6.title,
          images = _ref6.images;
      return _react.default.createElement(_reactNative.View, {
        style: styles.cleanPreferenceTip
      }, _react.default.createElement(_reactNative.Text, {
        style: {
          fontSize: (0, _screenAdapte.pText)(12),
          color: "#6F7C7B"
        }
      }, title), _react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#F1F7F7",
          borderRadius: 20,
          padding: 6,
          marginTop: 2
        }
      }, images.map(function (item, index) {
        return _react.default.createElement(_reactNative.Image, {
          key: index,
          style: {
            width: 14,
            height: 14,
            marginRight: 2
          },
          source: item
        });
      })));
    }

    return _react.default.createElement(_reactNative.View, {
      style: styles.add
    }, _react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword73,
          value: store.appoinHour + ":" + store.appoinMin,
          onPress: function onPress() {
            return store.showDatePickerDialog();
          }
        }, {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword74,
          value: store.repeatValueWeek,
          onPress: function onPress() {
            return store.showRepeatDialog();
          }
        }]
      });
    }), (0, _version.isNewerVersion439_681)() && _react.default.createElement(_reactNative.View, {
      style: styles.cardStyle
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword560,
          value: store.getCleanTypeStr,
          radiusType: "top",
          onPress: function onPress() {
            setHasEdited(true);
            store.showChoiceDialog(ChoiceActionType.workMode);
          }
        }]
      });
    }), _react.default.createElement(_reactNative.View, {
      style: {
        height: 1,
        paddingHorizontal: 16
      }
    }, _react.default.createElement(_mhuiRn.Separator, {
      style: styles.line
    })), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_listItem.default, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword460,
        titleStyle: styles.titleStyles,
        customValueView: _react.default.createElement(CleanPreferenceTip, {
          title: store.workModeStr,
          images: store.workModeStr === (_multilingual.default == null ? undefined : _multilingual.default.keyword289) ? [_Images.default.cleaningMode.customized] : store.modeImages
        }),
        onPress: function onPress() {
          store.showCleanModeDialog();
        },
        bottomRadius: store.cleanType === CleanType.Auto
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var _ref7, _store$mapInfo;

      return store.cleanType === CleanType.Area && (store.mapInfo ? _react.default.createElement(_reactNative.View, {
        style: styles.mapCardContainer
      }, _react.default.createElement(_reactNative.View, {
        style: {
          height: 1,
          paddingHorizontal: 16
        }
      }, _react.default.createElement(_mhuiRn.Separator, {
        style: styles.line
      })), _react.default.createElement(_list.ListCards, {
        listData: [{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword562,
          value: (_ref7 = (_store$mapInfo = store.mapInfo) == null ? undefined : _store$mapInfo.name) != null ? _ref7 : "",
          onPress: function onPress() {
            return store.showChoiceDialog(ChoiceActionType.mapSwitch);
          }
        }]
      }), mapStore.mapInfos.length !== 0 && _react.default.createElement(_reactNative.View, {
        style: {
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: (0, _screenAdapte.sizeH)(8)
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: [styles.selectivePrompting, {
          color: "xm#2CD5AE"
        }]
      }, _multilingual.default == null ? undefined : _multilingual.default.keyword78)), mapStore.mapInfos.length === 0 ? _react.default.createElement(_reactNative.View, {
        style: {
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: (0, _screenAdapte.sizeH)(30)
        }
      }, _react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        style: {
          width: 340,
          height: 200
        },
        source: _Images.default.mapCard.mapCard
      }), _react.default.createElement(_reactNative.Text, {
        style: styles.mapText
      }, _multilingual.default == null ? undefined : _multilingual.default.keyword77)) : _react.default.createElement(_map.default, {
        containerWidth: _screenAdapte.SCREEN_WIDTH - 32,
        containerHeight: _screenAdapte.SCREEN_WIDTH - 32,
        mapInfo: store.mapInfo,
        selectedAreas: store.selectedAreas,
        onClickArea: onClickArea,
        uiConfig: {
          isSupportSelectArea: store.cleanType === CleanType.Area,
          isShowPileRin: true,
          isShowCurPosRing: true,
          isShowBaseRing: true,
          isShowAreaTips: true
        }
      })) : _react.default.createElement(_reactNative.View, {
        style: {
          marginTop: 16
        }
      }, _react.default.createElement(_emptyMapCard.default, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword77,
        imageUrl: _Images.default.mapCard.mapCard
      })));
    }))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_RepetitiveFrequency.default, {
        visible: store.isShowRepeatDialog,
        current: store.selectedRepeat,
        numberAppointments: store.selectedRepeat,
        closeModal: function closeModal() {
          return store.hideRepeatDialog();
        },
        onDismiss: function onDismiss() {
          store.hideRepeatDialog();
        },
        onSelect: onRepeatDialogConfirm
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_MHDatePicker.default, {
        datePickerStyle: {
          allowFontScaling: false
        },
        visible: store.isShowDatePickerDialog,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword73,
        type: _MHDatePicker.default.TYPE.TIME24,
        current: [store.appoinHour, store.appoinMin],
        onDismiss: function onDismiss() {
          store.hideDatePickerDialog();
        },
        onSelect: onDatePickConfirm
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_choiceActionSheet.default, {
        visible: store.isShowChoiceDialog,
        listData: store.choiceDialogListData,
        title: store.choiceDialogTitle,
        onCancel: function onCancel() {
          return store.hideChoiceDialog();
        },
        onChoice: onChoiceConfirm
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_index.default, {
        selectedAreas: store.selectedAreas,
        mapInfo: store.mapInfo,
        visible: store.isShowCleanModeDialog,
        waterMode: store.waterMode,
        fanMode: store.fanMode,
        workMode: store.workMode,
        routePrefer: store.routePrefer,
        cleanCount: store.cleanCount,
        workModeData: workModeData,
        preferenceMode: store.getCleanTypeStr,
        onCancle: function onCancle() {
          return store.hideCleanModeDialog();
        },
        onValueChange: onCleanModeChange
      });
    }));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    line: {
      height: 1,
      backgroundColor: _styles.default.lineStyles.backgroundColor
    },
    selectivePrompting: (0, _objectSpread2.default)({}, _styles.default.subtitleStyles, {
      fontSize: (0, _screenAdapte.pText)(14)
    }),
    mapText: _styles.default.subtitleStyles,
    cardStyle: {
      backgroundColor: _styles.default.listStyles.backgroundColor,
      borderRadius: 14,
      overflow: "hidden",
      marginTop: (0, _screenAdapte.sizeH)(8)
    },
    titleStyles: _styles.default.listTitles,
    valueStyles: _styles.default.subtitleStyles,
    selectTag: {
      width: (0, _screenAdapte.sizeW)(92),
      height: (0, _screenAdapte.sizeH)(40),
      backgroundColor: "rgba(244, 250, 251, 1)",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "xmrgba(30, 174, 189, 1)"
    },
    mapCardContainer: {
      backgroundColor: _styles.default.pageStyle.cardBackgroundColor,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    },
    mapCardTitleItem: {
      flexDirection: "row",
      marginTop: 16,
      paddingHorizontal: 16
    },
    mapCardTitle: {
      fontSize: (0, _screenAdapte.pText)(18),
      fontWeight: "500",
      color: _styles.default.pageStyle.textColor,
      flex: 1
    },
    cardTitle: {
      fontSize: (0, _screenAdapte.pText)(16),
      color: _styles.default.pageStyle.textColor,
      fontWeight: "500"
    },
    uncheckedTag: {
      width: (0, _screenAdapte.sizeW)(92),
      height: (0, _screenAdapte.sizeH)(40),
      backgroundColor: new _DynamicColor.default("#F6F6F7", "#D1D4D6"),
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center"
    },
    selectText: {
      fontWeight: "400",
      fontSize: (0, _screenAdapte.pText)(14),
      color: "rgba(30, 174, 189, 1)"
    },
    uncheckedText: {
      fontWeight: "400",
      fontSize: (0, _screenAdapte.pText)(14),
      color: new _DynamicColor.default("#121C18", "#9FA5A7")
    },
    add: {
      backgroundColor: _styles.default.pageStyle.backgroundColor,
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    timeCard: {
      backgroundColor: _styles.default.pageStyle.cardBackgroundColor,
      padding: 16,
      borderRadius: 8
    },
    timeCard_title: {
      fontFamily: "PingFang SC",
      fontWeight: "400",
      fontSize: (0, _screenAdapte.pText)(18),
      color: _styles.default.pageStyle.textColor
    },
    tag: {
      width: (0, _screenAdapte.sizeW)(92),
      height: (0, _screenAdapte.sizeH)(40),
      marginRight: 16,
      borderWidth: 1,
      borderColor: "#32CFCE"
    },
    Ntag: {
      backgroundColor: "#F6F6F7",
      width: (0, _screenAdapte.sizeW)(92),
      height: (0, _screenAdapte.sizeH)(40)
    },
    tagText: {
      color: "#121C18",
      fontWeight: "400",
      fontSize: (0, _screenAdapte.pText)(14)
    },
    timeCard_list: {
      borderTopWidth: 1,
      borderTopColor: _styles.default.pageStyle.lineBackgroundColor,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: _styles.default.pageStyle.cardBackgroundColor,
      paddingTop: 16
    },
    regionCard_tag: {
      flexDirection: "row",
      marginTop: 24,
      marginBottom: 24
    },
    cleanPreferenceTip: {
      flex: 1,
      alignItems: "flex-end"
    },
    blank: {
      height: 16
    }
  });
  var _default = AddAppointment;
  exports.default = _default;
},11276,[14308,14305,14314,14674,14359,14347,10297,10033,11279,10719,10913,10916,11016,10094,11013,10010,10925,11237,11270,10088,10082,10013,10019,10214,10716,10952,11282,11285,10352,11288,22411,14875,10136,10340,11297]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[6]);

  var _Mchoice = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[9]);

  var _Images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _utils = _$$_REQUIRE(_dependencyMap[11]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));

  var norListData = [_multilingual.default == null ? undefined : _multilingual.default.keyword61, _multilingual.default == null ? undefined : _multilingual.default.keyword62, _multilingual.default == null ? undefined : _multilingual.default.keyword63, _multilingual.default == null ? undefined : _multilingual.default.keyword64, _multilingual.default == null ? undefined : _multilingual.default.keyword423];
  var weekListData = [_multilingual.default == null ? undefined : _multilingual.default.keyword65, _multilingual.default == null ? undefined : _multilingual.default.keyword66, _multilingual.default == null ? undefined : _multilingual.default.keyword67, _multilingual.default == null ? undefined : _multilingual.default.keyword68, _multilingual.default == null ? undefined : _multilingual.default.keyword69, _multilingual.default == null ? undefined : _multilingual.default.keyword70, _multilingual.default == null ? undefined : _multilingual.default.keyword71];

  var RepetitiveFrequency = function RepetitiveFrequency(_ref) {
    var visible = _ref.visible,
        current = _ref.current,
        onSelect = _ref.onSelect,
        onDismiss = _ref.onDismiss,
        numberAppointments = _ref.numberAppointments;

    var _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        selectedNames = _useState2[0],
        setSelectedNames = _useState2[1];

    var _useState3 = (0, _react.useState)(),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        weekListDatas = _useState4[0],
        setWeekListDatas = _useState4[1];

    (0, _react.useEffect)(function () {
      var selectDays = (0, _utils.getRepeatTitles)(current);
      var names = [];

      _logger.default.d('++++++++++selectDays', selectDays);

      norListData.forEach(function (item) {
        if (selectDays.includes(item)) {
          names.push(item);
        }
      });
      setSelectedNames(names);

      if (names.length === 0) {
        weekListData.forEach(function (item) {
          if (selectDays.includes(item)) {
            names.push(item);
          }
        });
        setWeekListDatas(names);
        setSelectedNames(names);
      }
    }, [visible]);
    var curListData = (0, _react.useMemo)(function () {
      return selectedNames && selectedNames.includes(_multilingual.default == null ? undefined : _multilingual.default.keyword423) ? weekListData : norListData;
    }, [selectedNames]);

    var onOk = function onOk() {
      if (selectedNames.length === 1 && selectedNames[0] === (_multilingual.default == null ? undefined : _multilingual.default.keyword423)) {
        var repeat = (0, _utils.getRepeatStr)([_multilingual.default.keyword61]);
        onSelect && onSelect(repeat);
      } else {
        var _repeat = (0, _utils.getRepeatStr)(selectedNames);

        reset();
        onSelect && onSelect(_repeat);
      }

      close();
    };

    var onSelectClick = function onSelectClick(item) {
      if (norListData.includes(item)) {
        if (weekListDatas && weekListDatas.length !== 0) {
          setSelectedNames([item].concat((0, _toConsumableArray2.default)(weekListDatas)));
        } else setSelectedNames([item]);
      } else {
        setSelectedNames(function (names) {
          if (names.includes(item)) {
            return names.length > 2 ? names.filter(function (name) {
              return name !== item;
            }) : names;
          } else {
            return [].concat((0, _toConsumableArray2.default)(names), [item]);
          }
        });
      }
    };

    var close = function close() {
      setSelectedNames([_multilingual.default == null ? undefined : _multilingual.default.keyword61]);
      onDismiss && onDismiss();
      setWeekListDatas([]);
    };

    var reset = function reset() {
      setSelectedNames([_multilingual.default == null ? undefined : _multilingual.default.keyword61]);
    };

    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item,
          index = _ref2.index;
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return onSelectClick(item);
        },
        underlayColor: "#838383",
        activeOpacity: 0.5
      }, _react.default.createElement(_reactNative.View, {
        style: {
          backgroundColor: "#EAF2F4",
          paddingHorizontal: (0, _screenAdapte.sizeW)(16)
        }
      }, item === (_multilingual.default == null ? undefined : _multilingual.default.keyword423) ? _react.default.createElement(_reactNative.View, {
        style: styles.frequencyRowContainer
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.frequencyLtitle
      }, item), _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(7),
          height: (0, _screenAdapte.sizeH)(14)
        },
        source: _Images.default.common.right_arrow
      })) : _react.default.createElement(_reactNative.View, {
        style: styles.frequencyRowContainer
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.frequencyLtitle
      }, item), selectedNames && _react.default.createElement(_Mchoice.default, {
        checked: selectedNames.includes(item),
        disabled: true
      }))));
    };

    return _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNativeModal.default, {
      isVisible: visible,
      transparent: true,
      onBackdropPress: close,
      backdropOpacity: 0.4,
      backgroundTransitionOutTiming: 0,
      useNativeDriver: true
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        flex: 1
      },
      onPress: close
    }), _react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _screenAdapte.sizeH)(365),
        marginBottom: (0, _screenAdapte.sizeH)(32)
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.frequencyRoot
    }, _react.default.createElement(_reactNative.View, {
      style: styles.frequencyControl
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
      },
      onPress: close
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.texts
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword327)), _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
      },
      onPress: onOk
    }, _react.default.createElement(_reactNative.Text, {
      style: [styles.texts, {
        color: "#32CFCE"
      }]
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword328))), _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, _react.default.createElement(_reactNative.FlatList, {
      style: {
        alignSelf: "stretch"
      },
      data: cu