me) {
          this.endTime = time;

          var _time$split$map3 = time.split(':').map(Number),
              _time$split$map4 = (0, _slicedToArray2.default)(_time$split$map3, 2),
              hours = _time$split$map4[0],
              minutes = _time$split$map4[1];

          _index.actions.setDisturbTimeSet({
            endHour: hours,
            endMin: minutes
          });
        },
        changeNotDust: function changeNotDust() {
          this.notDust = this.notDust === 1 ? 0 : 1;

          _index.actions.setDisturbTimeSet({
            notDust: this.notDust
          });
        },
        changeNotDry: function changeNotDry() {
          this.notDry = this.notDry === 1 ? 0 : 1;

          _index.actions.setDisturbTimeSet({
            notDry: this.notDry
          });
        },
        showConfirmDigalog: function showConfirmDigalog() {
          this.confirmDigalogVisible = true;
        },
        hiddenConfirmDigalog: function hiddenConfirmDigalog() {
          this.confirmDigalogVisible = false;
        },
        showDatePicker: function showDatePicker(_ref2) {
          var title = _ref2.title,
              type = _ref2.type;
          this.datePicker.type = type;
          this.datePicker.title = title;
          this.datePicker.visible = true;
        },
        hiddenDatePicker: function hiddenDatePicker() {
          this.datePicker.visible = false;
        }
      };
    });

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        type = _useNetInfo.type,
        isConnected = _useNetInfo.isConnected;

    (0, _react.useEffect)(function () {
      if (deviceStore.timeZone != configStore.phoneTimeZone) {
        commonStore.showMessageDialog({
          message: _multilingual.default == null ? undefined : _multilingual.default.keyword72,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            _index.actions.syncTimeZone(configStore.phoneTimeZone).then(function (res) {
              res && setTimeout(function () {
                commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword443);
              }, 500);
            });
          }
        });
      }

      return function () {};
    }, []);

    var onDisturbSwitchChange = function onDisturbSwitchChange(res) {
      exeCmd(function () {
        return _index.actions.setDisturbSwitch(res);
      });
    };

    var onShowDatePickerAction = function onShowDatePickerAction(type) {
      store.showDatePicker({
        title: type === DatePickType.START ? _multilingual.default == null ? undefined : _multilingual.default.keyword106 : _multilingual.default == null ? undefined : _multilingual.default.keyword107,
        type: type
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
          store.setStartTime(timeStr);
        } else {
          store.setEndTime(timeStr);
        }
      }
    };

    var exeCmd = function exeCmd(asyncCmdFunc) {
      var errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function exeCmd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              errorMessage = _args.length > 1 && _args[1] !== undefined ? _args[1] : _multilingual.default == null ? undefined : _multilingual.default.keyword326;

              if (isConnected) {
                _context.next = 4;
                break;
              }

              commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword321);
              return _context.abrupt("return", false);

            case 4:
              commonStore.showLoading();
              _context.next = 7;
              return _regenerator.default.awrap(asyncCmdFunc());

            case 7:
              res = _context.sent;

              if (!res) {
                commonStore.showToast(errorMessage);

                _logger.default.e("命令错误", asyncCmdFunc.name, res);
              }

              setTimeout(function () {
                commonStore.hideLoading();
              }, 500);
              return _context.abrupt("return", res);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
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
          