rvable);
    } else {
      var scheduler = createSchedulerFromOptions(opts);
      var isScheduled = false;
      reaction = new Reaction(name, function () {
        if (!isScheduled) {
          isScheduled = true;
          scheduler(function () {
            isScheduled = false;

            if (!reaction.isDisposed_) {
              reaction.track(reactionRunner);
            }
          });
        }
      }, opts.onError, opts.requiresObservable);
    }

    function reactionRunner() {
      view(reaction);
    }

    if (!((_opts2 = opts) != null && (_opts2$signal = _opts2.signal) != null && _opts2$signal.aborted)) {
      reaction.schedule_();
    }

    return reaction.getDisposer_((_opts3 = opts) == null ? undefined : _opts3.signal);
  }

  var run = function run(f) {
    return f();
  };

  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function (f) {
      return setTimeout(f, opts.delay);
    } : run;
  }

  function reaction(expression, effect, opts) {
    var _opts$name2, _opts4, _opts4$signal, _opts5;

    if (opts === undefined) {
      opts = EMPTY_OBJECT;
    }

    var name = (_opts$name2 = opts.name) != null ? _opts$name2 : "Reaction";
    var effectAction = action(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled