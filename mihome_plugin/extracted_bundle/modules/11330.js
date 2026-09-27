nction _stopClean() {
      var task = function task() {
        return _resourceManager.manager.getSpec([{
          param: _resourceManager.propertyCodes["robot-status"],
          fn: function fn(value) {
            return robotStore.setCurRobotStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes["return-status"],
          fn: function fn(value) {
            return robotStore.setReturnStatus(value);
          }
        }, {
          param: _resourceManager.propertyCodes["clean-type-status"],
          fn: function fn(value) {
            return robotStore.setStatus(value);
          }
        }]);
      };

      return exeCmd(_resourceManager.actions.stopClean, task);
    };

    var _changeSaveMapSwitch = function _changeSaveMapSwitch(value) {
      exeCmd(function () {
        return _resourceManager.actions.setSaveMapSwitch(value);
      }, function () {
        return _resourceManager.propertys.getMapSaveSwitch(function (value) {
          return robotStore.setSaveMapSwitch(value);
        });
      });
    };

    var _getMapInfos = function _getMapInfos() {
      var res, _ref, fileName, obj;

      return _regenerator.default.async(function _getMapInfos$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              commonStore.showLoading(_multilingual.default == null ? undefined : _multilingual.default.keyword428);
              _context2.next = 4;
              return _regenerator.default.awrap(delay(1000));

            case 4:
              _context2.next = 6;
              return _regenerator.default.awrap(_resourceManager.actions.getMapInfos());

            case 6:
              res = _context2.sent;

              _logger.default.d("变化后更新地图列表:", res);

              if (!res) {
                _context2.next = 26;
                break;
              }

              fileName = (_ref = res == null ? undefined : res[0]) != null ? _ref : "";

              if (fileName) {
                _context2.next = 14;
                break;
              }

              mapStore.setMapInfos([]);
              _context2.next = 25;
              break;

            case 14:
              _context2.prev = 14;
              _context2.next = 17;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapInfosFileContent)(fileName));

            case 17:
              obj = _context2.sent;

              _logger.default.d("更新的地图列表数据:", obj == null ? undefined : obj.map(function (item) {
