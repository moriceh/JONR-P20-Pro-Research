 !Sheet) return;
    if (!contexts || contexts.length === 0) contexts = ['global'];

    for (var _i = 0, _contexts = contexts; _i < _contexts.length; _i++) {
      var _context = _contexts[_i];
      var registry = !sheetsRegistry[_context] ? sheetsRegistry[_context] = {} : sheetsRegistry[_context];
      registry[id] = Sheet;

      _eventmanager.actionSheetEventManager.publish(_context + "-on-register");
    }
  }

  function SheetProvider(_ref) {
    var _ref$context = _ref.context,
        context = _ref$context === undefined ? 'global' : _ref$context,
        children = _ref.children;

    var _useReducer = (0, _react.useReducer)(function (x) {
      return x + 1;
    }, 0),
        _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
        forceUpdate = _useReducer2[1];

    var sheetIds = Object.keys(sheetsRegistry[context] || sheetsRegistry['global'] || {});

    var onRegister = _react.default.useCallback(function () {
      forceUpdate();
    }, [forceUpdate]);

    (0, _react.useEffect)(function () {
      providerRegistryStack.indexOf(context) > -1 ? providerRegistryStack.indexOf(context) : providerRegistryStack.push(context) - 1;

      var unsub = _eventmanager.actionSheetEventManager.subscribe(context + "-on-register", onRegister);

      return function () {
        providerRegistryStack.splice(providerRegistryStack.indexOf(context), 1);
        unsub == null ? undefined : unsub.unsubscribe();
      };
    }, [context, onRegister]);

    var renderSheet = function renderSheet(sheetId) {
      return _react.default.createElement(RenderSheet, {
        key: sheetId,
        id: sheetId,
        context: context
      });
    };

    return _react.default.createElement(_react.default.Fragment, null, children, sheetIds.map(renderSheet));
  }

  var ProviderContext = (0, _react.createContext)('global');
  var SheetIDContext = (0, _react.createContext)(undefined);

  var useProviderContext = function useProviderContext() {
    return (0, _react.useContext)(ProviderContext);
  };

  exports.useProviderContext = useProviderContext;

  var useSheetIDContext = function useSheetIDContext() {
    return (0, _react.useContext)(SheetIDContext);
  };

  exports.useSheetIDContext = useSheetIDContext;

  var RenderSheet = function RenderSheet(_ref2) {
    var _sheetsRegistry$globa, _sheetsRegistry$conte;

    var id = _ref2.id,
        context = _ref2.context;

    var _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        payload = _useState2[0],
        setPayload = _useState2[1];

    var _useState3 = (0, _react.useState)(false),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        visible = _useState4[0],
        setVisible = _useState4[1];

    var Sheet = context.startsWith('$$-auto-') ? (_sheetsRegistry$globa = sheetsRegistry.global) == null ? undefined : _sheetsRegistry$globa[id] : sheetsRegistry[context] ? (_sheetsRegistry$conte = sheetsRegistry[context]) == null ? undefined : _sheetsRegistry$conte[id] : undefined;

    var onShow = _react.default.useCallback(function (data) {
      var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
      if (ctx !== context) return;
      setPayload(data);
      setVisible(true);
    }, [context]);

    var onClose = _react.default.useCallback(function (_data) {
      var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
      if (context !== ctx) return;
      setVisible(false);
      setTimeout(function () {
        setPayload(undefined);
      }, 1);
    }, [context]);

    var onHide = _react.default.useCallback(function (data) {
      var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';

      _eventmanager.actionSheetEventManager.publish("hide_" + id, data, ctx);
    }, [id]);

    (0, _react.useEffect)(function () {
      if (visible) {
        _eventmanager.actionSheetEventManager.publish("show_" + id, payload, context);
      }
    }, [context, id, payload, visible]);
    (0, _react.useEffect)(function () {
      var subs = [_eventmanager.actionSheetEventManager.subscribe("show_wrap_" + id, onShow), _eventmanager.actionSheetEventManager.subscribe("onclose_" + id, onClose), _eventmanager.actionSheetEventManager.subscribe("hide_wrap_