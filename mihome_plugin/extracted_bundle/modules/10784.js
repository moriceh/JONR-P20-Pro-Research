            if (new Date().getTime() - _this.lastClickTime < (_this.props.doubleClickInterval || 0)) {
              _this.lastClickTime = 0;
              _this.doubleClickX = evt.nativeEvent.changedTouches[0].pageX;
              _this.doubleClickY = evt.nativeEvent.changedTouches[0].pageY;

              if (_this.props.onDoubleClick) {
                _this.props.onDoubleClick({
                  locationX: evt.nativeEvent.changedTouches[0].locationX,