e = function dispose() {
        _this2.dispose();

        abortSignal == null ? undefined : abortSignal.removeEventListener == null ? undefined : abortSignal.removeEventListener("abort", dispose);
      };

      abortSignal == null ? undefined : abortSignal.addEventListener == null ? undefined : abortSignal.addEventListener("abort", dispose);
      dispose[$mobx] = this;
      return dispose;
    };

    _proto.toString = function toString() {
      return "Reaction[" + this.name_ + "]";
    };

    _proto.trace = fu