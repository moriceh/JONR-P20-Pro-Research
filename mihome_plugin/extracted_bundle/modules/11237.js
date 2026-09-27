equires a viewName property to be specified.\n    ');
    }

    if (!mockComponent) {
      throw new Error('\n      SafeModule.component(...) requires a mockComponent property to be specified.\n    ');
    }

    var PRIMARY_VIEW_NAME = getPrimaryName(viewName);
    var realViewName = findFirstViewName(viewName);
    var realViewConfig = _reactNative.UIManager[realViewName];

    if (!realViewName || !realViewConfig) {
      return mockComponent;
    }

    var moduleOptions 