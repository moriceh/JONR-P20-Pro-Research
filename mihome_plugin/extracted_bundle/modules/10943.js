  };

      var onEventError = function onEventError(error) {
        setState(function (s) {
          return (0, _objectSpread2.default)({}, s, {
            loading: false,
            error: error
          });
        });
      };

      navigator.geolocation.getCurrentPosition(onEvent, onEventError, optionsRef.current);
      var watchId = navigator.geolocation.watchPosition(onEvent, onEventError, optionsRef.current);
      return function () {
        navigator.geolocation.clearWatch(watchId);
      };
    }, []);
    return state;
  }

  var initialUseHistoryStateState = {
    past: [],
    present: null,
    future: []
  };

  var useHistoryStateReducer = function useHistoryStateReducer(state, action) {
    var past = state.past,
        present = state.present,
        future = state.future;

    if (action.type === "UNDO") {
      return {
        past: past.slice(0, past.length - 1),
        present: past[past.length - 1],
        future: [present].concat((0, _toConsumableArray2.default)(future))
      };
    } else if (action.type === "REDO") {
      return {
        past: [].concat((0, _toConsumableArray2.default)(past), [present]),
        present: future[0],
        future: future.slice(1)
      };
    } else if (action.type === "SET") {
      var newPresent = action.newPresent;

      if (action.newPresent === present) {
        return state;
      }

      return {
        past: [].concat((0, _toConsumableArray2.default)(past), [present]),
        present: newPresent,
        future: []
      };
    } else if (action.type === "CLEAR") {
      return (0, _objectSpread2.default)({}, initialUseHistoryStateState, {
        present: action.initialPresent
      });
    } else {
      throw new Error("Unsupported action type");
    }
  };

  function useHistoryState() {
    var initialPresent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var initialPresentRef = React.useRef(initialPresent);

    var _React$useReducer = React.useReducer(useHistoryStateReducer, (0, _objectSpread2.default)({}, initialUseHistoryStateState, {
      present: initialPresentRef.current
    })),
        _React$useReducer2 = (0, _slicedToArray2.default)(_React$useReducer, 2),
        state = _React$useReducer2[0],
        dispatch = _React$useReducer2[1];

    var canUndo = state.past.length !== 0;
    var canRedo = state.future.length !== 0;
    var undo = React.useCallback(function () {
      if (canUndo) {
        dispatch({
          type: "UNDO"
        });
      }
    }, [canUndo]);
    var redo = React.useCallback(function () {
      if (canRedo) {
        dispatch({
          type: "REDO"
        });
      }
    }, [canRedo]);
    var set = React.useCallback(function (newPresent) {
      return dispatch({
        type: "SET",
        newPresent: newPresent
      });
    }, []);
    var clear = React.useCallback(function () {
      return dispatch({
        type: "CLEAR",
        initialPresent: initialPresentRef.current
      });
    }, []);
    return {
      state: state.present,
      set: set,
      undo: undo,
      redo: redo,
      clear: clear,
      canUndo: canUndo,
      canRedo: canRedo
    };
  }

  function useHover() {
    var _React$useState13 = React.useState(false),
        _React$useState14 = (0, _slicedToArray2.default)(_React$useState13, 2),
        hovering = _React$useState14[0],
        setHovering = _React$useState14[1];

    var previousNode = React.useRef(null);
    var handleMouseEnter = React.useCallback(function () {
      setHovering(true);
    }, []);
    var handleMouseLeave = React.useCallback(function () {
      setHovering(false);
    }, []);
    var customRef = React.useCallback(function (node) {
      var _previousNode$current;

      if (((_previousNode$current = previousNode.current) == null ? undefined : _previousNode$current.nodeType) === Node.ELEMENT_NODE) {
        previousNode.current.removeEventListener("mouseenter", handleMouseEnter);
        previousNode.current.removeEventListener("mouseleave", handleMouseLeave);
      }

      if ((node == null ? undefined : node.nodeType) === Node.ELEMENT_NODE) {
        node.addEventListener("mouseenter", handleMouseEnter);
        node.addEventListener("mouseleave", handleMouseLeave);
      }

      previousNode.current = node;
    }, [handleMouseEnter, handleMouseLeave]);
    return [customRef, hovering];
  }

  function useIdle() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 60000;

    var _React$useState15 = React.useState(false),
        _React$useState16 = (0, _slicedToArray2.default)(_React$useState15, 2),
        idle = _React$useState16[0],
        setIdle = _React$useState16[1];

    React.useEffect(function () {
      var timeoutId;

      var handleTimeout = function handleTimeout() {
        setIdle(true);
      };

      var handleEvent = throttle(function (e) {
        setIdle(false);
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(handleTimeout, ms);
      }, 500);

      var handleVisibilityChange = function handleVisibilityChange() {
        if (!document.hidden) {
          handleEvent();
        }
      };

      timeoutId = window.setTimeout(handleTimeout, ms);
      window.addEventListener("mousemove", handleEvent);
      window.addEventListener("mousedown", handleEvent);
      window.addEventListener("resize", handleEvent);
      window.addEventListener("keydown", handleEvent);
      window.addEventListener("touchstart", handleEvent);
      window.addEventListener("wheel", handleEvent);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return function () {
        window.removeEventListener("mousemove", handleEvent);
        window.removeEventListener("mousedown", handleEvent);
        window.removeEventListener("resize", handleEvent);
        window.removeEventListener("keydown", handleEvent);
        window.removeEventListener("touchstart", handleEvent);
        window.removeEventListener("wheel", handleEvent);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.clearTimeout(timeoutId);
      };
    }, [ms]);
    return idle;
  }

  function useIntersectionObserver() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$threshold = options.threshold,
        threshold = _options$threshold === undefined ? 1 : _options$threshold,
        _options$root = options.root,
        root = _options$root === undefined ? null : _options$root,
        _options$rootMargin = options.rootMargin,
        rootMargin = _options$rootMargin === undefined ? "0px" : _options$rootMargin;

    var _React$useState17 = React.useState(null),
        _React$useState18 = (0, _slicedToArray2.default)(_React$useState17, 2),
        entry = _React$useState18[0],
        setEntry = _React$useState18[1];

    var previousObserver = React.useRef(null);
    var customRef = React.useCallback(function (node) {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }

      if ((node == null ? undefined : node.nodeType) === Node.ELEMENT_NODE) {
        var observer = new IntersectionObserver(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
              entry = _ref4[0];

          setEntry(entry);
        }, {
          threshold: threshold,
          root: root,
          rootMargin: rootMargin
        });
        observer.observe(node);
        previousObserver.current = observer;
      }
    }, [threshold, root, rootMargin]);
    return [customRef, entry];
  }

  function useIsClient() {
    var _React$useState19 = React.useState(false),
        _React$useState20 = (0, _slicedToArray2.default)(_React$useState19, 2),
        isClient = _React$useState20[0],
        setIsClient = _React$useState20[1];

    React.useEffect(function () {
      setIsClient(true);
    }, []);
    return isClient;
  }

  function useIsFirstRender() {
    var renderRef = React.useRef(true);

    if (renderRef.current === true) {
      renderRef.current = false;
      return true;
    }

    return renderRef.current;
  }

  function useList() {
    var defaultList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var _React$useState21 = React.useState(defaultList),
        _React$useState22 = (0, _slicedToArray2.default)(_React$useState21, 2),
        list = _React$useState22[0],
        setList = _React$useState22[1];

    var set = React.useCallback(function (l) {
      setList(l);
    }, []);
    var push = React.useCallback(function (element) {
      setList(function (l) {
        return [].concat((0, _toConsumableArray2.default)(l), [element]);
      });
    }, []);
    var removeAt = React.useCallback(function (index) {
      setList(function (l) {
        return [].concat((0, _toConsumableArray2.default)(l.slice(0, index)), (0, _toConsumableArray2.default)(l.slice(index + 1)));
      });
    }, []);
    var insertAt = React.useCallback(function (index, element) {
      setList(function (l) {
        return [].concat((0, _toConsumableArray2.default)(l.slice(0, index)), [element], (0, _toConsumableArray2.default)(l.slice(index)));
      });
    }, []);
    var updateAt = React.useCallback(function (index, element) {
      setList(function (l) {
        return l.map(function (e, i) {
          return i === index ? element : e;
        });
      });
    }, []);
    var clear = React.useCallback(function () {
      return setList([]);
    }, []);
    return [list, {
      set: set,
      push: push,
      removeAt: removeAt,
      insertAt: insertAt,
      updateAt: updateAt,
      clear: clear
    }];
  }

  var setLocalStorageItem = function setLocalStorageItem(key, value) {
    var stringifiedValue = JSON.stringify(value);
    window.localStorage.setItem(key, stringifiedValue);
    dispatchStorageEvent(key, stringifiedValue);
  };

  var removeLocalStorageItem = function removeLocalStorageItem(key) {
    window.localStorage.removeItem(key);
    dispatchStorageEvent(key, null);
  };

  var getLocalStorageItem = function getLocalStorageItem(key) {
    return window.localStorage.getIt