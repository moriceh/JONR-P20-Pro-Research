t = dimensions.height) == null ? undefined : _dimensions$height.toFixed(0)) && (width == null ? undefined : width.toFixed(0)) === dimensions.width.toFixed(0) && dimensions.portrait === isPortraitMode) {
          return;
        }

        setDimensions({
          width: isPortraitMode ? width : height,
          height: isPortraitMode ? height : width,
          portrait: isPortraitMode
        });
      });
      clearTimeout(onDeviceLayoutReset.current.timer);

      if (safeAreaPaddingTop.current !== undefined || _reactNative.Platform.OS !== 'ios') {
        internalEventManager.publish('safeAreaLayout');
      }
    }, [keyboard.keyboardShown, isModal, internalEventManager, dimensions.width, dimensions.portrait, dimensions.height]);

    var hideSheet = _react.default.useCallback(function (vy, data, isSheetManagerOrRef) {
      if (hiding.current) return;

      if (!closable && !isSheetManagerOrRef) {
        returnAnimation(vy);
        return;
      }

      hiding.current = true;
      onBeforeClose == null ? undefined : onBeforeClose(data || payloadRef.current || data);
      setTimeout(function () {
        hideAnimation(vy, function (_ref2) {
          var finished = _ref2.finished;

          if (finished) {
            if (closable) {
              var _hardwareBackPressEve;

              setVisible(false);

              if (props.onClose) {
                props.onClose == null ? undefined : props.onClose(data || payloadRef.current || data);
                hiding.current = false;
              }

              (_hardwareBackPressEve = hardwareBackPressEvent.current) == null ? undefined : _hardwareBackPressEve.remove();

              if (sheetId) {
                _sheetmanager.SheetManager.remove(sheetId, currentContext);

                hiding.current = false;

            