    _this.data_ = new Map();
        _this.hasMap_ = new Map();

        if (initialData) {
          _this.merge(initialData);
        }
      });
    }

    var _proto = ObservableMap.prototype;

    _proto.has_ = function has_(key) {
      return this.data_.has(key);
    };

    _proto.has = function has(key) {
      var _this2 = this;

      if (!globalState.trackingDerivation) {
        return this.has_(key);
      }

      var entry = this.hasMap_.get(key);

      if (!entry) {
        var newEntry = entry = new ObservableValue(this.has_(key), referenceEnhancer, "ObservableMap.key?", false);
        this.hasMap_.set(key, newEntry);
        onBecomeUnobserved(newEntry, function () {
          return _this2.hasMap_["delete"](key);
        });
      }

      return entry.get();
    };

    _proto.set = function set(key, value) {
      var hasKey = this.has_(key);

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          type: hasKey ? UPDATE : ADD,
          object: this,
          newValue: value,
          name: key
        });

        if (!change) {
          return this;
        }

        value = change.newValue;
      }

      if (hasKey) {
        this.updateValue_(key, value);
      } else {
        this.addValue_(key, value);
