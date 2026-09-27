undefined : _multilingual.default.keyword264
  }, {
    id: _assets.AreaIconType.XI_YI_FANG,
    imageUrl: roomManager.XI_YI_FANG,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword265
  }];
  var menu3Data = [{
    id: _assets.AreaIconType.XIU_XI_SHI,
    imageUrl: roomManager.XIU_XI_SHI,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword266
  }, {
    id: _assets.AreaIconType.CHU_CAN_SHI,
    imageUrl: roomManager.CHU_CAN_SHI,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword267
  }, {
    id: _assets.AreaIconType.ER_TONG_FANG,
    imageUrl: roomManager.ER_TONG_FANG,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword268
  }, {
    id: _assets.AreaIconType.YANG_GUANG_FANG,
    imageUrl: roomManager.YANG_GUANG_FANG,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword269
  }];
  var menu4Data = [{
    id: _assets.AreaIconType.ZOU_LANG,
    imageUrl: roomManager.ZOU_LANG,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword270
  }, {
    id: _assets.AreaIconType.YANG_TAI,
    imageUrl: roomManager.YANG_TAI,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword271
  }, {
    id: _assets.AreaIconType.JIAN_SHEN_FANG,
    imageUrl: roomManager.JIAN_SHEN_FANG,
    name: _multilingual.default == null ? undefined : _multilingual.default.keyword272
  }, {
    id: -1,
    name: ''
  }];

  var CategoryNamingDialog = function CategoryNamingDialog(_ref) {
    var visible = _ref.visible,
        roomId = _ref.roomId,
        roomName = _ref.roomName,
        category = _ref.category,
        onCancel = _ref.onCancel,
        onConfirm = _ref.onConfirm;

    var colorMode = _miot.DarkMode.getColorScheme();

    var store = (0, _mobxReactLite.useLocalObservable)(function () {
      return {
        selectedId: _assets.AreaIconType.DEFAULT,
        inputValue: '',
        setSelectedId: function setSelectedId(id) {
          this.selectedId = id;
        },
        setInputValue: function setInputValue(name) {
          this.inputValue = name;
        }
      };
    });
    store.setSelectedId(parseInt(category));
    store.setInputValue(roomName);
    var area_id = roomId - 2;

    var onClearInputValue = function onClearInputValue() {
      store.setInputValue('');
    };

    var onChangeInputValue = function onChangeInputValue(value) {
      var regex_special = /^\s|[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/;
      var regex_emoji = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/g;

      if (regex_special.test(value) || regex_emoji.test(value)) {
        _logger.default.d('特殊字符', value);

        return;
      }

      store.setInputValue(value);
    };

    var handleCloseModal = function handleCloseModal() {
      onCancel && onCancel();
    };

    var handleConfim = function handleConfim() {
      if (store.inputValue === '') {
        onCancel && onCancel();
      } else {
        onConfirm && onConfirm({
          roomId: roomId,
          category: "" + store.selectedId,
          name: store.inputValue
        });
      }
    };

    var onSelectedItem = function onSelectedItem(id) {
      _logger.default.d("选中分类", id);

      requestAnimationFrame(function () {
        if (id >= 0) {
          store.setSelectedId(id);
          menu1Data.forEach(function (item) {
            if (item.id === id) {
              store.setInputValue(item.name + area_id);
            }
          });
          menu2Data.forEach(function (item) {
            if (item.id === id) {
              store.setInputValue(item.name + area_id);
            }
          });
          menu3Data.forEach(function (item) {
            if (item.id === id) {
              store.setInputValue(item.name + area_id);
            }
          });
          menu4Data.forEach(function (item) {
            if (item.id === id) {
              store.setInputValue(item.name + area_id);
            }
          });
        }
      });
    };

    var swipeIndex = store.selectedId === _assets.AreaIconType.ZOU_LANG || store.selectedId === _assets.AreaIconType.YANG_TAI || store.selectedId === _assets.AreaIconType.JIAN_SHEN_FANG ? 1 : 0;

    var GridItem = function GridItem(_ref2) {
      var data = _ref2.data,
          _onPress = _ref2.onPress,
          isSelected = _ref2.isSelected;
      var id = data.id,
          name = data.name,
          imageUrl = data.imageUrl;
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return _onPress(id);
        },
        style: styles.gridItem
      }, id >= 0 && _react.default.createElement(_reactNative.Image, {
        source: imageUrl,
        style: [styles.gridItemImage, {
          tintColor: isSelected ? '#2CD5AE' : colorMode === 'light' ? '#121C18' : 'xm#fff'
        }]
      }), _react.default.createElement(_reactNative.Text, {
        style: [styles.gridItemText, {
          color: isSelected ? '#2CD5AE' : '#000'
        }]
      }, name));
    };

    var renderItem = function renderItem(_ref3) {
      var item = _ref3.item;
      return _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return _react.default.createElement(GridItem, {
          data: item,
          onPress: onSelectedItem,
          isSelected: store.selectedId === item.id
        });
      });
    };

    var SwipeView = function SwipeView(_ref4) {
      var swipeIndex = _ref4.swipeIndex,
          children = _ref4.children;
      return _react.default.createElement(_reactNativeSwiper.default, {
        index: swipeIndex,
        height: (0, _screenAdapte.sizeH)(236),
        loop: false,
        paginationStyle: {
          bottom: 0
        },
        dotStyle: {
          width: (0, _screenAdapte.sizeW)(26),
          height: (0, _screenAdapte.sizeH)(4),
          backgroundColor: '#F4FAFB',
          borderRadius: (0, _screenAdapte.sizeW)(51),
          marginLeft: 0,
          marginRight: 0
        },
        activeDotStyle: {
          width: (0, _screenAdapte.sizeW)(26),
          height: (0, _screenAdapte.sizeH)(4),
          marginLeft: 0,
          marginRight: 0,
          backgroundColor: '#2CD5AE',
          borderRadius: (0, _screenAdapte.sizeW)(51)
        }
      }, children);
    };

    return _react.default.createElement(_mhuiRn.AbstractDialog, {
      visible: visible,
      showTitle: false,
      showButton: false,
      onModalHide: handleCloseModal,
      dialogStyle: {
        unlimitedHeightEnable: true,
        allowFontScaling: false
      },
      style: {
        backgroundColor: 'transparent'
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        padding: 14,
        backgroundColor: 'transparent'
      }
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        paddingBottom: 18
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.header
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        padding: 8
      },
      onPress: handleCloseModal
    }, _react.default.createElement(_reactNative.Text, {
      style: {
        fontSize: (0, _screenAdapte.pText)(14),
        color: colorMode === 'light' ? '#000000' : '#fff'
      }
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword327)), _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        padding: 8
      },
      onPress: handleConfim
    }, _react.default.createElement(_reactNative.Text, {
      style: {
        fontSize: (0, _screenAdapte.pText)(14),
        color: '#2CD5AE'
      }
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword328))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_reactNative.View, {
        style: styles.inputContainer
      }, _react.default.createElement(_reactNative.TextInput, {
        autoFocus: true,
        style: styles.input,
        onChangeText: onChangeInputValue,
        value: store.inputValue,
        placeholder: roomName,
        placeholderTextColor: "rgba(0, 0, 0, 0.3)",
        maxLength: 32,
        fontSize: (0, _screenAdapte.pText)(14)
      }), store.inputValue && store.inputValue.length > 0 ? _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: onClearInputValue,
        style: styles.clearButton
      }, _react.default.createElement(_reactNative.Image, {
        style: styles.clearIcon,
        source: _Images.default.common.ic_input_clear
      })) : null);
    }), _react.default.createElement(SwipeView, {
      onSelectedItem: onSelectedItem,
      swipeIndex: swipeIndex
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingBottom: (0, _screenAdapte.sizeH)(26)
      }
    }, _react.default.createElement(_reactNative.FlatList, {
      data: menu1Data,
      renderItem: renderItem,
      keyExtractor: function keyExtractor(item) {
        return item.id;
      },
      numColumns: 4,
      scrollEnabled: false
    }), _react.default.createElement(_reactNative.FlatList, {
      data: menu2Data,
      renderItem: renderItem,
      keyExtractor: function keyExtractor(item) {
        return item.id;
      },
      numColumns: 4,
      scrollEnabled: false
    }), _react.default.createElement(_reactNative.FlatList, {
      data: menu3Data,
      renderItem: renderItem,
      keyExtractor: function keyExtractor(item) {
        return item.id;
      },
      numColumns: 4,
      scrollEnabled: false
    })), _react.default.createElement(_reactNative.FlatList, {
      data: menu4Data,
      renderItem: renderItem,
      keyExtractor: function keyExtractor(item) {
        return item.id;
      },
      numColumns: 4,
      scrollEnabled: false
    })))));
  };

  CategoryNamingDialog.propTypes = {
    visible: _propTypes.default.bool,
    roomId: _propTypes.default.number,
    roomName: _propTypes.default.string,
    category: _propTypes.default.number,
    onConfirm: _propTypes.default.func,
    onCancel: _propTypes.default.func
  };
  CategoryNamingDialog.defaultProps = {
    visible: false,
    roomId: 0,
    roomName: '',
    category: 0,
    onConfirm: function onConfirm() {},
    onCancel: function onCancel() {}
  };
  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    roots: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: (0, _screenAdapte.sizeW)(16)
    },
    count: {
      width: '100%',
      backgroundColor: '#fff',
      flex: 1,
      borderRadius: 18,
      paddingHorizontal: (0, _screenAdapte.sizeW)(16)
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 8
    },
    inputContainer: {
      width: "90%",
      height: (0, _screenAdapte.sizeH)(40),
      marginBottom: 16,
      backgroundColor: new _DynamicColor.default('#EAF2F4', '#343436'),
      borderRadius: 25,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      alignSelf: 'center'
    },
    input: {
      flex: 1,
      padding: 4,
      marginRight: 1,
      marginTop: 3,
      fontSize: (0, _screenAdapte.pText)(14),
      borderRadius: 4,
      justifyContent: 'flex-start',
      alignItems: "center",
      height: 150,
      color: new _DynamicColor.default('#121C18', '#fff')
    },
    clearButton: {
      marginRight: (0, _screenAdapte.sizeW)(8)
    },
    clearIcon: {
      width: (0, _screenAdapte.sizeW)(22),
      height: (0, _screenAdapte.sizeW)(22)
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    gridItem: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    gridItemImage: {
      width: (0, _screenAdapte.sizeW)(24),
      height: (0, _screenAdapte.sizeH)(24)
    },
    gridItemText: {
      fontSize: (0, _screenAdapte.pText)(13),
      color: '#121C18',
      textAlign: 'center'
    },
    menuItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: (0, _screenAdapte.sizeH)(60),
      width: (0, _screenAdapte.sizeW)(80)
    },
    page: {
      width: (0, _screenAdapte.sizeW)(322),
      height: (0, _screenAdapte.sizeH)(181)
    },
    indicator: {
      width: (0, _screenAdapte.sizeW)(53),
      height: (0, _screenAdapte.sizeH)(4),
      backgroundColor: '#F4FAFB',
      alignSelf: 'center',
      borderRadius: 51,
      marginBottom: (0, _screenAdapte.sizeH)(18),
      flexDirection: 'row'
    },
    selected: {
      width: (0, _screenAdapte.sizeW)(26),
      height: (0, _screenAdapte.sizeH)(4),
      borderRadius: 51
    }
  });
  var _default = CategoryNamingDialog;
  exports.default = _default;
},11069,[14305,10297,10033,10913,11016,11013,10074,13663,10318,22411,10352,10094,10082,10013,10310,10010]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[3]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[5]);

  var _MapInset = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _miot = _$$_REQUIRE(_dependencyMap[8]);

  var _Images = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  var _TextList = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));

  var BuildingMapType = {
    CleanBuilding: "cleanBuilding",
    FastBuilding: "fastBuilding"
  };
  var InteractiveImgaes = _Images.default.roomManager;

  var CreateMapDialog = function CreateMapDialog(props) {
    var visible = props.visible,
        _props$onCancel = props.onCancel,
        onCancel = _props$onCancel === undefined ? function () {} : _props$onCancel,
        _props$onConfirm = props.onConfirm,
        onConfirm = _props$onConfirm === undefined ? function (type) {} : _props$onConfirm;
    return _react.default.createElement(_reactNativeModal.default, {
      style: {
        margin: 0,
        padding: 0,
        backgroundColor: "transparent"
      },
      hideModalContentWhileAnimating: false,
      hasBackdrop: false,
      isVisible: visible,
      onBackdropPress: onCancel
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        backgroundColor: "#fff"
      }
    }, _react.default.createElement(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[12]),
      style: {
        flex: 1
      },
      resizeMode: "stretch"
    }, _react.default.createElement(_reactNative.View, {
      style: styles.img_bgc
    }, _react.default.createElement(_reactNative.View, {
      style: {
        marginTop: (0, _screenAdapte.sizeH)(59)
      }
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: onCancel,
      style: styles.closeBtn
    }, _react.default.createElement(_reactNative.Image, {
      style: {
        width: (0, _screenAdapte.sizeW)(10),
        height: (0, _screenAdapte.sizeH)(10),
        tintColor: _miot.DarkMode.getColorScheme() === "light" ? "xm#000" : "xm#fff"
      },
      resizeMode: "contain",
      source: InteractiveImgaes.ClOSE
    })), _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _screenAdapte.sizeW)(284)
      }
    }, _react.default.createElement(_reactNative.Text, {
      style: {
        fontSize: (0, _screenAdapte.pText)(28),
        fontWeight: "500",
        marginBottom: (0, _screenAdapte.sizeH)(36)
      }
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword229)), _react.default.createElement(_reactNative.ScrollView, {
      style: {
        marginBottom: (0, _screenAdapte.sizeH)(10)
      }
    }, _react.default.createElement(_TextList.default, {
      lang: _multilingual.default.keyword574
    })), _react.default.createElement(_reactNative.View, {
      style: {
        justifyContent: "center",
        alignItems: "center"
      }
    }, _react.default.createElement(_MapInset.default, null)))), _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.View, {
      style: {
        alignItems: "center",
        marginBottom: (0, _screenAdapte.sizeH)(52)
      }
    }, _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        marginBottom: (0, _screenAdapte.sizeH)(16),
        width: (0, _screenAdapte.sizeW)(320),
        height: (0, _screenAdapte.sizeH)(49)
      },
      onPress: function onPress() {
        onConfirm && onConfirm(BuildingMapType.CleanBuilding);
      }
    }, _react.default.createElement(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[13]),
      style: {
        width: (0, _screenAdapte.sizeW)(320),
        height: (0, _screenAdapte.sizeH)(49),
        justifyContent: "center",
        alignItems: "center"
      },
      resizeMode: "contain"
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.btnText
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword231))), _react.default.createElement(_reactNative.TouchableOpacity, {
      style: {
        marginBottom: (0, _screenAdapte.sizeH)(16)
      },
      onPress: function onPress() {
        onConfirm && onConfirm(BuildingMapType.FastBuilding);
      }
    }, _react.default.createElement(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[13]),
      style: {
        width: (0, _screenAdapte.sizeW)(320),
        height: (0, _screenAdapte.sizeH)(49),
        justifyContent: "center",
        alignItems: "center"
      },
      resizeMode: "contain"
    }, _react.default.createElement(_reactNative.Text, {
      style: styles.btnText
    }, _multilingual.default == null ? undefined : _multilingual.default.keyword232)))))))));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    closeBtn: {
      width: (0, _screenAdapte.sizeW)(26),
      height: (0, _screenAdapte.sizeH)(26),
      backgroundColor: _styles.default.pageStyle.textBackgroundColor,
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 6,
      marginBottom: (0, _screenAdapte.sizeH)(23)
    },
    btnText: {
      color: "#fff",
      fontSize: (0, _screenAdapte.pText)(16),
      fontWeight: "500",
      fontFamily: "PingFang SC"
    },
    img_bgc: {
      flex: 1,
      backgroundColor: _styles.default.pageStyle.img_bgc,
      paddingHorizontal: (0, _screenAdapte.sizeW)(26),
      justifyContent: "space-between"
    }
  });
  var _default = CreateMapDialog;
  exports.default = _default;
},11072,[14305,10297,10033,10913,10916,11016,11075,10094,10074,10352,10988,11078,11081,11084]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireWildcard = _$$_REQUIRE(_dependencyMap[0]);

  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[1]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNativeSvg = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));

  var SvgComponent = function SvgComponent(props) {
    return _react.default.createElement(_reactNativeSvg.default, {
      xmlns: "http://www.w3.org/2000/svg",
      width: 358,
      height: 222,
      fill: "none"
    }, _react.default.createElement(_reactNativeSvg.Mask, {
      id: "a",
      width: 358,
      height: 222,
      x: 0,
      y: 0,
      maskUnits: "userSpaceOnUse",
      style: {
        maskType: "luminance"
      }
    }, _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#fff",
      d: "M0 0h358v222H0z"
    })), _react.default.createElement(_reactNativeSvg.G, {
      mask: "url(#a)"
    }, _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#b)",
      d: "M183.197 209.561a10.697 10.697 0 0 1-10.718 0L13.961 117.842c-3.956-2.289-3.948-8.01.016-10.287l158.716-91.181a10.323 10.323 0 0 1 10.289 0l159.202 91.461c3.747 2.152 3.755 7.563.015 9.727l-159.002 91.999Z"
    }), _react.default.createElement(_reactNativeSvg.G, {
      opacity: 0.5
    }, _react.default.createElement(_reactNativeSvg.Mask, {
      id: "d",
      width: 335,
      height: 196,
      x: 10,
      y: 15,
      maskUnits: "userSpaceOnUse",
      style: {
        maskType: "alpha"
      }
    }, _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#c)",
      d: "M183.197 209.561a10.699 10.699 0 0 1-10.719 0L13.961 117.842c-3.956-2.289-3.948-8.011.016-10.287l158.715-91.182a10.325 10.325 0 0 1 10.29 0l159.201 91.461c3.748 2.153 3.756 7.564.015 9.728l-159.001 91.999Z"
    })), _react.default.createElement(_reactNativeSvg.G, {
      mask: "url(#d)"
    }, _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#e)",
      fillRule: "evenodd",
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "m48.288 85.325 171.402 99.186v-.041L51.254 87.04l-4.034-2.333 1.069.618Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#f)",
      fillRule: "evenodd",
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "m94.113 56.29 172.47 99.804v-.042L94.113 56.248v.041Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#g)",
      fillRule: "evenodd",
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "m146.963 34.296 165.5 95.839v-.041L143.5 31.5l3.463 2.796Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#h)",
      fillRule: "evenodd",
      d: "M308.585 88.073 135.392 187.58l173.193-99.507Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "M308.585 88.073 135.392 187.58"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#i)",
      fillRule: "evenodd",
      d: "M262.477 61.875 89.702 161.141l172.775-99.266Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "M262.477 61.875 89.702 161.141"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#j)",
      fillRule: "evenodd",
      d: "M223.704 38.99 50.999 138.5l172.705-99.51Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      stroke: "#fff",
      strokeWidth: 2.4,
      d: "M223.704 38.99 50.999 138.5"
    }))), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#90D1D8",
      d: "m314.982 80.502-.151 17.431-.01 2.996-88.542-53.13V27.246l88.703 53.257ZM147.445 72.513l-.111 20.535c-16.602-9.27-33.185-18.54-49.788-27.8l-.06-22.846c.876.491 1.763.983 2.639 1.474 15.767 8.789 31.523 17.578 47.29 26.357l.03 2.28Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#DFF3F8",
      d: "M178.411 51.816v22.856l-.05-.03-30.927 18.456a.474.474 0 0 0-.101-.05l.111-22.835 30.937-18.387.03-.01ZM226.279 27.245V47.8l-.05-.03-36.806 20.136a.472.472 0 0 0-.1-.05l.111-20.535 36.815-20.066.03-.01ZM97.796 40.971v23.622l-.05-.03L11.1 113.05A.472.472 0 0 0 11 113l.11-22.836L97.797 41.75v-.779Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#C0E5EB",
      d: "m317.5 78.822-2.519 1.68-88.703-53.257-.03.01-36.816 20.066-.03.02v-3.017l.05-.03 36.806-20.056.02.01L317.5 78.822ZM178.411 52.656l-.03.01-30.937 17.547-.031.02c-15.766-8.78-31.523-17.568-47.289-26.357-.877-.491-1.763-.982-2.64-1.473L11 90.44V87.5l86.904-47.507c15.767 8.769 33.743 18.444 49.509 27.223l.051-.03 30.927-17.536.02.01v2.996Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#90D1D8",
      d: "m340.778 95.179-2.822 19.048-23.145-13.275.17-20.451 25.797 14.678Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#DFF3F8",
      d: "m346.052 95.189-.088 20.621-164.339 94.853-.012-20.672 164.439-94.803Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#C0E5EB",
      d: "m346.014 95.179-5.246 3.022-9.13 5.268-2.613 1.5-147.451 85.012.051 20.681-2.633-1.521-.051-20.691 147.461-84.981 2.603-1.511 11.773-6.779c-5.223-2.922-25.377-14.258-25.797-14.678l2.473-1.68 28.56 16.358Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#1EAEBD",
      stroke: "#1EAEBD",
      d: "M140.532 126.197c-.672 4.55 1.823 9.202 6.593 13.046 4.76 3.836 11.714 6.798 19.736 7.946 8.023 1.149 15.547.258 21.22-2.085 5.685-2.347 9.423-6.107 10.096-10.656.672-4.55-1.823-9.202-6.592-13.046-4.76-3.836-11.715-6.798-19.737-7.947-8.023-1.148-15.546-.257-21.22 2.086-5.685 2.347-9.423 6.107-10.096 10.656Z",
      opacity: 0.06
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 21.936,
      cy: 12.546,
      fill: "#1EAEBD",
      opacity: 0.1,
      rx: 21.936,
      ry: 12.546,
      transform: "matrix(-.9891 -.14725 -.1518 .98841 199.908 123.847)"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 14.973,
      cy: 9.11,
      fill: "#1EAEBD",
      opacity: 0.2,
      rx: 14.973,
      ry: 9.11,
      transform: "matrix(-.99606 -.08863 -.09322 .99565 196.715 126.202)"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 10.02,
      cy: 5.485,
      fill: "#138291",
      rx: 10.02,
      ry: 5.485,
      transform: "matrix(-1 0 0 1 197.593 132.756)"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "url(#k)",
      fillRule: "evenodd",
      d: "M176.302 135.727v.228h.005c.18 4.059 5.156 7.314 11.267 7.314 6.112 0 11.088-3.255 11.268-7.314h.005v-4.571h-2.056c-2.041-1.935-5.408-3.198-9.217-3.198-3.808 0-7.175 1.263-9.216 3.198h-2.056v4.343Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 11.272,
      cy: 7.542,
      fill: "url(#l)",
      rx: 11.272,
      ry: 7.542,
      transform: "matrix(-1 0 0 1 198.847 124.529)"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 2.505,
      cy: 1.828,
      fill: "#1C5157",
      rx: 2.505,
      ry: 1.828,
      transform: "matrix(-1 0 0 1 186.569 127.209)"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#1EAEBD",
      fillRule: "evenodd",
      d: "M181.559 128.811v-.4h.079c.278-.69 1.258-1.2 2.426-1.2 1.167 0 2.148.51 2.426 1.2h.079v.4c0 .883-1.122 1.599-2.505 1.599-1.383 0-2.505-.716-2.505-1.599Z",
      clipRule: "evenodd"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      stroke: "#1EAEBD",
      strokeWidth: 0.5,
      d: "M181.392 129.266c0 .464.267.91.75 1.25.482.339 1.161.557 1.922.557.762 0 1.441-.218 1.923-.557.483-.34.75-.786.75-1.25 0-.465-.267-.91-.75-1.25-.482-.339-1.161-.557-1.923-.557-.761 0-1.44.218-1.922.557-.483.34-.75.785-.75 1.25Z"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 2.505,
      cy: 1.6,
      fill: "#E5F5F6",
      rx: 2.505,
      ry: 1.6,
      transform: "matrix(-1 0 0 1 186.569 126.752)"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#81BEC4",
      d: "M208.909 71.957s-21.189 1.472-21.889 1.472V44.11l21.889-3.077v30.925Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#90D1D8",
      d: "M207.657 72.094s-19.958 1.335-20.637 1.335V45.035l20.673-2.84-.036 29.899Z"
    }), _react.default.createElement(_reactNativeSvg.Ellipse, {
      cx: 204.045,
      cy: 57.721,
      fill: "#F0F9FB",
      stroke: "#90D1D8",
      strokeWidth: 0.5,
      rx: 1.216,
      ry: 0.982
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#C9D9D8",
      d: "m285.945 92.985-3.851 1.711a3.199 3.199 0 0 1-2.814-.123l-12.593-6.958c-.558-.308-.528-1.042.054-1.3l3.952-1.757 15.252 8.427Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#B1C7C6",
      d: "m293.793 89.528-7.848 3.458 1.004-17.814 7.848-3.457-1.004 17.813Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#C9D9D8",
      d: "m285.945 92.984-15.242-8.422 1.004-17.814 15.241 8.423-1.003 17.813Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#8A9F9E",
      d: "m285.54 92.763-14.443-7.977.303-5.36 14.444 7.942-.304 5.395Z"
    }), _react.default.createElement(_reactNativeSvg.Path, {
      fill: "#DBE4E4",
      d: "m286.948 75.174-15.242-8.423 7.849-3.454 15.241 8.422-7.848 3.455Z"
    })), _react.default.createElement(_reactNativeSvg.Defs, null, _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "b",
      x1: 178.286,
      x2: 181.514,
      y1: -5.042,
      y2: 120.508,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7"
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#F6F6F6"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "c",
      x1: 178.286,
      x2: 181.514,
      y1: -5.042,
      y2: 120.508,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7"
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#F6F6F6"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "e",
      x1: 134.875,
      x2: 135.259,
      y1: 37.663,
      y2: 138.432,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "f",
      x1: 181.768,
      x2: 182.153,
      y1: 9.185,
      y2: 109.995,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "g",
      x1: 227.648,
      x2: 228.032,
      y1: -16.767,
      y2: 84.043,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "h",
      x1: 223.414,
      x2: 223.795,
      y1: 41.17,
      y2: 141.638,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "i",
      x1: 177.512,
      x2: 177.891,
      y1: 15.085,
      y2: 115.31,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "j",
      x1: 138.411,
      x2: 138.792,
      y1: -7.98,
      y2: 92.632,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#F7F7F7",
      stopOpacity: 0
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#FDF8F2"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "k",
      x1: 198.847,
      x2: 183.703,
      y1: 138.291,
      y2: 146.206,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#30B9C4"
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#0E88A3"
    })), _react.default.createElement(_reactNativeSvg.LinearGradient, {
      id: "l",
      x1: 6.68,
      x2: 25.291,
      y1: 12.927,
      y2: 9.364,
      gradientUnits: "userSpaceOnUse"
    }, _react.default.createElement(_reactNativeSvg.Stop, {
      stopColor: "#5FD2D1"
    }), _react.default.createElement(_reactNativeSvg.Stop, {
      offset: 1,
      stopColor: "#1EAEBD"
    }))));
  };

  var _default = SvgComponent;
  exports.default = _default;
},11075,[14308,14305,10297,11485]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefa