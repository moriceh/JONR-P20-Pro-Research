nteropRequireDefault(_$$_REQUIRE(_dependencyMap[18]));

  var _index2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));

  var _miot = _$$_REQUIRE(_dependencyMap[20]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));

  var _enum2 = _$$_REQUIRE(_dependencyMap[22]);

  var _version = _$$_REQUIRE(_dependencyMap[23]);

  var _resourceManager = _$$_REQUIRE(_dependencyMap[24]);

  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));

  var CleaningMode = function CleaningMode(_ref) {
    var onNavigateToPage = _ref.onNavigateToPage,
        selectedMode = _ref.selectedMode,
        onStopClean = _ref.onStopClean;

    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        cleaningModeState = _useState2[0],
        setCleaningModeState = _useState2[1];

    var _useStore = (0, _index.useStore)(),
        robotStore = _useStore.robotStore,
        mapStore = _useStore.mapStore;

    var cleaningMode = _Images.default.cleaningMode;
    var slideAnim = (0, _react.useRef)(new _reactNative.Animated.Value(600)).current;

    var toastRef = _react.default.useRef(null);

    var _useState3 = (0, _react.useState)(600),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        contentHeight = _useState4[0],
        setContentHeight = _useState4[1];

    var durationFactor = 2;
    var maxDuration = 300;
    var animationDuration = Math.min(contentHeight * durationFactor, maxDuration);
    var mapInfo = mapStore.curMapInfo;
    var topData = (0, _react.useMemo)(function () {
      return [{
        name: _multilingual.default == null ? undefined : _multilingual.default.keyword284,
        homeName: _multilingual.default == null ? undefined : _multilingual.default.keyword282,
        mode: _enum.WorkMode.BothWork,
        imageSource: cleaningMode.vacMop
      }, {
        name: _multilingual.default == null ? undefined : _multilingual.default.keyword285,
        homeName: _multilingual.default == null ? undefined : _multilingual.default.keyword283,
        mode: _enum.WorkMode.OnlySweep,
        imageSource: cleaningMode.vac
      }, {
        name: _multilingual.default == null ? undefined : _multilingual.default.keyword287,
        homeName: _multilingual.default == null ? undefined : _multilingual.default.keyword472,
        mode: _enum.WorkMode.OnlyMop,
        imageSource: cleaningMode.mop
      }, {
        name: _multilingual.default == null ? undefined : _multilingual.default.keyword288,
        homeName: _multilingual.default == null ? undefined : _multilingual.default.keyword288,
        mode: _enum.WorkMode.SweepFirst,
        imageSource: cleaningMode.vacThenMop
      }, {
        name: _multilingual.default == null ? undefined : _multilingual.default.keyword289,
        homeName: _multilingual.default == null ? undefined : _multilingual.default.keyword473,
        mode: _enum.WorkMode.Custom,
        imageSource: cleaningMode.custom
      }];
    }, [cleaningMode.mop, cleaningMode.vacMop, cleaningMode.vacThenMop, cleaningMode.custom]);

    var showModal = function showModal() {
      setCleaningModeState(true);
    };

    var hideModal = function hideModal() {
      setCleaningModeState(false);
    };

    var store = (0, _mobxReactLite.useLocalObservable)(function () {
      return {
        get hasNoZoningMap() {
          return mapStore.isNewMap || !mapStore.hasMapData;
        }

      };
    });
    var CustomTipsView = (0, _mobxReactLite.observer)(function () {
      var _robotStore$alarmNoti;

      if (robotStore.workMode === _enum.WorkMode.Custom) {
        var txt = selectedMode === _enum2.CleanModeType.Zoning ? _multilingual.default == null ? undefined : _multilingual.default.keyword579 : store.hasNoZoningMap ? _multilingual.default == null ? undefined : _multilingual.default.keyword578 : "";
        return txt ? _react.default.createElement(_reactNative.Text, {
          style: styles.customTips
        }, txt) : null;
      } else if (robotStore.workMode === _enum.WorkMode.OnlyMop && ((_robotStore$alarmNoti = robotStore.alarmNotify[0]) == null ? undefined : _robotStore$alarmNoti.code) === 4021) {
        return _react.default.createElement(_reactNative.Text, {
          style: styles.customTips
        }, _multilingual.default == null ? undefined : _multilingual.default.keyword447);
      }

      return null;
    });
    return _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 16
      },
      onPress: showModal
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var curTopItem = topData.find(function (td) {
        return td.mode === robotStore.workMode;
      }) || topData[0];
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(28),
          height: (0, _screenAdapte.sizeH)(28)
        },
        source: (curTopItem == null ? undefined : curTopItem.imageSource) || "",
        resizeMode: "contain"
      }), _react.default.createElement(_reactNative.Text, {
        style: styles.titleText
      }, "" + ((curTopItem == null ? undefined : curTopItem.homeName) || "")));
    })), _react.default.createElement(_reactNativeModal.default, {
      style: {
        margin: 0,
        padding: 0,
        backgroundColor: "transparent"
      },
      transparent: true,
      isVisible: cleaningModeState,
      useNativeDriver: true,
      hasBackdrop: false,
      onRequestClose: hideModal
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        flex: 1
      },
      onPress: hideModal
    }), _react.default.createElement(_reactNative.View, {
      style: styles.modal_root
    }, _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: _styles.default.dialogBoxColor,
      style: styles.content
    }, _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 16,
        paddingTop: 18
      }
    }, _react.default.createElement(_reactNative.ScrollView, {
      showsHorizontalScrollIndicator: false,
      horizontal: true
    }, _react.default.createElement(_TopNavigation.default, {
      onShowToast: function onShowToast(res) {
        return toastRef.current.showToast(res);
      }
    })), _react.default.createElement(CustomTipsView, null)), _react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: 16
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.operation_content
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return robotStore.workMode !== _enum.WorkMode.Custom ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_SliderComponent.default, {
        unAble: robotStore.workMode === _enum.WorkMode.OnlyMop,
        tabData: _tabDatas.suctionData,
        type: _SliderComponent.SliderComponentType.FAN,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword291,
        curValue: robotStore.fanMode,
        onShowToast: function onShowToast(res) {
          return toastRef.current.showToast(res);
        }
      }), _react.default.createElement(_SliderComponent.default, {
        unAble: robotStore.workMode === _enum.WorkMode.OnlySweep,
        tabData: _tabDatas.waterVolumeData,
        type: _SliderComponent.SliderComponentType.WATER,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword296,
        curValue: robotStore.waterMode,
        onShowToast: function onShowToast(res) {
          return toastRef.current.showToast(res);
        }
      }), _react.default.createElement(_SliderComponent.default, {
        tabData: _tabDatas.cleaningFrequencyData,
        type: _SliderComponent.SliderComponentType.CLEAN_COUNT,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword300,
        curValue: robotStore.cleanCount,
        onShowToast: function onShowToast(res) {
          return toastRef.current.showToast(res);
        }
      }), !(0, _version.isNewerVersion439_681)() ? null : _react.default.createElement(_SliderComponent.default, {
        tabData: _tabDatas.routePreferences,
        type: _SliderComponent.SliderComponentType.ROUTE_PREFER,
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword468,
        curValue: robotStore.routePrefer,
        onShowToast: function onShowToast(res) {
          return toastRef.current.showToast(res);
        }
      })) : !(0, _version.isNewerVersion439_681)() ? null : _react.default.createElement(_CustomItem.default, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword478,
        content: _multilingual.default == null ? undefined : _multilingual.default.keyword576,
        onPress: function onPress() {
          if (store.hasNoZoningMap) {
            toastRef.current.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword577);
            return;
          }

          onNavigateToPage("CustomizedParameters", {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword478,
            mapId: mapInfo.mapId
          });
          setCleaningModeState(false);
        }
      });
    }), !(0, _version.isNewerVersion439_681)() ? null : _react.default.createElement(_CustomItem.default, {
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword470,
      content: _multilingual.default == null ? undefined : _multilingual.default.keyword482,
      onPress: function onPress() {
        if (!mapStore.hasMapData) {
          toastRef.current.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword577);
          return;
        }

        if (mapStore.isNewMap) {
          toastRef.current.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword577);
          return;
        }

        onStopClean(_multilingual.default == null ? undefined : _multilingual.default.keyword47, function () {
          onNavigateToPage("CustomizedOrder", {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword470,
            mapId: mapInfo.mapId
          });
          setCleaningModeState(false);
        });
      }
    }))))), _react.default.createElement(_index2.default, {
      ref: toastRef
    })));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    titleText: (0, _objectSpread2.default)({}, _styles.default.listTitles, {
      fontSize: (0, _screenAdapte.pText)(12),
      color: _styles.default.subtitleStyles.color,
      alignSelf: "center",
      textAlign: "center"
    }),
    modal_root: {
      borderTopStartRadius: 12,
      borderTopEndRadius: 12,
      borderWidth: 1,
      backgroundColor: '#fff',
      borderColor: "#fff