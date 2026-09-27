                return (0, _objectSpread2.default)({}, item, {
                  mapData: "***",
                  mapTraceData: "***",
                  virtualWalls: _base.default.decode(item.virtualWalls)
                });
              }));

              mapStore.setMapInfos(obj);
              _context2.next = 25;
              break;

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](14);

              _logger.default.e("更新的地图列表数据 error:", _context2.t0);

            case 25:
              commonStore.hideLoading();

            case 26:
              _context2.next = 32;
              break;

            case 28:
              _context2.prev = 28;
              _context2.t1 = _context2["catch"](0);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e("拉取地图更新事件错误", _context2.t1);

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 28], [14, 22]]);
    };

    var _delMap = function _delMap(mapId) {
      var res;
      return _regenerator.default.async(function _delMap$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.delMap(mapId);
              }));

            case 2:
              res = _context3.sent;
              res && _getMapInfos();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    };

    var _saveMap = function _saveMap(_ref2) {
      var mapId = _ref2.mapId,
          _ref2$replaceMapId = _ref2.replaceMapId,
          replaceMapId = _ref2$replaceMapId === undefined ? "" : _ref2$replaceMapId;
      exeCmd(function () {
        return _resourceManager.actions.saveMap({
          mapId: mapId,
          isExpanded: 0,
          replaceMapId: replaceMapId
        });
      }).then(function (res) {
        if (res) {
          _getMapInfos();
        }
      });
    };

    var onChangeMapNameAction = function onChangeMapNameAction(mapId, name) {
      if ((0, _is.isNull)(name)) {
        return;
      }

      return exeCmd(function () {
        return _resourceManager.actions.editedMap({
          action: "mod",
          mapId: mapId,
          name: name
        });
      }).then(function (res) {
        if (res) {
          _getMapInfos();
        }
      });
    };

    var _switchMap = function _switchMap(mapId) {
      exeCmd(function () {
        return _resourceManager.actions.switchMap(mapId);
      }).then(function (res) {
        if (res) {
          _getMapInfos();
        }
      });
    };

    var _handelRunningStateFunc = function _handelRunningStateFunc(message, func) {
      if (robotStore.runningState) {
        commonStore.showMessageDialog({
          message: message,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            _stopClean().then(function (res) {
              if (res) {
                func && func();
              }
            });
          }
        });
      } else {
        func && func();
      }
    };

    var goFloorPage = function goFloorPage() {
      props.navigation.navigate("HouseType", {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword39
      });
    };

    var onCreatMapAction = function onCreatMapAction() {
      var confirmDelMap = function confirmDelMap() {
        return store.showCreateMapDialog();
      };

      _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, confirmDelMap);
    };

    var MultiFloor = function MultiFloor() {
      _resourceManager.actions.setMultifloorSwitch(true).then(function _callee(res) {
        return _regenerator.default.async(function _callee$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!res) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 3;
                return _regenerator.default.awrap(delay(500));

              case 3:
                _saveMap({
                  mapId: dialogmapId
                });

              case 4:
              case "end":
                return _context4.stop();
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

    var saveMapAction = function saveMapAction(mapId, isFull) {
      var shouldStopClean, savedMapInfos, _overflowSave, saveMap, stopCleanAndSaveMap;

      return _regenerator.default.async(function saveMapAction$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              shouldStopClean = robotStore.runningState;
              savedMapInfos = mapStore.mapInfos.filter(function (item) {
                return item.saved === 1;
              });

              _overflowSave = function _overflowSave() {
                if (robotStore.multifloorSwitch) {
                  if ((savedMapInfos == null ? undefined : savedMapInfos.length) >= 4) {
                    var options = savedMapInfos.map(function (item, index) {
                      return {
                        key: index,
                        name: item.name ? item.name : (_multilingual.default == null ? undefined : _multilingual.default.keyword235) + item.mapId,
                        value: item.mapId
                      };
                    });
                    setShowMapChoiceDialog({
                      visible: true,
                      listData: options,
                      onCancel: function onCancel() {
                        setShowMapChoiceDialog(function (as) {
                          return (0, _objectSpread2.default)({}, as, {
                            visible: false
                          });
                        });
                      },
                      onChoice: function onChoice(item) {
                        setShowMapChoiceDialog(function (as) {
                          return (0, _objectSpread2.default)({}, as, {
                            visible: false
                          });
                        });

                        _logger.default.d("+++++++++ 替换保存地图", item);

                        _saveMap({
                          mapId: mapId,
                          replaceMapId: item.value
                        });
                      }
                    });
                  } else {
                    _saveMap({
                      mapId: mapId
                    });
                  }
                } else {
                  if (savedMapInfos == null ? undefined : savedMapInfos.length) {
                    setDialogmapId(mapId);
                    setCleaningModeState(true);
                  } else {
                    _saveMap({
                      mapId: mapId
                    });
                  }
                }
              };

              saveMap = function saveMap() {
                if (!isFull) {
                  commonStore.showMessageDialog({
                    message: _multilingual.default == null ? undefined : _multilingual.default.keyword46,
                    onConfirm: function onConfirm() {
                      return _overflowSave();
                    },
                    onCancel: function onCancel() {}
                  });
                } else {
                  _overflowSave();
                }
              };

              if (shouldStopClean) {
                stopCleanAndSaveMap = function stopCleanAndSaveMap() {
                  return _regenerator.default.async(function stopCleanAndSaveMap$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _regenerator.default.awrap(_stopClean());

                        case 2:
                          if (!_context5.sent) {
                            _context5.next = 4;
                            break;
                          }

                          saveMap();

                        case 4:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  });
                };

                commonStore.showMessageDialog({
                  message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
                  onConfirm: stopCleanAndSaveMap,
                  onCancel: function onCancel() {}
                });
              } else {
                saveMap();
              }

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    };

    var delMapAction = function delMapAction(mapId) {
      _logger.default.d("delMapAction++++++", mapId);

      var confirmDelMap = function confirmDelMap() {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword238,
          onConfirm: function onConfirm() {
            return _delMap(mapId);
          },
          onCancel: function onCancel() {}
        });
      };

      if (mapStore.curMapInfo.mapId === mapId && robotStore.runningState) {
        _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, confirmDelMap);
      } else {
        confirmDelMap();
      }
    };

    var onNavigatePage = function onNavigatePage(page, params) {
      props.navigation.navigate(page, params);
    };

    var onSwitchMapAction = function onSwitchMapAction(mapId) {
      return _regenerator.default.async(function onSwitchMapAction$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, function () {
                return _switchMap(mapId);
              });

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      });
    };

    var mapDialogOnConfirm = function mapDialogOnConfirm(type) {
      store.hideCreateMapDialog();

      if (type === 'cleanBuilding') {
        exeCmd(_resourceManager.actions.startCleanBuilding).then(function (res) {
          if (res) {
            props.navigation.popToTop();
          }
        });
      } else if (type === 'fastBuilding') {
        exeCmd(_resourceManager.actions.startFastBuilding).then(function (res) {
          if (res) {
            props.navigation.popToTop();
          }
        });
      }
    };

    var MapListView = function MapListView() {
      return _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return robotStore.saveMapSwitch ? mapStore.sortedMapInfos.map(function (item) {
          var _item$mapData;

          return (((_item$mapData = item.mapData) == null ? undefined : _item$mapData.lz4Len) || 0) > 1 ? _react.default.createElement(_mapCard.default, {
            mapInfo: item,
            key: item.mapId,
            onSaveClick: saveMapAction,
            onDelClick: delMapAction,
            onNavigatePage: onNavigatePage,
            onChangeMapNameAction: onChangeMapNameAction,
            onSwitchMapAction: onSwitchMapAction
          }, _react.default.createElement(_map.default, {
            mapInfo: item,
            virtualCarpet: item == null ? undefined : item.carpet,
            virtualDoorsills: item == null ? undefined : item.thres,
            containerWidth: (0, _screenAdapte.sizeH)(350),
            containerHeight: (0, _screenAdapte.sizeH)(350),
            uiConfig: {
              isShowDoorsill: true,
              isShowBaseRing: true,
              isShowCarpet: true,
              isShowPileRin: true,
              isShowAreaTips: true
            }
          })) : null;
        }) : null;
      });
    };

    var MapTempView = function MapTempView() {
      return _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return robotStore.saveMapSwitch && mapStore.curMapInfo.mapId === 0 ? _react.default.createElement(_mapCard.default, {
          mapName: mapStore.currentMapName,
          mapInfo: mapStore.curMapInfo,
          onSaveClick: saveMapAction,
          onDelClick: delMapAction,
          onNavigatePage: onNavigatePage,
          onChangeMapNameAction: onChangeMapNameAction,
          onSwitchMapAction: onSwitchMapAction
        }, _react.default.createElement(_map.default, {
          mapInfo: mapStore.curMapInfo,
          virtualCarpet: mapStore.curMapInfo.carpet,
          virtualDoorsills: mapStore.curMapInfo.thres,
          containerWidth: (0, _screenAdapte.sizeH)(350),
          containerHeight: (0, _screenAdapte.sizeH)(350),
          uiConfig: {
            isShowBaseRing: true,
            isShowDoorsill: true,
            isShowCarpet: true,
            isShowPileRin: true,
            isShowAreaTips: true
          }
        })) : null;
      });
    };

    var Card = function Card() {
      var _useState9 = (0, _react.useState)(robotStore.saveMapSwitch),
          _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
          saveMapState = _useState10[0],
          setSaveMapState = _useState10[1];

      var saveMapSwitchAction = function saveMapSwitchAction(value) {
        setSaveMapState(value);

        if (value) {
          _changeSaveMapSwitch(value);
        } else {
          var confirmDelMap = function confirmDelMap() {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword38,
              onCancel: function onCancel() {
                setSaveMapState(true);
              },
              onConfirm: function onConfirm() {
                return _changeSaveMapSwitch(false);
              }
            });
          };

          if (robotStore.runningState) {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword37,
              onCancel: function onCancel() {
                setSaveMapState(true);
              },
              onConfirm: function onConfirm() {
                _stopClean().then(function (res) {
                  if (res) {
                    setTimeout(function () {
                      confirmDelMap();
                    }, 1000);
                  }
                });
              }
            });
          } else {
            confirmDelMap();
          }
        }
      };

      return _react.default.createElement(_reactNative.View, {
        style: styles.cards
      }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return _react.default.createElement(_list.ListCards, {
          listData: robotStore.saveMapSwitch ? [{
            type: "switch",
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword26,
            subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword27,
            switchValue: saveMapState,
            onSwitchValueChange: saveMapSwitchAction
          }, {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword39,
            value: robotStore.multifloorSwitch ? _multilingual.default == null ? undefined : _multilingual.default.keyword29 : _multilingual.default == null ? undefined : _multilingual.default.keyword28,
            onPress: goFloorPage
          }] : [{
            type: "switch",
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword26,
            subtitle: _multilingual.default == null ? undefined : _multilingual.default.keyword27,
            switchValue: saveMapState,
            onSwitchValueChange: saveMapSwitchAction
          }]
        });
      }));
    };

    return _react.default.createElement(_reactNative.View, {
      style: styles.container
    }, _react.default.createElement(_reactNative.View, {
      style: {
        paddingHorizontal: 16,
        flex: 1
      }
    }, _react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false
    }, _react.default.createElement(Card, null), _react.default.createElement(_reactNative.View, {
      style: {
        marginTop: (0, _screenAdapte.sizeH)(8),
        marginBottom: (0, _screenAdapte.sizeH)(34)
      }
    }, _react.default.createElement(MapTempView, null), _react.default.createElement(MapListView, null), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var savedMapInfos = (0, _mobx.toJS)(mapStore.mapInfos.filter(function (item) {
        return item.saved === 1;
      }));
      var isShow = robotStore.saveMapSwitch && (robotStore.multifloorSwitch ? savedMapInfos.length < 4 : savedMapInfos.length < 1);
      return isShow && _react.default.createElement(_emptyMapCard.default, {
        buttonText: _multilingual.default.keyword228,
        imageUrl: _Images.default.mapCard.mapCard,
        onPress: onCreatMapAction
      });
    }))), _react.default.createElement(_index2.ChoiceActionSheet, {
      visible: showMapChoiceDialog.visible,
      listData: showMapChoiceDialog.listData,
      title: _multilingual.default == null ? undefined : _multilingual.default.keyword51,
      onCancel: showMapChoiceDialog.onCancel,
      onChoice: showMapChoiceDialog.onChoice
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_index2.CreateMapDialog, {
        visible: store.isShowCreateMapDialog,
        onCancel: store.hideCreateMapDialog,
        onConfirm: mapDialogOnConfirm
      });
    }), _react.default.createElement(_floorMapSelection.default, {
      MultiFloor: MultiFloor,
      switchMap: switchMap,
      handleCancelDialog: handleCancelDialog,
      cleaningModeState: cleaningModeState
    })));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    container: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    cards: {
      backgroundColor: _styles.default.listStyles.backgroundColor,
      borderRadius: 12,
      overflow: "hidden",
      alignItems: "center"
    }
  });
  var _default = MapManage;
  exports.default = _default;
},11306,[14308,14305,14314,14674,14347,10297,10033,10913,10925,10010,10013,11309,10949,10088,10916,11016,10214,10352,10241,11282,11237,10082,10094,14875,10019,11120,10070,11201]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[5]);

  var _map = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _Images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _index = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[11]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var mapCardImages = _Images.default.mapCard;

  var MapCard = function MapCard(props) {
    var mapName = props.mapName,
        mapInfo = props.mapInfo,
        onSaveClick = props.onSaveClick,
        onDelClick = props.onDelClick,
        onMoreClick = props.onMoreClick,
        onNavigatePage = props.onNavigatePage,
        onChangeMapNameAction = p