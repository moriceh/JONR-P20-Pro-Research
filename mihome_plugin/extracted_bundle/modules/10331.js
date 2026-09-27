     var dimensions = (0, _utils.calculatePointDistance)(lineData == null ? undefined : lineData.startPoint, lineData == null ? undefined : lineData.endPoint);
      return {
        width: Math.abs((0, _utils.fixDistanceNum)(dimensions, pixelSize).toFixed(1)),
        height: type === _enum.VirtualDoorsillType.PushPull ? 0.1 : 0.2
      };
    }, [lineData == null ? undefined : lineData.endPoint, lineData == null ? undefined : lineData.startPoint, pixelSize, type]);