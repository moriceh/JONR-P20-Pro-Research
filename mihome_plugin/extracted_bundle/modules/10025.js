O_DATE_) {
          observable.lowestObserverState_ = IDerivationState_.UP_TO_DATE_;
        }
    });
  }

  function propagateMaybeChanged(observable) {
    if (observable.lowestObserverState_ !== IDerivationState_.UP_TO_DATE_) {
      return;
    }

    observable.lowestObserverState_ = IDerivationState_.POSSIBLY_STALE_;
    observable.observers_.forEach(function (d) {
      if (d.dependenciesState_ === IDerivationState_.UP_TO_DATE_) {
        d.dependenciesState_ = IDerivationState_.POSSIBLY_STALE_;
        d.onBecomeStale_();
      }
    });
  }

  function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
      lines.push("(and many more)");
      return;
    }

    lines.push("" + "\t".repeat(depth - 1) + tree.name);

    if (tree.dependencies) {