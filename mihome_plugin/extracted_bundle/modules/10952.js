t$useReducer4 = (0, _slicedToArray2.default)(_React$useReducer3, 2),
        reRender = _React$useReducer4[1];

    mapRef.current.set = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      Map.prototype.set.apply(mapRef.current, args);
      reRender();
      return mapRef.current;
    };

    mapRef.current.clear = function () {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      Map.prototype.clear.apply(mapRef.current, args);
      reRender();
    };

    mapRef.current.delete = function () {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var res = Map.prototype.delete.apply(mapRef.current, args);
      reRender();
      return res;
    };

    return mapRef.current;
  }

  function useMeasure() {
    var _React$useState23 = React.useState({
      width: null,
      height: null
    }),
        _React$useState24 = (0, _slicedToArray2.default)(_React$useState23, 2),
        dimensions = _React$useState24[0],
        setDimensions = _React$useState24[1];

    var previousObserver = React.useRef(null);
    var customRef = React.useCallback(function (node) {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }

      if ((node == null ? undefined : node.nodeType) === Node.ELEMENT_NODE) {
        var observer = new ResizeObserver(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 1),
              entry = _ref6[0];

          if (entry && entry.borderBoxSize) {
            var _entry$borderBoxSize$ = entry.borderBoxSize[0],
                width = _entry$borderBoxSize$.inlineSize,
                height = _entry$borderBoxSize$.blockSize;
            setDimensions({
              width: width,
              height: height
            });
          }
        });
        observer.observe(node);
        previousObserver.current = observer;
      }
    }, []);
    return [customRef, dimensions];
  }

  function useMediaQuery(query) {
    var subscribe = React.useCallback(function (callback) {
      var matchMedia = window.matchMedia(query);
      matchMedia.addEventListener("change", callback);
      return function () {
        matchMedia.removeEventListener("change", callback);
      };
    }, [query]);

    var getSnapshot = function getSnapshot() {
      return window.matchMedia(query).matches;
    };

    var getServerSnapshot = function getServerSnapshot() {
      throw Error("useMediaQuery is a client-only hook");
    };

    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  }

  function useMouse() {
    var _React$useState25 = React.useState({
      x: 0,
      y: 0,
      elementX: 0,
      elementY: 0,
      elementPositionX: 0,
      elementPositionY: 0
    }),
        _React$useState26 = (0, _slicedToArray2.default)(_React$useState25, 2),
        state = _React$useState26[0],
        setState = _React$useState26[1];

    var ref = React.useRef(null);
    React.useLayoutEffect(function () {
      var handleMouseMove = function handleMouseMove(event) {
        var _ref$current;

        var newState = {
          x: event.pageX,
          y: event.pageY
        };

        if (((_ref$current = ref.current) == null ? undefined : _ref$current.nodeType) === Node.ELEMENT_NODE) {
          var _ref$current$getBound = ref.current.getBoundingClientRect(),
              left = _ref$current$getBound.left,
              top = _ref$current$getBound.top;

          var elementPositionX = left + window.scrollX;
          var elementPositionY = top + window.scrollY;
          var elementX = event.pageX - elementPositionX;
          var elementY = event.pageY - elementPositionY;
          newState.elementX = elementX;
          newState.elementY = elementY;
          newState.elementPositionX = elementPositionX;
          newState.elementPositionY = elementPositionY;
        }

        setState(function (s) {
          return (0, _objectSpread2.default)({}, s, newState);
        });
      };

      document.addEventListener("mousemove", handleMouseMove);
      return function () {
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);
    return [state, ref];
  }

  var getConnection = function getConnection() {
    var _navigator2, _navigator3, _navigator4;

    return ((_navigator2 = navigator) == null ? undefined : _navigator2.connection) || ((_navigator3 = navigator) == null ? undefined : _navigator3.mozConnection) || ((_navigator4 = navigator) == null ? undefined : _navigator4.webkitConnection);
  };

  var useNetworkStateSubscribe = function useNetworkStateSubscribe(callback) {
    window.addEventListener("online", callback, {
      passive: true
    });
    window.addEventListener("offline", callback, {
      passive: true
    });
    var connection = getConnec