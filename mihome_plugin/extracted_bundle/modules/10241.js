ar"
          });
          store.setSelectedAreas([]);
          break;

        case _enum2.ChoiceType.CHOICE_ITEM:
          if (item.key === 1) {
            _washMop(true);
          } else if (item.key === 2) {
            _collectDust(true);
          } else if (item.key === 3) {
            _backCharge(_enum.RobotSetStatus.IdleToReturn);
          }

          break;

        default:
          break;
      }
    };

    var _addZoning = function _addZoning() {
      var _store$zones, _store$zones2, _store$zones3, _mapStore$curMapInfo;

      var cleanPoint = (_store$zones = store.zones) ==