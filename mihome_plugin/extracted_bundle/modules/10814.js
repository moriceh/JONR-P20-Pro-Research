[1].pageY;
                maxY = evt.nativeEvent.changedTouches[0].pageY;
              } else {
                minY = evt.nativeEvent.changedTouches[0].pageY;
                maxY = evt.nativeEvent.changedTouches[1].pageY;
              }

              var widthDistance = maxX - minX;
              var heightDistance = maxY - minY;
              var diagonalDistance = Math.sqrt(widthDistance * widthDistance + heightDistance * heightDistance);
           