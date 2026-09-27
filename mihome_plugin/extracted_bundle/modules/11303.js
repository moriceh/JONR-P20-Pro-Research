setCleanType(mode) {
          this.cleanType = mode;
        },
        setWorkMode: function setWorkMode(mode) {
          this.workMode = mode;
        },
        setFanMode: function setFanMode(mode) {
          this.fanMode = mode;
        },
        setWaterMode: function setWaterMode(mode) {
          this.waterMode = mode;
        },
        setRoutePrefer: function setRoutePrefer(mode) {
          this.routePrefer = mode;
        },
        setCleanCount: function setCleanCount(count) {
          this.cleanCount = count;
        },
        showCleanModeDialog: function showCleanModeDialog() {
          this.isShowCleanModeDialog = true;
        },
        hideCleanModeDialog: function hideCleanModeDialog() {
          this.isShowCleanModeDialog = false;
        },
        showChoiceDialog: function showChoiceDialog(type) {
          this.choiceDialogType = type;
          this.isShowChoiceDialog = true;
        },
        hideChoiceDialog: function hideChoiceDialog() {
          this.isShowChoiceDialog = false;
        },
        setChoiceValue: function setChoiceValue(res) {
          if (this.choiceDialogType === ChoiceActionType.workMode) {
            _logger.default.d("切换预约类型", res);

            this.setCleanType(res.value);
          } else if (this.choiceDialogType === ChoiceActionType.mapSwitch) {
            _logger.default.d("切换地图", res);

            this.clearSelectAreas();
            this.setMapId(res.mapId);
          }
        },
        showRepeatDialog: function showRepeatDialog() {
          this.isShowRepeatDialog = true;
        },
        hideRepeatDialog: function hideRepeatDialog() {
          this.isShowRepeatDialog = false;
        },
        setSelectedRepeat: function setSelectedRepeat(value) {
          this.selectedRepeat = value;
        },
        showDatePickerDialog: function showDatePickerDialog() {
          this.isShowDatePickerDialog = true;
        },
        hideDatePickerDialog: function hideDatePickerDialog() {
          this.isShowDatePickerDialog = false;
        },
        setDateValue: function setDateValue(hour, min) {
          this.appoinHour = hour;
          this.appoinMin = min;
        },

        get repeatValueWeek() {
          return (0, _utils.getRepeatTitles)(this.repeatValue).join(",");
        },

        get mapInfo() {
          var _this = this;

          var mapInfos = mapStore.mapInfos.find(function (m) {
            return m.mapId === _this.mapId;
          });
          return mapInfos ? mapInfos : mapStore.curMapInfo;
        },

        get getCleanTypeStr() {
          switch (this.cleanType) {
            case CleanType.Auto:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword276;

            case CleanType.Area:
              return _multilingual.default == null ? undefined : _multilingual.default.keyword257;

            default:
              return "";
          }
        },

        get choiceDialogListData() {
          if (this.choiceDialogType === ChoiceActionType.workMode) {
            return [{
              key: 0,
              name: _multilingual.default == null ? undefined : _multilingual.default.keyword276,
              value: CleanType.Auto
            }, {
              key: 1,
              name: _multilingual.default == null ? undefined : _multilingual.default.keyword257,
              value: CleanType.Area
            }];
          } else {
            var _mapStore$mapInfos2;

            return (0, _mobx.toJS)((_mapStore$mapInfos2 = mapStore.mapInfos) == null ? undefined : _mapStore$mapInfos2.map(function (item, index) {
              return {
                key: index,
                name: item.name,
                mapId: item.mapId
              };
            }