
      tree.dependencies.forEach(function (child) {
        return printDepTree(child, lines, depth + 1);
      });
    }
  }

  var Reaction = function () {
    function Reaction(name_, onInvalidate_, errorHandler_, requiresObservable_) {
      if (name_ === undefined) {
        name_ = "Reaction";
      }

      this.name_ = undefined;
      this.onInvalidate_ = undefined;
      th