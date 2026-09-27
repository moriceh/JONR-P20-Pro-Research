Extension("flatMap", mapLikeFunc);
  addArrayExtension("forEach", mapLikeFunc);
  addArrayExtension("map", mapLikeFunc);
  addArrayExtension("some", mapLikeFunc);
  addArrayExtension("toReversed", mapLikeFunc);
  addArrayExtension("reduce", reduceLikeFunc);
  addArrayExtension("reduceRight", reduceLikeFunc);

  function addArrayExtension(funcName, funcFactory) {
    if (typeof Array.prototype[funcName] === "function") {
      arrayExtensions[funcName] = funcFactory(funcName);
    }
  }

  function simpleFunc(funcName) {
    return function () {
      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }

  function mapLikeFunc(funcName) {
    return function (callback, thisArg) {
      var _this2 = this;

      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      return dehancedValues[funcName](function (element, index) {
        return callback.call(thisArg, element, index, _this2);
      });
    };
  }

  function reduceLikeFunc(funcName) {
    return function () {
      var _this3 = this;

      var adm = this[$mobx];
      adm.atom_.reportObserved();
      var dehancedValues = adm.dehanceValues_(adm.values_);
      var callback = arguments[0];

      arguments[0] = function (accumulator, currentValue, index) {
        return callback(accumulator, currentValue, index, _this3);
      };

      return dehancedValues[funcName].apply(dehancedValues, arguments);
    };
  }

  var isObservableArrayAdministration = createInstanceofPredicate("ObservableArrayAdministration", ObservableArrayAdministration);

  function isObservableArray(thing) {
    return isObject(thing) && isObservableArrayAdministration(thing[$mobx]);
  }

  var _Symbol$iterator, _Symbol$toStringTag;

  var ObservableMapMarker = {};
  var ADD = "add";
  var DELETE = "delete";
  _Symbol$iterator = Symbol.iterator;
  _Symbol$toStringTag = Symbol.toStringTag;

  var ObservableMap = function () {
    function ObservableMap(initialData, enhancer_, name_) {
      var _this = this;

      if (enhancer_ === undefined) {
        enhancer_ = deepEnhancer;
      }

      if (name_ === undefined) {
        name_ = "ObservableMap";
      }

      this.enhancer_ = undefined;
      this.name_ = undefined;
      this[$mobx] = ObservableMapMarker;
      this.data_ = undefined;
      this.hasMap_ = undefined;
      this.keysAtom_ = undefined;
      this.interceptors_ = undefined;
      this.changeListeners_ = undefined;
      this.dehancer = undefined;
      this.enhancer_ = enhancer_;
      this.name_ = name_;

      if (!isFunction(Map)) {
        die(18);
      }

      initObservable(function () {
        _this.keysAtom_ = createAtom("ObservableMap.keys()");
    