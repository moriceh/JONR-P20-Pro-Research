             _context3.next = 21;
              break;

            case 11:
              _context3.prev = 11;
              _context3.next = 14;
              return _regenerator.default.awrap((0, _KS3Cloud.getMapFileContent)(fileName));

            case 14:
              obj = _context3.sent;

              if (!(0, _is.isNull)(obj == null ? undefined : obj.mapId) && !(0, _is.isNull)(obj == null ? undefined : obj.fields[0])) {
                mapStore.setCurMapInfo(obj);
              }

              _context3.next = 21;
              break;

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](11);

              _logger.default.e("清洁顺序-更新的地图列表数据 error:", _context3.t0);

            case 21:
              commonStore.hideLoading();

            case 22:
              _context3.next = 28;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t1 = _context3["catch"](0);
              commonStore.hideLoading(_multilingual.default.keyword326);

              _logger.default.e('清洁顺序-拉取地图更新事件错误', _context3.t1);

            case 28:
            case "end":
              return _context3.stop();
          }
        }
      }, null, null, [[0, 24], [11, 18]]);
    }, []);

    (0, _react.useEffect)(function () {
      var disposer = (0, _mobx.autorun)(function () {
        navigation.setParams({
          titleProps: {
            titleStyle: {
              fontSize: (_multilingual.default == null ? undefined : _multilingual.default.keyword125.length) >= 21 ? (0, _screenAdapte.pText)(14) : (0, _screenAdapte.pText)(20)
            },
            leftPress: store.isChange ? function () {
              commonStore.showMessageDialog({
                message: _multilingual.default == null ? undefined : _multilingual.default.keyword76,
                canDismiss: false,
                onCancel: function onCancel() {},
                onConfirm: function onConfirm() {
                  props.navigation.goBack();
                }
              });
            } : null,
            right: [{
              key: _NavigationBar.default.ICON.COMPLETE,
              onPress: function onPress() {
                function delay(ms) {
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, ms);
                  });
 