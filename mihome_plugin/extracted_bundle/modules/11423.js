lt)(this.selectedAreas), [curArea]);

            this.selectedAreas = _result2;
          }
        },
        setSplitLineInfo: function setSplitLineInfo(points, overAreas) {
          this.splitLinePoints = points;
          this.splitLineOverAreas = overAreas;
        },

        get isMergeItemAble() {
          return (this.selectedAreas.length >= 2 || this.selectedAreas.length === 0) && !this.isShowSplitLine;
        },

        get isSegmentItemAble() {
          return (this.selectedAreas.length == 1 || this.selectedAreas.length === 0) && !this.isShowSplitLine;
        },

        get calculateAreaTipType() {
          switch (store.currentMode) {
            case RoomManagerType.Segment:
            case RoomManagerType.Merge:
              return _areaTipView.AreaTipType.NoneSelected;

            case RoomManagerType.Name:
              return _areaTipView.AreaTipType.IconNameSelected;

            default:
              return _areaTipView.AreaTipType.IconName;
          }
        },

        get bottomTitle() {
          switch (store.currentMode) {
            case RoomManagerType.Segment:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword249;

            case RoomManagerType.Merge:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword248;

            case RoomManagerType.Name:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword664;

            default:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword246;
          }
        },

        get isBordered() {
          var _store$mapInfo3;

          return areRoomsAdjacent((_store$mapInfo3 = store.mapInfo) == null ? undefined : _store$mapInfo3.areas, (0, _mobx.toJS)(store.select