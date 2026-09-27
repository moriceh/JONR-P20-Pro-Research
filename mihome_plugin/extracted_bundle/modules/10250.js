e 6:
            case "end":
              return _context9.stop();
          }
        }
      });
    };

    var onDeleteMapAction = function onDeleteMapAction(mapId) {
      if (robotStore.runningState) {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            _stopClean().then(function (res) {
              if (res) {
                commonStore.showMessageDialog({
                  message: _multilingual.default == null ? undefined : _multilingual.default.keyword238,
                  onCancel: function onCancel() {},
                  onConfirm: function onConfirm() {
                    return _delMap(mapId);
                  }
                });
              }
            });
          }
        });
      } else {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword238,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            return _delMap(mapId);
          }
        });
      }
    };

    var onCleanModeSwith = function onCleanModeSwith(mode) {
      if (mode === store.cleanMode) {
        return;
      }

      var handleSwitch = function handleSwitch() {
        if (mode === _enum2.CleanModeType.Room) {
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
          }
        } else if (mode === _enum2.CleanModeType.Zoning) {
          if (!robotStore.saveMapSwitch && !mapStore.hasMapData) {
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
          }

          if (mapStore.hasMapData) {
            !store.zones.length && _addZoning();
          }
        }

        store.setCleanMode(mode);
      };

      _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword233, handleSwitch);
    };

    var saveExtendedMapAction = function saveExtendedMapAction(mapId, toast) {
      var res;
      return _regenerator.default.async(function saveExtendedMapAction$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.saveMap({
                  mapId: mapId,
                  isExpanded: 1,
                  replaceMapId: ""
                });
              }));

            case 2:
              res = _context10.sent;

              if (!res) {
                _context10.next = 9;
                break;
              }

              _context10.next = 6;
              return _regenerator.default.awrap(_getCurMap());

            case 6:
              mapStore.setIsExpandedMap(false);
              _context10.next = 10;
              break;

            case 9:
              toast(_multilingual.default == null ? undefined : _multilingual.default.keyword326);

            case 10:
            case "end":
              return _context10.stop();
          }
        }
      });
    };

    var cancelSaveExtendedMapAction = function cancelSaveExtendedMapAction(toast) {
      var res;
      return _regenerator.default.async(function cancelSaveExtendedMapAction$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.giveUpMapExtented();
              }));

            case 2:
              res = _context11.sent;

              if (!res) {
                _context11.next = 9;
                break;
              }

              _context11.next = 6;
              return _regenerator.default.awrap(_getCurMap());

            case 6:
              mapStore.setIsExpandedMap(false);
              _context11.next = 10;
              break;

            case 9:
              toast(_multilingual.default == null ? undefined : _multilingual.default.keyword326);

            case 10:
            case "end":
              return _context11.stop();
          }
        }
      });
    };

    var onNavigatePage = function onNavigatePage(page, params) {
      props.navigation.navigate(page, params);
    };

    var onGoStationSet = function onGoStationSet() {
      props.navigation.navigate("BaseStation", {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword128
      });
    };

    function TopView() {
      return _react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _screenAdapte.sizeH)(76),
          zIndex: 99,
          justifyContent: "space-between"
        }
      }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return _react.default.createElement(_topData.default, {
          data: [{
            key: 1,
            value: configStore.unitSet === _enum.UnitType.SquareMeter ? robotStore.cleanArea : (0, _index5.meterToFoot)(robotStore.cleanArea, 1),
            unit: configStore.unitSet === _enum.UnitType.SquareMeter ? "m²" : "ft²",
            icon: homeImgaes.area
          }, {
            key: 2,
            value: robotStore.cleanTimeStr,
            unit: "min",
            icon: homeImgaes.time
          }, {
            key: 3,
            value: robotStore.battery,
            unit: "%",
            icon: robotStore.curRobotStatus !== "Charging" ? homeImgaes.battery : homeImgaes.charging,
            colorStyle: robotStore.isLowPower ? {
              color: "#FA6400"
            } : {}
          }]
        });
      }));
    }

    function NoticeTips() {
      return _react.default.createElement(_reactNative.View, {
        style: {
          position: "absolute",
          bottom: 12,
          left: 16
        }
      }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
        var _robotStore$alarmNoti;

        return (_robotStore$alarmNoti = robotStore.alarmNotify) == null ? undefined : _robotStore$alarmNoti.map(function (item, index) {
          return item.code === 4502 && !robotStore.isInBaseStation ? null : _react.default.createElement(_alarmNotifyItem.default, {
            key: index,
            text: item.text,
            type: item.type,
            onPress: function onPress() {
              if (item.type === "warning") {
                if (item.code > 2000 && item.code < 3000) {
                  props.navigation.navigate("Consumables", {
                    title: _multilingual.default == null ? undefined : _multilingual.default.keyword176
                  });
                } else {
                  props.navigation.navigate("FaultDetails", {
                   