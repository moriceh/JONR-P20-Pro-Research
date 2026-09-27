pRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useSheetRouteParams = exports.RouterParamsContext = exports.useSheetRouter = exports.RouterContext = exports.useRouter = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _react = _$$_REQUIRE(_dependencyMap[4]);

  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);

  var useRouter = function useRouter(_ref) {
    var onNavigate = _ref.onNavigate,
        onNavigateBack = _ref.onNavigateBack,
        initialRoute = _ref.initialRoute,
        routes = _ref.routes,
        getRef = _ref.getRef,
        routeOpacity = _ref.routeOpacity;

    var _useState = (0, _react.useState)([]),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        stack = _useState2[0],
        setStack = _useState2[1];

    var currentRoute = stack == null ? undefined : stack[stack.length - 1];
    var animate = (0, _react.useCallback)(function () {
      var snap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      getRef == null ? undefined : getRef().snapToRelativeOffset(snap);

      _reactNative.Animated.timing(routeOpacity, {
        toValue: opacity,
        duration: 150,
        useNativeDriver: true,
        delay: delay
      }).start();
    }, [getRef, routeOpacity]);
    var navigate = (0, _react.useCallback)(function (name, params, snap) {
      animate(snap || 20, 0);
      setTimeout(function () {
        setStack(function (state) {
          var next = routes == null ? undefined : routes.find(function (route) {
            return route.name === name;
          });

          if (!next) {
            animate(0, 1);
            return state;
          }

          var currentIndex = state.findIndex(function (route) {
            return route.name === next.name;
          });

          if (currentIn