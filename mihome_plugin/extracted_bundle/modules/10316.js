,
        onVirtualDoorsillsChange = props.onVirtualDoorsillsChange,
        active = props.active,
        isEdit = props.isEdit,
        pixelSize = props.pixelSize,
        scaleRatio = props.scaleRatio,
        bounds = props.bounds,
        type = props.type;
    var dropNextEvt = (0, _react.useRef)(0);
    var scaleValue = (0, _react.useMemo)(function () {
      var scale = parseFloat((1 / scaleRatio).toFixed(2));
      scale = Math.max(0.5, Math.min(scale, 