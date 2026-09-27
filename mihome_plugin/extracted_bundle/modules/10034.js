;
      });
    };

    _proto.dispose = function dispose() {
      if (!this.isDisposed_) {
        this.isDisposed_ = true;

        if (!this.isRunning_) {
          startBatch();
          clearObserving(this);
          endBatch();
        }
      }
    };

    _proto.getDisposer_ = function getDisposer_(abortSignal) {
      var _this2 = this;

      var dispos