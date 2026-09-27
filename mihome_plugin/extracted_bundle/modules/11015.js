dex > -1) {
            var nextStack = (0, _toConsumableArray2.default)(state);
            nextStack.splice(currentIndex, 1);
            return [].concat((0, _toConsumableArray2.default)(nextStack), [(0, _objectSpread2.default)({}, next, {
              params: params || next.params
            })]);
          }

          onNavigate == null ? undefined : onNavigate(next.name);
          animate(0, 1, 150);
          return [].concat((0, _toConsumableArray2.default)(state), [(0, _objectSpread2.default)({}, next, {
            params: params || next.params
          })]);
        });
      }, 100);
    }, [animate, routes, onNavigate]);

    var initialNavigation = function initialNavigation() {
      if (!routes) return;

      if (initialRoute) {
        var _route = routes == null ? undefined : routes.find(function (rt) {
          return rt.name === initialRoute;
        });

        if (_route) {
          setStack([_route]);
        }
      } else {
        setStack([routes[0]]);
      }

      _reactNative.Animated.timing(routeOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: tru