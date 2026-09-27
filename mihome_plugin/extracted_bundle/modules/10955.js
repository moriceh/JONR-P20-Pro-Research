tion();

    if (connection) {
      connection.addEventListener("change", callback, {
        passive: true
      });
    }

    return function () {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);

      if (connection) {
        connection.removeEventListener("change", callback);
      }
    };
  };

  var getNetworkStateServerSnapshot = function getNetworkStateServerSnapshot() {
    throw Error("useNetworkState is a client-only hook");
  };

  function useNetworkState() {
    var cache = React.useRef({});

    var getSnapshot = function getSnapshot() {
      var online = navigator.onLine;
      var connection = getConnection();
      var nextState = {
        online: online,
        downlink: connection == null ? undefined : connection.downlink,
        downlinkMax: connection == null ? undefined : connection.downlinkMax,
        effectiveType: connection == null ? undefined : connection.effectiveType,
        rtt: connection == null ? undefined : connection.rtt,
        saveData: connection == null ? undefined : connection.saveData,
        type: connection == null ? undefined : connection.type
      };

      if (isShallowEqual(cache.current, nextState)) {
        return cache.current;
      } else {
        cache.current = nextState;
        return nextState;
      }
    };

    return React.useSyncExternalStore(useNetworkStateSubscribe, getSnapshot, getNetworkStateServerSnapshot);
  }

  function useObjectState(initialValue) {
    var _React$useState27 = React.useState(initialValue),
        _React$useState28 = (0, _slicedToArray2.default)(_React$useState27, 2),
        state = _React$useState28[0],
        setState = _React$useState28[1];

    var handleUpdate = React.useCallback(function (arg) {
      if (typeof arg === "function") {
        setState(function (s) {
          var newState = arg(s);

          if (isPlainObject(newState)) {
            return (0, _objectSpread2.default)({}, s, newState);
          }
        });
      }

      if (isPlainObject(arg)) {
        setState(function (s) {
          return (0, _objectSpread2.default)({}, s, arg);
        });
      }
    }, []);
    return [state, handleUpdate];
  }

  function useOrientation() {
    var _React$useState29 = React.useState({
      angle: 0,
      type: "landscape-primary"
    }),
        _React$useState30 = (0, _slicedToArray2.default)(_React$useState29, 2),
        orientation = _React$useState30[0],
        setOrientation = _React$useState30[1];

    React.useLayoutEffect(function () {
      var _window$screen;

      var handleChange = function handleChange() {
        var _window$screen$orient = window.screen.orientation,
            angle = _window$screen$orient.angle,
            type = _window$screen$orient.type;
        setOrientation({
          angle: angle,
          type: type
        });
      };

      var handle_orientationchange = function handle_orientationchange() {
        setOrientation({
          type: "UNKNOWN",
          angle: window.orientation
        });
      };

      if ((_window$screen = window.screen) == null ? undefined : _window$screen.orientation) {
        handleChange();
        window.screen.orientation.addEventListener("change", handleChange);
      } else {
        handle_orientationchange();
        window.addEventListener("orientationchange", handle_orientationchange);
      }

      return function () {
        var _window$screen2;

        if ((_window$screen2 = window.screen) == null ? undefined : _window$screen2.orientation) {
          window.screen.orientation.removeEventListener("change", handleChange);
        } else {
          window.removeEventListener("orientationchange", handle_orientationchange);
        }
      };
    }, []);
    return orientation;
  }

  var usePreferredLanguageSubscribe = function usePreferredLanguageSubscribe(cb) {
    window.addEventListener("languagechange", cb);
    return function () {
      return window.removeEventListener("languagechange", cb);
    };
  };

  var getPreferredLanguageSnapshot = function getPreferredLanguageSnapshot() {
    return navigator.language;
  };

  var getPreferredLanguageServerSnapshot = function getPreferredLanguageServerSnapshot() {
    throw Error("usePreferredLanguage is a client-only hook");
  };

  function usePreferredLanguage() {
    return React.useSyncExternalStore(usePreferredLanguageSubscribe, getPreferredLanguageSnapshot, getPreferredLanguageServerSnapshot);
  }

  function usePrevious(value) {
    var _React$useState31 = React.useState(value),
        _React$useState32 = (0, _slicedToArray2.default)(_React$useState31, 2),
        current = _React$useState32[0],
        setCurrent = _React$useState32[1];

    var _React$useState33 = React.useState(null),
        _React$useState34 = (0, _slicedToArray2.default)(_React$useState33, 2),
        previous = _React$useState34[0],
        setPrevious = _React$useState34[1];

    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
    }

    return previous;
  }

  function useQueue() {
    var initialValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _React$useState35 = React.useState(initialValue),
        _React$useState36 = (0, _slicedToArray2.default)(_React$useState35, 2),
        queue = _React$useState36[0],
        setQueue = _React$useState36[1];

    var add = React.useCallback(function (element) {
      setQueue(function (q) {
        return [].concat((0, _toConsumableArray2.default)(q), [element]);
      });
    }, []);
    var remove = React.useCallback(function () {
      var removedElement;
      setQueue(function (_ref7) {
        var _ref8 = (0, _toArray2.default)(_ref7),
            first = _ref8[0],
            q = _ref8.slice(1);

        removedElement = first;
        return q;
      });
      return removedElement;
    }, []);
    var clear = React.useCallback(function () {
      setQueue([]);
    }, []);
    return {
      add: add,
      remove: remove,
      clear: clear,
      first: queue[0],
      last: queue[queue.length - 1],
      size: queue.length,
      queue: queue
    };
  }

  function useRenderCount() {
    var count = React.useRef(0);
    count.current++;
    return count.current;
  }

  function useRenderInfo() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unknown";
    var count = React.useRef(0);
    var lastRender = React.useRef();
    var now = Date.now();
    count.current++;
    React.useEffect(function () {
      lastRender.current = Date.now();
    });
    var sinceLastRender = lastRender.current ? now - lastRender.current : 0;
  }

  function useScript(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _React$useState37 = React.useState("loading"),
        _React$useState38 = (0, _slicedToArray2.default)(_React$useState37, 2),
        status = _React$useState38[0],
        setStatus = _React$useState38[1];

    var optionsRef = React.useRef(options);
    React.useEffect(function () {
      var _script;

      var script = document.querySelector("script[src=\"" + src + "\"]");
      var domStatus = (_script = script) == null ? undefined : _script.getAttribute("data-status");

      if (domStatus) {
        setStatus(domStatus);
        return;
      }

      if (script === null) {
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");
        document.body.appendChild(script);

        var handleScriptLoad = function handleScriptLoad() {
          script.setAttribute("data-status", "ready");
          setStatus("ready");
          removeEventListeners();
        };

        var handleScriptError = function handleScriptError() {
          script.setAttribute("data-status", "error");
          setStatus("error");
          removeEventListeners();
        };

        var removeEventListeners = function removeEventListeners() {
          script.removeEventListener("load", handleScriptLoad);
          script.removeEventListener("error", handleScriptError);
        };

        script.addEventListener("load", handleScriptLoad);
        script.addEventListener("error", handleScriptError);
        var removeOnUnmount = optionsRef.current.removeOnUnmount;
        return function () {
          if (removeOnUnmount === true) {
            script.remove();
            removeEventListeners();
          }
        };
      } else {
        setStatus("unknown");
      }
    }, [src]);
    return status;
  }

  var setSessionStorageItem = function setSessionStorageItem(key, value) {
    var stringifiedValue = JSON.stringify(value);
    window.sessionStorage.setItem(key, stringifiedValue);
    dispatchStorageEvent(key, stringifiedValue);
  };

  var removeSessionStorageItem = function removeSessionStorageItem(key) {
    window.sessionStorage.removeItem(key);
    dispatchStorageEvent(key, null);
  };

  var getSessionStorageItem = function getSessionStorageItem(key) {
    return window.sessionStorage.getItem(key);
  };

  var useSessionStorageSubscribe = function useSessionStorageSubscribe(callback) {
    window.addEventListener("storage", callback);
    return function () {
      return window.removeEventListener("storage", callback);
    };
  };

  var getSessionStorageServerSnapshot = function getSessionStorageServerSnapshot() {
    throw Error("useSessionStorage is a client-only hook");
  };

  function useSessionStorage(key, initialValue) {
    var getSnapshot = function getSnapshot() {
      return getSessionStorageItem(key);
    };

    var store = React.useSyncExternalStore(useSessionStorageSubscribe, getSnapshot, getSessionStorageServerSnapshot);
    var setState = React.useCallback(function (v) {
      try {
        var nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeSessionStorageItem(key);
        } else {
          setSessionStorageItem(key, nextState);
        }
      } catch (e) {}
    }, [key, store]);
    React.useEffect(function () {
      if (getSessionStorageItem(key) === null && typeof initialValue !== "undefined") {
        setSessionStorageItem(key, initialValue);
      }
    }, [key, initialValue]);
    return [store ? JSON.parse(store) : initialValue, setState];
  }

  function useSet(values) {
    var setRef = React.useRef(new Set(values));

    var _React$useReducer5 = React.useReducer(function (x) {
      return x + 1;
    }, 0),
        _React$useReducer6 = (0, _slicedToArray2.default)(_React$useReducer5, 2),
        reRender = _React$useReducer6[1];

    setRef.current.add = function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var res = Set.prototype.add.apply(setRef.current, args);
      reRender();
      return res;
    };

    setRef.current.clear = function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      Set.prototype.clear.apply(setRef.current, args);
      reRender();
    };

    setRef.current.delete = function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      var res = Set.prototype.delete.apply(setRef.current, args);
      reRender();
      return res;
    };

    return setRef.current;
  }

  function useThrottle(value) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    var _React$useState39 = React.useState(value),
        _React$useState40 = (0, _slicedToArray2.default)(_React$useState39, 2),
        throttledValue = _React$useState40[0],
        setThrottledValue = _React$useState40[1];

    var lastUpdated = React.useRef(null);
    React.useEffect(function () {
      var now = Date.now();

      if (lastUpdated.current && now >= lastUpdated.current + interval) {
        lastUpdated.current = now;
        setThrottledValue(value);
      } else {
        var id = window.setTimeout(function () {
          lastUpdated.current = now;
          setThrottledValue(value);
        }, interval);
        return function () {
          return window.clearTimeout(id);
        };
      }
    }, [value, interval]);
    return throttledValue;
  }

  function useToggle(initialValue) {
    var _React$useState41 = React.useState(function () {
      if (typeof initialValue === "boolean") {
        return initialValue;
      }

      return Boolean(initialValue);
    }),
        _React$useState42 = (0, _slicedToArray2.default)(_React$useState41, 2),
        on = _React$useState42[0],
        setOn = _React$useState42[1];

    var handleToggle = React.useCallback(function (value) {
      if (typeof value === "boolean") {
        return setOn(value);
      }

      return setOn(function (v) {
        return !v;
      });
    }, []);
    return [on, handleToggle];
  }

  var useVisibilityChangeSubscribe = function useVisibilityChangeSubscribe(callback) {
    document.addEventListener("visibilitychange", callback);
    return function () {
      document.removeEventListener("visibilitychange", callback);
    };
  };

  var getVisibilityChangeSnapshot = function getVisibilityChangeSnapshot() {
    return document.visibilityState;
  };

  var getVisibilityChangeServerSnapshot = function getVisibilityChangeServerSnapshot() {
    throw Error("useVisibilityChange is a client-only hook");
  };

  function useVisibilityChange() {
    var visibilityState = React.useSyncExternalStore(useVisibilityChangeSubscribe, getVisibilityChangeSnapshot, getVisibilityChangeServerSnapshot);
    return visibilityState === "visible";
  }

  function useWindowScroll() {
    var _React$useState43 = React.useState({
      x: null,
      y: null
    }),
        _React$useState44 = (0, _slicedToArray2.default)(_React$useState43, 2),
        state = _React$useState44[0],
        setState = _React$useState44[1];

    var scrollTo = React.useCallback(function () {
      if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === "object") {
        window.scrollTo(arguments.length <= 0 ? undefined : arguments[0]);
      } else if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === "number" && typeof (arguments.length <= 1 ? undefined : arguments[1]) === "number") {
        window.scrollTo(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
      } else {
        throw new Error("Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo");
      }
    }, []);
    React.useLayoutEffect(function () {
      var handleScroll = function handleScroll() {
        setState({
          x: window.scrollX,
          y: window.scrollY
        });
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return function () {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    return [state, scrollTo];
  }

  function useWindowSize() {
    var _React$useState45 = React.useState({
      width: null,
      height: null
    }),
        _React$useState46 = (0, _slicedToArray2.default)(_React$useState45, 2),
        size = _React$useState46[0],
        setSize = _React$useState46[1];

    React.useLayoutEffect(function () {
      var handleResize = function handleResize() {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return function () {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
    return size;
  }
},10907,[14308,14305,22396,14359,14674,14314,14347,10297,11503]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[4]);

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[6]);

  var _DynamicColor = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var TopData = function TopData(_ref) {
    var data = _ref.data;
    return _react.default.createElement(_reactNative.View, {
      style: styles.topData
    }, data == null ? undefined : data.map(function (item) {
      return _react.default.createElement(_reactNative.View, {
        style: styles.topDataContent,
        key: item.key
      }, _react.default.createElement(_reactNative.View, {
        style: styles.topDataNumericalContent
      }, _react.default.createElement(_reactNative.Text, {
        style: [styles.topDataNumerical, item.colorStyle]
      }, item.value)), _react.default.createElement(_reactNative.View, null, _react.default.createElement(_reactNative.Image, {
        style: styles.img,
        source: item.icon,
        resizeMode: "contain"
      }), _react.default.createElement(_reactNative.Text, {
        style: [styles.topDataunit]
      }, item.unit)));
    }));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    topData: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    topDataContent: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topDataNumericalContent: {
      marginRight: (0, _screenAdapte.sizeW)(2),
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'flex-end'
    },
    topDataNumerical: (0, _objectSpread2.default)({}, _styles.default.listTitles, {
      fontSize: (0, _screenAdapte.pText)(32),
      fontWeight: 'normal'
    }),
    img: {
      width: (0, _screenAdapte.sizeW)(12),
      height: (0, _screenAdapte.sizeH)(12)
    },
    topDataunit: (0, _objectSpread2.default)({}, _styles.default.subtitleStyles, {
      color: new _DynamicColor.default('#040404', '#FFFFFF'),
      fontWeight: '300',
      alignSelf: 'flex-end'
    })
  });
  var _default = TopData;
  exports.default = _default;
},10910,[14305,14314,10297,10033,10913,10916,11016,11013]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pText = pText;
  exports.sizeH = sizeH;
  exports.sizeW = sizeW;
  exports.default = exports.SCREEN_HEIGHT = exports.SCREEN_WIDTH = undefined;

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);

  var SCREEN_WIDTH = _reactNative.Dimensions.get('window').width;

  exports.SCREEN_WIDTH = SCREEN_WIDTH;

  var SCREEN_HEIGHT = _reactNative.Dimensions.get('window').height;

  exports.SCREEN_HEIGHT = SCREEN_HEIGHT;
  var fontScale = 1;

  var pixelRatio = _reactNative.PixelRatio.get();

  var designWidth = 390;
  var designHeight = 844;

  var screenPxW = _reactNative.PixelRatio.getPixelSizeForLayoutSize(SCREEN_WIDTH);

  var screenPxH = _reactNative.PixelRatio.getPixelSizeForLayoutSize(SCREEN_HEIGHT);

  function pText(size) {
    var scaleWidth = SCREEN_WIDTH / designWidth;
    var scaleHeight = SCREEN_HEIGHT / designHeight;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round(size * scale * fontScale + 0.5);
    return size;
  }

  function sizeH(size) {
    var scaleHeight = size * screenPxH / designHeight;
    size = Math.round(scaleHeight / pixelRatio + 0.5);
    return size;
  }

  function sizeW(size) {
    var scaleWidth = size * screenPxW / designWidth;
    size = Math.round(scaleWidth / pixelRatio + 0.5);
    return size;
  }

  var _default = {
    sizeW: sizeW,
    sizeH: sizeH,
    pText: pText,
    SCREEN_WIDTH: SCREEN_WIDTH,
    SCREEN_HEIGHT: SCREEN_HEIGHT
  };
  exports.default = _default;
},10913,[10033]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);

  var _DynamicColor = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _miot = _$$_REQUIRE(_dependencyMap[3]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[4]);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width;

  var PADDING = 29;
  var SEPARATOR_HEIGHT = _reactNative.StyleSheet.hairlineWidth;
  var HAIRLINE_COLOR = 'rgba(0,0,0,0.15)';
  var MODAL_MARGIN = 10;
  var MODAL_WIDTH = width - 20;
  var Styles = {
    navigation: {
      backgroundColor: new _DynamicColor.default('#F2F6F6', '#000000'),
      backgroundImage: _miot.DarkMode.getColorScheme() === 'light' ? _$$_REQUIRE(_dependencyMap[5]) : null,
      backgroundColorMode: _miot.DarkMode.getColorScheme() === 'light' ? '#F2F6F6' : '#000000',
      title: {
        fontSize: (0, _screenAdapte.pText)(20),
        color: new _DynamicColor.default('#212946', '#fff')
      },
      subtitle: {
        fontSize: (0, _screenAdapte.pText)(11),
        color: '#7A819B'
      }
    },
    common: {
      padding: PADDING,
      dominoColor: '#1EAEBD',
      underlayColor: 'rgba(0,0,0,0.05)',
      hairlineColor: HAIRLINE_COLOR,
      backgroundColor: '#EAF2F4',
      separatorHeight: SEPARATOR_HEIGHT,
      title: {
        fontSize: (0, _screenAdapte.pText)(20),
        lineHeight: 28,
        color: '#000'
      },
      subtitle: {
        fontSize: (0, _screenAdapte.pText)(12),
        color: 'rgba(0,0,0,0.6)'
      },
      separator: {
        height: SEPARATOR_HEIGHT,
        backgroundColor: HAIRLINE_COLOR
      }
    },
    dialog: {
      background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
      },
      modal: {
        position: 'absolute',
        bottom: 0,
        marginHorizontal: MODAL_MARGIN,
        width: MODAL_WIDTH,
        borderRadius: 20,
        backgroundColor: '#fff'
      },
      title: {
        titleHeightThin: 66,
        titleHeightFat: 85
      },
      subtitle: {
        width: MODAL_WIDTH * 0.75,
        textAlign: 'center',
        fontSize: (0, _screenAdapte.pText)(13),
        color: '#666'
      },
      buttons: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between'
      },
      button: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
      },
      buttonText: {
        fontSize: (0, _screenAdapte.pText)(14),
        lineHeight: 19,
        color: '#666',
        fontFamily: 'D-DINCondensed-Bold'
      }
    },
    pageStyle: {
      borderColors: new _DynamicColor.default('#fff', '#363638'),
      lineColor: new _DynamicColor.default('#EEF3F5', '#363638'),
      backgroundColor: new _DynamicColor.default('#F2F6F6', '#000000'),
      cardBackgroundColor: new _DynamicColor.default('#fff', '#1C1C1E'),
      textColor: new _DynamicColor.default('#222928', '#fff'),
      titleTextColor: new _DynamicColor.default('#253746', '#fff'),
      countTextColor: new _DynamicColor.default('#6F7C7B', '#6F7C7B'),
      lineBackgroundColor: new _DynamicColor.default('#F1F7F7', '#343437'),
      transparentTextColor: new _DynamicColor.default('rgba(18, 28, 24, 0.45)', 'rgba(255, 255, 255, 0.45)'),
      transparentColors: new _DynamicColor.default('rgba(18, 28, 24, 0.7)', 'rgba(255, 255, 255, 0.7)'),
      textBackgroundColor: new _DynamicColor.default("#ECF8F7", "#1C1C1E"),
      img_bgc: new _DynamicColor.default('transparent', "#101010"),
      btn_color: '#2CD5AE',
      base_color: new _DynamicColor.default('#F7F8F9', '#000000'),
      card_color: new _DynamicColor.default('transparent', '#1C1C1E'),
      card_text: new _DynamicColor.default('#222928', '#E6FFFB'),
      mang_color: new _DynamicColor.default('#F1F7F7', '#101010')
    },
    darkMode: {
      backgroundColor: new _DynamicColor.default('#fff', '#101010')
    },
    MainColor: {
      color: 'xm#2CD5AE'
    },
    listStyles: {
      backgroundColor: new _DynamicColor.default('#fff', '#1C1C1E'),
      borderRadius: 12,
      borderColors: new _DynamicColor.default('#EEF3F5', '#101010'),
      lineHeight: (0, _screenAdapte.sizeH)(1),
      switchTintColor: '#D1D4D6',
      switchOnTintColor: '#2CD5AE',
      checkedColor: '#2CD5AE',
      overflow: 'hidden'
    },
    listTitles: {
      fontFamily: "PingFang SC",
      fontSize: (0, _screenAdapte.pText)(14),
      color: new _DynamicColor.default('#222928', '#FFFFFF'),
      fontWeight: '500'
    },
    subtitleStyles: {
      fontFamily: "PingFang SC",
      fontSize: (0, _screenAdapte.pText)(12),
      color: 'xm#6F7C7B',
      fontWeight: 'normal'
    },
    lineStyles: {
      backgroundColor: new _DynamicColor.default('#EEF3F5', '#101010'),
      height: (0, _screenAdapte.sizeH)(1)
    },
    sublistStyles: {
      backgroundColor: new _DynamicColor.default('#F1F7F7', '#101010'),
      borderRadius: 12,
      paddingHorizontal: (0, _screenAdapte.sizeW)(16)
    },
    sublistLineStyles: {
      backgroundColor: new _DynamicColor.default('#EEF3F5', '#1C1C1E')
    },
    sublistTitleStyles: {
      fontFamily: "PingFang SC",
      fontSize: (0, _screenAdapte.pText)(13),
      color: new _DynamicColor.default('#222928', '#FFFFFF'),
      fontWeight: 'normal'
    },
    sublistSubtitleStyles: {
      fontFamily: "PingFang SC",
      fontSize: (0, _screenAdapte.pText)(13),
      color: 'xm#6F7C7B',
      fontWeight: 'normal'
    },
    buttons: {
      backgroundColor: new _DynamicColor.default('#F1F7F7', '#101010'),
      borderRadius: 61
    },
    dialogBoxColor: _miot.DarkMode.getColorScheme() === 'dark' ? ['#101010', '#101010'] : ['#F7F8F9', '#F1F7F7']
  };
  var _default = Styles;
  exports.default = _default;
},10916,[14305,10033,11013,10074,10913,10919]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/projects/com.xtl.robot.test01/src/assets/home",
    "width": 1560,
    "height": 364,
    "scales": [1],
    "hash": "adfa5634c24039bfcc099956d3ba8105",
    "name": "navig",
    "type": "png"
  });
},10919,[10420]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);

  var _screenAdapte = _$$_REQUIRE(_dependencyMap[4]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _DynamicStyleSheet = _$$_REQUIRE(_dependencyMap[6]);

  var _DynamicColor = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));

  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var TopTap = function TopTap(_ref) {
    var onCleanModeSwith = _ref.onCleanModeSwith,
        selectedMode = _ref.selectedMode;
    var tapData = [{
      key: 1,
      name: _multilingual.default == null ? undefined : _multilingual.default.keyword276,
      mode: "smart"
    }, {
      key: 2,
      name: _multilingual.default == null ? undefined : _multilingual.default.keyword257,
      mode: "room"
    }, {
      key: 3,
      name: _multilingual.default == null ? undefined : _multilingual.default.keyword277,
      mode: "zoning"
    }];
    return _react.default.createElement(_reactNative.View, {
      style: styles.topTapRoot
    }, tapData == null ? undefined : tapData.map(function (item) {
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        key: item.key,
        style: {
          flex: 1,
          alignItems: "center",
          height: "100%",
          paddingTop: (0, _screenAdapte.sizeH)(16)
        },
        onPress: function onPress() {
          return onCleanModeSwith(item.mode);
        }
      }, _react.default.createElement(_reactNative.Text, {
        style: [selectedMode === item.mode ? styles.topTapSelected : styles.topTapNotSelected, {
          marginBottom: (0, _screenAdapte.sizeH)(1)
        }]
      }, item.name), selectedMode === item.mode ? _react.default.createElement(_reactNative.View, {
        style: styles.selector
      }) : null, selectedMode === item.mode && _react.default.createElement(_reactNative.View, {
        style: styles.topTapIndicator
      }));
    }));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    topTapRoot: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-around"
    },
    topTapNotSelected: (0, _objectSpread2.default)({}, _styles.default.subtitleStyles, {
      fontSize: (0, _screenAdapte.pText)(14)
    }),
    topTapSelected: _styles.default.listTitles,
    topTapIndicator: {
      width: 6,
      height: 6,
      borderRadius: 50,
      backgroundColor: _styles.default.MainColor.color,
      alignSelf: "center"
    }
  });
  var _default = TopTap;
  exports.default = _default;
},10922,[14305,14314,10297,10033,10913,10094,11016,11013,10916]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "manager", {
    enumerable: true,
    get: function get() {
      return _manager.default;
    }
  });
  Object.defineProperty(exports, "subscriptions", {
    enumerable: true,
    get: function get() {
      return _subscriptions.default;
    }
  });
  Object.defineProperty(exports, "actions", {
    enumerable: true,
    get: function get() {
      return _actions.default;
    }
  });
  Object.defineProperty(exports, "propertyCodes", {
    enumerable: true,
    get: function get() {
      return _consts.propertyCodes;
    }
  });
  Object.defineProperty(exports, "propertys", {
    enumerable: true,
    get: function get() {
      return _property.default;
    }
  });

  var _manager = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _subscriptions = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _actions = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _consts = _$$_REQUIRE(_dependencyMap[4]);

  var _property = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
},10925,[14305,10928,10937,10940,10163,10943]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _resourcesAdapter = _$$_REQUIRE(_dependencyMap[2]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var listeners = new Map();

  function initManager() {
    return _regenerator.default.async(function initManager$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _resourcesAdapter.initSpec)());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function watch(spec, fn) {
    var specKey = "watch_" + (0, _resourcesAdapter.getSpecKey)(spec);
    var listener = (0, _resourcesAdapter.listen)(spec, fn);
    listeners.set(specKey, listener);
  }

  function unWatchAll() {
    listeners.forEach(function (listener) {
      listener && listener.remove();
    });
    listeners.clear();
  }

  function releaseManager() {
    unWatchAll();
    (0, _resourcesAdapter.deinitSpec)();
  }

  function delay(ms) {
    return _regenerator.default.async(function delay$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve) {
              return setTimeout(resolve, ms);
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  }

  function getSpec(specs) {
    var specValues;
    return _regenerator.default.async(function getSpec$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _regenerator.default.awrap((0, _resourcesAdapter.getSpecValues)(specs == null ? undefined : specs.map(function (item) {
              return item.param;
            }), 2));

          case 2:
            specValues = _context3.sent;

            _logger.default.d('读取 specValues', specValues);

            specValues == null ? undefined : specValues.forEach(function (_ref) {
              var code = _ref.code,
                  key = _ref.key,
                  value = _ref.value;
              var spec = specs.find(function (item) {
                return (0, _resourcesAdapter.getSpecKey)(item.param) === key;
              });

              if (spec && code === 0) {
                spec.fn == null ? undefined : spec.fn(value);
              }
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  }

  function getSpecRetry(specs) {
    var reTrySpec, specValues;
    return _regenerator.default.async(function getSpecRetry$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            reTrySpec = [];
            _context4.next = 3;
            return _regenerator.default.awrap((0, _resourcesAdapter.getSpecValues)(specs == null ? undefined : specs.map(function (item) {
              return item.param;
            }), 2));

          case 3:
            specValues = _context4.sent;

            _logger.default.d('读取 specValues - 重试', specValues);

            specValues == null ? undefined : specValues.forEach(function (_ref2) {
              var code = _ref2.code,
                  key = _ref2.key,
                  value = _ref2.value;
              var spec = specs.find(function (item) {
                return (0, _resourcesAdapter.getSpecKey)(item.param) === key;
              });

              if (spec) {
                if (code === 0) {
                  spec.fn == null ? undefined : spec.fn(value);
                } else {
                  reTrySpec.push(spec);
                }
              }
            });

            if (!(reTrySpec.length > 0)) {
              _context4.next = 10;
              break;
            }

            _context4.next = 9;
            return _regenerator.default.awrap(delay(1000));

          case 9:
            return _context4.abrupt("return", getSpecRetry(reTrySpec));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    });
  }

  var _default = {
    initManager: initManager,
    watch: watch,
    unWatchAll: unWatchAll,
    releaseManager: releaseManager,
    getSpec: getSpec,
    getSpecRetry: getSpecRetry
  };
  exports.default = _default;
},10928,[14305,14674,10931,10082]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getSpecKey = getSpecKey;
  exports.listen = listen;
  exports.getSpecValue = getSpecValue;
  exports.getSpecValues = getSpecValues;
  exports.doSpecAction = doSpecAction;
  exports.initSpec = initSpec;
  exports.deinitSpec = deinitSpec;
  exports.INSTANCECACHEKEY = exports.SubIidKeys = exports.SubTypesShort = exports.SubTypes = exports.DeviceID = undefined;

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);

  var _miot = _$$_REQUIRE(_dependencyMap[7]);

  var _utils = _$$_REQUIRE(_dependencyMap[8]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));

  var DeviceID = _miot.Device.deviceID;
  exports.DeviceID = DeviceID;
  var CODES = {
    success: function success(code) {
      return code >= 0;
    },
    handling: function handling(code) {
      return code === 1;
    },
    error: function error(code) {
      return !CODES.success(code) && !CODES.handling(code);
    }
  };
  var SubTypes = ['properties', 'actions', 'events'];
  exports.SubTypes = SubTypes;
  var SubTypesShort = ['prop', 'action', 'event'];
  exports.SubTypesShort = SubTypesShort;
  var SubIidKeys = ['piid', 'aiid', 'eiid'];
  exports.SubIidKeys = SubIidKeys;
  var INSTANCECACHEKEY = "INSTANCECACHE:" + _miot.Device.deviceID + "-" + _miot.Package.version + "-" + _miot.Host.version;
  exports.INSTANCECACHEKEY = INSTANCECACHEKEY;
  var listeners = [];
  var AllNotifySpecs = [];
  var listenerReceivedMessage = null;

  function isValidSpec(spec) {
    var _ref = spec || {},
        siid = _ref.siid,
        piid = _ref.piid,
        eiid = _ref.eiid;

    return siid && (piid || eiid);
  }

  function getSpecType(_ref2) {
    var eiid = _ref2.eiid,
        aiid = _ref2.aiid;
    return eiid ? 'event' : aiid ? 'action' : 'prop';
  }

  function getSpecNotifyKey(_ref3) {
    var siid = _ref3.siid,
        eiid = _ref3.eiid,
        aiid = _ref3.aiid,
        piid = _ref3.piid;
    return getSpecKey({
      siid: siid,
      eiid: eiid,
      aiid: aiid,
      piid: piid
    });
  }

  function getSpecKey(_ref4) {
    var siid = _ref4.siid,
        eiid = _ref4.eiid,
        aiid = _ref4.aiid,
        piid = _ref4.piid;
    var type = getSpecType({
      eiid: eiid,
      aiid: aiid,
      piid: piid
    });
    return type + "." + siid + "." + (eiid || aiid || piid);
  }

  function getSpecEventkey(_ref5) {
    var siid = _ref5.siid,
        eiid = _ref5.eiid,
        aiid = _ref5.aiid,
        piid = _ref5.piid;
    var type = getSpecType({
      eiid: eiid,
      aiid: aiid,
      piid: piid
    });
    return "specValueChanged." + type + "." + siid + "." + (eiid || aiid || piid);
  }

  function getInstanceFromNet() {
    var instance, parsedInstance;
    return _regenerator.default.async(function getInstanceFromNet$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _regenerator.default.awrap(_miot.Service.spec.getSpecString(_miot.Device.deviceID));

          case 2:
            instance = _context.sent;
            parsedInstance = typeof instance === 'string' ? JSON.parse(instance) : instance;
            return _context.abrupt("return", parsedInstance);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    });
  }

  function listen(spec, fn) {
    if (!isValidSpec(spec) || typeof fn !== 'function') {
      return;
    }

    var specEkey = ge