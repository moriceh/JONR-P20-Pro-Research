onfirmed(observable) {
    if (observable.lowestObserverState_ === IDerivationState_.STALE_) {
      return;
    }

    observable.lowestObserverState_ = IDerivationState_.STALE_;
    observable.observers_.forEach(function (d) {
      if (d.dependenciesState_ === IDerivationState_.POSSIBLY_STALE_) {
        d.dependenciesState_ = IDerivationState_.STALE_;
      } else if (d.dependenciesState_ === IDerivationState_.UP_T