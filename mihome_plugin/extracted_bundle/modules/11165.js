         }
            });
          }

          break;

        case _enum.MapSettingType.CustomParameters:
          onNavigateToPage("CustomizedParameters", {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword478,
            mapId: mapInfo.mapId,
            titleProps: {
              titleStyle: {
                fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword125.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
              }
            }
          });
          break;

        case _enum.MapSettingType.Ground:
          onNavigateToPage("CarpetStrategy", {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword461,
            mapInfo: mapInfo
          });
          break;
      }
    }, [onHideDialog, onNavigateToPage, mapInfo, isNewMap, mapStore == null ? undefined : (_mapStore$curMapInfo2 = mapStore.curMapInfo) == null ? undefined : _mapStore$curMapInfo2.mapId, onSaveMapClick, onDeleteMap, _handelRunningStateFunc]);
    var onMapNameInput = (0, _react.useCallback)(function (result) {
      setShowInputDialog(false);
      var newName = result.textInputArray[0] || "";
      onChangeMapName(mapInfo.mapId, newName);
    }, [mapInfo.mapId, onChangeMapName]);

    var RightTipView = function RightTipView(_ref3) {
      var rightTipType = _ref3.rightTipType;

      var _useState11 = (0, _react.useState)(mapStore.mapInfos),
          _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
          mapInfos = _useState12[0],
          setMapInfo = _useState12[1];

      (0, _react.useEffect)(function () {
        setMapInfo(mapStore.mapInfos);
      }, [mapStore.mapInfos]);

      switch (rightTipType) {
        case RightTipType.Switch:
          {
            return _react.default.createElement(_reactNative.TouchableOpacity, {
              onPress: onRightTipClick,
              style: {
                flexDirection: 'row',
                alignItems: 'center'
              }
            }, _react.default.createElement(_SwitchMap.default, null), _react.default.createElement(_reactNative.Text, {
              style: [styles.titleNames, {
                color: _styles.default.MainColor.color
              }]
            }, _multilingual.default == null ? undefined : _multilingual.default.keyword237));
          }

        case RightTipType.InUse:
          {
            return _react.default.createElement(_reactNative.View, {
              style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F1F7F7',
                borderRadius: 39,
                paddingHorizontal: 11,
                paddingVertical: 5
              }
            }, _react.default.createElement(_reactNative.Text, {
              style: [styles.titleNames, {
                color: '#6F7C7B'
              }]
            }, _multilingual.default == null ? undefined : _multilingual.default.keyword55));
          }

        case RightTipType.NoUse:
          {
            return _react.default.createElement(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                return onRightTipClick(mapInfo.mapId);
              },
              style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#F1F7F7",
                borderRadius: 39,
                paddingHorizontal: 11,
                paddingVertical: 5
              }
            }, _react.default.createElement(_reactNative.Text, {
              style: [styles.titleNames, {
                color: _styles.default.MainColor.color
              }]
            }, _multilingual.default == null ? undefined : _multilingual.default.keyword54));
          }

        case RightTipType.None:
        default:
          return _react.default.createElement(_react.default.Fragment, null);
      }
    };

    var floatListClick = function floatListClick(key) {
      switch (key) {
        case 1:
          onSaveMapClick(mapInfo.mapId);
          setFloatListState(false);
          break;

        case 2:
          onHideDialog && onHideDialog();
          onNavigateToPage('MapManage', {
            title: _multilingual.default.keyword36
          });
          break;

        case 3:
          onHideDialog && onHideDialog();
          onMapCreatClick && onMapCreatClick();
          break;

        default:
          break;
      }
    };

    var cardFunClick = function cardFunClick(key) {
      switch (key) {
        case 1:
          onChangeMapNameClick();
          break;

        case 2:
          if (robotStore.runningState) {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword47,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                exeCmd(function () {
                  return _stopClean();
                }, function () {
                  return _resourceManager.actions.switchMap(mapInfo.mapId);
                }).then(function (res) {
                  _getMapInfos();

                  onHideDialog && onHideDialog();
                });
              }
            });
          } else {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword668,
              onCancel: function onCancel() {
                setFloatListState(false);
              },
              onConfirm: function onConfirm() {
                exeCmd(function () {
                  return _resourceManager.actions.switchMap(mapInfo.mapId);
                }, function () {
                  return _getMapInfos();
                });
                onHideDialog && onHideDialog();
              }
            });
          }

          break;

        case 3:
          onDeleteMap(mapInfo.mapId);
          break;

        default:
          break;
      }
    };

    var targetRef = (0, _react.useRef)(null);

    var _useState13 = (0, _react.useState)({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }),
        _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
        position = _useState14[0],
        setPosition = _useState14[1];

    var measureElement = function measureElement() {
      targetRef.current.measure(function (x, y, width, height, pageX, pageY) {
        setFloatListState(!floatListState);
        setPosition({
          x: pageX,
          y: pageY,
          width: width,
          height: height
        });
      });
    };

   