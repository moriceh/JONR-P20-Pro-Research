();
  };

  function runReactions() {
    if (globalState.inBatch > 0 || globalState.isRunningReactions) {
      return;
    }

    reactionScheduler(runReactionsHelper);
  }

  function runReactionsHelper() {
    globalState.isRunningReactions = true;
    var allReactions = globalState.pendingReactions;
    var iterations = 0;

    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        allReactions.splice(0);
      }

      var remainingReactions = allReactions.splice(0);

      for (var i = 0, l = remainingReactions.length; i < l; i++) {
        remainingReactions[i].runReaction_();
      }
    }

    globalState.isRunningReactions = false;
  }

  var isReaction = createInstanceofPredicate("Reaction", Reaction);

  function setReactionScheduler(fn) {
    var baseScheduler = reactionScheduler;

    reactionScheduler = function reactionScheduler(f) {
      return fn(function () {
        return baseScheduler(f);
      });
    };
  }

  function isSpyEnabled() {
    return false;
  }

  var END_EVENT = {
    type: "report-end",
    spyReportEnd: true
  };

  function spy(listener) {
    {
      return function () {};
    }
  }

  var ACTION = "action";
  var ACTION_BOUND = "action.bound";
  var AUTOACTION = "autoAction";
  var AUTOACTION_BOUND = "autoAction.bound";
  var DEFAULT_ACTION_NAME = "<unnamed action>";
  var actionAnnotation = createActionAnnotation(ACTION);
  var actionBoundAnnotation = createActionAnnotation(ACTION_BOUND, {
    bound: true
  });
  var autoActionAnnotation = createActionAnnotation(AUTOACTION, {
    autoAction: true
  });
  var autoActionBoundAnnotation = createActionAnnotation(AUTOACTION_BOUND, {
    autoAction: true,
    bound: true
  });

  function createActionFactory(autoAction) {
    var res = function action(arg1, arg2) {
      if (isFunction(arg1)) {
        return createAction(arg1.name || DEFAULT_ACTION_NAME, arg1, autoAction);
      }

      if (isFunction(arg2)) {
        return createAction(arg1, arg2, autoAction);
      }

      if (is20223Decorator(arg2)) {
        return (autoAction ? autoActionAnnotation : actionAnnotation).decorate_20223_(arg1, arg2);
      }

      if (isStringish(arg2)) {
        return storeAnnotation(arg1, arg2, autoAction ? autoActionAnnotation : actionAnnotation);
      }

      if (isStringish(arg1)) {
        return createDecoratorAnnotation(createActionAnnotation(autoAction ? AUTOACTION : ACTION, {
          name: arg1,
          autoAction: autoAction
        }));
      }
    };

    return res;
  }

  var action = createActionFactory(false);
  exports.action = action;
  (0, _extends3.default)(action, actionAnnotation);
  var autoAction = createActionFactory(true);
  exports._autoAction = autoAction;
  (0, _extends3.default)(autoAction, autoActionAnnotation);
  action.bound = createDecoratorAnnotation(actionBoundAnnotation);
  autoAction.bound = createDecoratorAnnotation(autoActionBoundAnnotation);

  function runInAction(fn) {
    return executeAction(fn.name || DEFAULT_ACTION_NAME, false, fn, this, undefined);
  }

  function isAction(thing) {
    return isFunction(thing) && thing.isMobxAction === true;
  }

  function autorun(view, opts) {
    var _opts$name, _opts, _opts2, _opts2$signal, _opts3;

    if (opts === undefined) {
      opts = EMPTY_OBJECT;
    }

    var name = (_opts$name = (_opts = opts) == null ? undefined : _opts.name) != null ? _opts$name : "Autorun";
    var runS