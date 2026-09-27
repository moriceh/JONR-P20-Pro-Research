ync = !opts.scheduler && !opts.delay;
    var reaction;

    if (runSync) {
      reaction = new Reaction(name, function () {
        this.track(reactionRunner);
      }, opts.onError, opts.requiresObse