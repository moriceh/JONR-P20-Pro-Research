actNativeSvg.G, {
          x: (estimateText.width - bgSize.width) / 2,
          y: estimateText.height + 2
        }, _react.default.createElement(_reactNativeSvg.Use, {
          xlinkHref: "#Bg" + len + "_svg",
          width: bgSize.width,
          height: bgSize.height
        }), cleanParamIcon.map(function (item, index) {
          return item !== null && _react.default.createElement(_reactNativeSvg.Use, {
            xlinkHref: "#" + nameArr[index] + item + "