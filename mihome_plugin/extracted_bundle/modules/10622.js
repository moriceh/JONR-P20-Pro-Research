_svg",
            key: index,
            x: 6 + index * 9 - (len == 3 && index !== 0 ? 9 : 0),
            y: 5,
            width: 8,
            height: 8
          });
        }));
      } else {
        return null;
      }
    };

    var TipView = function TipView() {
      switch (tipType) {
        case AreaTipType.IconName:
          return _react.default.createElement(_reactNativeSvg.G, (0, _extends2.default)({}, positionXY, {
            fill: "none",
 