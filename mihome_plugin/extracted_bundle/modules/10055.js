", "reactionRequiresObservable", "observableRequiresReaction", "disableErrorBoundaries", "safeDescriptors"].forEach(function (key) {
      if (key in options) {
        globalState[key] = !!options[key];
      }
    });
    globalState.allowStateReads = !globalState.observableRequiresReaction;

    if (options.reactionScheduler) {
      setReactionScheduler(options.reactionScheduler);
    }
  }

  function extendObservable(target, properties, annotations, options) {
    var descriptors = getOwnPropertyDescriptors(properties);
    initObservable(function () {
      var adm = asObservableObject