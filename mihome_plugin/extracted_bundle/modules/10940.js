Default = useDefault;
  exports.useDocumentTitle = useDocumentTitle;
  exports.useFavicon = useFavicon;
  exports.useGeolocation = useGeolocation;
  exports.useHistoryState = useHistoryState;
  exports.useHover = useHover;
  exports.useIdle = useIdle;
  exports.useIntersectionObserver = useIntersectionObserver;
  exports.useIsClient = useIsClient;
  exports.useIsFirstRender = useIsFirstRender;
  exports.useList = useList;
  exports.useLocalStorage = useLocalStorage;
  exports.useLockBodyScroll = useLockBodyScroll;
  exports.useLongPress = useLongPress;
  exports.useMap = useMap;
  exports.useMeasure = useMeasure;
  exports.useMediaQuery = useMediaQuery;
  exports.useMouse = useMouse;
  exports.useNetworkState = useNetworkState;
  exports.useObjectState = useObjectState;
  exports.useOrientation = useOrientation;
  exports.usePreferredLanguage = usePreferredLanguage;
  exports.usePrevious = usePrevious;
  exports.useQueue = useQueue;
  exports.useRenderCount = useRenderCount;
  exports.useRenderInfo = useRenderInfo;
  exports.useScript = useScript;
  exports.useSessionStorage = useSessionStorage;
  exports.useSet = useSet;
  exports.useThrottle = useThrottle;
  exports.useToggle = useToggle;
  exports.useVisibilityChange = useVisibilityChange;
  exports.useWindowScroll = useWindowScroll;
  exports.useWindowSize = useWindowSize;

  var _toArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));

  var _regenerator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));

  var _objectSpread2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));

  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));

  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));

  var _lodash = _$$_REQUIRE(_dependencyMap[8]);

  function useDeepCompareEffect(callback, dependencies, compare) {
    if (!compare) compare = _lodash.isEqual;
    var memoizedDependencies = (0, React.useRef)([]);

    if (!compare(memoizedDependencies.current, dependencies)) {
      memoizedDependencies.current = dependencies;
    }

    (0, React.useEffect)(callback, memoizedDependencies.current);
  }

  function isShallowEqual(object1, object2) {
    var keys1 = Object.keys(object1);
    var keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (var _i = 0, _keys = keys1; _i < _keys.length; _i++) {
      var key = _keys[_i];

      if (object1[key] !== object2[key]) {
        return false;
      }
    }

    return true;
  }

  function isTouchEvent(_ref) {
    var nativeEvent = _ref.nativeEvent;
    return window.TouchEvent ? nativeEvent instanceof TouchEvent : "touches" in nativeEvent;
  }

  function isMouseEvent(event) {
    return event.nativeEvent instanceof MouseEvent;
  }

  function throttle(cb, ms) {
    var lastTime = 0;
    return function () {
      var now = Date.now();

      if (now - lastTime >= ms) {
        cb();
        lastTime = now;
      }
    };
  }

  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }

  function dispatchStorageEvent(key, newValue) {
    window.dispatchEvent(new StorageEvent("storage", {
      key: key,
      newValue: newValue
    }));
  }

  function useBattery() {
    var _React$useState = React.useState({
      supported: true,
      loading: true,
      level: null,
      charging: null,
      chargingTime: null,
      dischargingTime: null
    }),
        _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    React.useEffect(function () {
      if (!navigator.getBattery) {
        setState(function (s) {
          return (0, _objectSpread2.default)({}, s, {
            supported: false,
            loading: false
          });
        });
        return;
      }

      var battery = null;

      var handleChange = function handleChange() {
        setState({
          supported: true,
          loading: false,
          level: battery.level,
          charging: battery.charging,
          chargingTime: battery.chargingTime,
          dischargingTime: battery.dischargingTime
        });
      };

      navigator.getBattery().then(function (b) {
        battery = b;
        handleChange();
        b.addEventListener("levelchange", handleChange);
        b.addEventListener("chargingchange", handleChange);
        b.addEventListener("chargingtimechange", handleChange);
        b.addEventListener("dischargingtimechange", handleChange);
      });
      return function () {
        if (battery) {
          battery.removeEventListener("levelchange", handleChange);
          battery.removeEventListener("chargingchange", handleChange);
          battery.removeEventListener("chargingtimechange", handleChange);
          battery.removeEventListener("dischargingtimechange", handleChange);
        }
      };
    }, []);
    return state;
  }

  function useClickAway(cb) {
    var ref = React.useRef(null);
    var refCb = React.useRef(cb);
    React.useLayoutEffect(function () {
      refCb.current = cb;
    });
    React.useEffect(function () {
      var handler = function handler(e) {
        var element = ref.current;

        if (element && !element.contains(e.target)) {
          refCb.current(e);
        }
      };

      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
      return function () {
        document.removeEventListener("mousedown", handler);
        document.removeEventListener("touchstart", handler);
      };
    }, []);
    return ref;
  }

  function oldSchoolCopy(text) {
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
  }

  function useCopyToClipboard() {
    var _React$useState3 = React.useState(null),
        _React$useState4 = (0, _slicedToArray2.default)(_React$useState3, 2),
        state = _React$useState4[0],
        setState = _React$useState4[1];

    var copyToClipboard = React.useCallback(function (value) {
      var handleCopy = function handleCopy() {
        var _navigator, _navigator$clipboard;

        return _regenerator.default.async(function handleCopy$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (!((_navigator = navigator) == null ? undefined : (_navigator$clipboard = _navigator.clipboard) == null ? undefined : _navigator$clipboard.writeText)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return _regenerator.default.awrap(navigator.clipboard.writeText(value));

              case 4:
                setState(value);
                _context.next = 8;
                break;

              case 7:
                throw new Error("writeText not supported");

              case 8:
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                oldSchoolCopy(value);
                setState(value);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, null, null, [[0, 10]]);
      };

      handleCopy();
    }, []);
    return [state, copyToClipboard];
  }

  function useCounter() {
    var startingValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var min = options.min,
        max = options.max;

    if (typeof min === "number" && startingValue < min) {
      throw new Error("Your starting value of " + startingValue + " is less than your min of " + min + ".");
    }

    if (typeof max === "number" && startingValue > max) {
      throw new Error("Your starting value of " + startingValue + " is greater than your max of " + max + ".");
    }

    var _React$useState5 = React.useState(startingValue),
        _React$useState6 = (0, _slicedToArray2.default)(_React$useState5, 2),
        count = _React$useState6[0],
        setCount = _React$useState6[1];

    var increment = React.useCallback(function () {
      setCount(function (c) {
        var nextCount = c + 1;

        if (typeof max === "number" && nextCount > max) {
          return c;
        }

        return nextCount;
      });
    }, [max]);
    var decrement = React.useCallback(function () {
      setCount(function (c) {
        var nextCount = c - 1;

        if (typeof min === "number" && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    }, [min]);
    var set = React.useCallback(function (nextCount) {
      setCount(function (c) {
        if (typeof max === "number" && nextCount > max) {
          return c;
        }

        if (typeof min === "number" && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    }, [max, min]);
    var reset = React.useCallback(function () {
      setCount(startingValue);
    }, [startingValue]);
    return [count, {
      increment: increment,
      decrement: decrement,
      set: set,
      reset: reset
    }];
  }

  function useDebounce(value, delay) {
    var _React$useState7 = React.useState(value),
        _React$useState8 = (0, _slicedToArray2.default)(_React$useState7, 2),
        debouncedValue = _React$useState8[0],
        setDebouncedValue = _React$useState8[1];

    React.useEffect(function () {
      var handler = setTimeout(function () {
        setDebouncedValue(value);
      }, delay);
      return function () {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  }

  function useDefault(initialValue, defaultValue) {
    var _React$useState9 = React.useState(initialValue),
        _React$useState10 = (0, _slicedToArray2.default)(_React$useState9, 2),
        state = _React$useState10[0],
        setState = _React$useState10[1];

    if (typeof state === "undefined" || state === null) {
      return [defaultValue, setState];
    }

    return [state, setState];
  }

  function useDocumentTitle(title) {
    React.useEffect(function () {
      document.title = title;
    }, [title]);
  }

  function useFavicon(url) {
    React.useEffect(function () {
      var link = document.querySelector("link[rel~=\"icon\"]");

      if (!link) {
        link = document.createElement("link");
        link.type = "image/x-icon";
        link.rel = "icon";
        link.href = url;
        document.head.appendChild(link);
      } else {
        link.href = url;
      }
    }, [url]);
  }

  function useGeolocation() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _React$useState11 = React.useState({
      loading: true,
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: null,
      error: null
    }),
        _React$useState12 = (0, _slicedToArray2.default)(_React$useState11, 2),
        state = _React$useState12[0],
        setState = _React$useState12[1];

    var optionsRef = React.useRef(options);
    React.useEffect(function () {
      var onEvent = function onEvent(_ref2) {
        var coords = _ref2.coords,
            timestamp = _ref2.timestamp;
        setState({
          loading: false,
          timestamp: timestamp,
          latitude: coords.latitude,
          longitude: coords.longitude,
          altitude: coords.altitude,
          accuracy: coords.accuracy,
          altitudeAccuracy: coords.altitudeAccuracy,
          heading: coords.heading,
          speed: coords.speed
        });
    