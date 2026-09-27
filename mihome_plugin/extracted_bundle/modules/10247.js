   };

    var onVirtualZonesChange = function onVirtualZonesChange(actionType, id, changeType, points) {
      _logger.default.d("++++++++++++++++++++onVirtualZonesChange", id, changeType, points);

      store.setVirtualZones({
        type: changeType,
        id: id,
        points: points
      });
    };

    var onSwitchMapAction = function onSwitchMapAction() {
      _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, function () {
        store.showChoiceActionSheet(_enum2.ChoiceType.SWITCH_MAP);
      });
    };

    var onChangeMapNameAction = function onChangeMapNameAction(mapId, name) {
      var res;
      return _regenerator.default.async(function onChangeMapNameAction$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!(0, _is.isNull)(name)) {
                _context9.next = 2;
                break;
              }

              return _context9.abrupt("return");

            case 2:
              _context9.next = 4;
              return _regenerator.default.awrap(exeCmd(function () {
                return _resourceManager.actions.editedMap({
                  action: "mod",
                  mapId: mapId,
                  name: name
                });
              }));

            case 4:
              res = _context9.sent;
              res && _getCurMap();

            cas