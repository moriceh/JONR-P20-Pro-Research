             if (!res) {
                        _context6.next = 4;
                        break;
                      }

                      _context6.next = 3;
                      return _regenerator.default.awrap(delay(500));

                    case 3:
                      func && func();

                    case 4:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            });
          }
        });
      } else {
        func && func();
      }
    };

    var onCreateMapConfirm = function onCreateMapConfirm(type) {
      store.hideCreateMapDialog();

      _startBuilding(type === "fastBuilding");
    };

    var onChoiceConfirm = function onChoiceConfirm(item) {
      _logger.default.d("操作列表弹窗 地图/基站功能点击", item);

      store.hideChoiceActionSheet();

      switch (store.choiceActionSheet.type) {
        case _enum2.ChoiceType.REPLACE_MAP:
          _saveMap({
            mapId: mapStore.curMapInfo.mapId,
            replaceMapId: item.value
          });

          break;

        case _enum2.ChoiceType.SWITCH_MAP:
          _switchMap(item.value);

          store.setVirtualZones({
            type: "cle