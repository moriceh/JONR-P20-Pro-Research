sume);
          }
        }

        listener && listener.remove();
      };
    }, []);

    function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    (0, _react.useEffect)(function () {
      var saveEdited = function saveEdited() {
        if (!isConnected) {
          commonStore.showToast(_multilingual.default.keyword321);
          return false;
        }

        function processWithDelay(item, index, length) {
          return _regenerator.default.async(function processWithDelay$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _regenerator.default.awrap(delay(500 * index));

                case 2:
                  if (!(0, _version.isNewerVersion439_632)()) {
                    _context.next = 6;
                    break;
                  }

                  return _context.abrupt("return", _index.actions.setVirtualWalls({
                    index: index,
                    total: length,
                    virtuaList: item
                  }));

                case 6:
                  return _context.abrupt("return", _index.actions.setVirtualWalls(item));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          });
        }

        var changedWalls = virtualWalls.filter(function (item) {
          return item.action && item.action !== _enum.VirtualActionType.Normal;
        });
        changedWalls.forEach(function (item) {
          item.mode = 1;
          item.point = (0, _index4.pointArrToString)(item.points);
        });
        var changedMops = mopWalls.filter(function (item) {
          return item.action && item.action !== _enum.VirtualActionType.Normal;
        });
        changedMops.forEach(function (item) {
          item.mode = 2;
          item.point = (0, _index4.pointArrToString)(item.points);
        });
        var mergedChanges = changedWalls.concat(changedMops).map(function (item) {
          delete item.points;
          return item;
        });

        if (mergedChanges.length > 0) {
          var splitArrays = splitArray(mergedChanges);

          _logger.default.d("++++++++++++++++++++ 上报 VirtualWalls", mergedChanges);

          commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword467);
          Promise.all(splitArrays.map(function (item, index) {
            return processWithDelay(item, index, splitArrays.length);
          })).then(function (res) {
            if (!res.every(function (item) {
              return item;
            })) {
              return commonStore.hideLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword326);
            }
          });
        } else {
          return props.navigation.goBack();
        }
      };

      var submitData = function submitData() {
        function checkArea(data, checkFn) {
          return data.some(function (item) {
            return checkFn(item.points);
          });
        }

        var isNearRestrictedArea = function isNearRestrictedArea(data) {
          return checkArea(data, checkOverChargePos);
        };

        var isWithinRestrictedArea = function isWithinRestrictedArea(data) {
          return checkArea(data, checkOverPos);
        };

        var virtualWall = virtualWalls.filter(function (wall) {
          return wall.type === 1 && wall.action !== _enum.VirtualActionType.Del;
        });
        var penaltyZone = virtualWalls.filter(function (wall) {
          return wall.type === 2 && wall.action !== _enum.VirtualActionType.Del;
        });
        var mopWallsZone = mopWalls.filter(function (wall) {
          return wall.type === 2 && wall.action !== _enum.VirtualActionType.Del;
        });

        if (virtualWall.length || penaltyZone.length || mopWallsZone.length) {
          var insidePenaltyZone = isWithinRestrictedArea(penaltyZone);
          var virtualWallRes = isNearRestrictedArea(virtualWall);
          var penaltyZoneRes = isNearRestrictedArea(penaltyZone);
          var mopWallsRes = isNearRestrictedArea(mopWallsZone);
          var insideMopWalls = isWithinRestrictedArea(mopWallsZone);
          var withinestrictedAreaRobot = isWithinRestrictedArea(penaltyZone);
          var moppingRestrictedAreaRobot = isWithinRestrictedArea(mopWallsZone);

          if (withinestrictedAreaRobot || moppingRestrictedAreaRobot) {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword498,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                saveEdited();
              }
            });
          } else if (virtualWallRes || penaltyZoneRes || mopWallsRes || insidePenaltyZone || insideMopWalls) {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword497,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                saveEdited();
              }
            });
          } else {
            saveEdited();
          }
        } else {
          saveEdited();
        }
      };

      navigation.setParams({
        titleProps: {
          leftPress: hasEdited.current ? function () {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword76,
              canDismiss: false,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                props.navigation.goBack();
              }
            });
          } : null,
          right: [{
            key: _NavigationBar.default.ICON.COMPLETE,
            onPress: submitData
          }]
        }
      });
    }, [isConnected, mopWalls, virtualWalls]);

    var addVirtualArea = function addVirtualArea(index) {
      if (index === 0) {
        addVirtualWall(1);
      } else if (index === 1) {
        addVirtualWall(2);
      } else if (index === 2) {
        addMopWall();
      }

      hasEdited.current = true;
    };

    var addVirtualWall = function addVirtualWall(type) {
      var type1Count = virtualWalls.filter(function (wall) {
        return wall.type === 1 && wall.action !== _enum.VirtualActionType.Del;
      }).length;
      var type2Count = virtualWalls.filter(function (wall) {
        return wall.type === 2 && wall.action !== _enum.VirtualActionType.Del;
      }).length;

      if (type === 1) {
        if (type1Count >= 10) {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword244);
          return;
        }
      }

      if (type === 2) {
        if (type2Count >= 10) {
          commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword244);
          return;
        }
      }

      var points = type === 1 ? _getLinePoints(virtualWalls) : _getAreaPoints(virtualWalls);
      var wall = {
        type: type,
        points: points,
        mapId: mapInfo.mapId,
        action: _enum.VirtualActionType.Add,
        isActive: true,
        aid: (0, _index5.getNextAvailableId)(virtualWalls.map(function (item) {
          var _ref;

          return (_ref = item == null ? undefined : item.id) != null ? _ref : item.aid;
        }))
      };
      MDispatch({
        type: "inactive"
      });
      vDispatch({
        type: "add",
        wall: wall
      });

      if (checkOverChargePos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword245);
      } else if (checkOverPos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword496);
      }
    };

    var addMopWall = function addMopWall() {
      var count = mopWalls.filter(function (wall) {
        return wall.action !== _enum.VirtualActionType.Del;
      }).length;
      var type = 2;

      if (count >= 10) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword244);
        return;
      }

      var points = _getAreaPoints(mopWalls);

      var wall = {
        type: type,
        points: points,
        mapId: mapInfo.mapId,
        action: _enum.VirtualActionType.Add,
        isActive: true,
        aid: (0, _index5.getNextAvailableId)(mopWalls.map(function (item) {
          var _ref2;

          return (_ref2 = item == null ? undefined : item.id) != null ? _ref2 : item.aid;
        }))
      };
      vDispatch({
        type: "inactive"
      });
      MDispatch({
        type: "add",
        wall: wall
      });

      if (checkOverChargePos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword245);
      } else if (checkOverPos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword496);
      }
    };

    var onVirtualWallsChange = function onVirtualWallsChange(actionType, id, changeType, points) {
      _logger.default.d("++++++++++++++++++++虚拟墙changeMode", actionType, id, changeType, points);

      hasEdited.current = true;
      var isAdded = actionType === _enum.VirtualActionType.Add;

      if (changeType === "active") {
        MDispatch({
          type: "inactive"
        });
      }

      vDispatch({
        type: changeType,
        isAdded: isAdded,
        id: id,
        points: points
      });

      if (checkOverChargePos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword245);
      } else if (checkOverPos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword496);
      }
    };

    var onMopWallsChange = function onMopWallsChange(actionType, id, changeType, points) {
      var isAdded = actionType === _enum.VirtualActionType.Add;

      _logger.default.d("++++++++++++++++++++++++mopWalls", mopWalls, changeType);

      if (changeType === "active") {
        vDispatch({
          type: "inactive"
        });
      }

      MDispatch({
        type: changeType,
        isAdded: isAdded,
        id: id,
        points: points
      });

      if (checkOverChargePos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword245);
      } else if (checkOverPos(points)) {
        commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword496);
      }
    };

    function checkOverChargePos(areaPoints) {
      if ((0, _is.isNull)(chargePos) || (0, _is.isNull)(areaPoints)) return false;
      var isIntersect = false;

      if (areaPoints.length === 2) {
        chargePos.radius = 5;
        isIntersect = (0, _circleIntersectRect.circleInLine)(chargePos, areaPoints);
      } else if (areaPoints.length === 4) {
        chargePos.radius = 10;
        isIntersect = (0, _circleIntersectRect.default)(chargePos, areaPoints);
      }

      return isIntersect;
    }

    function checkOverPos(areaPoints) {
      if ((0, _is.isNull)(robotPos) || (0, _is.isNull)(areaPoints) || areaPoints.length != 4) return false;
      robotPos.radius = 1;
      var isIntersect = (0, _circleIntersectRect.default)(robotPos, areaPoints);
      return isIntersect;
    }

    function splitArray(arr) {
      var result = [];
      var chunkSize = 5;

      for (var i = 0; i < arr.length; i += chunkSize) {
        var chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
      }

      return result;
    }

    function _getAreaPoints(areas) {
      var _areas$filter;

      var addAreas = (_areas$filter = areas.filter(function (item) {
        return item.type === 2 && item.action === _enum.VirtualActionType.Add;
      })) == null ? undefined : _areas$filter.map(function (item) {
        return item.points;
      });
      var newAreaAxes = (0, _mapStateUtils.getNewAreaAxis)(mapInfo.mapData, addAreas);
      return newAreaAxes;
    }

    function _getLinePoints(areas) {
      var _areas$filter2;

      var addLines = (_areas$filter2 = areas.filter(function (item) {
        return item.action === _enum.VirtualActionType.Add;
      })) == null ? undefined : _areas$filter2.map(function (item) {
        return item.points;
      });
      var newAreaAxes = (0, _mapStateUtils.getNewLineAxis)(mapInfo.mapData, addLines);
      return newAreaAxes;
    }

    return _react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.prohRoot
    }, _react.default.createElement(_reactNative.View, {
      style: styles.prohMap
    }, _react.default.createElement(_index3.default, {
      containerWidth: _screenAdapte.SCREEN_WIDTH,
      containerHeight: _screenAdapte.SCREEN_HEIGHT - (0, _screenAdapte.sizeH)(250),
      mapInfo: mapInfo,
      virtualData: virtualWalls,
      mopWallData: mopWalls,
      onVirtualWallsChange: onVirtualWallsChange,
      onMopWallsChange: onMopWallsChange,
      uiConfig: {
        isEditPileRin: true,
        isShowPileRin: true,
        isShowCurPosRing: true,
        isShowBaseRing: true,
        isShowAreaTips: true,
        isSupportPanZoom: true
      }
    })), _react.default.createElement(_reactNative.View, {
      style: styles.prohBottom
    }, _react.default.createElement(_reactNative.View, {
      style: styles.funcCard
    }, itemsData == null ? undefined : itemsData.map(function (item, index) {
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        key: index,
        style: styles.funcCardRow,
        onPress: function onPress() {
          return addVirtualArea(index);
        }
      }, _react.default.createElement(_reactNative.View, {
        style: styles.funcCardIcon
      }, _react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        style: styles.funcCardIconImg,
        source: item.icon
      })), _react.default.createElement(_reactNative.View, {
        style: {
          paddingLeft: _reactNative.Platform.OS !== "ios" && ((_multilingual.default == null ? undefined : _multilingual.default.keyword241.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword242.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword243.length) >= 16) ? 12 : 0
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.funcCardIconText
      }, item.title)));
    }))));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    prohRoot: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    prohMap: {
      flex: 1
    },
    prohBottom: {
      width: "100%",
      alignSelf: "flex-end",
      paddingHorizontal: (0, _screenAdapte.sizeW)(16)
    },
    funcCard: {
      borderRadius: 8,
      flexDirection: "row",
      marginBottom: _reactNative.Platform.OS !== "ios" ? 16 : 0
    },
    funcCardRow: {
      flex: 1,
      alignItems: "center"
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
      width: (0, _screenAdapte.sizeW)(48),
      height: (0, _screenAdapte.sizeH)(48)
    },
    funcCardIconText: (0, _objectSpread2.default)({}, _styles.default.listTitles, {
      fontSize: (0, _screenAdapte.pText)(12),
      textAlign: "center",
      color: new _DynamicColor.default("#6F7C7B", "#FFF