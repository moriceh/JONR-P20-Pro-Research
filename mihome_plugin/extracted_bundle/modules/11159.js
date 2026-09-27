p = mapInfo.mapId === 0;
    var lock = (_mapStore$mapInfos = mapStore.mapInfos) == null ? undefined : _mapStore$mapInfos.filter(function (item) {
      return item.mapId === mapInfo.mapId;
    });

    var _useState5 = (0, _react.useState)(1),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        elevation = _useState6[0],
        setElevation = _useState6[1];

    var _useState7 = (0, _react.useState)([{
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword669,
      key: 1
    }, {
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword36,
      key: 2
    }, {
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword42,
      key: 3
    }]),
        _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
        floatListData = _useState8[0],
        setFloatListData = _useState8[1];

    var _useState9 = (0, _react.useState)((_lock$ = lock[0]) == null ? undefined : _lock$.maplock),
        _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
        mapLock = _useState10[0],
        setMapLock = _useState10[1];

    var savedMapInfos = (0, _mobx.toJS)(mapStore.mapInfos.filter(function (item) {
      return item.saved === 1;
    }));
    var isShow = robotStore.saveMapSwitch && (robotStore.multifloorSwitch ? savedMapInfos.length < 4 : savedMapInfos.length < 1);
    (0, _react.useEffect)(function () {
      if (!isNewMap) {
        setFloatListData([{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword36,
          key: 2
        }, {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword42,
          key: 3
        }]);
      } else {
        setFloatListData([{
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword669,
          key: 1
        }, {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword36,
          key: 2
        }, {
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword42,
          key: 3
        }]);
      }
    }, [isNewMap]);

    var _handelRunningStateFunc = function _handelRunningStateFunc(message, func) {
      _logger.default.d('mapEdit handelRunningStateFunc', robotStore.isReturning, robotStore.status, robotStore.runningState);

      if (robotStore.runningState) {
        commonStore.showMessageDialog({
          message: message,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            _stopClean().then(function _callee(res) {
              return _regenerator.default.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!res) {
                        _context.next = 4;
                        break;
                      }

                      _context.next = 3;
                      return _regenerator.default.awrap(delay(500));

                    case 3:
                      func && func();

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }
        });
      } else {
        func && func();
      }
    };

    var _stopClean = function _stopClean() {
      var task = function task() {
        return _resourceManager.manager.getSpec([{
          param: _resourceManager.propertyCodes['robot-status'],
          fn: function fn(value) {
            return robotStore.setCurRobotStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes['return-status'],
          fn: function fn(value) {
            return robotStore.setReturnStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes['clean-type-status'],
          fn: function fn(value) {
            return robotStore.setStatus(value);
          }
        }]);
      };

      return exeCmd(_resourceManager.actions.stopClean, task);
    };

    var exeCmd = function exeCmd(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args2 = arguments;
      return _regenerator.default.async(function exeCmd$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              loadingMessage = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : _multilingual.default.keyword474;
              errorMessage = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : _multilingual.default.keyword326;

              if (isConnected) {
                _context2.next = 5;
                break;
              }

              commonStore.showToast(_multilingual.default.keyword321);
              return _context2.abrupt("return", false);

            case 5:
              commonStore.showLoading(loadingMessage);
              _context2.prev = 6;
              _context2.next = 9;
              return _regenerator.default.awrap(task());

            case 9:
              res = _context2.sent;

              if (!res) {
                _context2.next = 19;
                break;
              }

              _context2.t0 = extraTask;

              if (!_context2.t0) {
                _context2.next = 15;
                break;
              }

              _context2.next = 15;
              return _regenerator.default.awrap(extraTask());

            case 15:
              commonStore.hideLoading();
              return _context2.abrupt("return", true);

            case 19:
              throw new Error("actions\u53D1\u9001\u5931\u8D25:");

            case 20:
              _context2.next = 27;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t1 = _context2["catch"](6);
              commonStore.hideLoading(errorMessage);

              _logger.default.e("actions\u5F02\u5E38:", _context2.t1);

              return _context2.abrupt("return", false);

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[6, 22]]);
    };

    var cardFunData = [{
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword664,
      key: 1,
      img: map.bianji
    }, {
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword677,
      key: 2,
      img: map.recoveryMapIcon
    }, {
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword45,
      key: 3,
      img: map.del
    }];
    (0, _react.useEffect)(function () {
      var disposer = (0, _mobx.reaction)(function () {
        return mapStore.mapInfos;
      }, function (newValue) {
        var _newMaoLockData$;

        var newMaoLockData = newValue == null ? undefined : newValue.filter(function (item) {
          return item.mapId === mapInfo.mapId;
        });
        setMapLock((_newMaoLockData$ = newMaoLockData[0]) == null ? undefined : _newMaoLockData$.maplock);
      });
      return function () {
        return disposer();
      };
    }, []);
    var onChangeMapNameClick = (0, _react.useCallback)(function () {
      if (!isNewMap) {
        setShowInputDialog(true);
      } else {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword239,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            return onSaveMapClick(mapInfo.mapId);
          }
        });
      }
    }, [commonStore, isNewMap, mapInfo.mapId, onSaveMapClick]);

    function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    var _getMapInfos = function _getMapInfos() {
      var res, _ref2, fileName, obj;

      return _regenerator.default.async(function _getMapInfos$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context3.next = 4;
              return _regenerator.default.awrap(delay(1000));

            case 4:
              _context3.next = 6;
              return _regenerator.default.awrap(_resourceManager.actions.getMapInfos());

            case 6:
              res = _context3.sent;

              _logger.default.d('变化后更新地图列表:', res);

              if (!res) {
                _context3.next = 25;
                break;
              }

              fileName = (_ref2 = res == null ? undefined : res[0]) != null ? _ref2 : '';

              if (fileName) {
                _context3.next = 14;
                break;
              }

              mapStore.setMapInfos([]);
              _context3.next = 24;
              break;

            case 14:
              _context3.prev = 14;
              _context3.next = 17;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapInfosFileContent)(fileName));

            case 17:
              obj = _context3.sent;
              mapStore.setMapInfos(obj);
              _context3.next = 24;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](14);

              _logger.default.e("更新的地图列表数据 error:", _context3.t0);

            case 24:
              commonStore.hideLoading();

            case 25:
              _context3.next = 31;
              break;

            case 27:
              _context3.prev = 27;
              _context3.t1 = _context3["catch"](0);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e('拉取地图更新事件错误', _context3.t1);

            case 31:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 27], [14, 21]]);
    };

    var onMapSetItemClick = (0, _react.useCallback)(function (item) {
      var _mapStore$curMapInfo;

      onHideDialog && onHideDialog();

      switch (item.type) {
        case _enum.MapSettingType.Zone:
          onNavigateToPage("RestrictedSetting", {
            title: _multilingual.default == null ? undefined : _m