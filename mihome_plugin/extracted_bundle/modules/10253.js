 title: _multilingual.default == null ? undefined : _multilingual.default.keyword462,
                    data: {
                      title: item.text,
                      solution: item.subtitle,
                      code: item.code,
                      notificationType: item == null ? undefined : item.notificationType
                    },
                    titleProps: {
                      titleStyle: {
                        fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword462.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                      }
                    }
                  });
                }
              }
            }
          });
        });
      }));
    }

    function MapContent() {
      return _react.default.createElement(_mobxReactLite.Observer, null, function () {
        var _mapStore$curMapInfo2;

        if (((_mapStore$curMapInfo2 = mapStore.curMapInfo) == null ? undefined : _mapStore$curMapInfo2.mapData.lz4Len) && robotStore.status !== _enum.RobotStatus.SpotClean) {
          var areaTipType = store.cleanMode === _enum2.Clean