     } : null;

        if (notify) {
          notifyListeners(this, change);
        }
      }

      (_this$pendingKeys_2 = this.pendingKeys_) == null ? undefined : (_this$pendingKeys_2$g = _this$pendingKeys_2.get(key)) == null ? undefined : _this$pendingKeys_2$g.set(true);
      this.keysAtom_.reportChanged();
    };

    _proto.ownKeys_ = function ownKeys_() {
      this.keysAtom_.reportObserved();
      return ownKeys(this.target_);
    };

    _proto.keys_ = function keys_() {
      this.keysAtom_.reportObserved();
      return Object.keys(this.target_);
    };

    return ObservableObjectAdministration;
  }();

  function asObservableObject(target, options) {
    var _options$name;

    if (hasProp(target, $mobx)) {
      return target;
    }

    var name = (_options$name = options == null ? undefined : options.name) != null ? _options$name : "ObservableObject";
    var adm = new ObservableObjectAdministration(target, new Map(), String(name), getAnnotationFromOptions(options));
    addHiddenProp(target, $mobx, adm);
    return target;
  }

  var isObservableObjectAdministration = createInstanceofPredicate("ObservableObjectAdministration", ObservableObjectAdministration);

  function getCachedObservablePropDescriptor(key) {
    return descriptorCache[key] || (descriptorCache[key] = {
      get: function get() {
        return this[$mobx].getObservablePropValue_(key);
      },
      set: function set(value) {
        return this[$mobx].setObservablePropValue_(key, value);
      }
    });
  }

  function isObservableObject(thing) {
    if (isObject(thing)) {
      return isObservableObjectAdministration(thing[$mobx]);
    }

    return false;
  }

  function recordAnnotationApplied(adm, annotation, key) {
    var _adm$target_$storedAn;

    (_adm$target_$storedAn = adm.target_[storedAnnotationsSymbol]) == null ? true : delete _adm$target_$storedAn[key];
  }

  function assertAnnotable(adm, annotation, key) {}

  var ENTRY_0 = createArrayEntryDescriptor(0);

  var safariPrototypeSetterInheritanceBug = function () {
    var v = false;
    var p = {};
    Object.defineProperty(p, "0", {
      set: function set() {
        v = true;
      }
    });
    Object.create(p)["0"] = 1;
    return v === false;
  }();

  var OBSERVABLE_ARRAY_BUFFER_SIZE = 0;

  var StubArray = function StubArray() {};

  function inherit(ctor, proto) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(ctor.prototype, proto);
    } else if (ctor.prototype.__proto__ !== undefined) {
      ctor.prototype.__proto__ = proto;
    } else {
      ctor.prototype = proto;
    }
  }

  inherit(StubArray, Array.prototype);

  var LegacyObservableArray = function (_StubArray, _Symbol$toStringTag, _Symbol$iterator) {
    _inheritsLoose(LegacyObservableArray, _StubArray);

    function LegacyObservableArray(initialValues, enhancer, name, owned) {
      var _this;

      if (name === undefined) {
        name = "ObservableArray";
      }

      if (owned === undefined) {
        owned = false;
      }

      _this = _StubArray.call(this) || this;
      initObservable(function () {
        var adm = new ObservableArrayAdministration(name, enhancer, owned, true);
        adm.proxy_ = _assertThisInitialized(_this);
        addHiddenFinalProp(_assertThisInitialized(_this), $mobx, adm);

        if (initialValues && initialValues.length) {
          _this.spliceWithArray(0, 0, initialValues);
        }

        if (safariPrototypeSetterInheritanceBug) {
          Object.defineProperty(_assertThisInitialized(_this), "0", ENTRY_0);
        }
      });
      return _this;
    }

    var _proto = LegacyObservableArray.prototype;

    _proto.concat = function concat() {
      this[$mobx].atom_.reportObserved();

      for (var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++) {
        arrays[_key] = arguments[_key];
      }

      return Array.prototype.concat.apply(this.slice(), arrays.map(function (a) {
        return isObservableArray(a) ? a.slice() : a;
      }));
    };

    _proto[_Symbol$iterator] = function () {
      var self = this;
      var nextIndex = 0;
      return makeIterable({
        next: function next() {
          return nextIndex < self.length ? {
            value: self[nextIndex++],
            done: false
          } : {
            done: true,
            value: undefined
          };
        }
      });
    };

    _createClass(LegacyObservableArray, [{
      key: "length",
      get: function get() {
        return this[$mobx].getArrayLength_();
      },
      set: function set(newLength) {
        this[$mobx].setArrayLength_(newLength);
      }
    }, {
      key: _Symbol$toStringTag,
      get: function get() {
        return "Array";
      }
    }]);

    return LegacyObservableArray;
  }(StubArray, typeof Symbol === "function" ? Symbol.toStringTag : "@@toStringTag", Symbol.iterator);

  Object.entries(arrayExtensions).forEach(function (_ref) {
    var prop = _ref[0],
        fn = _ref[1];

    if (prop !== "concat") {
      addHiddenProp(LegacyObservableArray.prototype, prop, fn);
    }
  });

  function createArrayEntryDescriptor(index) {
    return {
      enumerable: false,
      configurable: true,
      get: function get() {
        return this[$mobx].get_(index);
      },
      set: function set(value) {
        this[$mobx].set_(index, value);
      }
    };
  }

  function createArrayBufferItem(index) {
    defineProperty(LegacyObservableArray.prototype, "" + index, createArrayEntryDescriptor(index));
  }

  function reserveArrayBuffer(max) {
    if (max > OBSERVABLE_ARRAY_BUFFER_SIZE) {
      for (var index = OBSERVABLE_ARRAY_BUFFER_SIZE; index < max + 100; index++) {
        createArrayBufferItem(index);
      }

      OBSERVABLE_ARRAY_BUFFER_SIZE = max;
    }
  }

  reserveArrayBuffer(1000);

  function createLegacyArray(initialValues, enhancer, name) {
    return new LegacyObservableArray(initialValues, enhancer, name);
  }

  function getAtom(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray(thing)) {
        if (property !== undefined) {
          die(23);
        }

        return thing[$mobx].atom_;
      }

      if (isObservableSet(thing)) {
        return thing.atom_;
      }

      if (isObservableMap(thing)) {
        if (property === undefined) {
          return thing.keysAtom_;
        }

        var observable = thing.data_.get(property) || thing.hasMap_.get(property);

        if (!observable) {
          die(25, property, getDebugName(thing));
        }

        return observable;
      }

      if (isObservableObject(thing)) {
        if (!property) {
          return die(26);
        }

        var _observable = thing[$mobx].values_.get(property);

        if (!_observable) {
          die(27, property, getDebugName(thing));
        }

        return _observable;
      }

      if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
        return thing;
      }
    } else if (isFunction(thing)) {
      if (isReaction(thing[$mobx])) {
        return thing[$mobx];
      }
    }

    die(28);
  }

  function getAdministration(thing, property) {
    if (!thing) {
      die(29);
    }

    if (property !== undefined) {
      return getAdministration(getAtom(thing, property));
    }

    if (isAtom(thing) || isComputedValue(thing) || isReaction(thing)) {
      return thing;
    }

    if (isObservableMap(thing) || isObservableSet(thing)) {
      return thing;
    }

    if (thing[$mobx]) {
      return thing[$mobx];
    }

    die(24, thing);
  }

  function getDebugName(thing, property) {
    var named;

    if (property !== undefined) {
      named = getAtom(thing, property);
    } else if (isAction(thing)) {
      return thing.name;
    } else if (isObservableObject(thing) || isObservableMap(thing) || isObservableSet(thing)) {
      named = getAdministration(thing);
    } else {
      named = getAtom(thing);
    }

    return named.name_;
  }

  function initObservable(cb) {
    var derivation = untrackedStart();
    var allowStateChanges = allowStateChangesStart(true);
    startBatch();

    try {
      return cb();
    } finally {
      endBatch();
      allowStateChangesEnd(allowStateChanges);
      untrackedEnd(derivation);
    }
  }

  var toString = objectPrototype.toString;

  function deepEqual(a, b, depth) {
    if (depth === undefined) {
      depth = -1;
    }

    return eq(a, b, depth);
  }

  function eq(a, b, depth, aStack, bStack) {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    }

    if (a == null || b == null) {
      return false;
    }

    if (a !== a) {
      return b !== b;
    }

    var type = typeof a;

    if (type !== "function" && type !== "object" && typeof b != "object") {
      return false;
    }

    var className = toString.call(a);

    if (className !== toString.call(b)) {
      return false;
    }

    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;

      case "[object Number]":
        if (+a !== +a) {
          return +b !== +b;
        }

        return +a === 0 ? 1 / +a === 1 / b : +a === +b;

      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;

      case "[object Symbol]":
        return typeof Symbol !== "undefined" && (typeof Symbol === "function" ? Symbol.valueOf : "@@valueOf").call(a) === (typeof Symbol === "function" ? Symbol.valueOf : "@@valueOf").call(b);

      case "[object Map]":
      case "[object Set]":
        if (depth >= 0) {
          depth++;
        }

        break;
    }

    a = unwrap(a);
    b = unwrap(b);
    var areArrays = className === "[object Array]";

    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object") {
        return false;
      }

      var aCtor = a.constructor,
          bCtor = b.constructor;

      if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
        return false;
      }
    }

    if (depth === 0) {
      return false;
    } else if (depth < 0) {
      depth = -1;
    }

    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;

    while (length--) {
      if (aStack[length] === a) {
        return bStack[length] === b;
      }
    }

    aStack.push(a);
    bStack.push(b);

    if (areArrays) {
      length = a.length;

      if (length !== b.length) {
        return false;
      }

      while (length--) {
        if (!eq(a[length], b[length], depth - 1, aStack, bStack)) {
          return false;
        }
      }
    } else {
      var keys = Object.keys(a);
      var key;
      length = keys.length;

      if (Object.keys(b).length !== length) {
        return false;
      }

      while (length--) {
        key = keys[length];

        if (!(hasProp(b, key) && eq(a[key], b[key], depth - 1, aStack, bStack))) {
          return false;
        }
      }
    }

    aStack.pop();
    bStack.pop();
    return true;
  }

  function unwrap(a) {
    if (isObservableArray(a)) {
      return a.slice();
    }

    if (isES6Map(a) || isObservableMap(a)) {
      return Array.from(a.entries());
    }

    if (isES6Set(a) || isObservableSet(a)) {
      return Array.from(a.entries());
    }

    return a;
  }

  function makeIterable(iterator) {
    iterator[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] = getSelf;
    return iterator;
  }

  function getSelf() {
    return this;
  }

  ["Symbol", "Map", "Set"].forEach(function (m) {
    var g = getGlobal();

    if (typeof g[m] === "undefined") {
      die("MobX requires global '" + m + "' to be available or polyfilled");
    }
  });

  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy: spy,
      extras: {
        getDebugName: getDebugName
      },
      $mobx: $mobx
    });
  }
},10019,[14305,14344]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "unstable_batchedUpdates", {
    enumerable: true,
    get: function get() {
      return _reactNative.unstable_batchedUpdates;
    }
  });

  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
},10022,[10033]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.defaultNoopBatch = defaultNoopBatch;
  exports.observerBatching = observerBatching;
  exports.isObserverBatched = undefined;

  var _mobx = _$$_REQUIRE(_dependencyMap[0]);

  function defaultNoopBatch(callback) {
    callback();
  }

  function observerBatching(reactionScheduler) {
    if (!reactionScheduler) {
      reactionScheduler = defaultNoopBatch;
    }

    (0, _mobx.configure)({
      reactionScheduler: reactionScheduler
    });
  }

  var isObserverBatched = function isObserverBatched() {
    return true;
  };

  exports.isObserverBatched = isObserverBatched;
},10025,[10019]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useDeprecated = useDeprecated;
  var deprecatedMessages = [];

  function useDeprecated(msg) {
    if (!deprecatedMessages.includes(msg)) {
      deprecatedMessages.push(msg);
    }
  }
},10028,[]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useObserver = useObserver;

  var _mobx = _$$_REQUIRE(_dependencyMap[1]);

  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _printDebugValue = _$$_REQUIRE(_dependencyMap[3]);

  var _staticRendering = _$$_REQUIRE(_dependencyMap[4]);

  var _observerFinalizationRegistry = _$$_REQUIRE(_dependencyMap[5]);

  var _shim = _$$_REQUIRE(_dependencyMap[6]);

  var getServerSnapshot = function getServerSnapshot() {};

  function createReaction(adm) {
    adm.reaction = new _mobx.Reaction("observer".concat(adm.name), function () {
      var _a;

      adm.stateVersion = Symbol();
      (_a = adm.onStoreChange) === null || _a === undefined ? undefined : _a.call(adm);
    });
  }

  function useObserver(render, baseComponentName) {
    if (baseComponentName === undefined) {
      baseComponentName = "observed";
    }

    if ((0, _staticRendering.isUsingStaticRendering)()) {
      return render();
    }

    var admRef = _react.default.useRef(null);

    if (!admRef.current) {
      var adm_1 = {
        reaction: null,
        onStoreChange: null,
        stateVersion: Symbol(),
        name: baseComponentName,
        subscribe: function subscribe(onStoreChange) {
          _observerFinalizationRegistry.observerFinalizationRegistry.unregister(adm_1);

          adm_1.onStoreChange = onStoreChange;

          if (!adm_1.reaction) {
            createReaction(adm_1);
            adm_1.stateVersion = Symbol();
          }

          return function () {
            var _a;

            adm_1.onStoreChange = null;
            (_a = adm_1.reaction) === null || _a === undefined ? undefined : _a.dispose();
            adm_1.reaction = null;
          };
        },
        getSnapshot: function getSnapshot() {
          return adm_1.stateVersion;
        }
      };
      admRef.current = adm_1;
    }

    var adm = admRef.current;

    if (!adm.reaction) {
      createReaction(adm);

      _observerFinalizationRegistry.observerFinalizationRegistry.register(admRef, adm, adm);
    }

    _react.default.useDebugValue(adm.reaction, _printDebugValue.printDebugValue);

    (0, _shim.useSyncExternalStore)(adm.subscribe, adm.getSnapshot, getServerSnapshot);
    var renderResult;
    var exception;
    adm.reaction.track(function () {
      try {
        renderResult = render();
      } catch (e) {
        exception = e;
      }
    });

    if (exception) {
      throw exception;
    }

    return renderResult;
  }
},10031,[14305,10019,10297,10034,10037,10040,10046]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.printDebugValue = printDebugValue;

  var _mobx = _$$_REQUIRE(_dependencyMap[0]);

  function printDebugValue(v) {
    return (0, _mobx.getDependencyTree)(v);
  }
},10034,[10019]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.enableStaticRendering = enableStaticRendering;
  exports.isUsingStaticRendering = isUsingStaticRendering;
  var globalIsUsingStaticRendering = false;

  function enableStaticRendering(enable) {
    globalIsUsingStaticRendering = enable;
  }

  function isUsingStaticRendering() {
    return globalIsUsingStaticRendering;
  }
},10037,[]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.observerFinalizationRegistry = undefined;

  var _UniversalFinalizationRegistry = _$$_REQUIRE(_dependencyMap[0]);

  var observerFinalizationRegistry = new _UniversalFinalizationRegistry.UniversalFinalizationRegistry(function (adm) {
    var _a;

    (_a = adm.reaction) === null || _a === undefined ? undefined : _a.dispose();
    adm.reaction = null;
  });
  exports.observerFinalizationRegistry = observerFinalizationRegistry;
},10040,[10043]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniversalFinalizationRegistry = exports.TimerBasedFinalizationRegistry = exports.REGISTRY_SWEEP_INTERVAL = exports.REGISTRY_FINALIZE_AFTER = undefined;
  var REGISTRY_FINALIZE_AFTER = 10000;
  exports.REGISTRY_FINALIZE_AFTER = REGISTRY_FINALIZE_AFTER;
  var REGISTRY_SWEEP_INTERVAL = 10000;
  exports.REGISTRY_SWEEP_INTERVAL = REGISTRY_SWEEP_INTERVAL;

  var TimerBasedFinalizationRegistry = function () {
    function TimerBasedFinalizationRegistry(finalize) {
      var _this = this;

      Object.defineProperty(this, "finalize", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: finalize
      });
      Object.defineProperty(this, "registrations", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new Map()
      });
      Object.defineProperty(this, "sweepTimeout", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: undefined
      });
      Object.defineProperty(this, "sweep", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function value(maxAge) {
          if (maxAge === undefined) {
            maxAge = REGISTRY_FINALIZE_AFTER;
          }

          clearTimeout(_this.sweepTimeout);
          _this.sweepTimeout = undefined;
          var now = Date.now();

          _this.registrations.forEach(function (registration, token) {
            if (now - registration.registeredAt >= maxAge) {
              _this.finalize(registration.value);

              _this.registrations.delete(token);
            }
          });

          if (_this.registrations.size > 0) {
            _this.scheduleSweep();
          }
        }
      });
      Object.defineProperty(this, "finalizeAllImmediately", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function value() {
          _this.sweep(0);
        }
      });
    }

    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "register", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function value(target, _value, token) {
        this.registrations.set(token, {
          value: _value,
          registeredAt: Date.now()
        });
        this.scheduleSweep();
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "unregister", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function value(token) {
        this.registrations.delete(token);
      }
    });
    Object.defineProperty(TimerBasedFinalizationRegistry.prototype, "scheduleSweep", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function value() {
        if (this.sweepTimeout === undefined) {
          this.sweepTimeout = setTimeout(this.sweep, REGISTRY_SWEEP_INTERVAL);
        }
      }
    });
    return TimerBasedFinalizationRegistry;
  }();

  exports.TimerBasedFinalizationRegistry = TimerBasedFinalizationRegistry;
  var UniversalFinalizationRegistry = typeof FinalizationRegistry !== "undefined" ? FinalizationRegistry : TimerBasedFinalizationRegistry;
  exports.UniversalFinalizationRegistry = UniversalFinalizationRegistry;
},10043,[]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  'use strict';

  {
    module.exports = _$$_REQUIRE(_dependencyMap[0]);
  }
},10046,[10049]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  /**
   * @license React
   * use-sync-external-store-shim.native.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  var e = _$$_REQUIRE(_dependencyMap[0]);

  function h(a, b) {
    return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
  }

  var k = "function" === typeof Object.is ? Object.is : h,
      l = e.useState,
      m = e.useEffect,
      n = e.useLayoutEffect,
      p = e.useDebugValue;

  function q(a, b) {
    var d = b(),
        f = l({
      inst: {
        value: d,
        getSnapshot: b
      }
    }),
        c = f[0].inst,
        g = f[1];
    n(function () {
      c.value = d;
      c.getSnapshot = b;
      r(c) && g({
        inst: c
      });
    }, [a, d, b]);
    m(function () {
      r(c) && g({
        inst: c
      });
      return a(function () {
        r(c) && g({
          inst: c
        });
      });
    }, [a]);
    p(d);
    return d;
  }

  function r(a) {
    var b = a.getSnapshot;
    a = a.value;

    try {
      var d = b();
      return !k(a, d);
    } catch (f) {
      return true;
    }
  }

  exports.useSyncExternalStore = undefined !== e.useSyncExternalStore ? e.useSyncExternalStore : q;
},10049,[10297]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.observer = observer;

  var _react = _$$_REQUIRE(_dependencyMap[0]);

  var _staticRendering = _$$_REQUIRE(_dependencyMap[1]);

  var _useObserver = _$$_REQUIRE(_dependencyMap[2]);

  var warnObserverOptionsDeprecated = true;
  var hasSymbol = typeof Symbol === "function" && (typeof Symbol === "function" ? Symbol.for : "@@for");
  var ReactForwardRefSymbol = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.forward_ref") : typeof _react.forwardRef === "function" && (0, _react.forwardRef)(function (props) {
    return null;
  })["$$typeof"];
  var ReactMemoSymbol = hasSymbol ? (typeof Symbol === "function" ? Symbol.for : "@@for")("react.memo") : typeof _react.memo === "function" && (0, _react.memo)(function (props) {
    return null;
  })["$$typeof"];

  function observer(baseComponent, options) {
    var _a;

    if (ReactMemoSymbol && baseComponent["$$typeof"] === ReactMemoSymbol) {
      throw new Error("[mobx-react-lite] You are trying to use `observer` on a function component wrapped in either another `observer` or `React.memo`. The observer already applies 'React.memo' for you.");
    }

    if ((0, _staticRendering.isUsingStaticRendering)()) {
      return baseComponent;
    }

    var useForwardRef = (_a = options === null || options === undefined ? undefined : options.forwardRef) !== null && _a !== undefined ? _a : false;
    var render = baseComponent;
    var baseComponentName = baseComponent.displayName || baseComponent.name;

    if (ReactForwardRefSymbol && baseComponent["$$typeof"] === ReactForwardRefSymbol) {
      useForwardRef = true;
      render = baseComponent["render"];

      if (typeof render !== "function") {
        throw new Error("[mobx-react-lite] `render` property of ForwardRef was not a function");
      }
    }

    var observerComponent = function observerComponent(props, ref) {
      return (0, _useObserver.useObserver)(function () {
        return render(props, ref);
      }, baseComponentName);
    };

    observerComponent.displayName = baseComponent.displayName;
    Object.defineProperty(observerComponent, "name", {
      value: baseComponent.name,
      writable: true,
      configurable: true
    });

    if (baseComponent.contextTypes) {
      ;
      observerComponent.contextTypes = baseComponent.contextTypes;
    }

    if (useForwardRef) {
      observerComponent = (0, _react.forwardRef)(observerComponent);
    }

    observerComponent = (0, _react.memo)(observerComponent);
    copyStaticProperties(baseComponent, observerComponent);
    return observerComponent;
  }

  var hoistBlackList = {
    $$typeof: true,
    render: true,
    compare: true,
    type: true,
    displayName: true
  };

  function copyStaticProperties(base, target) {
    Object.keys(base).forEach(function (key) {
      if (!hoistBlackList[key]) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(base, key));
      }
    });
  }
},10052,[10297,10037,10031]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Observer = ObserverComponent;

  var _useObserver = _$$_REQUIRE(_dependencyMap[0]);

  function ObserverComponent(_a) {
    var children = _a.children,
        render = _a.render;
    var component = children || render;

    if (typeof component !== "function") {
      return null;
    }

    return (0, _useObserver.useObserver)(component);
  }

  ObserverComponent.displayName = "Observer";
},10055,[10031]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useLocalObservable = useLocalObservable;

  var _mobx = _$$_REQUIRE(_dependencyMap[0]);

  var _react = _$$_REQUIRE(_dependencyMap[1]);

  function useLocalObservable(initializer, annotations) {
    return (0, _react.useState)(function () {
      return (0, _mobx.observable)(initializer(), annotations, {
        autoBind: true
      });
    })[0];
  }
},10058,[10019,10297]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useLocalStore = useLocalStore;

  var _mobx = _$$_REQUIRE(_dependencyMap[0]);

  var _react = _$$_REQUIRE(_dependencyMap[1]);

  var _utils = _$$_REQUIRE(_dependencyMap[2]);

  var _useAsObservableSource = _$$_REQUIRE(_dependencyMap[3]);

  function useLocalStore(initializer, current) {
    var source = current && (0, _useAsObservableSource.useAsObservableSource)(current);
    return (0, _react.useState)(function () {
      return (0, _mobx.observable)(initializer(source), undefined, {
        autoBind: true
      });
    })[0];
  }
},10061,[10019,10297,10028,10064]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.useAsObservableSource = useAsObservableSource;

  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _utils = _$$_REQUIRE(_dependencyMap[2]);

  var _mobx = _$$_REQUIRE(_dependencyMap[3]);

  var _react = _$$_REQUIRE(_dependencyMap[4]);

  var __read = this && this.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;

    try {
      while ((n === undefined || n-- > 0) && !(r = i.next()).done) {
        ar.push(r.value);
      }
    } catch (error) {
      e = {
        error: error
      };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }

    return ar;
  };

  function useAsObservableSource(current) {
    var _a = __read((0, _react.useState)(function () {
      return (0, _mobx.observable)(current, {}, {
        deep: false
      });
    }), 1),
        res = _a[0];

    (0, _mobx.runInAction)(function () {
      (0, _extends2.default)(res, current);
    });
    return res;
  }
},10064,[14305,14344,10028,10019,10297]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = mapStore;

  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _base = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var _map = _$$_REQUIRE(_dependencyMap[3]);

  var _mobx = _$$_REQUIRE(_dependencyMap[4]);

  var _interface = _$$_REQUIRE(_dependencyMap[5]);

  var _is = _$$_REQUIRE(_dependencyMap[6]);

  var _utils = _$$_REQUIRE(_dependencyMap[7]);

  var _logger = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));

  var _index = _$$_REQUIRE(_dependencyMap[9]);

  var _multilingual = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));

  function mapStore() {
    return {
      mapInfos: [],
      curMapInfo: {
        mapId: '',
        mapData: {},
        mapTraceData: {},
        pos: {},
        areas: [],
        virtualWalls: [],
        mopWalls: [],
        carpet: [],
        carpetPrefer: [],
        thres: [],
        carpetId: 0
      },
      isExpandedMap: false,
      setIsExpandedMap: function setIsExpandedMap(value) {
        this.isExpandedMap = value;
      },
      setCarpetId: function setCarpetId(value) {
        this.carpetId = value;
      },
      setMapInfos: function setMapInfos(mapInfos) {
        var _mapInfos;

        mapInfos == null ? undefined : mapInfos.forEach(function (mapInfo) {
          if (mapInfo['roomchain']) {
            delete mapInfo['roomchain'];
          }

          if ((0, _is.isNull)(mapInfo['name'])) {
            mapInfo['name'] = mapInfo.saved === 1 ? "" + (_multilingual.default == null ? undefined : _multilingual.default.keyword235) + mapInfo.mapId : _multilingual.default == null ? undefined : _multilingual.default.keyword43;
          }

          if (mapInfo.hasOwnProperty('mapData') && !(0, _is.isNull)(mapInfo['mapData'])) {
            try {
              var mapDataStr = _base.default.decode(mapInfo.mapData);

              mapInfo.mapData = JSON.parse(mapDataStr);
            } catch (error) {
              _logger.default.e('地图列表 mapData 解析数据时出错：', error);
            }
          }

          if (mapInfo.hasOwnProperty('mapTraceData') && !(0, _is.isNull)(mapInfo['mapTraceData'])) {
            try {
              var mapTraceStr = _base.default.decode(mapInfo.mapTraceData);

              mapInfo.mapTraceData = JSON.parse(mapTraceStr);
            } catch (error) {
              _logger.default.e('地图列表 mapTraceData 解析数据时出错：', error);
            }
          }

          if (mapInfo.hasOwnProperty('areas') && !(0, _is.isNull)(mapInfo['areas'])) {
            try {
              var areas = JSON.parse(mapInfo.areas);
              mapInfo.areas = mapInfo.saved === 1 ? areas == null ? undefined : areas.map(function (area) {
                if (area.hasOwnProperty('neibs')) {
                  area.neibs = area.neibs.split(',').filter(function (element) {
                    return element !== "";
                  });
                }

                if (area.hasOwnProperty('name') && area['name'] === '') {
                  area.name = "" + (_multilingual.default == null ? undefined : _multilingual.default.keyword257) + area.id;
                }

                if (area.hasOwnProperty('type') && area['type'] === '') {
                  area.type = "0";
                }

                return area;
              }) : [];
            } catch (error) {
              _logger.default.e('地图列表 areas 解析数据时出错：', error);
            }
          }

          if (mapInfo.hasOwnProperty('virtualWalls') && !(0, _is.isNull)(mapInfo['virtualWalls'])) {
            try {
              var wallStr = _base.default.decode(mapInfo.virtualWalls);

              var walls = (0, _index.stringConvertVirtuals)(wallStr, mapInfo.mapId);
              mapInfo.virtualWalls = walls;
            } catch (error) {
              _logger.default.e('地图列表 解析virtualWalls出错：', error);
            }
          } else {
            mapInfo.virtualWalls = [];
          }

          if (mapInfo.hasOwnProperty('mopWalls') && !(0, _is.isNull)(mapInfo['mopWalls'])) {
            try {
              var _wallStr = _base.default.decode(mapInfo.mopWalls);

              var _walls = (0, _index.stringConvertVirtuals)(_wallStr, mapInfo.mapId);

              mapInfo.mopWalls = _walls;
            } catch (error) {
              _logger.default.e('地图列表 解析mopWalls出错：', error);
            }
          } else {
            mapInfo.mopWalls = [];
          }

          if (mapInfo.hasOwnProperty('carpet') && !(0, _is.isNull)(mapInfo['carpet'])) {
            try {
              var _wallStr2 = _base.default.decode(mapInfo.carpet);

              var _walls2 = (0, _index.stringConvertVirtuals)(_wallStr2, mapInfo.mapId);

              mapInfo.carpet = _walls2;
            } catch (error) {
              _logger.default.e('地图列表 carpet', error);
            }
          } else {
            mapInfo.carpet = [];
          }

          if (mapInfo.hasOwnProperty('thres') && !(0, _is.isNull)(mapInfo['thres'])) {
            try {
              var _wallStr3 = _base.default.decode(mapInfo.thres);

              var _walls3 = (0, _index.stringConvertVirtuals)(_wallStr3, mapInfo.mapId);

              mapInfo.thres = _walls3;
            } catch (error) {
              _logger.default.e('地图列表 解析thres出错：', error);
            }
          } else {
            mapInfo.thres = [];
          }
        });
        this.mapInfos = (_mapInfos = mapInfos) != null ? _mapInfos : [];
      },
      setCurMapInfo: function setCurMapInfo(obj) {
        var _obj$fields, _obj$fields3, _obj$fields4, _obj$fields5, _obj$fields6, _obj$fields7, _obj$fields8, _obj$fields9, _obj$fields10, _obj$fields11;

        if (((_obj$fields = obj.fields) == null ? undefined : _obj$fields.length) > 9) {
          var _obj$fields2;

          obj == null ? undefined : (_obj$fields2 = obj.fields) == null ? undefined : _obj$fields2.splice(9, 1);
        }

        var mapInfo = {
          ts: new Date().getTime(),
          mapId: '',
          mapData: {},
          mapTraceData: {},
          pos: {},
          areas: [],
          virtualWalls: [],
          mopWalls: [],
          carpet: [],
          thres: [],
          carpetPrefer: []
        };
        mapInfo.mapId = obj.mapId;

        _logger.default.d('当前地图更新', obj == null ? undefined : obj.mapId);

        if ((obj == null ? undefined : (_obj$fields3 = obj.fields) == null ? undefined : _obj$fields3.length) > 0) {
          if (!(0, _is.isNull)(obj.fields[0])) {
            try {
              var mapDataStr = _base.default.decode(obj.fields[0]);

              mapInfo.mapData = JSON.parse(mapDataStr);
            } catch (error) {
              _logger.default.e('mapData 解析数据时出错：', error);
            }
          }
        }

        if (((_obj$fields4 = obj.fields) == null ? undefined : _obj$fields4.length) > 1) {
          if (!(0, _is.isNull)(obj.fields[1])) {
            try {
              var mapTraceStr = _base.default.decode(obj.fields[1]);

              mapInfo.mapTraceData = JSON.parse(mapTraceStr);
            } catch (error) {
              _logger.default.e('当前地图mapTraceData 解析数据时出错：', error);
            }
          }
        }

        if (((_obj$fields5 = obj.fields) == null ? undefined : _obj$fields5.length) > 2) {
          try {
            mapInfo.pos = JSON.parse(obj.fields[2]);
          } catch (error) {
            _logger.default.e('当前地图解析机器位置出错:', error);
          }
        }

        if (((_obj$fields6 = obj.fields) == null ? undefined : _obj$fields6.length) > 3) {
          if (!(0, _is.isNull)(obj.fields[3])) {
            try {
              var areas = JSON.parse(obj.fields[3]);

              if (Array.isArray(areas) && areas.length) {
                mapInfo.areas = areas == null ? undefined : areas.map(function (area) {
                  if (area.hasOwnProperty('neibs') && area['neibs']) {
                    area.neibs = area.neibs.split(',').filter(function (element) {
                      return element !== "";
                    });
                  }

                  if (area.hasOwnProperty('name') && area['name'] === '') {
                    area.name = "" + (_multilingual.default == null ? undefined : _multilingual.default.keyword257) + area.id;
                  }

                  if (area.hasOwnProperty('type') && area['type'] === '') {
                    area.type = "0";
                  }

                  return area;
                });
              }
            } catch (error) {
              _logger.default.e('解析当前地图 areas追踪数据出错：', error, typeof value);
            }
          }
        }

        if (((_obj$fields7 = obj.fields) == null ? undefined : _obj$fields7.length) > 4) {
          if (!(0, _is.isNull)(obj.fields[4])) {
            try {
              var wallStr = _base.default.decode(obj.fields[4]);

              var walls = (0, _index.stringConvertVirtuals)(wallStr, mapInfo.mapId);
              mapInfo.virtualWalls = walls;

              _logger.default.d('当前地图------------虚拟墙变化', wallStr);
            } catch (error) {
              _logger.default.e('当前地图解析虚拟墙追踪数据出错：', error);
            }
          }
        }

        if (((_obj$fields8 = obj.fields) == null ? undefined : _obj$fields8.length) > 5) {
          if (!(0, _is.isNull)(obj.fields[5])) {
            try {
              var _wallStr4 = _base.default.decode(obj.fields[5]);

              var _walls4 = (0, _index.stringConvertVirtuals)(_wallStr4, mapInfo.mapId);

              mapInfo.mopWalls = _walls4;
            } catch (error) {
              _logger.default.e('当前地图解析虚拟墙追踪数据出错：', error);
            }
          }
        }

        if (((_obj$fields9 = obj.fields) == null ? undefined : _obj$fields9.length) > 6) {
          if (!(0, _is.isNull)(obj.fields[6])) {
            try {
              var _wallStr5 = _base.default.decode(obj.fields[6]);

              var _walls5 = (0, _index.stringConvertVirtuals)(_wallStr5, mapInfo.mapId);

              mapInfo.carpet = _walls5;
            } catch (error) {
              _logger.default.e('当前地图解析虚拟墙地毯追踪数据出错：', error);
            }
          }
        }

        if (((_obj$fields10 = obj.fields) == null ? undefined : _obj$fields10.length) > 7) {
          if (!(0, _is.isNull)(obj.fields[7])) {
            try {
              var _wallStr6 = _base.default.decode(obj.fields[7]);

              var _walls6 = (0, _index.stringConvertVirtuals)(_wallStr6, mapInfo.mapId);

              mapInfo.thres = _walls6;
            } catch (error) {
              _logger.default.e('当前地图解析thres追踪数据出错：', error);
            }
          }
        }

        if (((_obj$fields11 = obj.fields) == null ? undefined : _obj$fields11.length) > 8) {
          if (!(0, _is.isNull)(obj.fields[8])) {
            try {
              mapInfo.carpetPrefer = obj.fields[8];
            } catch (error) {
              _logger.default.e('当前地图解析thres追踪数据出错：', error);
            }
          }
        }

        this.curMapInfo = mapInfo;
      },

      get isNewMap() {
        return this.curMapInfo.mapId === 0;
      },

      get hasMapData() {
        var _ref, _this$curMapInfo;

        return ((_ref = (_this$curMapInfo = this.curMapInfo) == null ? undefined : _this$curMapInfo.mapData.lz4Len) != null ? _ref : 0) > 1;
      },

      get isMapSaved() {
        var _this = this;

        var foundMap = this.mapInfos.find(function (mapInfo) {
          return mapInfo.mapId === _this.curMapInfo.mapId;
        });
        return (foundMap == null ? undefined : foundMap.saved) === 1 || this.curMapInfo.mapId != 0;
      },

      get currentMapName() {
        var _this2 = this;

        var foundMap = this.mapInfos.find(function (mapInfo) {
          return mapInfo.mapId === _this2.curMapInfo.mapId;
        });
        return (foundMap == null ? undefined : foundMap.name) || (this.curMapInfo.mapId != 0 ? "" + (_multilingual.default == null ? undefined : _multilingual.default.keyword235) + this.curMapInfo.mapId : _multilingual.default == null ? undefined : _multilingual.default.keyword43);
      },

      get sortedMapInfos() {
        var inUseItem = this.mapInfos.find(function (item) {
          return item.status === 1;
        });

        if (inUseItem) {
          return [inUseItem].concat((0, _toConsumableArray2.default)(this.mapInfos.filter(function (item) {
            return item.status !== 1;
          })));
        }

        return this.mapInfos.slice();
      },

      get isShowMapExtentDialog() {
        var _this$curMapInfo2, _this$curMapInfo2$map, _this$curMapInfo3, _this$curMapInfo3$map;

        _logger.default.d("isShowMapExtentDialog isExpandedMap:" + this.isExpandedMap + " mapData?.expanded :" + ((_this$curMapInfo2 = this.curMapInfo) == null ? undefined : (_this$curMapInfo2$map = _this$curMapInfo2.mapData) == null ? undefined : _this$curMapInfo2$map.expanded));

        return this.isExpandedMap || ((_this$curMapInfo3 = this.curMapInfo) == null ? undefined : (_this$curMapInfo3$map = _this$curMapInfo3.mapData) == null ? undefined : _this$curMapInfo3$map.expanded) === 1;
      }

    };
  }
},10067,[14305,14359,10070,10073,10019,10085,10088,10091,10082,10133,10094]); __d(function (global, _$$_REQUIRE, _$$_IMPORT_DEFAULT, _$$_IMPORT_ALL, module, exports, _dependencyMap) {
  ;

  (function (root) {
    var freeExports = typeof exports == 'object' && exports;
    var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;
    var freeGlobal = typeof global == 'object' && global;

    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
      root = freeGlobal;
    }

    var InvalidCharacterError = function InvalidCharacterError(message) {
      this.message = message;
    };

    InvalidCharacterError.prototype = new Error();
    InvalidCharacterError.prototype.name = 'InvalidCharacterError';

    var error = function error(message) {
      throw new InvalidCharacterError(message);
    };

    var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

    var decode = function decode(input) {
      input = String(input).replace(REGEX_SPACE_CHARACTERS, '');
      var length = input.length;

      if (length % 4 == 0) {
        input = input.replace(/==?$/, '');
        length = input.length;
      }

      if (length % 4 == 1 || /[^+a-zA-Z0-9/]/.test(input)) {
        error('Invalid character: the string to be decoded is not correctly encoded.');
      }

      var bitCounter = 0;
      var bitStorage;
      var buffer;
      var output = '';
      var position = -1;

      while (++position < length) {
        buffer = TABLE.indexOf(input.charAt(position));
        bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;

        if (bitCounter++ % 4) {
          outpu