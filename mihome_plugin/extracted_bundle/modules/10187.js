
  var StationType;
  exports.StationType = StationType;

  (function (StationType) {
    StationType[StationType["Normal"] = 1] = "Normal";
    StationType[StationType["ChargeWash"] = 2] = "ChargeWash";
    StationType[StationType["Omni"] = 3] = "Omni";
  })(StationType || (exports.StationType = StationType = {}));

  var WaterBoxType;
  exports.WaterBoxType = WaterBoxType;

  (function (WaterBoxType) {
    WaterBoxType[WaterBoxType["Normal"] = 1] = "Normal";
    WaterBoxType[WaterBoxType["Vibration"] = 2] = "Vibration";
    WaterBoxType[WaterBoxType["DoubleRotation"] = 3] = "DoubleRotation";
  })(WaterBoxType || (exports.WaterBoxType = WaterBoxType = {}));

  var MopStatus;
  exports.MopStatus = MopStatus;

  (function (MopStatus) {
    MopStatus["None"] = "none";
    MopStatus["Installed"] = "installed";
  })(MopStatus || (exports.MopStatus = MopStatus = {}));

  var CarpetCleanPrefer;
  exports.CarpetCleanPrefer = CarpetCleanPrefer;

  (function (CarpetCleanPrefer) {
    CarpetCleanPrefer[CarpetCleanPrefer["Adaptive"] = 0] = "Adaptive";
    CarpetCleanPrefer[CarpetCleanPrefer["Evade"] = 1] = "Evade";
    CarpetCleanPrefer[CarpetCleanPrefer["Only"] = 2] = "Only";
    CarpetCleanPrefer[CarpetCleanPrefer["Ignore"] = 3] = "Ignore";
  })(CarpetCleanPrefer || (exports.CarpetCleanPrefer = CarpetCleanPrefer = {}));

  var DustCollectionAutoSetType;
  exports.DustCollectionAutoSetType = DustCollectionAutoSetType;

  (function (DustCollectionAutoSetType) {
    DustCollectionAutoSetType[DustCollectionAutoSetType["None"] = 0] = "None";
    DustCollectionAutoSetType[DustCollectionAutoSetType["EveryTime"] = 1] = "EveryTime";
    DustCollectionAutoSetType[DustCollectionAutoSetType["LowFrequency"] = 2] = "LowFrequency";
    DustCollectionAutoSetType[DustCollectionAutoSetType["MediumFrequency"] = 3] = "MediumFrequency";
    DustCollectionAutoSetType[DustCollectionAutoSetType["HighFrequency"] = 4] = "HighFrequency";
  })(DustCollectionAutoSetType || (exports.DustCollectionAutoSetType = DustCollectionAutoSetType = {}));

  var DryingTimeType;
  exports.DryingTimeType = DryingTimeType;

  (function (DryingTimeType) {
    DryingTimeType[DryingTimeType["TwoHours"] = 120] = "TwoHours";
    DryingTimeType[DryingTimeType["ThreeHours"] = 180] = "ThreeHours";
    DryingTimeType[DryingTimeType["FourHours"] = 240] = "FourHours";
  })(DryingTimeType || (exports.DryingTimeType = DryingTimeType = {}));

  var WaterMode;
  exports.WaterMode = WaterMode;

  (function (WaterMode) {
    WaterMode[WaterMode["Low"] = 0] = "Low";
    WaterMode[WaterMode["Mid"] = 1] = "Mid";
    WaterMode[WaterMode["High"] = 2] = "High";
  })(WaterMode || (exports.WaterMode = WaterMode = {}));

  var FanMode;
  exports.FanMo