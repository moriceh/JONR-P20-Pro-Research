dTouches.length > 1) {
            var centerX = (evt.nativeEvent.changedTouches[0].pageX + evt.nativeEvent.changedTouches[1].pageX) / 2;
            _this.centerDiffX = centerX - _this.props.cropWidth / 2;
            var centerY = (evt.nativeEvent.changedTouches[0].pageY + evt.nativeEvent.changedTouches[1].pageY) / 2;
            _this.centerDiffY = centerY - _this.props.cropHeight / 2;
          }

          if (evt.nativeEvent.changedTouches.length <= 1) {
