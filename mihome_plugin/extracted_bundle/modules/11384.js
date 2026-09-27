efault.keyword321);
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

    var onDisturbSwitchChange = function onDisturbSwitchChange(res) {
      exeCmd(function () {
        return _index.actions.setDisturbSwitch(res);
      }, function () {
        return _index.propertys.getDisturbSwitch(function (value) {
          return robotStore.setDisturbSwitch(value);
        });
      });
    };

    var onShowDatePickerAction = function onShowDatePickerAction(type) {
      store.showDatePicker({
        title: type === DatePickType.START ? _multilingual.default == null ? undefined : _multilingual.default.keyword106 : _multilingual.default == null ? undefined : _multilingual.default.keyword107,
        type: type
      });
    };

  