edAreas));
        }

      };
    });

    var exeCmd = function exeCmd(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function exeCmd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loadingMessage = _args.length > 2 && _args[2] !== undefined ? _args[2] : _multilingual.default.keyword474;
              errorMessage = _args.length > 3 && _args[3] !== undefined ? _args[3] : _multilingual.default.keyword326;

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

    var _getMapInfos = function _getMapInfos() {
      var delayTime,
          res,
          _ref2,
          fileName,
          obj,
          _args2 = arguments;

      return _regenerator.default.async(function _getMapInfos$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              delayTime = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 2000;
              _context2.prev = 1;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context2.next = 5;
              return _regenerator.default.awrap(delay(delayTime));

            case 5:
              _context2.next = 7;
              return _regenerator.default.awrap(_resourceManager.actions.getMapInfos());

            case 7:
              res = _context2.sent;

              if (!res) {
                _context2.next = 25;
                break;
              }

              fileName = (_ref2 = res == null ? undefined : res[0]) != null ? _ref2 : '';

              if (fileName) {
                _context2.next = 14;
                break;
              }

              throw new Error("房间编辑后 地图数据错误 fileName 为空");

            case 14:
              _context2.prev = 14;
              _context2.next = 17;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapInfosFileContent)(fileName));

            case 17:
              obj = _context2.sent;
              mapStore.setMapInfos(obj);
              _context2.next = 24;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](14);

              _logger.default.e("更新的地图列表数据 error:", _context2.t0);

            case 24:
              commonStore.hideLoading();

            case 25:
              _context2.next = 31;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t1 = _context2["catch"](1);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e('拉取地图更新事件错误', _context2.t1);

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 27], [14, 21]]);
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

    function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    var _areasMerge = function _areasMerge() {
      exeCmd(function () {
        return _resourceManager.actions.setAreasMerge({
          roomIds: store.selectedAreas,
          mapId: mapId
        });
      }, null, _multilingual.default == null ? undefined : _multilingual.default.keyword253).then(function (res) {
        res && _getMapInfos(4000);
      });
    };

    var _areaSplit = function _areaSplit(points) {
      var times = String(Math.floor(Date.now() / 1000));
      exeCmd(function () {
        return _resourceManager.actions.setAreasSplit({
          roomId: store.selectedAreas[0],
          mapId: mapId,
          action: 'split',
          ts: times,
          points: (0, _index.pointArrToString)(points)
        });
      }, null, _multilingual.default == null ? undefined : _multilingual.default.keyword255).then(function (res) {
        commonStore.showLoading();

        if (res) {
          (0, _timer.setIntervalWithTimeout)(function (clear) {
            _resourceManager.propertys.getRoomEditeResult(function (value) {
              if (value.slice(2) === times) {
                clear();

                var _res = value.slice(0, 1);

                _logger.default.d('分割后读取读取分割结果', value);

                switch (_res) {
                  case '1':
                    commonStore.hideLoading();
                    commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword500);
                    break;

                  case '2':
                    commonStore.hideLoading();
                    commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword646);
                    break;

                  case '3':
                    commonStore.hideLoading();
                    commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword254);
                    break;

                  case '4':
                    commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword493);
                    break;

                  default:
                    _getMapInfos();

                    break;
                }
              }
            });
          }, 1000);
        }
      });
    };

    var _saveAreaInfo = function _saveAreaInfo(info) {
      _logger.default.d('+++++++++++++++保存  rooms 分类命名', info);

      exeCmd(function () {
        return _resourceManager.actions.roomInfoChange(info);
      }).then(function (res) {
        res && _getMapInfos();
        store.resetCurrentMode();
      });
    };

    function areRoomsAdjacent(rooms, selectedRooms) {
      if (selectedRooms.length < 2) return false;
      var adjMap = new Map();
      rooms.forEach(function (room) {
        adjMap.set(room.room_id, new Set(room.neibs.map(function (neib) {
          return Number(neib);
        })));
      });
      var visited = new Set();

      function dfs(roomId) {
        if (visited.has(roomId)) return;
        visited.add(roomId);
        var neighbors = adjMap.get(roomId) || [];
        neighbors.forEach(function (neighbor) {
          if (selectedRooms.includes(neighbor)) {
            dfs(neighbor);
          }
        });
      }

      dfs(selectedRooms[0]);
      return selectedRooms.every(function (roomId) {
        return visited.has(roomId);
      });
    }

    (0, _react.useEffect)(function () {
      navigation.setParams({
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword246,
        titleProps: {
          leftPress: store.currentMode !== RoomManagerType.None ? function () {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword76,
              canDismiss: false,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                props.navigation.goBack();
              }
            });
          } : null
        }
      });
    }, [store.currentMode, store.selectedAreas]);

    var handleLayout = function handleLayout(event) {
      var height = event.nativeEvent.layout.height;
      bottomItemHeightRef.current = height;
    };

    var onItemClick = function onItemClick(item) {
      var _handleItemSelect = function _handleItemSelect() {
        var _store$mapInfo4, area, _store$mapInfo5, _store$mapInfo5$areas, _store$mapInfo6, _area2;

        return _regenerator.default.async(function _handleItemSelect$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = item.type;
                _context3.next = _context3.t0 === RoomManagerType.Name ? 3 : _context3.t0 === RoomManagerType.Merge ? 13 : _context3.t0 === RoomManagerType.Segment ? 15 : 17;
                break;

              case 3:
                if (!(store.selectedAreas.length != 1)) {
                  _context3.next = 7;
                  break;
                }

                commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword492);
                _context3.next = 12;
                break;

              case 7:
                store.setCurrentMode(item.type);
                area = store == null ? undefined : (_store$mapInfo4 = store.mapInfo) == null ? undefined : _store$mapInfo4.areas.find(function (a) {
                  return a.room_id === store.selectedAreas[0];
                });

                if (area) {
                  _context3.next = 11;
                  break;
                }

                return _context3.abrupt("return");

              case 11:
                store.showNamingDialog({
                  roomId: area.room_id,
                  roomName: area.name,
                  category: area.type
                });

              case 12:
                return _context3.abrupt("break", 18);

              case 13:
                if (store.selectedAreas.length <= 1) {
                  commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword251);
                } else {
                  store.setCurrentMode(item.type);
                }

                return _context3.abrupt("break", 18);

              case 15:
                if (store.selectedAreas.length != 1) {
                  commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword252);
                } else if (((_store$mapInfo5 = store.mapInfo) == null ? undefined : (_store$mapInfo5$areas = _store$mapInfo5.areas) == null ? undefined : _store$mapInfo5$areas.length) > 14) {
                  commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword500);
                } else {
                  store.setCurrentMode(item.type);
                  _area2 = store == null ? undefined : (_store$mapInfo6 = store.mapInfo) == null ? undefined : _store$mapInfo6.areas.find(function (a) {
                    return a.room_id === store.selectedAreas[0];
                  });
                  store.isShowSplitLine = _area2 != undefined;
                }

                return _context3.abrupt("break", 18);

              case 17:
                return _context3.abrupt("break", 18);

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        });
      };

      var stopCleanAndHandleItemSelect = function stopCleanAndHandleItemSelect() {
        return _regenerator.default.async(function stopCleanAndHandleItemSelect$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _stopClean();

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        });
      };

      if (robotStore.runningState) {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
          onConfirm: stopCleanAndHandleItemSelect,
          onCancel: function onCancel() {}
        });
      } else {
        _handleItemSelect();
      }
    };

    var onClickArea = function onClickArea(curArea) {
      if (curArea === -1) return;
      store.changeSelectedAreas(curArea);
    };

    var onSplitLineChange = function onSplitLineChange(points, overAreas) {
      store.setSplitLineInfo(points, overAreas);
    };

    var onSaveCategoryNaming = function onSaveCategoryNaming(_ref3) {
      var roomId, category, name, roomInfos;
      return _regenerator.default.async(function onSaveCategoryNaming$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              roomId = _ref3.roomId, category = _ref3.category, name = _ref3.name;
              roomInfos = {
                mapId: mapId
              };
              roomInfos.rooms = [{
                roomId: roomId,
                name: name,
                category: category
              }];

              _saveAreaInfo(roomInfos);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      });
    };

    var cancelSave = function cancelSave() {
      store.resetCurrentMode();
    };

    var confirmSave = function confirmSave() {
      if (store.currentMode === RoomManagerType.Merge) {
        var _store$mapInfo7;

        var isBordered = areRoomsAdjacent((_store$mapInfo7 = store.mapInfo) == null ? undefined : _store$mapInfo7.areas, (0, _mobx.toJS)(store.selectedAreas));

        if (isBordered) {
          _areasMerge();

          store.resetCurrentMode();
        } else {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword251);
        }
      } else if (store.currentMode === RoomManagerType.Segment) {
        var _store$splitLineOverA;

        if ((_store$splitLineOverA = store.splitLineOverAreas) == null ? undefined : _store$splitLineOverA.has(store.selectedAreas[0])) {
          _areaSplit(store.splitLinePoints);

          store.resetCurrentMode();
        } else {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword254);
        }
      } else if (store.currentMode === RoomManagerType.Name) {
        store.resetCurrentMode();
      }
    };

    return _react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.prohRoot
    }, _react.default.createElement(_reactNative.View, {
      style: {
        width: '100%',
        alignItems: 'center',
        zIndex: 1
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_SelectivePrompting.default, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword250,
        visible: store.selectedAreas.length === 0
      });
    })), _react.default.createElement(_reactNative.View, {
      style: styles.prohMap
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_map.default, {
        containerWidth: _screenAdapte.SCREEN_WIDTH,
        containerHeight: _screenAdapte.SCREEN_HEIGHT - (0, _screenAdapte.sizeH)(250),
        mapInfo: store.mapInfo,
        selectedAreas: store.selectedAreas,
        onClickArea: onClickArea,
        onSplitLineChange: onSplitLineChange,
        uiConfig: {
          isShowSplitLine: store.isShowSplitLine,
          areaTipType: store.calculateAreaTipType,
          isShowAreaTips: true,
          isSupportSelectArea: true,
          isSupportPanZoom: true
        }
      });
    })), _react.default.createElement(_reactNative.View, {
      style: styles.bottomContainer
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return store.currentMode === RoomManagerType.None ? roomItems == null ? undefined : roomItems.map(function (item, index) {
        var disableds = item.type === RoomManagerType.Segment && store.selectedAreas.length > 1 || item.type === RoomManagerType.Name && store.selectedAreas.length > 1;
        return _react.default.createElement(_reactNative.TouchableOpacity, {
          key: index,
          style: {
            flex: 1,
            alignItems: 'center',
            marginBottom: _reactNative.Platform.OS !== 'ios' ? 16 : 0
          },
          disabled: disableds,
          onPress: function onPress() {
            return onItemClick(item);
          },
          onLayout: handleLayout
        }, _react.default.createElement(_reactNative.View, {
          style: [styles.funcCardIcon, {
            opacity: disableds ? 0.3 : 1
          }]
        }, _react.default.createElement(item.icon, null)), _react.default.createElement(_reactNative.Text, {
          style: [styles.funcCardText, {
            opacity: disableds ? 0.3 : 1
          }]
        }, item.title));
      }) : _react.default.createElement(_reactNative.View, {
        style: {
          width: '100%',
          height: (0, _screenAdapte.sizeH)(bottomItemHeightRef.current),
          borderTopStartRadius: 12,
          borderTopEndRadius: 12,
          borderColor: '#fff',
          borderTopWidth: 1
        }
      }, _react.default.createElement(_reactNativeLinearGradient.default, {
        colors: colorMode,
        style: {
          flex: 1,
          flexDirection: "row",
          justifyContent: 'space-between'
        }
      }, _react.default.createElement(_reactNative.TouchableOpacity, {
        style: {
          width: (0, _screenAdapte.sizeW)(48),
          height: (0, _screenAdapte.sizeH)(48),
          alignItems: 'center',
          justifyContent: 'center'
        },
        onPress: cancelSave
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(12),
          height: (0, _screenAdapte.sizeH)(12),
          tintColor: _miot.DarkMode.getColorScheme() === 'light' ? 'xm#000' : 'xm#fff'
        },
        resizeMode: "contain",
        source: InteractiveImgaes.ClOSE
      })), _react.default.createElement(_reactNative.Text, {
        style: [styles.funcCardText, {
          marginTop: (0, _screenAdapte.sizeH)(18),
          fontSize: (0, _screenAdapte.pText)(14)
        }]
      }, store.bottomTitle), _react.default.createElement(_reactNative.TouchableOpacity, {
        style: {
          width: (0, _screenAdapte.sizeW)(48),
          height: (0, _screenAdapte.sizeH)(48),
          alignItems: 'center',
          justifyContent: 'center'
        },
        onPress: confirmSave
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(18),
          height: (0, _screenAdapte.sizeH)(13)
        },
        resizeMode: "contain",
        source: InteractiveImgaes.SUCCESS
      }))));
    })), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var _store$mapInfo8, _store$mapInfo8$areas;

      return _react.default.createElement(_RoomName.default, {
        visible: store.namingDialog.visible,
        onCancel: store.hideNamingDialog,
        onConfirm: onSaveCategoryNaming,
        roomId: store.namingDialog.roomId,
        roomName: store.namingDialog.roomName,
        roomNameStr: store == null ? undefined : (_store$mapInfo8 = store.mapInfo) == null ? undefined : (_store$mapInfo8$areas = _store$mapInfo8.areas) == null ? undefined : _store$mapInfo8$areas.map(function (room) {
          return {
            name: room.name,
            type: room.type,
            id: room.id
          };
        }),
        category: store.namingDialog.category
      });
    }));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    prohRoot: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor,
      alignItems: "center"
    },
    prohMap: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      width: '100%'
    },
    bottomContainer: {
      borderRadius: 8,
      flexDirection: "row",
      alignSelf: 'stretch',
      justifyContent: "space-around"
    },
    funcCardIcon: {
      width: 50,
      height: 50,
      backgroundColor: "xm#fff",
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 8
    },
    funcCardIconImg: {
      width: (0, _screenAdapte.sizeW)(22),
      height: (0, _screenAdapte.sizeH)(22)
    },
    funcCardText: (0, _objectSpread2.default)({}, _styles.default.listTitles, {
      fontSize: (0, _screenAdapte.pText)(12),
      textAlign: 'center',
     