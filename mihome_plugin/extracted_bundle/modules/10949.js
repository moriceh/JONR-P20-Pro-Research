.onFinish,
        onCancel = options.onCancel;
    var isLongPressActive = React.useRef(false);
    var isPressed = React.useRef(false);
    var timerId = React.useRef();
    return React.useMemo(function () {
      if (typeof callback !== "function") {
        return {};
      }

      var start = function start(event) {
        if (!isMouseEvent(event) && !isTouchEvent(event)) return;

        if (onStart) {
          onStart(event);
        }

        isPressed.current = true;
        timerId.current = setTimeout(function () {
          callback(event);
          isLongPressActive.current = true;
        }, threshold);
      };

      var cancel = function cancel(event) {
        if (!isMouseEvent(event) && !isTouchEvent(event)) return;

        if (isLongPressActive.current) {
          if (onFinish) {
            onFinish(event);
          }
        } else if (isPressed.current) {
          if (onCancel) {
            onCancel(event);
          }
        }

        isLongPressActive.current = false;
        isPressed.current = false;

        if (timerId.current) {
          window.clearTimeout(timerId.current);
        }
      };

      var mouseHandlers = {
        onMouseDown: start,
        onMouseUp: cancel,
        onMouseLeave: cancel
      };
      var touchHandlers = {
        onTouchStart: start,
        onTouchEnd: cancel
      };
      return (0, _objectSpread2.default)({}, mouseHandlers, touchHandlers);
    }, [callback, threshold, onCancel, onFinish, onStart]);
  }

  function useMap(initialState) {
    var mapRef = React.useRef(new Map(initialState));

    var _React$useReducer3 = React.useReducer(function (x) {
      return x + 1;
    }, 0),
        _Reac