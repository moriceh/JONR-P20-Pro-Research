rrorText = _multilingual.default == null ? undefined : _multilingual.default.keyword437;
            } else if (type === 1 || type === 3) {
              errorText = _multilingual.default == null ? undefined : _multilingual.default.keyword438;
            } else {
              errorText = _multilingual.default == null ? undefined : _multilingual.default.keyword439;
            }

            break;
          }

        case _enum.BaseStationEquipState.Unusable:
          {
            if (type === 0) {
              errorText = _multilingual.default == null ? undefined : _multilingual.default.keyword440;
            } else {
              errorText = _multilingual.default == null ? undefined : _multilingual.default.keyword441;
            }
          }
          break;

        case _enum.BaseStationEquipState.FluidLow:
          errorText = _multilingual.default == null ? undefined : _multilingual.default.keyword381;
          break;
      }

      return _react.default.createElement(_reactNative.View, {
        style: styles.equipmentStateItem
      }, _react.default.createElement(_reactNative.Image, {
        style: styles.equipmentStateItemImg,
        source: state === _enum.BaseStationEquipState.Normal ? _Images.default.home.station_equipment_nor : _Images.default.home.station_equipment_err
      }), _react.default.createElement(_reactNative.View, {
        style: styles.equipmentStateItemContent
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.equipmentStateItemText
      }, title), errorText.length > 0 && _react.default.createElement(_reactNative.View, {
        style: styles.equipmentStateErrorTip
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.equipmentStateItemErrorText
      }, errorText))));
    };

    var showModal = function showModal() {
      setShowStationFunctionDialog(true);
    };

    var 