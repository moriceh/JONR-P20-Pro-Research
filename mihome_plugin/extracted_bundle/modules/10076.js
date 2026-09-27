  added: this.values_.slice(),
          addedCount: this.values_.length,
          removed: [],
          removedCount: 0
        });
      }

      return registerListener(this, listener);
    };

    _proto.getArrayLength_ = function getArrayLength_() {
      this.atom_.reportObserved();
      return this.values_.length;
    };

    _proto.setArrayLength_ = function setArrayLength_(newLength) {
      if (typeof newLength !== "number" || isNaN(newLength) || newLength < 0) {
        die("Out of range: " + newLength);
      }

      var currentLength = this.values_.length;

      if (newLength === currentLength) {
        return;
      } else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);

        for (var i = 0; i < newLength - currentLength; i++) {
          newItems[i] = undefined;
        }

        this.spliceWithArray_(currentLength, 0, newItems);
      } else {
        this.spliceWithArray_(newLength, currentLength - newLength);
      }
    };

    _proto.updateArrayLength_ = function updateArrayLength_(oldLength, delta) {
      if (oldLength !== this.lastKnownLength_) {
        die(16);
      }

      