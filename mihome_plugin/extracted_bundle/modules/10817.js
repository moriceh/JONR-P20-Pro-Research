   _this.zoomCurrentDistance = Number(diagonalDistance.toFixed(1));

              if (_this.zoomLastDistance !== null) {
                var distanceDiff = (_this.zoomCurrentDistance - _this.zoomLastDistance) / 200;
                var zoom = _this.scale + distanceDiff;

                if (zoom < (_this.props.minScale || 0)) {
                  zoom = _this.props.minScale || 0;
                }

                if (zoom > (_this.props.maxScale || 0)) {