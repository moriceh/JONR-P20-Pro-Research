estimateText.width, estimateText.height, y]);

    var CleanParamIconView = function CleanParamIconView() {
      if (cleanParamIcon.length) {
        var len = cleanParamIcon.filter(function (item) {
          return item !== null;
        }).length;
        var bgSize = {
          width: len === 3 ? 38 : 48,
          height: 16
        };
        var nameArr = ['FanMode', 'WaterMode', 'RoutePrefer', 'CleaningTimes'];
        return _react.default.createElement(_re