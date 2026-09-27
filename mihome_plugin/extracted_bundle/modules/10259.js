Area: store.cleanMode === _enum2.CleanModeType.Room && !robotStore.runningState,
              isShowZoning: store.cleanMode === _enum2.CleanModeType.Zoning,
              isEditZoning: !robotStore.runningState && store.cleanMode === _enum2.CleanModeType.Zoning
            }
          });
        } else if (robotStore.status === _enum.RobotStatus.SpotClean) {
          return _react.default.createElement(_reactNative.Image, {
            resizeMode: "contain",
            style: {
              flex: 1,
              width: (0, _screenAdapte.sizeW)(358.22),
              height: (0, _screenAdapte.sizeH)(294.48)
            },
            source: _Images.default.closeleaningRecords.inset
          });
        } else {
          return _react.default.createElement(BlankMapView, {
            showCreateMap: !robotStore.runningState && robotStore.saveMapSwitch && !commonStore.isLoading
          });
        }
      });
    }

    function BlankMapView(_ref4) {
      var showCreateMap = _ref4.showCreateMap;
      return _react.default.createElement(_reactNative.View, {
        style: {
          width: "100%",
          alignItems: "center"
        }
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: "100%",
          height: (0, _screenAdapte.sizeH)(360)
        },
        resizeMode: "contain",
        source: homeImgaes.inset
      }), showCreateMap && _react.default.createElement(_button.Mbutton, {
        className: {
          backgroundColor: "#fff"
        },
        onPress: onCreatMapAction
      }, _multilingual.default.keyword42));
    }

    return _react.default.createElement(_reactNative.View, {
      style: styles.securityZone
    }, _react.default.createElement(_reactNative.View, {
      style: styles.robotHomepageContainer
    }, _react.default.createElement(_reactNative.ImageBackground, {
      source: _miot.DarkMode.getColorScheme() === "light" ? _$$_REQUIRE(_dependencyMap[47]) : null,
      style: {
        flex: 1,
        backgroundColor: _miot.DarkMode.getColorScheme() === "light" ? "#F2F6F6" : "#000000"
      },
      resizeMode: "stretch"
    }, _reactNative.Platform.OS === 'ios' && _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_reactNative.Text, {
        style: styles.navigationBarText
      }, robotStore.statusStr);
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return mapStore.hasMapData && store.selectiveTip.length && !robotStore.runningState ? _react.default.createElement(_mobxReactLite.Observer, null, function () {
        return _react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _screenAdapte.sizeH)(76),
            width: "100%",
            alignItems: "center",
            justifyContent: "center"
          }
        }, _react.default.createElement(_reactNative.Text, {
          style: [styles.selectivePrompting, {
            color: "xm#2CD5AE"
          }]
        }, store.selectiveTip));
      }) : _react.default.createElement(TopView, null);
    }), _react.default.createElement(_reactNative.View, {
      style: styles.robotHomepageMap
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return robotStore.saveMapSwitch && mapStore.hasMapData && _react.default.createElement(_index3.default, {
        cleanMode: store.cleanMode,
        CleanModeType: _enum2.CleanModeType,
        mapName: mapStore.currentMapName,
        mapInfo: mapStore.curMapInfo,
        rightTipType: mapStore.mapInfos.length >= 1 ? _index3.RightTipType.Switch : _index3.RightTipType.None,
        onRightTipClick: onSwitchMapAction,
        showMapCreatBtn: robotStore.multifloorSwitch ? mapStore.mapInfos.length < 4 : mapStore.mapInfos.length < 1,
        onSaveMapClick: saveMapAction,
        onMapCreatClick: onCreatMapAction,
        onNavigateToPage: onNavigatePage,
        onChangeMapName: onChangeMapNameAction,
        onDeleteMap: onDeleteMapAction
      });
    }), _react.default.createElement(MapContent, null), _react.default.createElement(NoticeTips, null)), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: 20,
          marginBottom: (0, _screenAdapte.sizeH)(40)
        }
      }, _react.default.createElement(_reactNative.View, {
        style: styles.robotHomepageBottom
      }, _react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _screenAdapte.sizeH)(58)
        }
      }, _react.default.createElement(_topTap.default, {
        selectedMode: store.cleanMode,
        onCleanModeSwith: onCleanModeSwith
      })), _react.default.createElement(_reactNative.View, {
        style: styles.bottomMode
      }, _react.default.createElement(_reactNative.View, {
        style: [styles.bottomMode, styles.mockColor]
      }, _react.default.createElement(_CleaningMode.default, {
        onStopClean: _handelRunningStateFunc,
        onNavigateToPage: onNavigatePage,
        selectedMode: store.cleanMode
      }), _react.default.createElement(_reactNative.View, {
        style: {
          flex: 1
        }
      }), _react.default.createElement(_baseStationFunction.default, {
        onBackCharge: onBackCharge,
        onGoStationSet: onGoStationSet
      })))), _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: onStartAction,
        style: {
          position: "absolute",
          top: (0, _screenAdapte.sizeH)(50),
          alignSelf: "center"
        }
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(97),
          height: (0, _screenAdapte.sizeH)(97),
          alignSelf: "center"
        },
        resizeMode: "contain",
        source: robotStore.isRunning ? robotStore.status === _enum.RobotStatus.SpotClean ? homeImgaes.stop : homeImgaes.pause : homeImgaes.start
      })));
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return store.cleanMode === _enum2.CleanModeType.Zoning && mapStore.hasMapData && !robotStore.runningState && _react.default.createElement(_reactNative.TouchableOpacity, {
        style: {
          position: "absolute",
          right: 20,
          bottom: (0, _screenAdapte.sizeH)(206)
        },
        onPress: onAddCleanZoneClick
      }, _react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _screenAdapte.sizeW)(30),
          height: (0, _screenAdapte.sizeH)(30),
          backgroundColor: "xm#fff",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 8
        }
      }, _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(21),
          height: (0, _screenAdapte.sizeH)(21)
        },
        source: homeImgaes.zoning,
        resizeMode: "contain"
      })));
    }))), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_dialog.ChoiceActionSheet, {
        visible: store.choiceActionSheet.visible,
        title: store.choiceTitle,
        listData: store.choiceListData,
        onCancel: function onCancel() {
          return store.hideChoiceActionSheet();
        },
        onChoice: onChoiceConfirm
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_CarpetEdit.default, {
        onNavigateToPage: onNavigatePage,
        carpetEditState: store.carpetEditState,
        setCarpetEditState: store.setCarpetEditState
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_dialog.CreateMapDialog, {
        visible: store.isShowCreateMapDialog,
        onCancel: function onCancel() {
          return store.hideCreateMapDialog();
        },
        onConfirm: onCreateMapConfirm
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_relocateTipView.default, {
        visible: robotStore.isRelocateing
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_extendedMapGuide.default, {
        visible: mapStore.isShowMapExtentDialog,
        mapName: mapStore.currentMapName,
        mapInfo: mapStore.curMapInfo,
        onConfirm: saveExtendedMapAction,
        onCancel: cancelSaveExtendedMapAction
      });
    }), _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_floorMapSelection.default, {
        MultiFloor: MultiFloor,
        switchMap: switchMap,
        handleCancelDialog: handleCancelDialog,
        cleaningModeState: cleaningModeState
      });
    }));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    selectivePrompting: (0, _objectSpread2.default)({}, _Styles.default.subtitleStyles, {
      fontSize: (0, _screenAdapte.pText)(14)
    }),
    securityZone: {
      flex: 1
    },
    robotHomepageContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "transparent"
    },
    robotHomepageMap: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center"
    },
    robotHomepageBottom: {
      backgroundColor: new _DynamicColor.default("rgba(255, 255, 255, 0.3)", "rgba(28, 28, 28, 0.3)"),
      borderRadius: 10,
      overflow: "hidden",
      borderColor: new _D