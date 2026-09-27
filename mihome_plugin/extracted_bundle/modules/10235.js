ndefined : obj.fields[0])) {
                mapStore.setCurMapInfo(obj);
              }

            case 18:
              commonStore.hideLoading();

            case 19:
              _context2.next = 25;
              break;

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e("拉取地图更新事件错误", _context2.t0);

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 21]]);
    };

    var _switchMap = function _switchMap(mapId) {
      var res;
      return _regenerator.default.async(function _switchMap$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.switchMap(mapId);
              }));

            case 2:
              res = _context3.sent;
              res && _getCurMap();

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    };

    var _delMap = function _delMap(mapId) {
      var res;
      return _regenerator.default.async(function _delMap$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.delMap(mapId);
              }));

            case 2:
              res = _context4.sent;
              res && _getCurMap();

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    };

    var _saveMap = function _saveMap(_ref3) {
      var mapId, _ref3$isExpanded, isExpanded, _ref3$replaceMapId, replaceMapId, res;

      return _regenerator.default.async(function _saveMap$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              mapId = _ref3.mapId, _ref3$isExpanded = _ref3.isExpanded, isExpanded = _ref3$isExpanded === undefined ? 0 : _ref3$isExpanded, _ref3$replaceMapId = _ref3.replaceMapId, replaceMapId = _ref3$replaceMapId === undefined ? "" : _ref3$replaceMapId;
              _context5.next = 3;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.saveMap({
                  mapId: mapId,
                  isExpanded: isExpanded,
                  replaceMapId: replaceMapId
                });
              }));

            case 3:
              res = _context5.sent;
              res && _getCurMap();

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      });
    };

    var _handelRunningStateFunc = function _handelRunningStateFunc(message, func) {
      _logger.default.d("handelRunningStateFunc", robotStore.isReturning, robotStore.status, robotStore.runningState);

      if (robotStore.runningState) {
        commonStore.showMessageDialog({
          message: message,
          onCancel: function onCancel() {},
          onConfirm: function onConfirm() {
            _stopClean().then(function _callee(res) {
              return _regenerator.default.async(function _callee$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
         