context ? ids[ids.length - 1] === id + ":" + context : ids[ids.length - 1].startsWith(id);
  }

  function setBaseZIndexForActionSheets(zIndex) {
    baseZindex = zIndex;
  }

  function getZIndexFromStack(id, context) {
    var index = ids.indexOf(id + ":" + context);

    if (index > -1) {
      return baseZindex + index + 1;
    }

    return baseZindex;
  }

  var _SheetManager = function () {
    function _SheetManager() {
      (0, _classCallCheck2.default)(this, _SheetManager);

      this.registerRef = function (id, context, instance) {
        refs[id + ":" + context] = instance;
      };

      this.get = function (id, context) {
        if (!context) {
          for (var _iterator = _provider.providerRegistryStack.reverse(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[typeof Symbol === "function" ? typeof Symbol === "function" ? typeof Symbol === "function" ? Symbol.iterator : "@@iterator" : "@@iterator" : "@@iterator"]();;) {
            var _ref;

            if (_isArray) {
              if (_i >= _iterator.length) break;
              _ref = _iterator[_i++];
            } else {
              _i = _iterator.next();
              if (_i.done) break;
              _ref = _i.value;
            }

            var _ctx = _ref;

            for (var _id in _provider.sheetsRegistry[_ctx]) {
              if (_id === id) {
                context = _ctx;
                break;
              }
            }
          }
        }

        return refs[id + ":" + context];
      };

      this.add = function (id, context) {
        if (ids.indexOf(id) < 0) {
          ids[ids.length] = id + ":" + context;
        }
      };

      this.remove = function (id, context) {
        if (ids.indexOf(id + ":" + context) > -1)