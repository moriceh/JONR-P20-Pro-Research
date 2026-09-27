.setArrayLength_(value);
      }

      if (typeof name === "symbol" || isNaN(name)) {
        target[name] = value;
      } else {
        adm.set_(parseInt(name), value);
      }

      return true;
    },
    preventExtensions: function preventExtensions() {
      die(15);
    }
  };

  var ObservableArrayAdministration = function () {
    function ObservableArrayAdministration(name, enhancer, owned_, legacyMode_) {
      if (name === undefined) {
        name = "ObservableArray";
      }

      this.owned_ = undefined;
      this.legacyMode_ = undefined;
      this.atom_ = undefined;
      this.values_ = [];
      this.interceptors_ = undefined;
      this.changeListeners_ = undefined;
      this.enhancer_ = undefined;
      this.dehancer = undefined;
      this.proxy_ = undefined;
      this.lastKnownLength_ = 0;
      this.owned_ = owned_;
      this.legacyMode_ = legacyMode_;
      this.atom_ = new Atom(name);

      this.enhancer_ = function (newV, oldV) {
        return enhancer(newV, oldV, "ObservableArray[..]");
      };
    }

    var _proto = ObservableArrayAdministration.prototype;

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }

      return value;
    };

    _proto.dehanceValues_ = function dehanceValues_(values) {
      if (this.dehancer !== undefined && values.length > 0) {
        return values.map(this.dehancer);
      }

      return values;
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      if (fireImmediately === undefined) {
        fireImmediately = false;
      }

      if (fireImmediately) {
        listener({
          observableKind: "array",
          object: this.proxy_,
          debugObjectName: this.atom_.name_,
          type: "splice",
          index: 0,
        