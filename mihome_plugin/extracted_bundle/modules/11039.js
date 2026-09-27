 {
          ids.splice(ids.indexOf(id + ":" + context));
        }
      };
    }

    (0, _createClass2.default)(_SheetManager, [{
      key: "context",
      value: function context(options) {
        var _options;

        if (!options) options = {};

        if (!((_options = options) == null ? undefined : _options.context)) {
          options.context = _provider.providerRegistryStack[_provider.providerRegistryStack.length - 1];
        }

        return options.context;
      }
    }, {
      key: "show",
      value: function show(id, options) {
        var _this = this;

        return _regenerator.default.async(function show$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  var currentContext = _this.context(options);

                  var handler = function handler(data) {
                    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
                    if (context !== 'global' && currentContext && currentContext !== context) return;
                    options == null ? undefined : options.onClose == null ? undefined : options.onClose(data);
                    sub == null ? undefined : sub.unsubscribe();
                    resolve(data);
                  };

                  var sub = _eventmanager.actionSheetEventManager.subscribe("onclose_" + id, handler);

                  var isRegisteredWithSheetProvider = false;

                  for (var ctx in _provider.sheetsRegistry) {
                    for (var _id in _provider.sheetsRegistry[ctx]) {
         