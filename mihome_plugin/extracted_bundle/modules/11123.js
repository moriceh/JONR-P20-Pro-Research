_REQUIRE(_dependencyMap[9]);

  var _mhuiRn = _$$_REQUIRE(_dependencyMap[10]);

  var _mobxReactLite = _$$_REQUIRE(_dependencyMap[11]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[12]);

  var _resourceManager = _$$_REQUIRE(_dependencyMap[13]);

  var _is = _$$_REQUIRE(_dependencyMap[14]);

  var _Hbutton = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));

  var _propTypes = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));

  var _dialog = _$$_REQUIRE(_dependencyMap[17]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));

  var _netinfo = _$$_REQUIRE(_dependencyMap[20]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[22]);

  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));

  var _setUp = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24]));

  var _index2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));

  var _miot = _$$_REQUIRE(_dependencyMap[26]);

  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[27]));

  var BaseStationFunction = function BaseStationFunction(_ref) {
    var onBackCharge = _ref.onBackCharge,
        onGoStationSet = _ref.onGoStationSet;

    var toastRef = _react.default.useRef(null);

    var baseImages = _Images.default.base;

    var _useStore = (0, _index.useStore)(),
        robotStore = _useStore.robotStore,
        commonStore = _useStore.commonStore;

    var _useState = (0, _react.useState)(false),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        showStationFunctionDialog = _useState2[0],
        setShowStationFunctionDialog = _useState2[1];

    var _useNetInfo = (0, _netinfo.useNetInfo)(),
        type = _useNetInfo.type,
        isConnected = _useNetInfo.isConnected;

    var slideAnim = (0, _react.useRef)(new _reactNative.Animated.Value(600)).current;

    var _useState3 = (0, _react.useState)(600),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        contentHeight = _useState4[0],
        setContentHeight = _useState4[1];

    var durationFactor = 2;
    var maxDuration = 200;
    var animationDuration = Math.min(contentHeight * durationFactor, maxDuration);

    var exeCmd = function exeCmd(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function exeCmd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loadingMessage = _args.length > 2 && _args[2] !== undefined ? _args[2] : _multilingual.default.keyword474;
              errorMessage = _args.length > 3 && _args[3] !== undefined ? _args[3] : _multilingual.default.keyword326;

              if (isConnected) {
                _context.next = 5;
                break;
              }

              commonStore.showToast(_multilingual.default.keyword321);
              return _context.abrupt("return", false);

            case 5:
              commonStore.showLoading(loadingMessage);
              _context.prev = 6;
              _context.next = 9;
              return _regenerator.default.awrap(task());

            case 9:
              res = _context.sent;

              if (!res) {
                _context.next = 19;
                break;
              }

              _context.t0 = extraTask;

              if (!_context.t0) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return _regenerator.default.awrap(extraTask());

            case 15:
              commonStore.hideLoading();
              return _context.abrupt("return", true);

            case 19:
              throw new Error("actions\u53D1\u9001\u5931\u8D25:");

            case 20:
              _context.next = 27;
              break;

            case 22:
              _context.prev = 22;
              _context.t1 = _context["catch"](6);
              commonSt