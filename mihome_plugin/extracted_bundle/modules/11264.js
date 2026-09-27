ext.prev = 22;
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

    var onChangeMopAugmentSwitch = function onChangeMopAugmentSwitch(res) {
      exeCmd(function () {
        return _resourceManager.actions.setMopAugmentSwitch(res);
      }, function () {
        return _resourceManager.propertys.getMopAugmentSwitch(function (value) {
          robotStore.setMopAugmentSwitch(value);
        });
      });
    };

    var onChangeBreakClean = function onChangeBreakClean(res) {
      exeCmd(functi