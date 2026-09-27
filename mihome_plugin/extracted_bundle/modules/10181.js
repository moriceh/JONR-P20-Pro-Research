= RobotReturnStatus;

  (function (RobotReturnStatus) {
    RobotReturnStatus[RobotReturnStatus["None"] = 0] = "None";
    RobotReturnStatus[RobotReturnStatus["Idle"] = 1] = "Idle";
    RobotReturnStatus[RobotReturnStatus["Run"] = 2] = "Run";
    RobotReturnStatus[RobotReturnStatus["Pause"] = 3] = "Pause";
    RobotReturnStatus[RobotReturnStatus["Resume"] = 4] = "Resume";
  })(RobotReturnStatus || (exports.RobotReturnStatus = RobotReturnStatus = {}));

  var ChargeStatus;
  exports.ChargeStatus = C