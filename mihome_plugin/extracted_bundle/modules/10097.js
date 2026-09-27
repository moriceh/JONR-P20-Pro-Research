      }

      return this;
    };

    _proto["delete"] = function _delete(key) {
      var _this3 = this;

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          name: key
        });

        if (!change) {
          return false;
        }
      }

      if (this.has_(key)) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);

        var _change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: this.data_.get(key).value_,
          name: key
        } : null;

        transaction(function () {
          var _this3$hasMap_$get;

          _this3.keysAtom_.reportChanged();

          (_this3$hasMap_$get = _this3.hasMap_.get(key)) == null ? undefined : _this3$hasMap_$get.setNewValue_(false);

          var observable = _this3.data_.get(key);

          observable.setNewValue_(undefined);

          _this3.data_["delete"](key);
        });

        if (notify) {
          notifyListeners(this, _change);
        }

        return true;
      }

      return false;
    };

    _proto.updateValue_ = function updateValue_(key, newValue) {
      var observable = this.data_.get(key);
      newValue = observable.prepareNewValue_(newValue);

      if (newValue !== globalState.UNCHANGED) {
        var notifySpy = isSpyEnabled();
        var notify = hasListeners(this);
        var change = notify || notifySpy ? {
          observableKind: "map",
          debugObjectName: this.name_,
          type: UPDATE,
          object: this,
          oldValue: observable.value_,
          name: key,
          newValue: newValue
        } : null;
        observable.setNewValue_(newValue);

        if (notify) {
          notifyListeners(this, change);
        }
      }
    };

    _proto.addValue_ = function addValue_(key, newValue) {
      var _this4 = this;

      checkIfStateModificationsAreAllowed(this.keysAtom_);
      transaction(function () {
        var _this4$hasMap_$get;

        var observable = new ObservableValue(newValue, _this4.enhancer_, "ObservableMap.key", false);

        _this4.data_.set(key, observable);

        newValue = observable.value_;
        (_this4$hasMap_$get = _this4.hasMap_.get(key)) == null ? undefined : _this4$hasMap_$get.setNewValue_(true);

        _this4.keysAtom_.reportChanged();
      });
      var notifySpy = isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "map",
        debugObjectName: this.name_,
        type: ADD,
        object: this,
        name: key,
        newValue: newValue
      } : null;

      if (notify) {
        notifyListeners(this, change);
      }
    };

    _proto.get = function get(key) {
      if (this.has(key)) {
        return this.dehanceValue_(this.data_.get(key).get());
      }

      return this.dehanceValue_(undefined);
    };

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }

      return value;
    };

    _proto.keys = function keys() {
      this.keysAtom_.reportObserved();
      return this.data_.keys();
    };

    _proto.values = function values() {
      var self = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next = keys.next(),
              done = _keys$next.done,
              value = _keys$next.value;

          return {
            done: done,
            value: done ? undefined : self.get(value)
          };
        }
      });
    };

    _proto.entries = function entries() {
      var self = this;
      var keys = this.keys();
      return makeIterable({
        next: function next() {
          var _keys$next2 = keys.next(),
              done = _keys$next2.done,
              value = _keys$next2.value;

          return {
            done: done,
            value: done ? undefined : [value, self.get(value)]
          };
        }
      });
    };

    _proto[_Symbol$iterator] = function () {
      return this.entries();
    };

    _proto.forEach = function forEach(callback, thisArg) {
      for (var _iterator = _createForOfIteratorHelperLoose(this), _step; !(_step = _iterator()).done;) {
        var _step$value = _step.value,
            key = _step$value[0],
            value = _step$value[1];
        callback.call(thisArg, value, key, this);
      }
    };

    _proto.merge = function merge(other) {
      var _this5 = this;

      if (isObservableMap(other)) {
        other = new Map(other);
      }

      transaction(function () {
        if (isPlainObject(other)) {
          getPlainObjectKeys(other).forEach(function (key) {
            return _this5.set(key, other[key]);
          });
        } else if (Array.isArray(other)) {
          other.forEach(function (_ref) {
            var key = _ref[0],
                value = _ref[1];
            return _this5.set(key, value);
          });
        } else if (isES6Map(other)) {
          if (other.constructor !== Map) {
            die(19, other);
          }

          other.forEach(function (value, key) {
            return _this5.set(key, value);
          });
        } else if (other !== null && other !== undefined) {
          die(20, other);
        }
      });
      return this;
    };

    _proto.clear = function clear() {
      var _this6 = this;

      transaction(function () {
        untracked(function () {
          for (var _iterator2 = _createForOfIteratorHelperLoose(_this6.keys()), _step2; !(_step2 = _iterator2()).done;) {
            var key = _step2.value;

            _this6["delete"](key);
          }
        });
      });
    };

    _proto.replace = function replace(values) {
      var _this7 = this;

      transaction(function () {
        var replacementMap = convertToMap(values);
        var orderedData = new Map();
        var keysReportChangedCalled = false;

        for (var _iterator3 = _createForOfIteratorHelperLoose(_this7.data_.keys()), _step3; !(_step3 = _iterator3()).done;) {
          var key = _step3.value;

          if (!replacementMap.has(key)) {
            var deleted = _this7["delete"](key);

            if (deleted) {
              keysReportChangedCalled = true;
            } else {
              var value = _this7.data_.get(key);

              orderedData.set(key, value);
            }
          }
        }

        for (var _iterator4 = _createForOfIteratorHelperLoose(replacementMap.entries()), _step4; !(_step4 = _iterator4()).done;) {
          var _step4$value = _step4.value,
              _key = _step4$value[0],
              _value = _step4$value[1];

          var keyExisted = _this7.data_.has(_key);

          _this7.set(_key, _value);

          if (_this7.data_.has(_key)) {
            var _value2 = _this7.data_.get(_key);

            orderedData.set(_key, _value2);

            if (!keyExisted) {
              keysReportChangedCalled = true;
            }
          }
        }

        if (!keysReportChangedCalled) {
          if (_this7.data_.size !== orderedData.size) {
            _this7.keysAtom_.reportChanged();
          } else {
            var iter1 = _this7.data_.keys();

            var iter2 = orderedData.keys();
            var next1 = iter1.next();
            var next2 = iter2.next();

            while (!next1.done) {
              if (next1.value !== next2.value) {
                _this7.keysAtom_.reportChanged();

                break;
              }

              next1 = iter1.next();
              next2 = iter2.next();
            }
          }
        }

        _this7.data_ = orderedData;
      });
      return this;
    };

    _proto.toString = function toString() {
      return "[object ObservableMap]";
    };

    _proto.toJSON = function toJSON() {
      return Array.from(this);
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      return registerListener(this, listener);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _createClass(ObservableMap, [{
      key: "size",
      get: function get() {
        this.keysAtom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag,
      get: function get() {
        return "Map";
      }
    }]);

    return ObservableMap;
  }();

  exports.ObservableMap = ObservableMap;
  var isObservableMap = createInstanceofPredicate("ObservableMap", ObservableMap);
  exports.isObservableMap = isObservableMap;

  function convertToMap(dataStructure) {
    if (isES6Map(dataStructure) || isObservableMap(dataStructure)) {
      return dataStructure;
    } else if (Array.isArray(dataStructure)) {
      return new Map(dataStructure);
    } else if (isPlainObject(dataStructure)) {
      var map = new Map();

      for (var key in dataStructure) {
        map.set(key, dataStructure[key]);
      }

      return map;
    } else {
      return die(21, dataStructure);
    }
  }

  var _Symbol$iterator$1, _Symbol$toStringTag$1;

  var ObservableSetMarker = {};
  _Symbol$iterator$1 = Symbol.iterator;
  _Symbol$toStringTag$1 = Symbol.toStringTag;

  var ObservableSet = function () {
    function ObservableSet(initialData, enhancer, name_) {
      var _this = this;

      if (enhancer === undefined) {
        enhancer = deepEnhancer;
      }

      if (name_ === undefined) {
        name_ = "ObservableSet";
      }

      this.name_ = undefined;
      this[$mobx] = ObservableSetMarker;
      this.data_ = new Set();
      this.atom_ = undefined;
      this.changeListeners_ = undefined;
      this.interceptors_ = undefined;
      this.dehancer = undefined;
      this.enhancer_ = undefined;
      this.name_ = name_;

      if (!isFunction(Set)) {
        die(22);
      }

      this.enhancer_ = function (newV, oldV) {
        return enhancer(newV, oldV, name_);
      };

      initObservable(function () {
        _this.atom_ = createAtom(_this.name_);

        if (initialData) {
          _this.replace(initialData);
        }
      });
    }

    var _proto = ObservableSet.prototype;

    _proto.dehanceValue_ = function dehanceValue_(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }

      return value;
    };

    _proto.clear = function clear() {
      var _this2 = this;

      transaction(function () {
        untracked(function () {
          for (var _iterator = _createForOfIteratorHelperLoose(_this2.data_.values()), _step; !(_step = _iterator()).done;) {
            var value = _step.value;

            _this2["delete"](value);
          }
        });
      });
    };

    _proto.forEach = function forEach(callbackFn, thisArg) {
      for (var _iterator2 = _createForOfIteratorHelperLoose(this), _step2; !(_step2 = _iterator2()).done;) {
        var value = _step2.value;
        callbackFn.call(thisArg, value, value, this);
      }
    };

    _proto.add = function add(value) {
      var _this3 = this;

      checkIfStateModificationsAreAllowed(this.atom_);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: ADD,
          object: this,
          newValue: value
        });

        if (!change) {
          return this;
        }
      }

      if (!this.has(value)) {
        transaction(function () {
          _this3.data_.add(_this3.enhancer_(value, undefined));

          _this3.atom_.reportChanged();
        });
        var notifySpy = false;
        var notify = hasListeners(this);

        var _change = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: ADD,
          object: this,
          newValue: value
        } : null;

        if (notify) {
          notifyListeners(this, _change);
        }
      }

      return this;
    };

    _proto["delete"] = function _delete(value) {
      var _this4 = this;

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: DELETE,
          object: this,
          oldValue: value
        });

        if (!change) {
          return false;
        }
      }

      if (this.has(value)) {
        var notifySpy = false;
        var notify = hasListeners(this);

        var _change2 = notify || notifySpy ? {
          observableKind: "set",
          debugObjectName: this.name_,
          type: DELETE,
          object: this,
          oldValue: value
        } : null;

        transaction(function () {
          _this4.atom_.reportChanged();

          _this4.data_["delete"](value);
        });

        if (notify) {
          notifyListeners(this, _change2);
        }

        return true;
      }

      return false;
    };

    _proto.has = function has(value) {
      this.atom_.reportObserved();
      return this.data_.has(this.dehanceValue_(value));
    };

    _proto.entries = function entries() {
      var nextIndex = 0;
      var keys = Array.from(this.keys());
      var values = Array.from(this.values());
      return makeIterable({
        next: function next() {
          var index = nextIndex;
          nextIndex += 1;
          return index < values.length ? {
            value: [keys[index], values[index]],
            done: false
          } : {
            done: true
          };
        }
      });
    };

    _proto.keys = function keys() {
      return this.values();
    };

    _proto.values = function values() {
      this.atom_.reportObserved();
      var self = this;
      var nextIndex = 0;
      var observableValues = Array.from(this.data_.values());
      return makeIterable({
        next: function next() {
          return nextIndex < observableValues.length ? {
            value: self.dehanceValue_(observableValues[nextIndex++]),
            done: false
          } : {
            done: true
          };
        }
      });
    };

    _proto.replace = function replace(other) {
      var _this5 = this;

      if (isObservableSet(other)) {
        other = new Set(other);
      }

      transaction(function () {
        if (Array.isArray(other)) {
          _this5.clear();

          other.forEach(function (value) {
            return _this5.add(value);
          });
        } else if (isES6Set(other)) {
          _this5.clear();

          other.forEach(function (value) {
            return _this5.add(value);
          });
        } else if (other !== null && other !== undefined) {
          die("Cannot initialize set from " + other);
        }
      });
      return this;
    };

    _proto.observe_ = function observe_(listener, fireImmediately) {
      return registerListener(this, listener);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.toJSON = function toJSON() {
      return Array.from(this);
    };

    _proto.toString = function toString() {
      return "[object ObservableSet]";
    };

    _proto[_Symbol$iterator$1] = function () {
      return this.values();
    };

    _createClass(ObservableSet, [{
      key: "size",
      get: function get() {
        this.atom_.reportObserved();
        return this.data_.size;
      }
    }, {
      key: _Symbol$toStringTag$1,
      get: function get() {
        return "Set";
      }
    }]);

    return ObservableSet;
  }();

  exports.ObservableSet = ObservableSet;
  var isObservableSet = createInstanceofPredicate("ObservableSet", ObservableSet);
  exports.isObservableSet = isObservableSet;
  var descriptorCache = Object.create(null);
  var REMOVE = "remove";

  var ObservableObjectAdministration = function () {
    function ObservableObjectAdministration(target_, values_, name_, defaultAnnotation_) {
      if (values_ === undefined) {
        values_ = new Map();
      }

      if (defaultAnnotation_ === undefined) {
        defaultAnnotation_ = autoAnnotation;
      }

      this.target_ = undefined;
      this.values_ = undefined;
      this.name_ = undefined;
      this.defaultAnnotation_ = undefined;
      this.keysAtom_ = undefined;
      this.changeListeners_ = undefined;
      this.interceptors_ = undefined;
      this.proxy_ = undefined;
      this.isPlainObject_ = undefined;
      this.appliedAnnotations_ = undefined;
      this.pendingKeys_ = undefined;
      this.target_ = target_;
      this.values_ = values_;
      this.name_ = name_;
      this.defaultAnnotation_ = defaultAnnotation_;
      this.keysAtom_ = new Atom("ObservableObject.keys");
      this.isPlainObject_ = isPlainObject(this.target_);
    }

    var _proto = ObservableObjectAdministration.prototype;

    _proto.getObservablePropValue_ = function getObservablePropValue_(key) {
      return this.values_.get(key).get();
    };

    _proto.setObservablePropValue_ = function setObservablePropValue_(key, newValue) {
      var observable = this.values_.get(key);

      if (observable instanceof ComputedValue) {
        observable.set(newValue);
        return true;
      }

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: UPDATE,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: newValue
        });

        if (!change) {
          return null;
        }

        newValue = change.newValue;
      }

      newValue = observable.prepareNewValue_(newValue);

      if (newValue !== globalState.UNCHANGED) {
        var notify = hasListeners(this);
        var notifySpy = false;

        var _change = notify || notifySpy ? {
          type: UPDATE,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          oldValue: observable.value_,
          name: key,
          newValue: newValue
        } : null;

        observable.setNewValue_(newValue);

        if (notify) {
          notifyListeners(this, _change);
        }
      }

      return true;
    };

    _proto.get_ = function get_(key) {
      if (globalState.trackingDerivation && !hasProp(this.target_, key)) {
        this.has_(key);
      }

      return this.target_[key];
    };

    _proto.set_ = function set_(key, value, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      if (hasProp(this.target_, key)) {
        if (this.values_.has(key)) {
          return this.setObservablePropValue_(key, value);
        } else if (proxyTrap) {
          return Reflect.set(this.target_, key, value);
        } else {
          this.target_[key] = value;
          return true;
        }
      } else {
        return this.extend_(key, {
          value: value,
          enumerable: true,
          writable: true,
          configurable: true
        }, this.defaultAnnotation_, proxyTrap);
      }
    };

    _proto.has_ = function has_(key) {
      if (!globalState.trackingDerivation) {
        return key in this.target_;
      }

      this.pendingKeys_ || (this.pendingKeys_ = new Map());
      var entry = this.pendingKeys_.get(key);

      if (!entry) {
        entry = new ObservableValue(key in this.target_, referenceEnhancer, "ObservableObject.key?", false);
        this.pendingKeys_.set(key, entry);
      }

      return entry.get();
    };

    _proto.make_ = function make_(key, annotation) {
      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }

      if (annotation === false) {
        return;
      }

      assertAnnotable(this, annotation, key);

      if (!(key in this.target_)) {
        var _this$target_$storedA;

        if ((_this$target_$storedA = this.target_[storedAnnotationsSymbol]) != null && _this$target_$storedA[key]) {
          return;
        } else {
          die(1, annotation.annotationType_, this.name_ + "." + key.toString());
        }
      }

      var source = this.target_;

      while (source && source !== objectPrototype) {
        var descriptor = getDescriptor(source, key);

        if (descriptor) {
          var outcome = annotation.make_(this, key, descriptor, source);

          if (outcome === 0) {
              return;
            }

          if (outcome === 1) {
              break;
            }
        }

        source = Object.getPrototypeOf(source);
      }

      recordAnnotationApplied(this, annotation, key);
    };

    _proto.extend_ = function extend_(key, descriptor, annotation, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      if (annotation === true) {
        annotation = this.defaultAnnotation_;
      }

      if (annotation === false) {
        return this.defineProperty_(key, descriptor, proxyTrap);
      }

      assertAnnotable(this, annotation, key);
      var outcome = annotation.extend_(this, key, descriptor, proxyTrap);

      if (outcome) {
        recordAnnotationApplied(this, annotation, key);
      }

      return outcome;
    };

    _proto.defineProperty_ = function defineProperty_(key, descriptor, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      try {
        startBatch();
        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          return deleteOutcome;
        }

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: descriptor.value
          });

          if (!change) {
            return null;
          }

          var newValue = change.newValue;

          if (descriptor.value !== newValue) {
            descriptor = _extends({}, descriptor, {
              value: newValue
            });
          }
        }

        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }

        this.notifyPropertyAddition_(key, descriptor.value);
      } finally {
        endBatch();
      }

      return true;
    };

    _proto.defineObservableProperty_ = function defineObservableProperty_(key, value, enhancer, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      try {
        startBatch();
        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          return deleteOutcome;
        }

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: value
          });

          if (!change) {
            return null;
          }

          value = change.newValue;
        }

        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: true,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };

        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }

        var observable = new ObservableValue(value, enhancer, "ObservableObject.key", false);
        this.values_.set(key, observable);
        this.notifyPropertyAddition_(key, observable.value_);
      } finally {
        endBatch();
      }

      return true;
    };

    _proto.defineComputedProperty_ = function defineComputedProperty_(key, options, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      try {
        startBatch();
        var deleteOutcome = this.delete_(key);

        if (!deleteOutcome) {
          return deleteOutcome;
        }

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            object: this.proxy_ || this.target_,
            name: key,
            type: ADD,
            newValue: undefined
          });

          if (!change) {
            return null;
          }
        }

        options.name || (options.name = "ObservableObject.key");
        options.context = this.proxy_ || this.target_;
        var cachedDescriptor = getCachedObservablePropDescriptor(key);
        var descriptor = {
          configurable: globalState.safeDescriptors ? this.isPlainObject_ : true,
          enumerable: false,
          get: cachedDescriptor.get,
          set: cachedDescriptor.set
        };

        if (proxyTrap) {
          if (!Reflect.defineProperty(this.target_, key, descriptor)) {
            return false;
          }
        } else {
          defineProperty(this.target_, key, descriptor);
        }

        this.values_.set(key, new ComputedValue(options));
        this.notifyPropertyAddition_(key, undefined);
      } finally {
        endBatch();
      }

      return true;
    };

    _proto.delete_ = function delete_(key, proxyTrap) {
      if (proxyTrap === undefined) {
        proxyTrap = false;
      }

      checkIfStateModificationsAreAllowed(this.keysAtom_);

      if (!hasProp(this.target_, key)) {
        return true;
      }

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_ || this.target_,
          name: key,
          type: REMOVE
        });

        if (!change) {
          return null;
        }
      }

      try {
        var _this$pendingKeys_, _this$pendingKeys_$ge;

        startBatch();
        var notify = hasListeners(this);
        var notifySpy = false;
        var observable = this.values_.get(key);
        var value = undefined;

        if (!observable && (notify || notifySpy)) {
          var _getDescriptor;

          value = (_getDescriptor = getDescriptor(this.target_, key)) == null ? undefined : _getDescriptor.value;
        }

        if (proxyTrap) {
          if (!Reflect.deleteProperty(this.target_, key)) {
            return false;
          }
        } else {
          delete this.target_[key];
        }

        if (observable) {
          this.values_["delete"](key);

          if (observable instanceof ObservableValue) {
            value = observable.value_;
          }

          propagateChanged(observable);
        }

        this.keysAtom_.reportChanged();
        (_this$pendingKeys_ = this.pendingKeys_) == null ? undefined : (_this$pendingKeys_$ge = _this$pendingKeys_.get(key)) == null ? undefined : _this$pendingKeys_$ge.set(key in this.target_);

        if (notify || notifySpy) {
          var _change2 = {
            type: REMOVE,
            observableKind: "object",
            object: this.proxy_ || this.target_,
            debugObjectName: this.name_,
            oldValue: value,
            name: key
          };

          if (notify) {
            notifyListeners(this, _change2);
          }
        }
      } finally {
        endBatch();
      }

      return true;
    };

    _proto.observe_ = function observe_(callback, fireImmediately) {
      return registerListener(this, callback);
    };

    _proto.intercept_ = function intercept_(handler) {
      return registerInterceptor(this, handler);
    };

    _proto.notifyPropertyAddition_ = function notifyPropertyAddition_(key, value) {
      var _this$pendingKeys_2, _this$pendingKeys_2$g;

      var notify = hasListeners(this);
      var notifySpy = false;

      if (notify || notifySpy) {
        var change = notify || notifySpy ? {
          type: ADD,
          observableKind: "object",
          debugObjectName: this.name_,
          object: this.proxy_ || this.target_,
          name: key,
          newValue: value
   