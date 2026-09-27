e
      }).start();
    };

    var goBack = function goBack(name, snap) {
      getRef == null ? undefined : getRef().snapToRelativeOffset(snap || -10);
      animate(snap || -10, 0);
      setTimeout(function () {
        setStack(function (state) {
          var next = routes == null ? undefined : routes.find(function (route) {
            return route.name === name;
          });

          if (state.length === 1) {
            close();
            animate(0, 1);
            return state;
          }

          if (!next) {
            var nextStack = (0, _toConsumableArray2.default)(state);
            nextStack.pop();

            if (currentRoute) {
              var _nextStack;

              onNavigateBack == null ? undefined : onNavigateBack((_nextStack = nextStack[nextStack.length - 1]) == null ? undefined : _nextStack.name);
              animate(0, 1, 150);
            }

            return nextStack;
          }

          var currentIndex = stack.findIndex(function (route) {
            return route.name === next.name;
          });

          if (currentIndex > -1) {
            var _nextStack3;

            var _nextStack2 = (0, _toConsumableArray2.default)(state);

            _nextStack2.splice(currentIndex);

            onNavigateBack == null ? undefined : onNavigateBack((_nextStack3 = _nextStack2[_nextStack2.length - 1]) == null ? undefined : _nextStack3.name);
            animate(0, 1, 150);
            return [].concat((0, _toConsumableArray2.default)(_nextStack2), [next]);
          }

          animate(0, 1, 150);
          onNavigateBack == null ? undefined : onNavigateBack(next.name);
          return [].concat((0, _toConsumableArray2.default)(stack), [next]);
        });
      }, 100);
    };

    var close = function close() {
      var _getRef;

      getRef == null ? undefined : (_getRef = getRef()) == null ? undefined : _getRef.hide();
    };

    var popToTop = function popToTop() {
      if (!stack[0]) {
        return;
      }

      goBack(stack[0].name);
    };

    var canGoBack = function canGoBack() {
      return stack && stack.length > 1;
    };

    return {
      currentRoute: currentRoute,
      navigate: navigate,
      goBack: goBack,
      close: close,
      popToTop: popToTop,
      hasRoutes: function hasRoutes() {
        return routes && routes.length > 0;
      },
      stack: stack,
      initialNavigation: initialNavigation,
      canGoBack: canGoBack
