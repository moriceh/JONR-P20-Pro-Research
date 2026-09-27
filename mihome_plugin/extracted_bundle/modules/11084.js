nsitionValues, transitionState.currentTransitionValues);
            transitionStyle = (0, _objectSpread2.default)({}, transitionStyle, transitionState.transitionStyle);
          }

          return {
            transitionValues: transitionValues,
            currentTransitionValues: currentTransitionValues,
            transitionStyle: transitionStyle
          };
        }
      }, {
        key: "setNativeProps",
        value: function setNativeProps