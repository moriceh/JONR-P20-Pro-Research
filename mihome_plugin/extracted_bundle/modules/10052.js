 = false;
    var value;
    var oldValue;
    var equals = opts.compareStructural ? comparer.structural : opts.equals || comparer["default"];
    var r = new Reaction(name, function () {
      if (firstTime || runSync) {
        reactionRunner();
      } else if (!isScheduled) {
        isScheduled = true;
        scheduler(reactionRunner);
      }
    }, opts.onError, opts.requiresObservable);

    function reactionRunner() {
      isScheduled = false;

      if (r.isDisposed_) {
        return;
      }

      var changed = false;
      r.track(function () {
        var nextValue = allowStateChanges(false, function () {
          return expression(r);
        });
        changed = firstTime || !equals(value, nextValue);
        oldValue = value;
        value = nextValue;
      });

      if (firstTime && opts.fireImmediately) {
        effectAction(value, oldValue, r);
      } else if (!firstTime && changed) {
        effectAction(value, oldValue, r);
      }

      firstTime = false;
    }

    if (!((_opts4 = opts) != null && (_opts4$signal = _opts4.signal) != null && _opts4$signal.aborted)) {
      r.schedule_();
    }

    return r.getDisposer_((_opts5 = opts) == null ? undefined : _opts5.signal);
  }

  function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
      try {
        return baseFn.apply(this, arguments);
      } catch (e) {
        errorHandler.call(this, e);
      }
    };
  }

  var ON_BECOME_OBSERVED = "onBO";
  var ON_BECOME_UNOBSERVED = "onBUO";

  function onBecomeObserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_OBSERVED, thing, arg2, arg3);
  }

  function onBecomeUnobserved(thing, arg2, arg3) {
    return interceptHook(ON_BECOME_UNOBSERVED, thing, arg2, arg3);
  }

  function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg3 === "function" ? getAtom(thing, arg2) : getAtom(thing);
    var cb = isFunction(arg3) ? arg3 : arg2;
    var listenersKey = hook + "L";

    if (atom[listenersKey]) {
      atom[listenersKey].add(cb);
    } else {
      atom[listenersKey] = new Set([cb]);
    }

    return function () {
      var hookListeners = atom[listenersKey];

      if (hookListeners) {
        hookListeners["delete"](cb);

        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }

  var NEVER = "never";
  var ALWAYS = "always";
  var OBSERVED = "observed";

  function configure(options) {
    if (options.isolateGlobalState === true) {
      isolateGlobalState();
    }

    var useProxies = options.useProxies,
        enforceActions = options.enforceActions;

    if (useProxies !== undefined) {
      globalState.useProxies = useProxies === ALWAYS ? true : useProxies === NEVER ? false : typeof Proxy !== "undefined";
    }

    if (useProxies === "ifavailable") {
      globalState.verifyProxies = true;
    }

    if (enforceActions !== undefined) {
      var ea = enforceActions === ALWAYS ? ALWAYS : enforceActions === OBSERVED;
      globalState.enforceActions = ea;
      globalState.allowStateChanges = ea === true || ea === ALWAYS ? false : true;
    }

    ["computedRequiresReaction