ar _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _Images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _KS3Cloud = _$$_REQUIRE(_dependencyMap[12]);

  var _is = _$$_REQUIRE(_dependencyMap[13]);

  var _map = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));

  var _index = _$$_REQUIRE(_dependencyMap[15]);

  var _store = _$$_REQUIRE(_dependencyMap[16]);

  var _base = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));

  var _enum = _$$_REQUIRE(_dependencyMap[19]);

  var _index2 = _$$_REQUIRE(_dependencyMap[20]);

  var _CleaningRecords = _$$_REQUIRE(_dependencyMap[21]);

  var closeleaningRecords = _Images.default.closeleaningRecords;

  var CleanLog = function CleanLog(props) {
    var currentScheme = _miot.DarkMode.getColorScheme();

    var data = props.navigation.state.params.data;

    var _useState = (0, _react.useState)({}),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        mapInfo = _useState2[0],
        setMapInfo = _useState2[1];

    var _useStore = (0, _store.useStore)(),
        configStore = _useStore.configStore;

    var cleanTypeStr = (0, _react.useMemo)(function () {
      switch (data == null ? undefined : data.cleanType) {
        case _CleaningRecords.CleanType.SmartClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword171;

        case _CleaningRecords.CleanType.AreaClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword172;

        case _CleaningRecords.CleanType.ZoneClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword173;

        case _CleaningRecords.CleanType.SpotClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword446;

        default:
          return "";
      }
    }, [data]);
    var timeStr = (0, _react.useMemo)(function () {
      return (data == null ? undefined : data.date) + " " + (data == null ? undefined : data.time);
    }, [data]);
    var cleaningResult = (0, _react.useMemo)(function () {
      return {
        isSucc: data.resultCode === 0,
        message: data.resultCode === 0 ? _multilingual.default == null ? undefined : _multilingual.default.keyword174 : _multilingual.default == null ? undefined : _multilingual.default.keyword175
      };
    }, [data]);
    (0, _react.useEffect)(function () {
      var mapFileUrl = data.mapFileUrl;
      var obj_name = mapFileUrl;

      function fetchMapData() {
        var obj, _obj$fields, _obj$fields3, _obj$fields4, _obj$fields5, _obj$fields6, _obj$fields7, _obj$fields8, _obj$fields9, _obj$fields10, _obj$fields2, _mapInfo, mapDataStr, mapTraceStr, areas, wallStr, walls, _wallStr, _walls, carpet, carpets, thres, thresStr;

        return _regenerator.default.async(function fetchMapData$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _regenerator.default.awrap((0, _KS3Cloud.isFileExists)(obj_name));

              case 3:
                if (_context.sent) {
                  _context.next = 7;
                  break;
                }

                _logger.default.d('文件不存在下载', obj_name);

                _context.next = 7;
                return _regenerator.default.awrap((0, _KS3Cloud.getFileDownloadUrl)(obj_name));

              case 7:
                _logger.default.d('文件存在', obj_name);

                _context.next = 10;
                return _regenerator.default.awrap((0, _KS3Cloud.readFile)(obj_name));

              case 10:
                obj = _context.sent;

                if (!(0, _is.isNull)(obj) && obj.hasOwnProperty('mapId') && obj.hasOwnProperty('fields')) {
                  if (((_obj$fields = obj.fields) == null ? undefined : _obj$fields.length) > 9) {
                    obj == null ? undefined : (_obj$fields2 = obj.fields) == null ? undefined : _obj$fields2.splice(9, 1);
                  }

                  _logger.default.d('get 清洁记录 mapId:', JSON.stringify(obj));

                  _mapInfo = {
                    mapId: '',
                    mapName: '',
                    mapData: {},
                    mapTraceData: {},
                    pos: {},
                    areas: [],
                    virtualWalls: [],
                    mopWalls: [],
                    carpets: [],
                    cleanValues: []
                  };
                  _mapInfo.mapId = obj.mapId;

                  if (obj.hasOwnProperty('cleanValues') && !(0, _is.isNull)(obj.cleanValues)) {
                    _mapInfo.cleanValues = obj.cleanValues;
                  }

                  if ((obj == null ? undefined : (_obj$fields3 = obj.fields) == null ? undefined : _obj$fields3.length) > 0) {
                    if (!(0, _is.isNull)(obj.fields[0])) {
                      try {
                        mapDataStr = _base.default.decode(obj.fields[0]);
                        _mapInfo.mapData = JSON.parse(mapDataStr);

                        _logger.default.d('清洁记录++++++++++mapData length1', obj.fields[0].length);
                      } catch (error) {
                        _logger.default.warn('mapData 解析数据时出错：', error);
                      }
                    }
                  }

                  if (((_obj$fields4 = obj.fields) == null ? undefined : _obj$fields4.length) > 1) {
                    if (!(0, _is.isNull)(obj.fields[1])) {
                      try {
                        mapTraceStr = _base.default.decode(obj.fields[1]);
                        _mapInfo.mapTraceData = JSON.parse(mapTraceStr);
                      } catch (error) {}
                    }
                  }

                  if (((_obj$fields5 = obj.fields) == null ? undefined : _obj$fields5.length) > 2) {
                    try {
                      _mapInfo.pos = JSON.parse(obj.fields[2]);
                    } catch (error) {
                      _logger.default.d('解析机器位置出错:', error);
                    }
                  }

                  if (((_obj$fields6 = obj.fields) == null ? undefined : _obj$fields6.length) > 3) {
                    if (!(0, _is.isNull)(obj.fields[3])) {
                      try {
                        areas = JSON.parse(obj.fields[3]);

                        _logger.default.d('清洁记录------------areas', areas);

                        if (Array.isArray(areas) && areas.length) {
                          _mapInfo.areas = areas == null ? undefined : areas.map(function (area) {
                            if (area.hasOwnProperty('neibs') && area['neibs']) {
                              area.neibs = area.neibs.split(',').filter(function (element) {
                                return element !== "";
                              });
                            }

                            if (area.hasOwnProperty('name') && area['name'] === '') {
                              area.name = (_multilingual.default == null ? undefined : _multilingual.default.keyword257) + area.id;
                            }

                            if (area.hasOwnProperty('type') && area['type'] === '') {
                              area.type = "0";
                            }

                            return area;
                          });
                        }
                      } catch (error) {
                        _logger.default.d('解析清洁记录 areas追踪数据出错：', error, typeof value);
                      }
                    }
                  }

                  if (((_obj$fields7 = obj.fields) == null ? undefined : _obj$fields7.length) > 4) {
                    if (!(0, _is.isNull)(obj.fields[4])) {
                      try {
                        wallStr = _base.default.decode(obj.fields[4]);

                        _logger.default.d('sub------------setVirtualWalls', wallStr);

                        walls = (0, _index.stringConvertVirtuals)(wallStr, _mapInfo.mapId);

                        _logger.default.d('sub------------setVirtualWalls', wallStr);

                        _mapInfo.virtualWalls = walls;
                      } catch (error) {
                        _logger.default.d('解析虚拟墙追踪数据出错：', error);
                      }
                    }
                  }

                  if (((_obj$fields8 = obj.fields) == null ? undefined : _obj$fields8.length) > 5) {
                    if (!(0, _is.isNull)(obj.fields[5])) {
                      try {
                        _wallStr = _base.default.decode(obj.fields[5]);
                        _walls = (0, _index.stringConvertVirtuals)(_wallStr, _mapInfo.mapId);
                        _mapInfo.mopWalls = _walls;
                      } catch (error) {
                        _logger.default.d('解析虚拟墙追踪数据出错：', error);
                      }
                    }
                  }

                  if (((_obj$fields9 = obj.fields) == null ? undefined : _obj$fields9.length) > 6) {
                    if (!(0, _is.isNull)(obj.fields[6])) {
                      try {
                        carpet = _base.default.decode(obj.fields[6]);
                        carpets = (0, _index.stringConvertVirtuals)(carpet, _mapInfo.mapId);
                        _mapInfo.carpet = carpets;
                      } catch (error) {
                        _logger.default.d('解析虚拟墙追踪数据出错：', error);
                      }
                    }
                  }

                  if (((_obj$fields10 = obj.fields) == null ? undefined : _obj$fields10.length) > 7) {
                    if (!(0, _is.isNull)(obj.fields[7])) {
                      try {
                        thres = _base.default.decode(obj.fields[7]);
                        thresStr = (0, _index.stringConvertVirtuals)(thres, _mapInfo.mapId);
                        _mapInfo.thres = thresStr;
                      } catch (error) {
                        _logger.default.d('解析虚拟墙追踪数据出错：', error);
                      }
                    }
                  }

                  setMapInfo(_mapInfo);
                } else {
                  _logger.default.d('历史地图无数据');
                }

                _context.next = 17;
                break;

              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](0);

                _logger.default.e('历史记录错误', _context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[0, 14]]);
      }

      fetchMapData();
    }, [data]);

    var cleanTimeStr = function cleanTimeStr(cleanTime) {
      var minutes = Math.floor(cleanTime / 60);
      var remainingSeconds = cleanTime % 60;
      var additionalMinute = remainingSeconds >= 45 ? 1 : 0;
      return "" + (minutes + additionalMinute);
    };

    function MapContent() {
      var _mapInfo$mapData;

      return (((_mapInfo$mapData = mapInfo.mapData) == null ? undefined : _mapInfo$mapData.lz4Len) || 0) > 1 && (data == null ? undefined : data.cleanType) != _CleaningRecords.CleanType.SpotClean ? _react.default.createElement(_map.default, {
        containerWidth: _screenAdapte.SCREEN_WIDTH,
        containerHeight: _screenAdapte.SCREEN_HEIGHT - (0, _screenAdapte.sizeH)(300),
        mapInfo: mapInfo,
        virtualZones: (data == null ? undefined : data.cleanType) === _CleaningRecords.CleanType.ZoneClean ? (0, _index.cleanValuesConvertZoning)(mapInfo.cleanValues) : [],
        selectedAreas: (data == null ? undefined : data.cleanType) === _CleaningRecords.CleanType.AreaClean ? mapInfo.cleanValues : [],
        virtualCarpet: mapInfo.carpet,
        virtualDoorsills: mapInfo.thres,
        uiConfig: {
          isShowPileRin: true,
          isShowBaseRing: true,
          isShowDoorsill: true,
          isShowTrace: true,
          isShowCarpet: true,
          isShowAreaTips: true,
          isSupportPanZoom: true,
          isShowZoning: true
        }
      }) : _react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        style: {
          flex: 1,
          width: (0, _screenAdapte.sizeW)(358.22),
          height: (0, _screenAdapte.sizeH)(294.48)
        },
        source: _Images.default.closeleaningRecords.inset
      });
    }

    return _react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.log
    }, _react.default.createElement(_reactNative.View, {
      style: styles.map
    }, _react.default.createElement(MapContent, null)), _react.default.createElement(_reactNative.View, {
      style: styles.card
    }, _react.default.createElement(_reactNative.ImageBackground, {
      resizeMode: "stretch",
      source: currentScheme === "light" ? cleaningResult.isSucc ? closeleaningRecords.maskSucces : closeleaningRecords.maskError : closeleaningRecords.maskSucces,
      style: {
        width: "100%",
        borderRadius: 8
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.card_state
    }, _react.default.createElement(_reactNative.View, {
      style: styles.card_state_reason
    }, _react.default.createElement(_reactNative.View, {
      style: styles.card_state_badeg
    }, cleaningResult.isSucc ? _react.default.createElement(_reactNative.View, {
      style: styles.card_state_complete
    }) : _react.default.createElement(_reactNative.Image, {
      style: {
        width: (0, _screenAdapte.sizeW)(16),
        height: (0, _screenAdapte.sizeH)(16)
      },
      source: closeleaningRecords.error,
      resizeMode: "contain"
    })), _react.default.createElement(_reactNative.Text, {
      style: [styles.texts, {
        fontSize: (0, _screenAdapte.pText)(18),
        fontWeight: 'bold'
      }]
    }, cleaningResult.message)), _react.default.createElement(_reactNative.View, {
      style: styles.card_state_inf
    }, _react.default.createElement(_reactNative.View, {
      style: styles.card_state_badeg
    }), _react.default.createElement(_reactNative.Text, {
      style: [styles.cardNametext, {
        fontSize: (0, _screenAdapte.pText)(14),
        marginRight: (0, _screenAdapte.sizeW)(8)
      }]
    }, cleanTypeStr + " | " + timeStr))), _react.default.createElement(_reactNative.View, {
      style: styles.card_clean_bgc
    }, _react.default.createElement(_reactNative.ImageBackground, {
      resizeMode: "stretch",
      source: closeleaningRecords.transparent,
      style: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        alignItems: "center"
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: "row",
        alignItems: "flex-end"
      }
    }, _react.default.createElement(_reactNative.Text, {
      style: [styles.texts, {
        fontSize: (0, _screenAdapte.pText)(32)
      }]
    }, configStore.unitSet === _enum.UnitType.SquareMeter ? data == null ? undefined : data.cleanArea : (0, _index2.meterToFoot)(data == null ? undefined : data.cleanArea, 1)), _react.default.createElement(_reactNative.Text, {
      style: [styles.texts, {
        fontSize: (0, _screenAdapte.pText)(16),
        marginBottom: (0, _screenAdapte.sizeH)(5)
      }]
    }, configStore.unitSet === _enum.UnitType.SquareMeter ? 'm²' : 'ft²')), _react.default.createElement(_reactNative.Text, {
      style: [styles.unitTextColor, {
        fontSize: (0, _screenAdapte.pText)(12)
      }]
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword16)), _react.default.createElement(_reactNative.View, {
      style: {
        alignItems: "center"
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: "row",
        alignItems: "flex-end"
      }
    }, _react.default.createElement(_reactNative.Text, {
      style: {
        fontSize: (0, _screenAdapte.pText)(32)
      }
    }, cleanTimeStr(data == null ? undefined : data.cleanTime)), _react.default.createElement(_reactNative.Text, {
      style: {
        fontSize: (0, _screenAdapte.pText)(16),
        marginBottom: (0, _screenAdapte.sizeH)(5)
      }
    }, "min")), _react.default.createElement(_reactNative.Text, {
      style: [styles.unitTextColor, {
        fontSize: (0, _screenAdapte.pText)(12)
      }]
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword17)))))));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    log: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor
    },
    map: {
      flex: 1
    },
    card: {
      width: "100%",
      borderRadius: 8,
      overflow: "hidden",
      marginBottom: (0, _screenAdapte.sizeH)(13),
      paddingHorizontal: 16
    },
    card_state: {
      padding: 16
    },
    card_state_reason: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: (0, _screenAdapte.sizeH)(6)
    },
    card_state_badeg: {
      width: (0, _screenAdapte.sizeW)(16),
      height: (0, _screenAdapte.sizeH)(16),
      alignItems: "center",
      justifyContent: "center",
      marginRight: (0, _screenAdapte.sizeW)(4)
    },
    card_state_complete: {
      borderRadius: 8,
      width: 10,
      height: 10,
      backgroundColor: _styles.default.pageStyle.btn_color,
      alignSelf: "center"
    },
    texts: {
      fontFamily: "PingFang SC",
      fontWeight: "400",
      color: _styles.default.pageStyle.textColor
    },
    card_state_inf: {
      flexDirection: "row",
      alignItems: "center"
    },
    card_clean_bgc: {
      width: "100%",
      height: (0, _screenAdapte.sizeH)(111),
      borderRadius: 8,
      overflow: "hidden"
    },
    card_clean_data: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center"
    },
    cardNametext: {
      color: _styles.default.pageStyle.transparentTextColor
    },
    unitTextColor: {
      color: _styles.default.pageStyle.transparentColors
    }
  });
  var _default = CleanLog;
  exports.default = _default;
},11336,[14308,14305,14674,14347,10297,10033,10913,11016,10916,10074,10094,10352,11120,10088,10214,10133,10010,10070,10082,10136,11150,11333]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[4]);

  var _index = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _version = _$$_REQUIRE(_dependencyMap[6]);

  var Languages = function Languages() {
    return _react.default.createElement(_reactNative.View, {
      style: styles.carpet
    }, _react.default.createElement(_reactNative.ScrollView, null, _react.default.createElement(_index.default, {
      updateDetection: !(0, _version.isNewerVersion439_681)() ? false : true
    })));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    carpet: {
      backgroundColor: _styles.default.pageStyle.backgroundColor,
      flex: 1,
      paddingHorizontal: 16
    }
  });
  var _default = Languages;
  exports.default = _default;
},11339,[14305,10297,10033,10916,11016,11216,10340]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[5]);

  var _progressBar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[8]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _item = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _mobxReactLite = _$$_REQUIRE(_dependencyMap[11]);

  var _index = _$$_REQUIRE(_dependencyMap[12]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));

  var _index2 = _$$_REQUIRE(_dependencyMap[14]);

  var _netinfo = _$$_REQUIRE(_dependencyMap[15]);

  var Consumables = function Consumables(props) {
    var _useStore = (0, _index.useStore)(),
        robotStore = _useStore.robotStore,
        commonStore = _useStore.commonStore;

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        type = _useNetInfo.type,
        isConnected = _useNetInfo.isConnected;

    (0, _react.useEffect)(function () {
      var specs = [{
        param: _index2.propertyCodes.consumables,
        fn: function fn(value) {
          return robotStore.setConsumables(value);
        }
      }];
      commonStore.showLoading();

      _index2.manager.getSpec(specs).then(function () {
        commonStore.hideLoading();
      });
    }, []);

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

    var handleResetConsumable = function handleResetConsumable(data) {
      return _regenerator.default.async(function handleResetConsumable$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _logger.default.d('handleResetConsumable', data);

              exeCmd(function () {
                return _index2.actions.resetConsumable(data);
              }, function () {
                return _index2.propertys.getConsumables(function (value) {
                  robotStore.setConsumables(value);
                  robotStore.setMessage(0);
                });
              });

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      });
    };

    return _react.default.createElement(_reactNative.View, {
      style: styles.root
    }, _react.default.createElement(_reactNative.ScrollView, {
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false
    }, _react.default.createElement(_reactNative.View, {
      style: {
        marginBottom: 18
      }
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      var _robotStore$consumabl;

      return (_robotStore$consumabl = robotStore.consumables) == null ? undefined : _robotStore$consumabl.map(function (item) {
        return _react.default.createElement(_item.default, {
          key: item.type,
          type: item.type,
          process: 100 - item.used,
          mode: item.mode,
          onResetClick: handleResetConsumable
        });
      });
    }))));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    root: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.backgroundColor,
      paddingHorizontal: (0, _screenAdapte.sizeW)(16)
    },
    edgeBrush: {
      width: '100%',
      backgroundColor: _styles.default.pageStyle.cardBackgroundColor,
      borderRadius: 8,
      overflow: 'hidden',
      paddingVertical: (0, _screenAdapte.sizeH)(21),
      paddingHorizontal: (0, _screenAdapte.sizeW)(16),
      marginBottom: (0, _screenAdapte.sizeH)(16)
    },
    icon: {
      marginRight: (0, _screenAdapte.sizeW)(16)
    },
    imgs: {
      width: (0, _screenAdapte.sizeW)(50),
      height: (0, _screenAdapte.sizeH)(50)
    },
    tops: {
      marginRight: (0, _screenAdapte.sizeW)(83),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    texts: {
      fontFamily: 'PingFang SC',
      fontWeight: '400',
      color: _styles.default.pageStyle.textColor
    },
    progressBar: {
      width: (0, _screenAdapte.sizeW)(190),
      height: 9,
      backgroundColor: '#BBC8CB',
      borderRadius: 60,
      overflow: 'hidden',
      marginRight: 13
    },
    right_progress: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    badge: {
      width: (0, _screenAdapte.sizeW)(70),
      height: (0, _screenAdapte.sizeH)(30),
      backgroundColor: '#F4FAFB',
      borderRadius: 54,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 13
    },
    bottom: {
      flexDirection: 'row',
      marginTop: (0, _screenAdapte.sizeH)(8)
    }
  });
  var _default = Consumables;
  exports.default = _default;
},11342,[14308,14305,14674,10297,10033,10913,11345,10916,11016,10094,11348,10013,10010,10082,10925,14875]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var ProgressBar = function ProgressBar(props) {
    return _react.default.createElement(_reactNativeSvg.default, {
      xmlns: "http://www.w3.org/2000/svg",
      width: props.totalWidth,
      height: 9,
      fill: "none"
    }, _react.default.createElement(_reactNativeSvg.Rect, {
      width: props.totalWidth,
      height: 9,
      fill: "#BBC8CB",
      rx: 4.5,
      opacity: 0.3
    }), _react.default.createElement(_reactNativeSvg.Rect, {
      width: props.width,
      height: 9,
      fill: "url(#paint0_linear_1851_23584)",
      rx: 4.5
    }), _react.default.createElement(_reactNativeSvg.Defs, null, _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "paint0_linear_1851_23584",
      x1: "151.031",
      y1: "4.99992",
      x2: "20.7264",
      y2: "56.9687",
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#85D0CF"
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#2CD5AE"
    }))));
  };

  var _default = ProgressBar;
  exports.default = _default;
},11345,[14308,14305,10297,11485]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[6]);

  var _progressBar = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[9]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _Images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));

  var ConsumableStatusMode = Object.freeze({
    Nor: 0,
    AboutExpired: 1,
    Expired: 2
  });
  var ConsumableType = Object.freeze({
    SideBrush: 'sideBrush',
    RollBrush: 'rollBrush',
    Filter: 'filter',
    Mop: 'mop',
    DustBag: 'dustbag',
    MopCleaningTrough: 'mopCleaningTrough',
    FilterScreen: 'filterScreen',
    EngineSensor: 'engineSensor'
  });

  var ConsumablesItem = function ConsumablesItem(_ref) {
    var type = _ref.type,
        process = _ref.process,
        mode = _ref.mode,
        onResetClick = _ref.onResetClick;

    var _useState = (0, _react.useState)(0),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        dynamicWidth = _useState2[0],
        setdynamicWidth = _useState2[1];

    var progressBarWidth = Math.abs(process / 100) * (dynamicWidth ? dynamicWidth : 210);

    var onLayout = function onLayout(event) {
      var width = event.nativeEvent.layout.width;
      setdynamicWidth(width);
    };

    var isExpired = mode === ConsumableStatusMode.Expired;
    var processColorStyle = mode == 2 ? styles.expiredColor : styles.norColor;
    var data = (0, _react.useMemo)(function () {
      var _Images$consumables = _Images.default.consumables,
          cleaningSolution = _Images$consumables.cleaningSolution,
          dustBag = _Images$consumables.dustBag,
          edgeBrush = _Images$consumables.edgeBrush,
          filterElement = _Images$consumables.filterElement,
          mop = _Images$consumables.mop,
          rollingBrush = _Images$consumables.rollingBrush,
          filterScreen = _Images$consumables.filterScreen,
          engineSensor = _Images$consumables.engineSensor,
          washingTrough = _Images$consumables.washingTrough;

      switch (type) {
        case ConsumableType.SideBrush:
          return {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword177,
            subtitle: isExpired ? _multilingual.default == null ? unde