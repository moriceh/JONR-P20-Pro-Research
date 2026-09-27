
                  zoom = _this.props.maxScale || 0;
                }

                var beforeScale = _this.scale;
                _this.scale = zoom;

                _this.animatedScale.setValue(_this.scale);

                var diffScale = _this.scale - beforeScale;
                _this.positionX -= _this.centerDiffX * diffScale / _this.scale;
                _this.positionY -= _this.centerDiffY * diffScale / _this.scale;

                _this.an