ionStyle;
          var missingKeys = transitionKeys.filter(function (key) {
            return !_this2.state.transitionValues[key];
          });

          if (missingKeys.length) {
            var transitionState = this.initializeTransitionState(missingKeys);
            transitionValues = (0, _objectSpread2.default)({}, transitionValues, transitionState.transitionValues);
            currentTransitionValues = (0, _objectSpread2.default)({}, currentTra