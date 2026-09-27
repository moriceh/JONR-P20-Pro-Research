alse;
      _this.isHorizontalWrap = false;
      _this.dropNextEvt = 0;
      _this.imagePanResponder = _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: _this.props.onStartShouldSetPanResponder,
        onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(evt) {
          return (0, _utils.touchableRadius)(evt) && _this.props.onMoveShouldSetPanResponder;
        },
        onPanResponderTerminationRequest: _this.props.