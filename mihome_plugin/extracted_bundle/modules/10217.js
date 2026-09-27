
                specsPart2.push({
                  param: _consts.propertyCodes["fine-drag"],
                  fn: function fn(value) {
                    return robotStore.setRoutePrefer(value);
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["aw-check-sign"],
                  fn: function fn(value) {
                    robotStore.setUpstreamDownstreamTesting(value);
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["aw-check-data"],
                  fn: function fn(value) {
                    var _JSON$parse, _JSON$parse2, _JSON$parse3;

                    robotStore.setAwCheckData(JSON.parse(value));

                    if (((_JSON$parse = JSON.parse(value)) == null ? undefined : _JSON$parse.type) && ((_JSON$parse2 = JSON.parse(value)) == null ? undefined : _JSON$parse2.type) !== 7 && !((_JSON$parse3 = JSON.parse(value)) == null ? undefined : _JSON$parse3.error)) {
                      var _props$navigation;

                      props == null ? undefined : (_props$navigation = props.navigation) == null ? undefined : _props$navigation.navigate("PlumbingTesting", {
                        title: "       "
                      });
                    }
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["carpet-clean-prefer"],
                  fn: function fn(value) {
                    return robotStore.setCarpetCleanPrefer(value);
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["carpet-boost-switch"],
                  fn: function fn(value) {
                    return robotStore.setAutoBoost(value);
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["carpet-cleantwice"],
                  fn: function fn(value) {
                    return robotStore.setcarpetcleantwice(value);
                  }
                });
                specsPart2.push({
                  param: _consts.propertyCodes["carpet-cleanchoice"],
                  fn: function fn(value) {
                    return robotStore.setcarpetcleanfirst(value);
                  }
                });
              }

              _resourceManager.manager.getSpec(specsPart2);

              _getCurrentMap();

              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword15, 0);

              _logger.default.d("获取首页属性 loading");

              _context.next = 10;
              return _regenerator.default.awrap(_resourceManager.manager.getSpecRetry(specsPart1));

            case 10:
              _logger.default.d("获取首页属性成功,开始拉图");

              commonStore.hideLoading();
              versionUpgradeCheck();

              _getMapInfos();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    function _getCurrentMap() {
      var res, _ref;

      return _regenerator.default.async(function _getCurrentMap$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator.default.awrap(_resourceManager.actions.getMapData());

            case 2:
              res = _context2.sent;

              _logger.default.d("拉取当前地图成功:", res);

              if (!res) {
                _context2.next = 7;
                break;
              }

              _context2.next = 7;
              return _regenerator.default.awrap(_handelMapFile((_ref = res == null ? undefined : res[0]) != null ? _ref : ""));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      });
    }

    function _getMapInfos() {
      return _regenerator.default.async(function _getMapInfos$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (robotStore.saveMapSwitch && mapStore.mapInfos.length === 0) {
                _resourceManager.actions.getMapInfos().then(function (res) {
                  _logger.default.d("地图管理 - 拉取地图列表:", res);

                  if (res && res[0]) {
                    _handelMapInfosFile(res[0]);
                  }
                });
              }

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      });
    }

    var onCloseGuideModal = function onCloseGuideModal() {
      configStore.saveAlreadyOpen();
      setFirstBoot(false);
    };

    var IOTSubscribes = function IOTSubscribes() {
      _resourceManager.subscriptions.subManufacturer(function (value) {
        _logger.default.d("sub-------manufacturer", value);

        deviceStore.setManufacturer(value);
      });

      _resourceManager.subscriptions.subDeviceModel(function (value) {
        _logger.default.d("sub-------Device Model", value);

        deviceStore.setDeviceModel(value);
      });

      _resourceManager.subscriptions.subID(function (value) {
        _logger.default.d("sub-------ID", value);

        deviceStore.setDeviceID(value);
      });

      _resourceManager.subscriptions.subCurrentFirmwareVersion(function (value) {
        _logger.default.d("sub-------Version", value);

        deviceStore.setFirmwareRevision(value);
      });

      _resourceManager.subscriptions.subSerialNo(function (value) {
        _logger.default.d("sub-------SerialNo", value);

        deviceStore.setSerialNo(value);
      });

      _resourceManager.subscriptions.subTimeZone(function (value) {
        _logger.default.d("sub-------TimeZone", value);

        deviceStore.setTimeZone(value);
      });

      _resourceManager.subscriptions.subCleanRecords(function (value) {
        _logger.default.d("sub-------CleanRecords", typeof value, value);

        robotStore.setCleanRecords(value);
      });

      _resourceManager.subscriptions.subBattery(function (value) {
        _logger.default.d("sub-------subBattery", value);

        robotStore.setBattery(value);
      });

      _resourceManager.subscriptions.subDisturbSwitch(function (value) {
        _logger.default.d("sub-------subDisturbSwitch", value);

        robotStore.setDisturbSwitch(value);
      });

      _resourceManager.subscriptions.subDisturbTimeSet(function (value) {
        _logger.default.d("sub-------subDisturbTimeSet", value, typeof value);

        robotStore.setDisturbTimeSet(value);
      });

      _resourceManager.subscriptions.subChildLock(function (value) {
        _logger.default.d("sub-------subChildLock", value);

        robotStore.setChildLock(value);
      });

      _resourceManager.subscriptions.subVolume(function (value) {
        _logger.default.d("sub-------subVolume", value);

        robotStore.setVolume(value);
      });

      _resourceManager.subscriptions.subLanguage(function (value) {
        _logger.default.d("sub-------subLanguage", value);

        robotStore.setLanguage(value);
      });

      _resourceManager.subscriptions.subLanguageVersion(function (value) {
        _logger.default.d("sub-------subLanguageVersion", value);

        robotStore.setLanguageVersion(value);
      });

      _resourceManager.subscriptions.subErpSwitch(function (value) {
        _logger.default.d("sub-------subErpSwitch", value);

        robotStore.setErpSwitch(value);
      });

      _resourceManager.subscriptions.subCleanArea(function (value) {
        _logger.default.d("sub-------subCleanArea", value);

        robotStore.setCleanArea(value);
      });

      _resourceManager.subscriptions.subCleanTime(function (value) {
        robotStore.setCleanTime(value);
      });

      _resourceManager.subscriptions.subAutoCleaningSolution(function (value) {
        _logger.default.d("sub-------subAutoCleaningSolution", value);

        robotStore.setAutoCleaningSolution(value);
      });

      _resourceManager.subscriptions.subRobotStatus(function (value) {
        _logger.default.d("++++++++++++++++++++++++++++++++++++++++++++++++++++++sub-------清扫模式", value);

        robotStore.setStatus(value);
      });

      _resourceManager.subscriptions.subReturnStatus(function (value) {
        _logger.default.d("++++++++++++++++++++++++++++++++++++++++++++++++++++++sub-------回冲模式", value);

        robotStore.setReturnStatus(value);
      });

      _resourceManager.subscriptions.subDeviceTimer(function (value) {
        _logger.default.d("sub-------subDeviceTimer", value);

        robotStore.setDeviceTimer(value);
      });

      _resourceManager.subscriptions.subAutoDryingSwitch(function (value) {
        _logger.default.d("sub-------AutoDryingSwitch", value);

        robotStore.setAutoDryingSwitch(value);
      });

      _resourceManager.subscriptions.subMapSaveSwitch(function (value) {
        _logger.default.d("sub-------SaveMap", value);

        robotStore.setSaveMapSwitch(value);
      });

      _resourceManager.subscriptions.subFanMode(function (value) {
        _logger.default.d("sub-------FanMode", value);

        robotStore.setFanMode(value);
      });

      _resourceManager.subscriptions.subWaterMode(function (value) {
        _logger.default.d("sub-------WaterMode", value);

        robotStore.setWaterMode(value);
      });

      _resourceManager.subscriptions.subCleanCount(function (value) {
        _logger.default.d("sub-------CleanCount", value);

        robotStore.setCleanCount(value);
      });

      _resourceManager.subscriptions.fineDrag(function (value) {
        robotStore.setRoutePrefer(value);
      });

      _resourceManager.subscriptions.awCheckSign(function (value) {
        _logger.default.d("sub-------awCheckSign", value);

        robotStore.setUpstreamDownstreamTesting(value);
      });

      _resourceManager.subscriptions.subCarpetCleanPrefer(function (value) {
        _logger.default.d("sub-------CarpetCleanPrefer", value);

        robotStore.setCarpetCleanPrefer(value);
      });

      _resourceManager.subscriptions.subWorkMode(function (value) {
        _logger.default.d("sub-------WorkMode", value);

        robotStore.setWorkMode(value);
      });

      _resourceManager.subscriptions.subMopWashFrequency(function (value) {
        _logger.default.d("sub-------MopWashFrequency", value);

        robotStore.setMopWashFrequency(value);
      });

      _resourceManager.subscriptions.subCarpetAutoBoost(function (value) {
        _logger.default.d("sub-------subCarpetAutoBoost", value);

        robotStore.setAutoBoost(value);
      });

      _resourceManager.subscriptions.subCarpetCleantwice(function (value) {
        _logger.default.d("sub-------subCarpetCleantwice", value);

        robotStore.setcarpetcleantwice(value);
      });

      _resourceManager.subscriptions.subCarpetCleanchoice(function (value) {
        _logger.default.d("sub-------subCarpetCleanchoice", value);

        robotStore.setcarpetcleanfirst(value);
      });

      _resourceManager.subscriptions.subDustCollectionAutoSet(function (value) {
        _logger.default.d("sub-------subDustCollectionAutoSet", value);

        robotStore.setDustCollectionAutoSet(value);
      });

      _resourceManager.subscriptions.subMopAugmentSwitch(function (value) {
        _logger.default.d("sub-------subMopAugmentSwitch", value);

        robotStore.setMopAugmentSwitch(value);
      });

      _resourceManager.subscriptions.subBreakCleanSwitch(function (value) {
        _logger.default.d("sub-------subBreakCleanSwitch", value);

        robotStore.setBreakCleanSwitch(value);
      });

      _resourceManager.subscriptions.subMopWashTemp(function (value) {
        _logger.default.d("sub-------subMopWashTemp", value);

        robotStore.setMopWashTemp(value);
      });

      _resourceManager.subscriptions.subDryingTime(function (value) {
        _logger.default.d("sub-------DryingTime", value);

        robotStore.setDryingTime(value);
      });

      _resourceManager.subscriptions.subCleanTimeTotal(function (value) {
        _logger.default.d("sub-------CleanTimeTotal", value);

        robotStore.setCleanTimeTotal(value);
      });

      _resourceManager.subscriptions.subCleanAreaTotal(function (value) {
        _logger.default.d("sub-------CleanAreaTotal", value);

        robotStore.setCleanAreaTotal(value);
      });

      _resourceManager.subscriptions.subCleanCountTotal(function (value) {
        _logger.default.d("sub-------CleanCountTotal", value);

        robotStore.setCleanCountTotal(value);
      });

      _resourceManager.subscriptions.subMultifloorSwitch(function (value) {
        _logger.default.d("sub-------subMultifloorSwitch", value);

        robotStore.setMultifloorSwitch(value);
      });

      _resourceManager.subscriptions.subMessage(function (value) {
        _logger.default.d("sub-------subMessage", value);

        robotStore.setMessage(value);
      });

      _resourceManager.subscriptions.subError(function (value) {
        _logger.default.d("sub-------subError", value);

        robotStore.setError(value);
      });

      _resourceManager.subscriptions.subStationError(function (value) {
        _logger.default.d("sub-------subStationError", value);

        robotStore.setStationError(value);
      });

      _resourceManager.subscriptions.subCurRobotStatus(function (value) {
        _logger.default.i("++++++++++++++++++++++++++++++++++++++++++++++++++++++sub-------机器状态", value);

        robotStore.setCurRobotStatus(value);
      });

      _resourceManager.subscriptions.subCleanValues(function (value) {
        _logger.default.d("sub-------subCleanValues", value);

        robotStore.setCleanValues(value);
      });

      _resourceManager.subscriptions.subConsumables(function (value) {
        _logger.default.d("sub-------subConsumables", value);

        robotStore.setConsumables(value);
      });

      _resourceManager.subscriptions.subAutoWaterChange(function (value) {
        _logger.default.d("sub-------subAutoWaterChange", value);

        robotStore.setAutoWaterInstalled(value);
      });

      _resourceManager.subscriptions.subCleanWaterCistern(function (value) {
        _logger.default.d("sub-------subCleanWaterCistern", value);

        robotStore.setCleanWaterCistern(value);
      });

      _resourceManager.subscriptions.subDrainCistern(function (value) {
        _logger.default.d("sub-------subDrainCistern", value);

        robotStore.setDrainCistern(value);
      });

      _resourceManager.subscriptions.subDustBag(function (value) {
        _logger.default.d("sub-------subDustBag", value);

        robotStore.setDustBag(value);
      });

      _resourceManager.subscriptions.subMopCleanTank(function (value) {
        _logger.default.d("sub-------subMopCleanTank", value);

        robotStore.setMopCleanTank(value);
      });

      _resourceManager.subscriptions.expandedMap(function (value) {
        _logger.default.d("sub-------expandedMap", value);

        mapStore.setIsExpandedMap(value);
      });

      _resourceManager.subscriptions.awCheckData(function (value) {
        _logger.default.d("sub-------awCheckData", value);

        robotStore.setAwCheckData(value);
      });

      _resourceManager.subscriptions.subMapId(function (value) {
        _logger.default.d("sub-------mapId", value);
      });

      var preSubMapTime = Date.now();

      _resourceManager.subscriptions.subMapDataEvent(function (data) {
        var fileName = (data == null ? undefined : data.value) || "";

        _logger.default.d("sub-------subMapData", data);

        var now = Date.now();

        if (now - preSubMapTime > 300) {
          if (fileName.length) {
            _handelMapFile(fileName);
          } else {
            _logger.default.d("当前地图 - 空地图++++++++++++++++");

            mapStore.setCurMapInfo({});
          }

          preSubMapTime = now;
        } else {
          _logger.default.d("subMapDataEvent 处理多余消息");
        }
      });

      var preSubMapInfosTime = Date.now();

      _resourceManager.subscriptions.subMapInfos(function (data) {
        _logger.default.d("sub-------subMapInfos", data);

        var fileName = (data == null ? undefined : data.value) || "";
        var now = Date.now();

        if (now - preSubMapInfosTime > 300) {
          if (fileName.length) {
            _handelMapInfosFile(fileName);
          } else {
            _logger.default.d("空地图列表");

            mapStore.setMapInfos([]);
          }

          preSubMapInfosTime = now;
        } else {
          _logger.default.d("subMapInfos 处理多余消息");
        }
      });
    };

    var versionUpgradeCheck = function versionUpgradeCheck() {
      return _regenerator.default.async(function versionUpgradeCheck$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _miot.Service.smarthome.checkDeviceVersion(_miot.Device.deviceID, _miot.Device.type).then(function (res) {
                _logger.default.d("固件版本检测:", res);

                if ((res == null ? undefined : res.hasNewFirmware) && !res.isUpdating && robotStore.isInBaseStation && !robotStore.isLowPower) {
                  configStore.setNeedUpgrade(true);
                  commonStore.showMessageDialog({
                    title: _multilingual.default.keyword208,
                    message: (_multilingual.default == null ? undefined : _multilingual.default.keyword213) + " " + (res == null ? undefined : res.newVersion),
                    canDismiss: !res.isForce,
                    onCancel: res.isForce ? null : function () {},
                    onConfirm: function onConfirm() {
                      _miot.Host.ui.openDeviceUpgradePage(0);
                    }
                  });
                } else {
                  configStore.setNeedUpgrade(false);
                }
              }).catch(function (err) {
                _logger.default.d("checkDeviceVersion error: ", err);
              });

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      });
    };

    var _handelMapFile = function _handelMapFile(fileName) {
      var obj;
      return _regenerator.default.async(function _handelMapFile$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (fileName) {
                _context5.next = 3;
                break;
              }

              mapStore.setCurMapInfo({});
              return _context5.abrupt("return");

            case 3:
              _context5.prev = 3;
              _context5.next = 6;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapFileContent)(fileName));

            case 6:
              obj = _context5.sent;

              if (!(0, _is.isNull)(obj == null ? undefined : obj.mapId) && !(0, _is.isNull)(obj == null ? undefined : obj.fields[0])) {
                mapStore.setCurMapInfo(obj);
              }

              _context5.next = 13;
              break;

            case 10:
              _context5.prev = 10;
              _context5.t0 = _context5["catch"](3);

              _logger.default.e("首页地图更新事件错误", _context5.t0);

            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[3, 10]]);
    };

    var _handelMapInfosFile = function _handelMapInfosFile(fileName) {
      var obj;
      return _regenerator.default.async(function _handelMapInfosFile$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev 