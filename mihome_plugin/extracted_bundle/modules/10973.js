param]);
  }

  function stopClean() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["stop-clean"]);
  }

  function charge(charge) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["pause-continue-work"], [charge]);
  }

  function seekRobotSwitch() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["seek-robot"]);
  }

  function spotClean() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["start-clean"], [_enum.CleanType.Spot, ""]);
  }

  function zoneClean(points) {
    var paramStr = JSON.stringify(points);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["start-clean"], [_enum.CleanType.Zone, paramStr]);
  }

  function areaClean(roomIds) {
    var paramStr = JSON.stringify(roomIds);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["start-clean"], [_enum.CleanType.Area, paramStr]);
  }

  function saveMap(params) {
    var paramStr = JSON.stringify(params);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["save-map"], [paramStr]);
  }

  function editedMap(params) {
    var paramStr = JSON.stringify(params);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["edite-map"], [paramStr]);
  }

  function restoreMap(params) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["switch-map"], [params]);
  }

  function exitControlSwitch(params) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["exit-control-switch"], [params]);
  }

  function delMap(mapId) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["del-map"], [mapId]);
  }

  function switchMap(mapId) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["switch-map"], [mapId]);
  }

  function setVirtualWalls(params) {
    var paramStr = JSON.stringify(params);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-virtual-walls"], [paramStr]);
  }

  function getMapData() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["get-map-data"]);
  }

  function getMapInfos() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["get-map-infos"]);
  }

  function reportLog() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["report-log"]);
  }

  function syncTimeZone(timeZone) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["sync-time-zone"], [timeZone]);
  }

  function manualControl(params) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["manual-control"], [params]);
  }

  function setScheduleClean(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-schedule-timer"], [paramStr]);
  }

  function roomInfoChange(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["edite-area-info"], [paramStr]);
  }

  function resetConsumable(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["reset-consumable"], [param]);
  }

  function switchVoiceLang(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["switch-voice-lang"], [paramStr]);
  }

  function giveUpMapExtented() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["give-up-map-extended"]);
  }

  function clearMapsExcept(mapId) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["clear-maps-except"], [mapId]);
  }

  function setAreasSplit(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-split-area"], [paramStr]);
  }

  function setAreasMerge(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-merge-areas"], [paramStr]);
  }

  function setFanMode(fanMode) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-fan-mode"], [fanMode]);
  }

  function setWaterMode(waterMode) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-water-mode"], [waterMode]);
  }

  function fineDragSwitch(RoutePrefer) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["fine-drag-switch"], [RoutePrefer]);
  }

  function setCleanCount(cleanCount) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-clean-count"], [cleanCount]);
  }

  function setRoutePrefer(routePrefer) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-clean-count"], [routePrefer]);
  }

  function awaterCheckSwitch(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["awater-check-switch"], [param]);
  }

  function setSaveMapSwitch(on) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-save-map-switch"], [on]);
  }

  function setDisturbSwitch(on) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-disturb-switch"], [on]);
  }

  function setDisturbTimeSet(param) {
    var paramStr = JSON.stringify(param);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-disturb-time"], [paramStr]);
  }

  function setVolume(volume) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-volume"], [volume]);
  }

  function setBreakCleanSwitch(on) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-break-switch"], [on]);
  }

  function setCarpetCleanPrefer(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-carpet-prefer"], [param]);
  }

  function setAutoBoost(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-carpet-boost"], [param]);
  }

  function setcarpetcleantwice(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["setcarpetcleantwice"], [param]);
  }

  function setcarpetcleanfirst(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["setcarpetcleanfirst"], [param]);
  }

  function setMopAugmentSwitch(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-mop-augment"], [param]);
  }

  function setChildLock(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-child-lock"], [param]);
  }

  function setErpSwitch(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-erp-switch"], [param]);
  }

  function setAutoCleaningSolution(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-auto-solution"], [param]);
  }

  function setWashMop(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-wash-mop"], [param]);
  }

  function setDryMop(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-dry-mop"], [param]);
  }

  function setCollectDust(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-collect-dust"], [param]);
  }

  function setDryingTime(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-drying-time"], [param]);
  }

  function setMopWashFrequency(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-mop-wash-freq"], [param]);
  }

  function setMopWashTemp(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-mop-wash-temp"], [param]);
  }

  function setDustCollectionAutoSet(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-dust-collection"], [param]);
  }

  function setWorkMode(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-clean-mode"], [param]);
  }

  function setMultifloorSwitch(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-mfloor-switch"], [param]);
  }

  function setAutoDryingSwitch(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["set-drying-switch"], [param]);
  }

  function setCustomizationRooms(param) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["customization-room