PositionX === null) {
              diffX = 0;
            }

            var diffY = gestureState.dy - (_this.lastPositionY || 0);

            if (_this.lastPositionY === null) {
              diffY = 0;
            }

            _this.lastPositionX = gestureState.dx;
            _this.lastPositionY = gestureState.dy;
            _this.horizontalWholeCounter += diffX;
            _this.verticalWholeCounter += diffY;

            if (_this.props.panToMove) {
      