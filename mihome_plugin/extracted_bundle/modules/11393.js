y: store.notDust === 1 ? true : false
        }, {
          key: 2,
          type: 'choice',
          title: _multilingual.default == null ? undefined : _multilingual.default.keyword466,
          selectedKey: store.notDry === 1 ? true : false
        }]
      })));
    });
    return _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return _react.default.createElement(_reactNative.View, {
        style: styles.carpet
      }, _react