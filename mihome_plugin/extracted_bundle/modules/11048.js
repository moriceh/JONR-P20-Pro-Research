 = _ctx2;
                        break;
                      }
                    }
                  }

                  var hideHandler = function hideHandler(data) {
                    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'global';
                    if (context !== 'global' && currentContext && currentContext !== context) return;
                    sub == null ? undefined : sub.unsubscribe();
                    resolve(data);
                  };

                  var sub = _eventmanager.actionSheetEventManager.subscribe("onclose_" + id, hideHandler);

                  _eventmanager.actionSheetEventManager.publish(isRegisteredWithSheetProvider ? "hide_wrap_" + id : "hide_" + id, options == null ? undefined : options.payload, !isRegisteredWithSheetProvider ? 'global' : currentContext);
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, null, this);
      }
    }, {
      key: "hideAll",
      value: function hideAll(id) {
     