 null ? undefined : _store$zones.find(function (item) {
        return item.isActive;
      });
      var cleanPoints = cleanPoint ? [cleanPoint.points] : (_store$zones2 = store.zones) == null ? undefined : _store$zones2.map(function (item) {
        return item.points;
      });
      var ids = (_store$zones3 = store.zones) == null ? undefined : _store$zones3.map(function (item) {
        return item.id;
      });
      var point = (0, _mapStateUtils.getNewAreaAxis)((_mapStore$curMapInfo = mapStore.curMapInfo) == null ? undefined : _mapStore$curMapInfo.mapData, cleanPoints);
      var id = (0, _utils.getNextAvailableId)(ids);
      store.setVirtualZones({
        type: "add",
        zone: {
          points: point,
          id: id,
          isActive: true
        }
      });
    };

    var MultiFloor = function MultiFloor() {
      _resourceManager.actions.setMultifloorSwitch(true).then(function _callee2(res) {
        return _regenerator.default.async(function _callee2$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!res) {
                  _context7.next = 4;
                  break;
                }

                _context7.next = 3;
                return _regenerator.default.awrap(delay(500));

              case 3:
                _saveMap({
                  mapId: dialogmapId
                });

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        });
      });
    };

    var switchMap = function switchMap() {
      var savedMapInfos = mapStore.mapInfos.filter(function (item) {
        return item.saved === 1;
      });

      _saveMap({
        mapId: dialogmapId,
        replaceMapId: savedMapInfos[0].mapId
      });
    };

    var handleCancelDialog = function handleCancelDialog() {
      setCleaningModeState(false);
    };

    var saveMapAction = function saveMapAction(mapId) {
      var savedMapInfos, _overflowSave;

      return _regenerator.default.async(function saveMapAction$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              savedMapInfos = (0, _mobx.toJS)(mapStore.mapInfos);

              _overflowSave = function _overflowSave() {
                if (robotStore.multifloorSwitch) {
                  if (savedMapInfos.length >= 4) {
                    store.showChoiceActionSheet(_enum2.ChoiceType.REPLACE_MAP);
                  } else {
                    _saveMap({
                      mapId: mapId
                    });
                  }
                } else {
                  if (savedMapInfos.length >= 1) {
                    setDialogmapId(mapId);
                    setCleaningModeState(true);
                  } else {
                    _saveMap({
                      mapId: mapId
                    });
                  }
                }
              };

              if (robotStore.runningState) {
                commonStore.showMessageDialog({
                  message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
                  onCancel: function onCancel() {},
                  onConfirm: function onConfirm() {
                    _stopClean().then(function () {
                      return _overflowSave();
                    });
                  }
                });
              } else {
                _overflowSave();
              }

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      });
    };

    var onStartAction = function onStartAction() {
      _resourceManager.propertys.getError(function (value) {
        return robotStore.setError(value);
      });

      if (robotStore.stationStatus === _enum.StationStatus.Washing) {
        if (robotStore.isRunning) {
          commonStore.showMessageDialog({
            message: _multilingual.default == null ? undefined : _multilingual.default.keyword278,
            onCancel: function onCancel() {},
            onConfirm: function onConfirm() {
              _washMop(false);
            }
          });
        } else {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword316);
        }

        return;
      }

      if (robotStore.stationStatus === _enum.StationStatus.Emptying) {
        if (robotStore.isRunning) {
          commonStore.showMessageDialog({
            message: _multilingual.default == null ? undefined : _multilingual.default.keyword279,
            onCancel: function onCancel() {},
            onConfirm: function onConfirm() {
              _collectDust(false);
            }
          });
        } else {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword315);
        }

        return;
      }

      if (robotStore.isReturning) {
        _setRobotStatus(robotStore.isReturningPause ? _enum.RobotSetStatus.ReturnResume : _enum.RobotSetStatus.ReturnPause);

        return;
      }

      if (robotStore.isCleaning) {
        if (robotStore.battery <= 15 && robotStore.isCleaningPause) {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword475);
        } else if (robotStore.battery <= 5 && robotStore.isCleaningPause) {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword475);
          return;
        }

        _setRobotStatus(robotStore.isCleaningPause ? _enum.RobotSetStatus.CleanResume : _enum.RobotSetStatus.CleanPause);

        return;
      }

      if (robotStore.saveMapSwitch) {
        if (!mapStore.hasMapData) {
          commonStore.showMessageDialog({
            message: _multilingual.default == null ? undefined : _multilingual.default.keyword274,
            onCancel: function onCancel() {},
            onConfirm: function onConfirm() {
              return store.showCreateMapDialog();
            }
          });
        } else {
          _startClean();
        }
      } else {
        _startClean();
      }
    };

    var onBackCharge = function onBackCharge() {
      if (robotStore.isReturning) {
        return _backCharge(_enum.RobotSetStatus.Return_Idle);
      }

      if (!robotStore.runningState) {
        return _backCharge(_enum.RobotSetStatus.Return);
      }

      if (robotStore.status === _enum.RobotStatus.QMAP || robotStore.status === _enum.RobotStatus.QMAPPause || robotStore.status === _enum.RobotStatus.QMAPResume) {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword495,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            return _backCharge(_enum.RobotSetStatus.IdleToReturn);
          }
        });
        return;
      }

      if (robotStore.isCleaning) {
        store.showChoiceActionSheet(_enum2.ChoiceType.CHOICE_ITEM);
      }
    };

    var onAddCleanZoneClick = function onAddCleanZoneClick() {
      var result = store.zones.filter(function (zone) {
        return !("types" in zone);
      });

      if (result.length > 4) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword281);
        return;
      }

      _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, _addZoning);
    };

    var onCreatMapAction = function onCreatMapAction() {
      _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, function () {
        store.showCreateMapDialog();
      });
    };

    var onClickArea = function onClickArea(curArea) {
      if (store.cleanMode === _enum2.CleanModeType.Room && mapStore.hasMapData && !mapStore.isMapSaved) {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword275,
          cancel: _multilingual.default == null ? undefined : _multilingual.default.keyword45,
          onCancel: function onCancel() {
            _delMap(mapStore.curMapInfo.mapId);
          },
          confirm: _multilingual.default == null ? undefined : _multilingual.default.keyword32,
          onConfirm: function onConfirm() {
            saveMapAction(mapStore.curMapInfo.mapId);
          },
          canDismiss: false
        });
      }

      if (curArea === -1) return;
      var newAreas = store.selectedAreas.includes(curArea) ? store.selectedAreas.filter(function (id) {
        return id !== curArea;
      }) : [].concat((0, _toConsumableArray2.default)(store.selectedAreas), [curArea]);
      store.setSelectedAreas(newAreas);
 