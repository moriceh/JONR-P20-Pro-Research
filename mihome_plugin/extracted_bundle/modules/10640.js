veSvg.Use, {
            x: 3,
            y: 1,
            xlinkHref: "#" + (isSelected ? 'SELECTED_ROOM' : 'UNSELECTED_ROOM') + "_svg"
          }), _react.default.createElement(_reactNativeSvg.Text, {
            x: 20,
            y: 11,
            fontSize: 10,
            fill: "#000000",
            textLength: "30",
            lengthAdjust: "spacingAndGlyphs"
          }, estimateText.text));

        case AreaTipType.selectedAndOtherIconName:
          