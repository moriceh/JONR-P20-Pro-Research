nt,
            D: (_ref6 = prefer == null ? undefined : prefer.drag) != null ? _ref6 : robotStore.routePrefer,
            R: room_id
          });
        });
        store.setCurCustomizationData(arr);
        store.setCustomizationData(customdata);
      });
      var disposer2 = (0, _mobx.autorun)(function () {
        var mapToCustomizationData = store.curCustomizationData.map(function (item) {
          return {
            I: mapId,
            K: item.mode,
            F: item.wind,
            W: item.water,
            C: item.count,
            D: item.drag,
            R: item.room_id
          };
        }).sort(function (a, b) {
          return a.R - b.R;
        });
        var result = !(0, _lodash.isEqual)(mapToCustomizationData, (0, _mobx.toJS)(store.customizationData.data).sort(function (a, b) {
          return a.R - b.R;
        }));
        setComparativeParametersResult(result);
        var params = (0, _mobx.toJS)(store.customizationData.data).map(function (item) {
          return [item.R, item.K === _enum.WorkMode.OnlyMop ? null : item.F, item.K === _enum.WorkMode.OnlySweep ? null : item.W, item.D, item.C];
        });
        store.setCleaningModeParameters(params);
      });
      return function () {
        disposer && disposer();
        disposer2 && disposer2();
      };
    }, []);
    (0, _react.useEffect)(function () {
      navigation.setParams({
        titleProps: {
          titleStyle: {
            fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword125.length) >= 21 ? (0, _screenAdapte.pText)(12) : (0, _screenAdapte.pText)(20)
          },
          leftPress: comparativeParametersResult ? function () {
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
            key: _NavigationBar.default.ICON.DETAIL,
            onPress: showModal
          }, {
            key: _NavigationBar.default.ICON.COMPLETE,
            onPress: save
          }]
        }
      });
    }, [comparativeParametersResult]);

    var save = function save() {
      var res;
      return _regenerator.default.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!comparativeParametersResult) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return _regenerator.default.awrap(uploadData(store.customizationData));

            case 3:
              res = _context.sent;

              if (!res.every(function (res) {
                return res;
              })) {
                commonStore.hideLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword326);
              } else {
                commonStore.hideLoading();
              }

            case 5:
              navigation.popToTop();

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    var showModal = function showModal() {
      commonStore.showMessageDialog({
        message: _multilingual.default == null ? undefined : _multilingual.default.keyword659,
        confirm: _multilingual.default.keyword329,
        onConfirm: function onConfirm() {}
      });
    };

    var store = (0, _mobxReactLite.useLocalObservable)(function () {
      return {
        cleaningTypeDialog: {
          visible: false,
          roomId: null,
          roomName: '',
          category: null
        },
        isShowSplitLine: false,
        selectedAreas: [],
        curCustomizationData: [],
        customizationData: {
          type: 1,
          data: []
        },
        cleaningModeParameters: [],
        isShowCleanModeDialog: false,

        get isDefaultSetting() {
          return store.customizationData.data.every(function (item) {
            return (0, _lodash.isEqual)([item == null ? undefined : item.K, item == null ? undefined : item.F, item == null ? undefined : item.W, item == null ? undefined : item.C, item == null ? undefined : item.D], _tabDatas.defaultCleaningModeParameters);
          });
        },

        get mapInfo() {
          var _mapStore$mapInfos;

          return (_mapStore$mapInfos = mapStore.mapInfos) == null ? undefined : _mapStore$mapInfos.find(function (item) {
            return item.mapId === mapId;
          });
        },

        setCleaningModeParameters: function setCleaningModeParameters(data) {
          this.cleaningModeParameters = data;
        },
        setCustomizationData: function setCustomizationData(data) {
          this.customizationData.data = data;
        },
        hideCleanModeDialog: function hideCleanModeDialog() {
          this.cleaningTypeDialog.visible = false;
        },
        setCurCustomizationData: function setCurCustomizationData(data) {
          this.curCustomizationData = data;
        },
        roomCleaningType: function roomCleaningType(data) {
          this.cleaningTypeDialog = (0, _objectSpread4.default)({
            visible: true
          }, data);
        },
        clearSelectedAreas: function clearSelectedAreas() {
          this.selectedAreas = [];
        },
        changeSelectedAreas: function changeSelectedAreas(curArea) {
          var result = this.selectedAreas.includes(curArea) ? [] : [curArea];
          this.selectedAreas = result;

          if (result.length) {
            var _store$mapInfo2;

            var area = (_store$mapInfo2 = store.mapInfo) == null ? undefined : _store$mapInfo2.areas.find(function (a) {
              return a.room_id === result[0];
            });
            var custom = store.customizationData.data.find(function (item) {
              return item.R === result[0];
            });
            if (!area || !custom) return;
            this.roomCleaningType({
              roomId: custom.R,
              roomName: area.name,
              category: area.type,
              workMode: custom.K,
              fanMode: custom.F,
              waterMode: custom.W,
              routePrefer: custom.D,
              cleanCount: custom.C
            });
          }
        }
      };
    });

    var onClickArea = function onClickArea(curArea) {
      if (curArea === -1) return;
      store.changeSelectedAreas(curArea);
    };

    var delay = function delay(ms) {
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    };

    var processWithDelay = function processWithDelay(total, index, data, type) {
      var params;
      return _regenerator.default.async(function processWithDelay$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator.default.awrap(delay(500 * index));

            case 2:
              params = JSON.stringify({
                total: total,
                index: index,
                customdata: {
                  type: type,
                  data: data
                }
              });
              return _context2.abrupt("return", _index.actions.setCustomizationRooms(params));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    };

    var splitArray = function splitArray(arr) {
      var result = [];
      var chunkSize = 5;

      for (var i = 0; i < arr.length; i += chunkSize) {
        var chunk = arr.slice(i, i + chunkSize);
        result.push(chunk);
      }

      return result;
    };

    var uploadData = function uploadData(customdata) {
      var splitArrays = splitArray(customdata.data);
      commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword467);
      return Promise.all(splitArrays.map(function (item, index) {
        return processWithDelay(splitArrays.length, index, item, customdata.type);
      }));
    };

    var customizedOperation = function customizedOperation(_ref7) {
      var _store$mapInfo3;

      var type = _ref7.type;
      var customdata = [];
      var areaData = (_store$mapInfo3 = store.mapInfo) == null ? undefined : _store$mapInfo3.areas;

      if (type === 'default') {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword654,
          canDismiss: false,
          onConfirm: function onConfirm() {
            for (var index = 0; index < areaData.length; index++) {
              var room_id = areaData[index].room_id;
              customdata.push({
                "I": mapId,
                "K": _enum.WorkMode.BothWork,
                "F": _enum.FanMode.Auto,
                "W": _enum.WaterMode.Mid,
                "C": _enum.CleaningTimes.One,
                "D": _enum.RoutePrefer.Daily,
                "R": room_id
              });
            }

            store.setCustomizationData(customdata);
          },
          onCancel: function onCancel() {}
        });
      }

      if (type === 'intelligent') {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword679,
          canDismiss: false,
          onConfirm: function onConfirm() {
            for (var index = 0; index < areaData.length; index++) {
              var _areaData$index = areaData[index],
                  _type = _areaData$index.type,
                  room_id = _areaData$index.room_id;
              var obj = {
                category1: _tabDatas.category1,
                category2: _tabDatas.category2,
                category3: _tabDatas.category3,
                category4: _tabDatas.category4,
                category5: _tabDatas.category5
              };

              for (var key in obj) {
                if (obj[key].includes(parseInt(_type))) {
                  var smartParamsData = _tabDatas.smartCleaningModeParameters[key][groundMaterial];
                  customdata.push({
                    "I": mapId,
                    "K": smartParamsData[0],
                    "F": smartParamsData[1],
                    "W": smartParamsData[2],
                    "C": smartParamsData[3],
                    "D": smartParamsData[4],
                    "R": room_id
                  });
                }
              }
            }

            store.setCustomizationData(customdata);
          },
          onCancel: function onCancel() {}
        });
      }
    };

    var onCleanModeChange = function onCleanModeChange(type, value) {
      var objCustomizationData = {
        'work': "K",
        'fan': "F",
        'water': "W",
        'count': "C",
        'route': "D"
      };
      var objRoomCleaningType = {
        'work': "workMode",
        'fan': "fanMode",
        'water': "waterMode",
        'count': "cleanCount",
        'route': "routePrefer"
      };
      var data = store.customizationData.data.map(function (item) {
        if (item.R === store.cleaningTypeDialog.roomId) {
          store.roomCleaningType((0, _objectSpread4.default)({}, (0, _mobx.toJS)(store.cleaningTypeDialog), (0, _defineProperty2.default)({}, objRoomCleaningType[type], value)));
          return (0, _objectSpread4.default)({}, item, (0, _defineProperty2.default)({}, objCustomizationData[type], value));
        } else {
          return item;
        }
      });
      store.setCustomizationData(data);
    };

    return _react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.prohRoot
    }, _react.default.createElement(_reactNative.View, {
      style: styles.root
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_SelectivePrompting.default, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword250,
        visible: store.selectedAreas.length === 0
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_index2.default, {
        containerWidth: _screenAdapte.SCREEN_WIDTH,
        containerHeight: _screenAdapte.SCREEN_HEIGHT - (0, _screenAdapte.sizeH)(250),
        mapInfo: store.mapInfo,
        selectedAreas: store.selectedAreas,
        onClickArea: onClickArea,
        uiConfig: {
          areaTipType: 1,
          cleaningModeParameters: store.cleaningModeParameters,
          isShowCleanParamsIcon: true,
          isShowAreaTips: true,
          isSupportSelectArea: true,
          isSupportPanZoom: true
        }
      });
    }), _react.default.createElement(_reactNative.View, {
      style: styles.funcCard
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return itemData == null ? undefined : itemData.map(function (item, index) {
        return item.type === "default" && store.isDefaultSetting ? _react.default.createElement(_reactNative.View, {
          key: index,
          style: [styles.funcCardRow, {
            opacity: 0.4
          }]
        }, _react.default.createElement(_reactNative.View, {
          style: styles.funcCardIcon
        }, _react.default.createElement(_reactNative.Image, {
          resizeMode: "contain",
          style: styles.funcCardIconImg,
          source: item.icon
        })), _react.default.createElement(_reactNative.View, {
          style: {
            paddingLeft: _reactNative.Platform.OS !== 'ios' && ((_multilingual.default == null ? undefined : _multilingual.default.keyword241.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword242.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword243.length) >= 16) ? 12 : 0
          }
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.funcCardIconText
        }, item.title))) : _react.default.createElement(_reactNative.TouchableOpacity, {
          key: index,
          style: styles.funcCardRow,
          onPress: function onPress() {
            return customizedOperation(item);
          }
        }, _react.default.createElement(_reactNative.View, {
          style: styles.funcCardIcon
        }, _react.default.createElement(_reactNative.Image, {
          resizeMode: "contain",
          style: styles.funcCardIconImg,
          source: item.icon
        })), _react.default.createElement(_reactNative.View, {
          style: {
            paddingLeft: _reactNative.Platform.OS !== 'ios' && ((_multilingual.default == null ? undefined : _multilingual.default.keyword241.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword242.length) >= 16 || (_multilingual.default == null ? undefined : _multilingual.default.keyword243.length) >= 16) ? 12 : 0
          }
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.funcCardIconText
        }, item.title)));
      });
    })), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_index4.default, {
        visible: store.cleaningTypeDialog.visible,
        waterMode: store.cleaningTypeDialog.waterMode,
        fanMode: store.cleaningTypeDialog.fanMode,
        workMode: store.cleaningTypeDialog.workMode,
        routePrefer: store.cleaningTypeDialog.routePrefer,
        cleanCount: store.cleaningTypeDialog.cleanCount,
        workModeData: workModeData,
        roomId: store.cleaningTypeDialog.roomId,
        roomName: store.cleaningTypeDialog.roomName,
        category: store.cleaningTypeDialog.category,
        onCancle: function onCancle() {
          store.hideCleanModeDialog();
          store.clearSelectedAreas();
        },
        onValueChange: onCleanModeChange
      });
    })));
  }

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    prohRoot: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    root: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    funcCard: {
      borderRadius: 8,
      flexDirection: "row",
      marginBottom: _reactNative.Platform.OS !== 'ios' ? (0, _screenAdapte.sizeH)(32) : 0
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
      width: (0, _screenAdapte.sizeW)(24),
      height: (0, _screenAdapte.sizeH)(24)
    },
    funcCardIconText: (0, _objectSpread4.default)({}, _styles.default.listTitles, {
      fontSize: (0, _screenAdapte.pText)(12),
      textAlign: 'center',
      color: new _DynamicColor.default('#6F7C7B', '#FFFFFF')
    })
  });
},11426,[14308,14305,14317,14674,14314,14347,10297,10033,10916,11016,10013,10925,10214,10913,10010,10094,14875,10082,11013,10352,11288,10136,10946,11503,11165,10019,10719]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = CustomizedOrder;

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[7]);

  var _mobxReactLite = _$$_REQUIRE(_dependencyMap[8]);

  var _index = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[10]);

  var _index2 = _$$_REQUIRE(_dependencyMap[11]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var _SelectivePrompting = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));

  var _NavigationBar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));

  var _index3 = _$$_REQUIRE(_dependencyMap[16]);

  var _mobx = _$$_REQUIRE(_dependencyMap[17]);

  var _lodash = _$$_REQUIRE(_dependencyMap[18]);

  var _convert = _$$_REQUIRE(_dependencyMap[19]);

  var _areaTipView = _$$_REQUIRE(_dependencyMap[20]);

  var _netinfo = _$$_REQUIRE(_dependencyMap[21]);

  var _KS3Cloud = _$$_REQUIRE(_dependencyMap[22]);

  var _is = _$$_REQUIRE(_dependencyMap[23]);

  function CustomizedOrder(props) {
    var _useStore = (0, _index2.useStore)(),
        mapStore = _useStore.mapStore,
        commonStore = _useStore.commonStore;

    var navigation = props.navigation;
    var mapId = navigation.getParam('mapId', '');

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        isConnected = _useNetInfo.isConnected;

    var store = (0, _mobxReactLite.useLocalObservable)(function () {
      var _mapStore$mapInfos, _mapStore$mapInfos$fi;

      return {
        namingDialog: {
          visible: false,
          roomId: null,
          roomName: '',
          category: null
        },
        selectedAreas: (0, _convert.getHighlightAreasIds)(((_mapStore$mapInfos = mapStore.mapInfos) == null ? undefined : (_mapStore$mapInfos$fi = _mapStore$mapInfos.find(function (item) {
          return item.mapId === mapId;
        })) == null ? undefined : _mapStore$mapInfos$fi.areas) || []),

        get mapInfo() {
          var _mapStore$mapInfos2;

          return (_mapStore$mapInfos2 = mapStore.mapInfos) == null ? undefined : _mapStore$mapInfos2.find(function (item) {
            return item.mapId === mapId;
          });
        },

        get isChange() {
          var _this$mapInfo;

          var arr = (0, _convert.getHighlightAreasIds)((this == null ? undefined : (_this$mapInfo = this.mapInfo) == null ? undefined : _this$mapInfo.areas) || []);
          return !(0, _lodash.isEqual)(arr, this.selectedAreas);
        },

        changeSelectedAreas: function changeSelectedAreas(curArea) {
          var result = this.selectedAreas.includes(curArea) ? this.selectedAreas.filter(function (id) {
            return id !== curArea;
          }) : [].concat((0, _toConsumableArray2.default)(this.selectedAreas), [curArea]);
          this.selectedAreas = result;
        }
      };
    });

    var onClickArea = function onClickArea(curArea) {
      if (curArea === -1) return;
      store.changeSelectedAreas(curArea);
    };

    var exeCmd = (0, _react.useCallback)(function _callee(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function _callee$(_context) {
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
    }, [isConnected]);

    var _getMapInfos = (0, _react.useCallback)(function _callee2() {
      var res, _ref, fileName, obj;

      return _regenerator.default.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context2.next = 4;
              return _regenerator.default.awrap(_index3.actions.getMapInfos());

            case 4:
              res = _context2.sent;

              if (!res) {
                _context2.next = 22;
                break;
              }

              fileName = (_ref = res == null ? undefined : res[0]) != null ? _ref : '';

              if (fileName) {
                _context2.next = 11;
                break;
              }

              mapStore.setMapInfos([]);
              _context2.next = 21;
              break;

            case 11:
              _context2.prev = 11;
              _context2.next = 14;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapInfosFileContent)(fileName));

            case 14:
              obj = _context2.sent;
              mapStore.setMapInfos(obj);
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](11);

              _logger.default.e("清洁顺序-更新的地图列表数据 error:", _context2.t0);

            case 21:
              commonStore.hideLoading();

            case 22:
              _context2.next = 28;
              break;

            case 24:
              _context2.prev = 24;
              _context2.t1 = _context2["catch"](0);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e('清洁顺序-拉取地图更新事件错误', _context2.t1);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 24], [11, 18]]);
    }, []);

    var _getCurrentMap = (0, _react.useCallback)(function _callee3() {
      var res, _ref2, fileName, obj;

      return _regenerator.default.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context3.next = 4;
              return _regenerator.default.awrap(_index3.actions.getMapData());

            case 4:
              res = _context3.sent;

              if (!res) {
                _context3.next = 22;
                break;
              }

              fileName = (_ref2 = res == null ? undefined : res[0]) != null ? _ref2 : '';

              if (fileName) {
                _context3.next = 11;
                break;
              }

              mapStore.setCurMapInfo({});
 