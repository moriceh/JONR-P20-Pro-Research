de = FanMode;

  (function (FanMode) {
    FanMode[FanMode["Quiet"] = 0] = "Quiet";
    FanMode[FanMode["Auto"] = 1] = "Auto";
    FanMode[FanMode["Strong"] = 2] = "Strong";
    FanMode[FanMode["Max"] = 3] = "Max";
  })(FanMode || (exports.FanMode = FanMode = {}));

  var RoutePrefer;
  exports.RoutePrefer = RoutePrefer;

  (function (RoutePrefer) {
    RoutePrefer[RoutePrefer["Fast"] = 0] = "Fast";
    RoutePrefer[RoutePrefer["Daily"] = 1] = "Daily";
    RoutePrefer[RoutePrefer["Fine"] = 2] = "Fine";
  })(RoutePrefer || (exports.RoutePrefer = RoutePrefer = {}));

  var WorkMode;
  exports.WorkMode = WorkMode;

  (function (WorkMode) {
    WorkMode[WorkMode["BothWork"] = 0] = "BothWork";
    WorkMode[WorkMode["OnlySweep"] = 1] = "OnlySweep";
    WorkMode[WorkMode["OnlyMop"] = 2] = "OnlyMop";
    WorkMode[WorkMode["SweepFirst"] = 3] = "SweepFirst";
    WorkMode[WorkMode["Custom"] = 4] = "Custom";
  })(WorkMode || (exports.WorkMode = WorkMode = {}));

  var CleaningTimes;
  exports.CleaningTimes = CleaningTimes;

  (function (CleaningTimes) {
    CleaningTimes[CleaningTimes["One"] = 1] = "One";
    CleaningTimes[CleaningTimes["Two"] = 2] = "Two";
  })(CleaningTimes || (exports.CleaningTimes = CleaningTimes = {}));

  var IDeviceTimerState;
  exports.IDeviceTimerState = IDeviceTimerState;

  (function (IDeviceTimerState) {
    IDeviceTimerState[IDeviceTimerState["Normal"] = 0] = "Normal";
    IDeviceTimerState[IDeviceTimerState["MapChangesInvalid"] = 1] = "MapChangesInvalid";
    IDeviceTimerState[IDeviceTimerState["RegionalChangesInvalid"] = 2] = "RegionalChangesInvalid";
    IDeviceTimerState[IDeviceTimerState["MapDeleteInvalid"] = 3] = "MapDeleteInvalid";
  })(IDeviceTimerState || (exports.IDeviceTimerState = IDeviceTimerState = {}));

  var UnitType;
  exports.UnitType = UnitType;

  (function (UnitType) {
    UnitType["SquareMeter"] = "squareMeter";
    UnitType["SquareFoot"] = "squareFoot";
  })(UnitType || (exports.UnitType = UnitType = {}));

  var MapViews;
  exports.MapViews = MapViews;

  (function (MapViews) {
    MapViews["RoomeName"] = "roomeName";
    MapViews["CleaningPrefer"] = "cleaningPrefer";
    MapViews["GroundEnvironment"] = "groundEnvironment";
  })(MapViews || (exports.MapViews = MapViews = {}));

  var MopWashTempType;
  exports.MopWashTempType = MopWashTempType;

  (function (MopWashTempType) {
    MopWashTempType[MopWashTempType["Room"] = 0] = "Room";
    MopWashTempType[MopWashTempType["Low"] = 1] = "Low";
    MopWashTempType[MopWashTempType["High"] = 2] = "High";
  })(MopWashTempType || (exports.MopWashTempType = MopWashTempType = {}));

  var LanguageType;
  exports.LanguageType = LanguageType;

  (function (LanguageType) {
    LanguageType[LanguageType["Chinese"] = 1] = "Chinese";
    LanguageType[LanguageType["English"] = 2] = "English";
    LanguageType[LanguageType["Russian"] = 3] = "Russian";
    LanguageType[LanguageType["German"] = 4] = "German";
    LanguageType[LanguageType["Italian"] = 5] = "Italian";
    LanguageType[LanguageType["French"] = 6] = "French";
    LanguageType[LanguageType["Polish"] = 7] = "Polish";
    LanguageType[LanguageType["Spanish"] = 8] = "Spanish";
    LanguageType[LanguageType["Korean"] = 9] = "Korean";
    LanguageType[LanguageType["ChineseTW"] = 10] = "ChineseTW";
    LanguageType[LanguageType["Vietnam"] = 11] = "Vietnam";
  })(LanguageType || (exports.LanguageType = LanguageType = {}));

  var RemoteCtlValue;
  exports.RemoteCtlValue = RemoteCtlValue;

  (function (RemoteCtlValue) {
    RemoteCtlValue["Forward"] = "forward";
    RemoteCtlValue["backward"] = "backward";
    RemoteCtlValue["Left"] = "left";
    RemoteCtlValue["Right"] = "right";
    RemoteCtlValue["Stop"] = "stop";
  })(RemoteCtlValue || (exports.RemoteCtlValue = RemoteCtlValue = {}));

  var VirtualActionType;
  exports.VirtualActionType = VirtualActionType;

  (function (VirtualActionType) {
    VirtualActionType["Normal"] = "";
    VirtualActionType["Add"] = "add";
    VirtualActionType["Del"] = "del";
    VirtualActionType["Mod"] = "mod";
  })(VirtualActionType || (exports.VirtualActionType = VirtualActionType = {}));

  var BaseStationEquipState;
  exports.BaseStationEquipState = BaseStationEquipState;

  (function (BaseStationEquipState) {
    BaseStationEquipState[BaseStationEquipState["Normal"] = 0] = "Normal";
    BaseStationEquipState[BaseStationEquipState["Uninstalled"] = 1] = "Uninstalled";
    BaseStationEquipState[BaseStationEquipState["Unusable"] = 2] = "Unusable";
    BaseStationEquipState[BaseStationEquipState["FluidL