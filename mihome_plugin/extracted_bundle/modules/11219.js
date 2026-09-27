pe.CLEAN_COUNT ? 7 : _context2.t0 === SliderComponentType.ROUTE_PREFER ? 12 : 17;
              break;

            case 3:
              exeCmd(function () {
                return _resourceManager.actions.setFanMode(value);
              }, function () {
                return _resourceManager.propertys.getFanMode(function (value) {
                  return robotStore.setFanMode(value);
                });
              });
              return _context2.abrupt("break", 18);

            case 5:
              exeCmd(function () {
                return _resourceManager.actions.setWaterMode(value);
              }, function () {
                return _resourceManager.propertys.getWaterMode(function (value) {
                  return robotStore.setWaterMode(value);
                });
              });
              return _context2.abrupt("break", 18);

            case 7:
              _context2.next = 9;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.setCleanCount(value);
              }, function () {
                return _resourceManager.propertys.getCleanCount(function (value) {
                  return robotStore.setCleanCount(value);
                });
              }));

            case 9:
              res = _context2.sent;

              if (robotStore.runningState && res) {
                onShowToast && onShowToast(_multilingual.default == n