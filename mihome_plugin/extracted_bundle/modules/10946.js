em(key);
  };

  var useLocalStorageSubscribe = function useLocalStorageSubscribe(callback) {
    window.addEventListener("storage", callback);
    return function () {
      return window.removeEventListener("storage", callback);
    };
  };

  var getLocalStorageServerSnapshot = function getLocalStorageServerSnapshot() {
    throw Error("useLocalStorage is a client-only hook");
  };

  function useLocalStorage(key, initialValue) {
    var getSnapshot = function getSnapshot() {
      return getLocalStorageItem(key);
    };

    var store = React.useSyncExternalStore(useLocalStorageSubscribe, getSnapshot, getLocalStorageServerSnapshot);
    var setState = React.useCallback(function (v) {
      try {
        var nextState = typeof v === "function" ? v(JSON.parse(store)) : v;

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {}
    }, [key, store]);
    React.useEffect(function () {
      if (getLocalStorageItem(key) === null && typeof initialValue !== "undefined") {
        setLocalStorageItem(key, initialValue);
      }
    }, [key, initialValue]);
    return [store ? JSON.parse(store) : initialValue, setState];
  }

  function useLockBodyScroll() {
    React.useLayoutEffect(function () {
      var originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return function () {
        document.body.style.overflow = originalStyle;
      };
    }, []);
  }

  function useLongPress(callback) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$threshold2 = options.threshold,
        threshold = _options$threshold2 === undefined ? 400 : _options$threshold2,
        onStart = options.onStart,
        onFinish = options