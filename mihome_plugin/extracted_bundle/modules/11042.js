             if (_id === id) {
                        isRegisteredWithSheetProvider = true;
                      }
                    }
                  }

                  _eventmanager.actionSheetEventManager.publish(isRegisteredWithSheetProvider ? "show_wrap_" + id : "show_" + id, options == null ? undefined : options.payload, currentContext || 'global');
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        });
      }
    }, {
      key: "hide",
      value: function hide(id, options) {
        var currentContext;
        return _regenerator.default.async(function hide$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                currentContext = this.context(options);
           