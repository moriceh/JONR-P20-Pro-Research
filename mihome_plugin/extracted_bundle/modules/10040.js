nction trace$1(enterBreakPoint) {
      if (enterBreakPoint === undefined) {
        enterBreakPoint = false;
      }

      trace(this, enterBreakPoint);
    };

    return Reaction;
  }();

  exports.Reaction = Reaction;

  function onReactionError(handler) {
    globalState.globalReactionErrorHandlers.push(handler);
    return function () {
      var idx = globalState.globalReactionErrorHandlers.indexOf(handler);

      if (idx >= 0) {
        globalState.globalReactionErrorHandlers.splice(idx, 1);
      }
    };
  }

  var MAX_REACTION_ITERATIONS = 100;

  var reactionScheduler = function reactionScheduler(f) {
    return f