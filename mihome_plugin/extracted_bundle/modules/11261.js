tore.setLanguageVersion(value);
          }
        });
      }

      commonStore.showLoading();

      _resourceManager.manager.getSpec(specs).then(function () {
        commonStore.hideLoading();
      });
    }, []);

    var exeCmd = function exeCmd(task, extraTask) {
      var loadingMessage,
          errorMessage,
          res,
          _args = arguments;
      return _regenerator.default.async(function exeCmd$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              loadingMessage = _args.length > 2 && _args[2] !== undefined ? _args[2] : _multilingual.default.keyword474;
              errorMessage = _args.length > 3 && _args[3] !== undefined ? _args[3] : _multilingual.default.keyword326;

              if (isConnected) {
                _context.next = 5;
                break;
              }

              commonStore.showToast(_multilingual.default.keyword321);
              return _context.abrupt("return", false);

            case 5:
              commonStore.showLoading(loadingMessage);
              _context.prev = 6;
              _context.next = 9;
              return _regenerator.default.awrap(task());

            case 9:
              res = _context.sent;

              if (!res) {
                _context.next = 19;
                break;
              }

              _context.t0 = extraTask;

              if (!_context.t0) {
                _context.next = 15;
                break;
              }

              _context.next = 15;
              return _regenerator.default.awrap(extraTask());

            case 15:
              commonStore.hideLoading();
              return _context.abrupt("return", true);

            case 19:
              throw new Error("actions\u53D1\u9001\u5931\u8D25:");

            case 20:
              _context.next = 27;
              break;

            case 22:
              _cont