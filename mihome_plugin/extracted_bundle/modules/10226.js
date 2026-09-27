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
    };

    var _startBuilding = function _startBuilding(isFast) {
      var action = isFast ? _resourceManager.actions.startFastBuilding : _resourceManager.actions.startCleanBuilding;

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

      exeCmd(action, task);
    };

    var _washMop = function _washMop(val) {
      exeCmd(function () {
        return _resourceManager.actions.setWashMop(val);
      }, function () {
        return _resourceManager.propertys.getCurRobotStatus(function (value) {
          return robotStore.setCurRobotStatus(value);
        });
      });
    };

    var _collectDust = function _collectDust(val) {
      exeCmd(function () {
        return _resourceManager.actions.setCollectDust(val);
      }, function () {
        return _resourceManager.propertys.getCurRobotStatus(function (value) {
          return robotStore.setCurRobotStatus(value);
        });
      });
    };

    var _backCharge = function _backCharge(charge) {
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

      exeCmd(function () {
        return _resourceManager.actions.charge(charge);
      }, task);
    };

    var _setRobotStatus = function _setRobotStatus(status) {
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

      exeCmd(function () {
        return _resourceManager.actions.pauseContinueWork(status);
      }, task);
    };

    var _startClean = function _startClean() {
      var task = function task() {
        return _resourceManager.manager.getSpec([{
          param: _resourceManager.propertyCodes["robot-status"],
          fn: function fn(value) {
            return robotStore.setCurRobotStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes["clean-values"],
          fn: function fn(value) {
            return robotStore.setCleanValues(value);
          }
        }, {
          param: _resourceManager.propertyCodes["clean-type-status"],
          fn: function fn(value) {
            return robotStore.setStatus(value);
          }
        }]);
      };

      switch (store.cleanMode) {
        case _enum2.CleanModeType.Smart:
          exeCmd(_resourceManager.actions.startSmart, task);
          break;

        case _enum2.CleanModeType.Room:
          {
            if (!robotStore.saveMapSwitch) {
              commonStore.showMessageDialog({
                message: _multilingual.default == null ? undefined : _multilingual.default.keyword21,
                confirm: _multilingual.default == null ? undefined : _multilingual.default.keyword22,
                onCancel: function onCancel() {},
                onConfirm: function onC