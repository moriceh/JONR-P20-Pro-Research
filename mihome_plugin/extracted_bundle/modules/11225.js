r _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var RelocateTipView = function RelocateTipView(_ref) {
    var visible = _ref.visible;
    return visible && _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: ['rgba(255, 255, 255, 0.2541)', 'rgba(255, 255, 255, 0.3009)', 'rgba(255, 255, 255, 0.8017)'],
      style: {
        position: 'absolute',
        top: (_screenAdapte.SCREEN_HEIGHT + (0, _screenAdapte.sizeW)(90)) / 2,
        left: (_screenAdapte.SCREEN_WIDTH + (0, _screenAdapte.sizeW)(90)) / 2,
        transform: [{
          translateX: -_screenAdapte.SCREEN_WIDTH / 4
        }, {
          translateY: -_screenAd