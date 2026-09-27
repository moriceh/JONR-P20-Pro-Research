[1].pageX;
                maxX = evt.nativeEvent.changedTouches[0].pageX;
              } else {
                minX = evt.nativeEvent.changedTouches[0].pageX;
                maxX = evt.nativeEvent.changedTouches[1].pageX;
              }

              var minY;
              var maxY;

              if (evt.nativeEvent.changedTouches[0].locationY > evt.nativeEvent.changedTouches[1].locationY) {
                minY = evt.nativeEvent.changedTouches