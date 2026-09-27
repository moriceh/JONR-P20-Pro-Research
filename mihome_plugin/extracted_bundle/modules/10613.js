   text += _char;

        if (totoalWidth > 60) {
          text += '...';
          totoalWidth = 65;
          break;
        }
      }

      totoalWidth += 22;
      return {
        text: text,
        width: totoalWidth,
        height: 14
      };
    }, [name]);
    var positionXY = (0, _react.useMemo)(function () {
      return {
        x: x - estimateText.width / 2 * scaleValue,
        y: y - estimateText.height / 2
      };
    }, [scaleValue, x, 