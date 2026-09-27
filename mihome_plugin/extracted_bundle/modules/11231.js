       var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _react = _$$_REQUIRE(_dependencyMap[0]);

  var _react2 = _interopRequireDefault(_react);

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  var _reactNativeSafeModule = _$$_REQUIRE(_dependencyMap[2]);

  var _reactNativeSafeModule2 = _interopRequireDefault(_reactNativeSafeModule);

  var _propTypes = _$$_REQUIRE(_dependencyMap[3]);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var NativeLottieView = _reactNativeSafeModule2.default.component({
    viewName: 'LottieAnimationView',
    mockComponent: _reactNative.View
  });

  var AnimatedNativeLottieView = _reactNative.Animated.createAnimatedComponent(NativeLottieView);

  var LottieViewManager = _reactNativeSafeModule2.default.module({
    moduleName: 'LottieAnimationView',
    mock: {
      play: function play() {},
      reset: function reset() {}
    }
  });

  var ViewStyleExceptBorderPropType = function ViewStyleExceptBorderPropType(props, propName, componentName) {
    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    var flattened = _reactNative.StyleSheet.flatten(props[propName]);

    var usesBorder = Object.keys(flattened).some(function (key) {
      return key.startsWith('border');
    });

    if (usesBorder) {
      return Error(componentName + ' does not allow any border related style properties to be specified. ' + "Border styles for this component will behave differently across platforms. If you'd " + 'like to render a border around this component, wrap it with a View.');
    }

    return _reactNative.ViewPropTypes.style.apply(_reactNative.ViewPropTypes, [props, propName, componentName].concat(rest));
  };

  var NotAllowedPropType = function NotAllowedPropType(props, propName, componentName) {
    var value = props[propName];

    if (value != null) {
      return Error(componentName + ' cannot specify \'' + propName + '\'.');
    }

    return null;
  };

  var propTypes = _extends({}, _reactNative.ViewPropTypes, {
    style: ViewStyleExceptBorderPropType,
    children: NotAllowedPropType,
    resizeMode: _propTypes2.default.oneOf(['