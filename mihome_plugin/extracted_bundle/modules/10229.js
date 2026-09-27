onfirm() {
                  props.navigation.navigate("MapManage", {
                    title: _multilingual.default.keyword36
                  });
                }
              });
              return;
            } else {
              if (store.selectedAreas.length) {
                exeCmd(function () {
                  return _resourceManager.actions.areaClean(store.selectedAreas);
                }, task);
              } else {
                commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword78);
              }
            }
          }
          break;

        case _enum2.CleanModeType.Zoning:
          {
            if (!robotStore.saveMapSwitch) {
              commonStore.showMessageDialog({
                message: _multilingual.default == null ? undefined : _multilingual.default.keyword21,
                confirm: _multilingual.default == null ? undefined : _multilingual.default.keyword22,
                onCancel: function onCancel() {},
                onConfirm: function onConfirm() {
                  props.navigation.navigate("MapManage", {
                    title: _multilingual.default.keyword36
                  });
                }
              });
              return;
            } else {
              if (store.zones.length) {
                var pointsArray = store.zones.flatMap(function (item) {
                  return item.points.flatMap(function (point) {
                    return [point.x, point.y];
                  });
                });

                _logger.default.d("划区上报", pointsArray);

                var val = pointsArray.length % 4 === 0 ? pointsArray : [];
                exeCmd(function () {
                  return _resourceManager.actions.zoneClean(val);
                }, task).then(function (res) {
                  _logger.default.d("划区清洁回复", res);

                  store.setVirtualZones({
                    type: "inactive"
                  });
                });
              } else {
                commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword280);
              }
            }
          }
          break;
      }
    };

    var _stopClean = function _stopClean() {
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

      return exeCmd(_resourceManager.actions.stopClean, task);
    };

    function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    var _getCurMap = function _getCurMap() {
      var res, _ref2, fileName, obj;

      return _regenerator.default.async(function _getCurMap$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context2.next = 4;
              return _regenerator.default.awrap(delay(2000));

            case 4:
              _context2.next = 6;
              return _regenerator.default.awrap(_resourceManager.actions.getMapData());

            case 6:
              res = _context2.sent;

              _logger.default.d("变化后拉取当前地图:", res);

              if (!res) {
                _context2.next = 19;
                break;
              }

              fileName = (_ref2 = res == null ? undefined : res[0]) != null ? _ref2 : "";

              if (