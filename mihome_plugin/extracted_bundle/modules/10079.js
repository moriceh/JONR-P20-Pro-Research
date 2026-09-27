this.lastKnownLength_ += delta;

      if (this.legacyMode_ && delta > 0) {
        reserveArrayBuffer(oldLength + delta + 1);
      }
    };

    _proto.spliceWithArray_ = function spliceWithArray_(index, deleteCount, newItems) {
      var _this = this;

      checkIfStateModificationsAreAllowed(this.atom_);
      var length = this.values_.length;

      if (index === undefined) {
        index = 0;
      } else if (index > length) {
        index = length;
      } else if (index < 0) {
        index = Math.max(0, length + index);
      }

      if (arguments.length === 1) {
        deleteCount = length - index;
      } else if (deleteCount === undefined || deleteCount === null) {
        deleteCount = 0;
      } else {
        deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      }

      if (newItems === undefined) {
        newItems = EMPTY_ARRAY;
      }

      if (hasInterceptors(this)) {
        var change = interceptChange(this, {
          object: this.proxy_,
          type: SPLICE,
          index: index,
          removedCount: deleteCount,
          added: newItems
        });

        if (!change) {
          return EMPTY_ARRAY;
        }

        deleteCount = change.removedCount;
        newItems = change.added;
      }

      newItems = newItems.length === 0 ? newItems : newItems.map(function (v) {
        return _this.enhancer_(v, undefined);
      });

      if (this.legacyMode_ || false) {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength_(length, lengthDelta);
      }

      var res = this.spliceItemsIntoValues_(index, deleteCount, newItems);

      if (deleteCount !== 0 || newItems.length !== 0) {
        this.notifyArraySplice_(index, newItems, res);
      }

      return this.dehanceValues_(res);
    };

    _proto.spliceItemsIntoValues_ = function spliceItemsIntoValues_(index, deleteCount, newItems) {
      if (newItems.length < MAX_SPLICE_SIZE) {
        var _this$values_;

        return (_this$values_ = this.values_).splice.apply(_this$values_, [index, deleteCount].concat(newItems));
      } else {
        var res = this.values_.slice(index, index + deleteCount);
        var oldItems = this.values_.slice(index + deleteCount);
        this.values_.length += newItems.length - deleteCount;

        for (var i = 0; i < newItems.length; i++) {
          this.values_[index + i] = newItems[i];
        }

        for (var _i = 0; _i < oldItems.length; _i++) {
          this.values_[index + newItems.length + _i] = oldItems[_i];
        }

        return res;
      }
    };

    _proto.notifyArrayChildUpdate_ = function notifyArrayChildUpdate_(index, newValue, oldValue) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        type: UPDATE,
        debugObjectName: this.atom_.name_,
        index: index,
        newValue: newValue,
        oldValue: oldValue
      } : null;
      this.atom_.reportChanged();

      if (notify) {
        notifyListeners(this, change);
      }
    };

    _proto.notifyArraySplice_ = function notifyArraySplice_(index, added, removed) {
      var notifySpy = !this.owned_ && isSpyEnabled();
      var notify = hasListeners(this);
      var change = notify || notifySpy ? {
        observableKind: "array",
        object: this.proxy_,
        debugObjectName: this.atom_.name_,
        type: SPLICE,
        index: index,
        removed: removed,
        added: added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      this.atom_.reportChanged();

      if (notify) {
        notifyListeners(this, change);
      }
    };

    _proto.get_ = function get_(index) {
      if (this.legacyMode_ && index >= this.values_.length) {
        return undefined;
      }

      this.atom_.reportObserved();
      return this.dehanceValue_(this.values_[index]);
    };

    _proto.set_ = function set_(index, newValue) {
      var values = this.values_;

      if (this.legacyMode_ && index > values.length) {
        die(17, index, values.length);
      }

      if (index < values.length) {
        checkIfStateModificationsAreAllowed(this.atom_);
        var oldValue = values[index];

        if (hasInterceptors(this)) {
          var change = interceptChange(this, {
            type: UPDATE,
            object: this.proxy_,
            index: index,
            newValue: newValue
          });

          if (!change) {
            return;
          }

          newValue = change.newValue;
        }

        newValue = this.enhancer_(newValue, oldValue);
        var changed = newValue !== oldValue;

        if (changed) {
       