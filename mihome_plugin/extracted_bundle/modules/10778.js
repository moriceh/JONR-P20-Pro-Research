tionY = null;
          _this.zoomLastDistance = null;
          _this.horizontalWholeCounter = 0;
          _this.verticalWholeCounter = 0;
          _this.lastTouchStartTime = new Date().getTime();
          _this.isDoubleClick = false;
          _this.isLongPress = false;
          _this.isHorizontalWrap = false;

          if (_this.singleClickTimeout) {
            clearTimeout(_this.singleClickTimeout);
          }

          if (evt.nativeEvent.change