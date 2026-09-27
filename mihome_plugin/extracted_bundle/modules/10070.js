on hasInterceptors(interceptable) {
    return interceptable.interceptors_ !== undefined && interceptable.interceptors_.length > 0;
  }

  function registerInterceptor(interceptable, handler) {
    var interceptors = interceptable.interceptors_ || (interceptable.interceptors_ = []);
    interceptors.push(handler);
    return once(function () {
      var idx = interceptors.indexOf(handler);

      if (idx !== -1) {
        interceptors.splice(idx, 1);
      }
    });
  }

  function interceptChange(interceptable, change) {
    var prevU = untrackedStart();

    try {
      var interceptors = [].concat(interceptable.interceptors_ || []);

      for (var i = 0, l = interceptors.length; i < l; i++) {
        change = interceptors[i](change);

        if (change && !change.type) {
          die(14);
        }

        if (!change) {
          break;
        }
      }

      return change;
    } finally {
      untrackedEnd(prevU);
    }
  }

  function hasListeners(listenable) {
    return listenable.changeListeners_ !== undefined && listenable.changeListeners_.length > 0;
  }

  function registerListener(listenable, handler) {
    var listeners = listenable.changeListeners_ || (listenable.changeListeners_ = []);
    listeners.push(handler);
    return once(function () {
      var idx = listeners.indexOf(handler);

      if (idx !== -1) {
        listeners.splice(idx, 1);
      }
    });
  }

  function notifyListeners(listenable, change) {
    var prevU = untrackedStart();
    var listeners = listenable.changeListeners_;

    if (!listeners) {
      return;
    }

    listeners = listeners.slice();

    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i](change);
    }

    untrackedEnd(prevU);
  }

  function makeObservable(target, annotations, options) {
    initObservable(function () {
      var _annotations;

      var adm = asObservableObject(target, options)[$mobx];
      (_annotations = annotations) != null ? _annotations : annotations = collectStoredAnnotations(target);
      ownKeys(annotations).forEach(function (key) {
        return adm.make_(key, annotations[key]);
      });
    });
    return target;
  }

  var keysSymbol = Symbol("mobx-keys");

  function makeAutoObservable(target, overrides, options) {
    if (isPlainObject(target)) {
      return extendObservable(target, target, overrides, options);
    }

    initObservable(function () {
      var adm = asObservableObject(target, options)[$mobx];

      if (!target[keysSymbol]) {
        var proto = Object.getPrototypeOf(target);
        var keys = new Set([].concat(ownKeys(target), ownKeys(proto)));
        keys["delete"]("constructor");
        keys["delete"]($mobx);
        addHiddenProp(proto, keysSymbol, keys);
      }

      target[keysSymbol].forEach(function (key) {
        return adm.make_(key, !overrides ? true : key in overrides ? overrides[key] : true);
      });
    });
    return target;
  }

  var SPLICE = "splice";
  var UPDATE = "update";
  var MAX_SPLICE_SIZE = 10000;
  var arrayTraps = {
    get: function get(target, name) {
      var adm = target[$mobx];

      if (name === $mobx) {
        return adm;
      }

      if (name === "length") {
        return adm.getArrayLength_();
      }

      if (typeof name === "string" && !isNaN(name)) {
        return adm.get_(parseInt(name));
      }

      if (hasProp(arrayExtensions, name)) {
        return arrayExtensions[name];
      }

      return target[name];
    },
    set: function set(target, name, value) {
      var adm = target[$mobx];

      if (name === "length") {
        adm