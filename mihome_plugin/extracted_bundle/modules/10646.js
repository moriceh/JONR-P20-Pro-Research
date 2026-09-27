           y: 1,
            xlinkHref: isSelected ? "#SELECTED_ROOM_svg" : "#" + iconType + "_svg"
          }), _react.default.createElement(_reactNativeSvg.Text, {
            x: 20,
            y: 11,
            fontSize: 10,
            fill: "#000000",
            textLength: "30",
            lengthAdjust: "spacingAndGlyphs"
          }, estimateText.text), _react.default.createElement(CleanParamIconView, null));

        case AreaTipType.SequenceNum