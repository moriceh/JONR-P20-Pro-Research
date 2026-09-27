nction(ret == null ? undefined : ret.then)) {
            ret.then(next, reject);
            return;
          }

          if (ret.done) {
            return resolve(ret.value);
          }

          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }

        onFulfilled(undefined);
      });
      promise.cancel = action(name + " - runid: " + runId + " - cancel", function () {
        try {
          if (pendingPromise) {
            cancelPromise(pendingPromise);
          }

          var _res = gen["return"](undefined);

          var yieldedPromise = Promise.resolve(_res.value);
          yieldedPromise.then(noop, noop);
          cancelPromise(yieldedPromise);
          rejector(new FlowCancellationError());
        } catch (e) {
          rejector(e);
        }
      });
      return promise;
    };

    res.isMobXFlow = true;
    return res;
  }, flowAnnotation);
  exports.flow = flow;
  flow.bound = createDecoratorAnnotation(flowBoundAnnotation);

  function cancelPromise(promise) {
    if (isFunction(promise.cancel)) {
      promise.cancel();
    }
  }

  function flowResult(result) {
    return result;
  }

  function isFlow(fn) {
    return (fn == null ? undefined : fn.isMobXFlow) === true;
  }

  function interceptReads(thing, propOrHandler, handler) {
    var target;

    if (isObservableMap(thing) || isObservableArray(thing) || isObservableValue(thing)) {
      target = getAdministration(thing);
    } else if (isObservableObject(thing)) {
      target = getAdministration(thing, propOrHandler);
    } else {}

    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
      target.dehancer = undefined;
    };
  }

  function intercept(thing, propOrHandler, handler) {
    if (isFunction(handler)) {
      return interceptProperty(thing, propOrHandler, handler);
    } else {
      return interceptInterceptable(thing, propOrHandler);
    }
  }

  function interceptInterceptable(thing, handler) {
    return getAdministration(thing).intercept_(handler);
  }

  function interceptProperty(thing, property, handler) {
    return getAdministration(thing, property).intercept_(handler);
  }

  function _isComputed(value, property) {
    if (property === undefined) {
      return isComputedValue(value);
    }

    if (isObservableObject(value) === false) {
      return false;
    }

    if (!value[$mobx].values_.has(property)) {
      return false;
    }

    var atom = getAtom(value, property);
    return isComputedValue(atom);
  }

  function isComputed(value) {
    return _isComputed(value);
  }

  function isComputedProp(value, propName) {
    return _isComputed(value, propName);
  }

  function _isObservable(value, property) {
    if (!value) {
      return false;
    }

    if (property !== undefined) {
      if (isObservableObject(value)) {
        return value[$mobx].values_.has(property);
      }

      return false;
    }

    return isObservableObject(value) || !!value[$mobx] || isAtom(value) || isReaction(value) || isComputedValue(value);
  }

  function isObservable(value) {
    return _isObservable(value);
  }

  function isObservableProp(value, propName) {
    return _isObservable(value, propName);
  }

  function keys(obj) {
    if (isObservableObject(obj)) {
      return obj[$mobx].keys_();
    }

    if (isObservableMap(obj) || isObservableSet(obj)) {
      return Array.from(obj.keys());
    }

    if (isObservableArray(obj)) {
      return obj.map(function (_, index) {
        return index;
      });
    }

    die(5);
  }

  function values(obj) {
    if (isObservableObject(obj)) {
      return keys(obj).map(function (key) {
        return obj[key];
      });
    }

    if (isObservableMap(obj)) {
      return keys(obj).map(function (key) {
        return obj.get(key);
      });
    }

    if (isObservableSet(obj)) {
      return Array.from(obj.values());
    }

    if (isObservableArray(obj)) {
      return obj.slice();
    }

    die(6);
  }

  function entries(obj) {
    if (isObservableObject(obj)) {
      return keys(obj).map(function (key) {
        return [key, obj[key]];
      });
    }

    if (isObservableMap(obj)) {
      return keys(obj).map(function (key) {
        return [key, obj.get(key)];
      });
    }

    if (isObservableSet(obj)) {
      return Array.from(obj.entries());
    }

    if (isObservableArray(obj)) {
      return obj.map(function (key, index) {
        return [index, key];
      });
    }

    die(7);
  }

  function set(obj, key, value) {
    if (arguments.length === 2 && !isObservableSet(obj)) {
      startBatch();
      var _values = key;

      try {
        for (var _key in _values) {
          set(obj, _key, _values[_key]);
        }
      } finally {
        endBatch();
      }

      return;
    }

    if (isObservableObject(obj)) {
      obj[$mobx].set_(key, value);
    } else if (isObservableMap(obj)) {
      obj.set(key, value);
    } else if (isObservableSet(obj)) {
      obj.add(key);
    } else if (isObservableArray(obj)) {
      if (typeof key !== "number") {
        key = parseInt(key, 10);
      }

      if (key < 0) {
        die("Invalid index: '" + key + "'");
      }

      startBatch();

      if (key >= obj.length) {
        obj.length = key + 1;
      }

      obj[key] = value;
      endBatch();
    } else {
      die(8);
    }
  }

  function remove(obj, key) {
    if (isObservableObject(obj)) {
      obj[$mobx].delete_(key);
    } else if (isObservableMap(obj)) {
      obj["delete"](key);
    } else if (isObservableSet(obj)) {
      obj["delete"](key);
    } else if (isObservableArray(obj)) {
      if (typeof key !== "number") {
        key = parseInt(key, 10);
      }

      obj.splice(key, 1);
    } else {
      die(9);
    }
  }

  function has(obj, key) {
    if (isObservableObject(obj)) {
      return obj[$mobx].has_(key);
    } else if (isObservableMap(obj)) {
      return obj.has(key);
    } else if (isObservableSet(obj)) {
      return obj.has(key);
    } else if (isObservableArray(obj)) {
      return key >= 0 && key < obj.length;
    }

    die(10);
  }

  function get(obj, key) {
    if (!has(obj, key)) {
      return undefined;
    }

    if (isObservableObject(obj)) {
      return obj[$mobx].get_(key);
    } else if (isObservableMap(obj)) {
      return obj.get(key);
    } else if (isObservableArray(obj)) {
      return obj[key];
    }

    die(11);
  }

  function apiDefineProperty(obj, key, descriptor) {
    if (isObservableObject(obj)) {
      return obj[$mobx].defineProperty_(key, descriptor);
    }

    die(39);
  }

  function apiOwnKeys(obj) {
    if (isObservableObject(obj)) {
      return obj[$mobx].ownKeys_();
    }

    die(38);
  }

  function observe(thing, propOrCb, cbOrFire, fireImmediately) {
    if (isFunction(cbOrFire)) {
      return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    } else {
      return observeObservable(thing, propOrCb, cbOrFire);
    }
  }

  function observeObservable(thing, listener, fireImmediately) {
    return getAdministration(thing).observe_(listener, fireImmediately);
  }

  function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration(thing, property).observe_(listener, fireImmediately);
  }

  function cache(map, key, value) {
    map.set(key, value);
    return value;
  }

  function toJSHelper(source, __alreadySeen) {
    if (source == null || typeof source !== "object" || source instanceof Date || !isObservable(source)) {
      return source;
    }

    if (isObservableValue(source) || isComputedValue(source)) {
      return toJSHelper(source.get(), __alreadySeen);
    }

    if (__alreadySeen.has(source)) {
      return __alreadySeen.get(source);
    }

    if (isObservableArray(source)) {
      var res = cache(__alreadySeen, source, new Array(source.length));
      source.forEach(function (value, idx) {
        res[idx] = toJSHelper(value, __alreadySeen);
      });
      return res;
    }

    if (isObservableSet(source)) {
      var _res = cache(__alreadySeen, source, new Set());

      source.forEach(function (value) {
        _res.add(toJSHelper(value, __alreadySeen));
      });
      return _res;
    }

    if (isObservableMap(source)) {
      var _res2 = cache(__alreadySeen, source, new Map());

      source.forEach(function (value, key) {
        _res2.set(key, toJSHelper(value, __alreadySeen));
      });
      return _res2;
    } else {
      var _res3 = cache(__alreadySeen, source, {});

      apiOwnKeys(source).forEach(function (key) {
        if (objectPrototype.propertyIsEnumerable.call(source, key)) {
          _res3[key] = toJSHelper(source[key], __alreadySeen);
        }
      });
      return _res3;
    }
  }

  function toJS(source, options) {
    return toJSHelper(source, new Map());
  }

  function trace() {
    {
      return;
    }
    var enterBreakPoint = false;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[args.length - 1] === "boolean") {
      enterBreakPoint = args.pop();
    }

    var derivation = getAtomFromArgs(args);

    if (!derivation) {
      return die("'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }

    if (derivation.isTracing_ === TraceMode.NONE) {}

    derivation.isTracing_ = enterBreakPoint ? TraceMode.BREAK : TraceMode.LOG;
  }

  function getAtomFromArgs(args) {
    switch (args.length) {
      case 0:
        return globalState.trackingDerivation;

      case 1:
        return getAtom(args[0]);

      case 2:
        return getAtom(args[0], args[1]);
    }
  }

  function transaction(action, thisArg) {
    if (thisArg === undefined) {
      thisArg = undefined;
    }

    startBatch();

    try {
      return action.apply(thisArg);
    } finally {
      endBatch();
    }
  }

  function when(predicate, arg1, arg2) {
    if (arguments.length === 1 || arg1 && typeof arg1 === "object") {
      return whenPromise(predicate, arg1);
    }

    return _when(predicate, arg1, arg2 || {});
  }

  function _when(predicate, effect, opts) {
    var timeoutHandle;

    if (typeof opts.timeout === "number") {
      var error = new Error("WHEN_TIMEOUT");
      timeoutHandle = setTimeout(function () {
        if (!disposer[$mobx].isDisposed_) {
          disposer();

          if (opts.onError) {
            opts.onError(error);
          } else {
            throw error;
          }
        }
      }, opts.timeout);
    }

    opts.name = "When";
    var effectAction = createAction("When-effect", effect);
    var disposer = autorun(function (r) {
      var cond = allowStateChanges(false, predicate);

      if (cond) {
        r.dispose();

        if (timeoutHandle) {
          clearTimeout(timeoutHandle);
        }

        effectAction();
      }
    }, opts);
    return disposer;
  }

  function whenPromise(predicate, opts) {
    var _opts$signal;

    if (opts != null && (_opts$signal = opts.signal) != null && _opts$signal.aborted) {
      return (0, _extends3.default)(Promise.reject(new Error("WHEN_ABORTED")), {
        cancel: function cancel() {
          return null;
        }
      });
    }

    var cancel;
    var abort;
    var res = new Promise(function (resolve, reject) {
      var _opts$signal2;

      var disposer = _when(predicate, resolve, _extends({}, opts, {
        onError: reject
      }));

      cancel = function cancel() {
        disposer();
        reject(new Error("WHEN_CANCELLED"));
      };

      abort = function abort() {
        disposer();
        reject(new Error("WHEN_ABORTED"));
      };

      opts == null ? undefined : (_opts$signal2 = opts.signal) == null ? undefined : _opts$signal2.addEventListener == null ? undefined : _opts$signal2.addEventListener("abort", abort);
    })["finally"](function () {
      var _opts$signal3;

      return opts == null ? undefined : (_opts$signal3 = opts.signal) == null ? undefined : _opts$signal3.removeEventListener == null ? undefined : _opts$signal3.removeEventListener("abort", abort);
    });
    res.cancel = cancel;
    return res;
  }

  function getAdm(target) {
    return target[$mobx];
  }

  var objectProxyTraps = {
    has: function has(target, name) {
      return getAdm(target).has_(name);
    },
    get: function get(target, name) {
      return getAdm(target).get_(name);
    },
    set: function set(target, name, value) {
      var _getAdm$set_;

      if (!isStringish(name)) {
        return false;
      }

      return (_getAdm$set_ = getAdm(target).set_(name, value, true)) != null ? _getAdm$set_ : true;
    },
    deleteProperty: function deleteProperty(target, name) {
      var _getAdm$delete_;

      if (!isStringish(name)) {
        return false;
      }

      return (_getAdm$delete_ = getAdm(target).delete_(name, true)) != null ? _getAdm$delete_ : true;
    },
    defineProperty: function defineProperty(target, name, descriptor) {
      var _getAdm$definePropert;

      return (_getAdm$definePropert = getAdm(target).defineProperty_(name, descriptor)) != null ? _getAdm$definePropert : true;
    },
    ownKeys: function ownKeys(target) {
      return getAdm(target).ownKeys_();
    },
    preventExtensions: function preventExtensions(target) {
      die(13);
    }
  };

  function asDynamicObservableObject(target, options) {
    var _target$$mobx, _target$$mobx$proxy_;

    assertProxies();
    target = asObservableObject(target, options);
    return (_target$$mobx$proxy_ = (_target$$mobx = target[$mobx]).proxy_) != null ? _target$$mobx$proxy_ : _target$$mobx.proxy_ = new Proxy(target, objectProxyTraps);
  }

  functi