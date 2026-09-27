s[3] !== undefined ? _args[3] : _multilingual.default.keyword326;

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
    };

    var _stopClean = function _stopClean() {
      var task = function task() {
        return _index.manager.getSpec([{
          param: _index.propertyCodes["robot-status"],
          fn: function fn(value) {
            return robotStore.setCurRobotStatus(value);
          }
        }, {
          param: _index.propertyCodes["return-status"],
          fn: function fn(value) {
            return robotStore.setReturnStatus(value);
          }
        }, {
          param: _index.propertyCodes["clean-type-status"],
          fn: function fn(value) {
            return robotStore.setStatus(value);
          }
        }]);
      };

      return exeCmd(_index.actions.stopClean, task);
    };

    var onChoiceItem = function onChoiceItem(id) {
      if (id === checkedId) {
        return;
      }

      var strategySelection = function strategySelection() {
        _logger.default.d("setcarpetCleanPrefer ", id);

        exeCmd(function () {
          return _index.actions.setCarpetCleanPrefer(id);
        }, function () {
          return _index.propertys.getCarpetCleanPrefer(function (value) {
            robotStore.setCarpetCleanPrefer(value);
            setCheckedId(value);
            forceUpdate();
          });
        });
      };

      if (robotStore.runningState) {
        var stopCleanAndHandleItemSelect = function stopCleanAndHandleItemSelect() {
          return _regenerator.default.async(function stopCleanAndHandleItemSelect$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _regenerator.default.awrap(_stopClean());

                case 2:
                  if (!_context2.sent) {
                    _context2.next = 10;
                    break;
                  }

                  if (!robotStore.isCleaningPause) {
                    _context2.next = 9;
                    break;
                  }

                  _context2.next = 6;
                  return _regenerator.default.awrap(_stopClean());

                case 6:
                  strategySelection();
                  _context2.next = 10;
                  break;

                case 9:
                  strategySelection();

                case 10:
                case "end":
                  return _context2.stop();
              }
            }
          });
        };

        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
          onConfirm: stopCleanAndHandleItemSelect,
          onCancel: function onCancel() {
            forceUpdate();
          }
        });
      } else {
        strategySelection();
      }
    };

    var onSwitchAutoBoost = function onSwitchAutoBoost(res, value) {
      switch (value.key) {
        case 1:
          exeCmd(function () {
            return _index.actions.setAutoBoost(res);
          }, function () {
            return _index.propertys.getCarpetAutoBoost(function (value) {
              return robotStore.setAutoBoost(value);
            });
          });
          break;

        case 2:
          if (robotStore.runningState) {
            var stopCleanAndHandleItemSelect = function stopCleanAndHandleItemSelect() {
              return _regenerator.default.async(function stopCleanAndHandleItemSelect$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _regenerator.default.awrap(_stopClean());

                    case 2:
                      if (!_context3.sent) {
                        _context3.next = 4;
                        break;
                      }

                      if (robotStore.isCleaningPause) {
                        _stopClean();

                        exeCmd(function () {
                          return _index.actions.setcarpetcleantwice(res);
                        }, function () {
                          return _index.propertys.getCarpetCleanTwice(function (value) {
                            return robotStore.setcarpetcleantwice(value);
                          });
                        });
                      } else {
                        exeCmd(function () {
                          return _index.actions.setcarpetcleantwice(res);
                        }, function () {
                          return _index.propertys.getCarpetCleanTwice(function (value) {
                            return robotStore.setcarpetcleantwice(value);
                          });
                        });
                      }

                    case 4:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            };

            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
              onConfirm: stopCleanAndHandleItemSelect,
              onCancel: function onCancel() {
                forceUpdate();
              }
            });
          } else {
            exeCmd(function () {
              return _index.actions.setcarpetcleantwice(res);
            }, function () {
              return _index.propertys.getCarpetCleanTwice(function (value) {
                