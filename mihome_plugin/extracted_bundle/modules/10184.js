hargeStatus;

  (function (ChargeStatus) {
    ChargeStatus[ChargeStatus["Idle"] = 0] = "Idle";
    ChargeStatus[ChargeStatus["Charging"] = 1] = "Charging";
    ChargeStatus[ChargeStatus["Complete"] = 2] = "Complete";
  })(ChargeStatus || (exports.ChargeStatus = ChargeStatus = {}));

  var CleanType;
  exports.CleanType = CleanType;

  (function (CleanType) {
    CleanType[CleanType["Full"] = 1] = "Full";
    CleanType[CleanType["QMAP"] = 2] = "QMAP";
    CleanType[CleanType["Area"] = 3] = "Area";
    CleanType[CleanType["Zone"] = 4] = "Zone";
    CleanType[CleanType["Carpet"] = 5] = "Carpet";
    CleanType[CleanType["Spot"] = 6] = "Spot";
  })(CleanType || (exports.CleanType = CleanType = {}));

  var StationStatus;
  exports.StationStatus = StationStatus;

  (function (StationStatus) {
    StationStatus[StationStatus["None"] = 0] = "None";
    StationStatus[StationStatus["Washing"] = 1] = "Washing";
    StationStatus[StationStatus["Emptying"] = 2] = "Emptying";
    StationStatus[StationStatus["Drying"] = 3] = "Drying";
    StationStatus[StationStatus["Charging"] = 4] = "Charging";
  })(StationStatus || (exports.StationStatus = StationStatus = {}));
