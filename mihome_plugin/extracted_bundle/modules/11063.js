ct.useMemo)(function () {
      var buttons = [];

      if (onCancel) {
        buttons.push({
          type: 'cancel',
          text: cancel,
          callback: onCancel,
          style: (0, _objectSpread2.default)({}, styles.buttons, {
            backgroundColor: _miot.DarkMode.getColorScheme() === 'light' ? '#EAF2F4' : '#363638'
          })
        });
      }

      if (onConfirm) {
        buttons.push({
          type: 'confirm',
          text: confirm,
          callback: onConfirm,
          style: (0, _objectSpread2.default)({}, styles.buttons, {
            backgroundColor: 'xm#2CD5AE'
          })
        });
      }

      return buttons;
    }, [cancel, confirm, onCancel, onC