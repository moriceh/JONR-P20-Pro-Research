 });
      }).then(function () {
        store.changeNotDust();
      });
    };

    var onChangeNotDry = function onChangeNotDry() {
      exeCmd(function () {
        return _index.actions.setDisturbTimeSet({
          notDry: store.notDry ? 0 : 1
        });
      }, function () {
        return _index.propertys.getDisturbTimeSet(function (value) {
          return robotStore.setDisturbTimeSet(value);
        });
      }).then(function () {
        store.changeNotDry();
      });
    };

    var onDatePickerSelected = function onDatePickerSelected(res) {
      var hourStr = res == null ? undefined : res.rawArray[0];
      var minStr = res == null ? undefined : res.rawArray[1];
      var timeStr = hourStr + ":" + minStr;
      var isStartTime = store.datePicker.type === DatePickType.START;
      var shouldConfirm = isStartTime ? timeStr === store.endTime : timeStr === store.startTime;

      if (shouldConfirm) {
        store.showConfirmDigalog();
      } else {
        if (isStartTime) {
          onChangeStartTime(timeStr);
        } else {
          onChangeEndTime(timeStr);
        }
      }
    };

    var ExpendView = (0, _mobxReactLite.observer)(function () {
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: (0, _screenAdapte.sizeW)(16),
          paddingBottom: (0, _screenAdapte.sizeH)(16)
        }
      }, _react.default.createElement(_sublist.default, {
        onHandleClick: function onHandleClick(key) {
          switch (key) {
            case 1:
              onShowDatePickerAction(DatePickType.START);
              break;

            case 2:
              onShowDatePickerAction(DatePickType.END);
              break;

            default:
              break;
          }
        },
        listData: [{
          key: 1,
          type: 'indicate',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword106,
          subtitle: store.startTime
        }, {
          key: 2,
          type: 'indicate',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword107,
          subtitle: store.endTime
        }]
      })), _react.default.createElement(_reactNative.View, {
        style: {
          backgroundColor: '#fff',
          paddingHorizontal: (0, _screenAdapte.sizeW)(16)
        }
      }, _react.default.createElement(_mhuiRn.Separator, {
        style: styles.line
      })), !(0, _version.isNewerVersion439_681)() ? null : _react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: (0, _screenAdapte.sizeW)(16),
          marginTop: (0, _screenAdapte.sizeH)(16)
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.subtitles
      }, _multilingual.default == null ? undefined : _multilingual.default.keyword533), _react.default.createElement(_sublist.default, {
        onHandleClick: function onHandleClick(key) {
          switch (key) {
            case 1:
              onChangeNotDust();
              break;

            case 2:
              onChangeNotDry();
              break;

            default:
              break;
          }
        },
        listData: [{
          key: 1,
          type: 'choice',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword465,
          selectedKe