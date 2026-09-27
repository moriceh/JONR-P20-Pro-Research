 var uiInterFace = {
    isEditPileRin: false,
    isShowPileRin: false,
    isShowSplitLine: false,
    isShowCurPosRing: false,
    isShowBaseRing: false,
    isInBaseStation: false,
    isShowTrace: false,
    isShowCarpet: false,
    isShowAreaTips: false,
    isShowAreaName: true,
    areaTipType: _areaTipView.AreaTipType.IconName,
    isEditZoning: false,
    isShowZoning: false,
    isEditCarpet: false,
    isSupportPanZoom: false,
    isSupportSelectArea: false,
    isShowCleaningSequence: false,
    isShowCustomCleanParamsIcon: false
  };
  var MapView = (0, _mobxReactLite.observer)(function (props) {
    var _ref7;

    var _props$mapInfo = props.mapInfo,
        mapData = _props$mapInfo.mapData,
        areas = _props$mapInfo.areas,
        uiConfig = props.uiConfig;

    var _useStore = (0, _index.useStore)(),
        robotStore = _useStore.robotStore;

    var _useState = (0, _react.useState)([]),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        cleaningModeParameters = _useState2[0],
        setCleaningModeParameters = _useState2[1];

    (0, _index2.useDeepCompareEffect)(function () {
      if ((uiConfig == null ? undefined : uiConfig.isShowCleanParamsIcon) && (0, _version.isNewerVersion439_681)() && !uiConfig.isShowZoning) {
        var _uiConfig$cleaningMod;

        if (!((_uiConfig$cleaningMod = uiConfig.cleaningModeParameters) == null ? undefined : _uiConfig$cleaningMod.length)) {
          var arr = [];

          if (uiConfig.isShowCustomCleanParamsIcon) {
            areas == null ? undefined : areas.forEach(function (_ref) {
              var _ref2, _ref3, _ref4, _ref5;

              var room_id = _ref.room_id,
                  prefer = _ref.prefer;
              arr.push([room_id, (prefer == null ? undefined : prefer.mode) === _enum.WorkMode.OnlyMop ? null : (_ref2 = prefer == null ? undefined : prefer.wind) != null ? _ref2 : robotStore.fanMode, (prefer == null ? undefined : prefer.mode) === _enum.WorkMode.OnlySweep ? null : (_ref3 = prefer == null ? undefined : prefer.water) != null ? _ref3 : robotStore.waterMode, (_ref4 = prefer == null ? undefined : prefer.drag) != null ? _ref4 : robotStore.routePrefer, (_ref5 = prefer == null ? undefined : prefer.count) != null ? _ref5 : robotStore.cleanCount]);
            });
          } else {
            areas == null ? undefined : areas.forEach(function (_ref6) {
              var room_id = _ref6.room_id;
              arr.push([room_id, robotStore.workMode === _enum.WorkMode.OnlyMop ? null : robotStore.fanMode, robotStore.workMode === _enum.WorkMode.OnlySweep ? null : robotStore.waterMode, robotStore.routePrefer, robotStore.cleanCount]);
            });
          }

          setCleaningModeParameters(arr);
        } else {
          setCleaningModeParameters(uiConfig.cleaningModeParameters);
        }
      } else {
        setCleaningModeParameters([]);
      }
    }, [mapData == null ? undefined : mapData.lz4Len, areas, uiConfig.isShowZoning, uiConfig.isShowCleanParamsIcon, uiConfig.cleaningModeParameters, uiConfig.isShowCleaningSequence, robotStore.workMode, robotStore.fanMode, robotStore.waterMode, robotStore.routePrefer, robotStore.cleanCount]);
    return ((_ref7 = mapData == null ? undefined : mapData.lz4Len) != null ? _ref7 : false) ? _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_indoorMap.default, (0, _extends2.default)({}, props, {
      uiInterFace: (0, _objectSpread2.default)({}, uiInterFace, uiConfig, {
        cleaningModeParameters: cleaningModeParameters
     