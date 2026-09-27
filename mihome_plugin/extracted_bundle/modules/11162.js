ultilingual.default.keyword240,
            mapInfo: mapInfo
          });
          break;

        case _enum.MapSettingType.Room:
          if (!isNewMap) {
            onNavigateToPage("RoomManager", {
              mapId: mapInfo.mapId
            });
          } else {
            commonStore.showMessageDialog({
              message: _multilingual.default == null ? undefined : _multilingual.default.keyword239,
              onCancel: function onCancel() {},
              onConfirm: function onConfirm() {
                return onSaveMapClick(mapInfo.mapId);
              }
            });
          }

          break;

        case _enum.MapSettingType.Delete:
          {
            onDeleteMap(mapInfo.mapId);
          }
          break;

        case _enum.MapSettingType.Sequence:
          if ((mapStore == null ? undefined : (_mapStore$curMapInfo = mapStore.curMapInfo) == null ? undefined : _mapStore$curMapInfo.mapId) === (mapInfo == null ? undefined : mapInfo.mapId)) {
            _handelRunningStateFunc(_multilingual.default == null ? undefined : _multilingual.default.keyword47, function () {
              onNavigateToPage("CustomizedOrder", {
                title: _multilingual.default == null ? undefined : _multilingual.default.keyword470,
                mapId: mapInfo.mapId,
                titleProps: {
                  titleStyle: {
                    fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword125.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                  }
                }
              });
            });
          } else {
            onNavigateToPage("CustomizedOrder", {
              title: _multilingual.default == null ? undefined : _multilingual.default.keyword470,
              mapId: mapInfo.mapId,
              titleProps: {
                titleStyle: {
                  fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword125.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
                }
     