_multilingual.default == null ? undefined : _multilingual.default.keyword106,
          type: DatePickType.START
        },
        setStartTime: function setStartTime(time) {
          this.startTime = time;
        },
        setEndTime: function setEndTime(time) {
          this.endTime = time;
        },
        changeNotDust: function changeNotDust() {
          this.notDust = this.notDust === 1 ? 0 : 1;
        },
        changeNotDry: function changeNotDry() {
          this.notDry = this.notDry === 1 ? 0 : 1;
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
              _index.propertys.getTimeZone(function (value) {
                return function (value) {
                  return deviceStore.setTimeZone(value);
                };
              });

              res && setTimeout(function () {
                commonStore.showToast(_multilingual.default == null ? undefined : _multilingual.default.keyword443);
              }, 500);
            });
          }
        });
      }

      return function () {};
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

              commonStore.showToast(_multilingual.d