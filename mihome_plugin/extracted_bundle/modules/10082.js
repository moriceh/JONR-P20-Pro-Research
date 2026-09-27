   values[index] = newValue;
          this.notifyArrayChildUpdate_(index, newValue, oldValue);
        }
      } else {
        var newItems = new Array(index + 1 - values.length);

        for (var i = 0; i < newItems.length - 1; i++) {
          newItems[i] = undefined;
        }

        newItems[newItems.length - 1] = newValue;
        this.spliceWithArray_(values.length, 0, newItems);
      }
    };

    return ObservableArrayAdministration;
  }();

  function createObservableArray(initialValues, enhancer, name, owned) {
    if (name === undefined) {
      name = "ObservableArray";
    }

    if (owned === undefined) {
      owned = false;
    }

    assertProxies();
    return initObservable(function () {
      var adm = new ObservableArrayAdministration(name, enhancer, owned, false);
      addHiddenFinalProp(adm.values_, $mobx, adm);
      var proxy = new Proxy(adm.values_, arrayTraps);
      adm.proxy_ = proxy;

      if (initialValues && initialValues.length) {
        adm.spliceWithArray_(0, 0, initialValues);
      }

      return proxy;
    });
  }

  var arrayExtensions = {
    clear: function clear() {
      return this.splice(0);
    },
    replace: function replace(newItems) {
      var adm = this[$mobx];
      return adm.spliceWithArray_(0, adm.values_.length, newItems);
    },
    toJSON: function toJSON() {
      return this.slice();
    },
    splice: function splice(index, deleteCount) {
      for (var _len = arguments.length, newItems = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        newItems[_key - 2] = arguments[_key];
      }

      var adm = this[$mobx];

      switch (arguments.length) {
        case 0:
          return [];

        case 1:
          return adm.spliceWithArray_(index);

        case 2:
          return adm.spliceWithArray_(index, deleteCount);
      }

      return adm.spliceWithArray_(index, deleteCount, newItems);
    },
    spliceWithArray: function spliceWithArray(index, deleteCount, newItems) {
      return this[$mobx].spliceWithArray_(index, deleteCount, newItems);
    },
    push: function push() {
      var adm = this[$mobx];

      for (var _len2 = arguments.length, items = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      adm.spliceWithArray_(adm.values_.length, 0, items);
      return adm.values_.length;
    },
    pop: function pop() {
      return this.splice(Math.max(this[$mobx].values_.length - 1, 0), 1)[0];
    },
    shift: function shift() {
      return this.splice(0, 1)[0];
    },
    unshift: function unshift() {
      var adm = this[$mobx];

      for (var _len3 = arguments.length, items = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        items[_key3] = arguments[_key3];
      }

      adm.spliceWithArray_(0, 0, items);
      return adm.values_.length;
    },
    reverse: function reverse() {
      if (globalState.trackingDerivation) {
        die(37, "reverse");
      }

      this.replace(this.slice().reverse());
      return this;
    },
    sort: function sort() {
      if (globalState.trackingDerivation) {
        die(37, "sort");
      }

      var copy = this.slice();
      copy.sort.apply(copy, arguments);
      this.replace(copy);
      return this;
    },
    remove: function remove(value) {
      var adm = this[$mobx];
      var idx = adm.dehanceValues_(adm.values_).indexOf(value);

      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }

      return false;
