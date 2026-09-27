isShow: uiInterFace.isShowBaseRing,
      scaleRatio: scaleRatio * panScale,
      stationStatus: stationStatus,
      size: baseStationSize,
      x: chargePos.x,
      y: chargePos.y
    }), _react.default.createElement(_memoComponents.RobotIcon, {
      isShow: uiInterFace.isShowCurPosRing,
      scaleRatio: scaleRatio * panScale,
      size: robotSize,
      x: robotPos == null ? undefined : robotPos.x,
      y: robotPos == null ? undefined : robotPos.y,
      a: robotPos == null ? undefined : robotPos.a
    }), _react.default.createElement(_memoComponents.RoomNameTips, {
      isShow: uiInterFace.isShowAreaTips,
      isShowCleaningSequence: uiInterFace.isShowCleaningSequence,
      isShowAreaName: uiInterFace.isShowAreaName,
      areas: areas,
      selectedAreas: selectedAreas,
      areaTipType: uiInterFace.areaTipType,
      cleaningModeParameters: uiInterFace.cleaningModeParameters,
      scaleRatio: scaleRatio * panScale
    }), _react.default.createElement(_memoComponents.SplitLineView, {
      isShow: uiInterFace.isShowSplitLine,
      onSplitLineHandle: onSplitLineHandle,
      selectedArea: selectedArea,
      scaleRatio: scaleRatio * panScale,
      mapPoints: mapPoints,
      mapXMin: mapXMin,
      mapYMax: mapYMax,
      mapWidth: mapWidth,
      mapHeight: mapHeight
    })))));
  };

  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      widt