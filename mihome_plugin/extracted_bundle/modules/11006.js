r _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));

  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));

  var EventManager = function () {
    function EventManager() {
      (0, _classCallCheck2.default)(this, EventManager);
      this._registry = new Map();
    }

    (0, _createClass2.default)(EventManager, [{
      key: "unsubscribeAll",
      value: function unsubscribeAll() {
        this._registry.clear();
      }
    }, {
      key: "subscribe",
      value: function subscribe(name, handler) {
        var _this = this;

        var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!name || !handler) throw new Error('name and handler are required.');

        this._registry.set(handler, {
      