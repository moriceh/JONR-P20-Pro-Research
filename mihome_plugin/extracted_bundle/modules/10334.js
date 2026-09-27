
    var lineHeight = type === _enum.VirtualDoorsillType.PushPull ? Math.round(10 / pixelSize) : Math.round(20 / pixelSize);
    var rotation = (0, _react.useMemo)(function () {
      return (0, _utils.calculatePointRotate)(lineData == null ? undefined : lineData.startPoint, lineData == null ? undefined : lineData.endPoint);
    }, [lineData]);
    var lineStyle = (0, _react.useMemo)(function () {
      var startPoint = lineData.startPoint,
          endPoint = lineData.endPoint;
      var radianAngle = rotation * Math.PI / 180;
      var offsetX = -lineHeight * Math.sin(radianAngle);
      var offsetY = lineHeight * Math.cos(radianAngle);
      return "M" + startPoint.x + " " + startPoint.y + " L" + endPoint.x + " " + endPoint.y + " L" + (endPoint.x + offsetX) + " " + (endPoint.y + offsetY) + " L" + (startPoint.x + offsetX) + " " + (startPoint.y + offsetY) + " Z";
    }, [lineData, lineHeight, rotation]);
    var deleteStyle = (0, _react.useMemo)(function () {
      var _lineData$startPoint = lineData.startPoint,
          x = _lineData$startPoint.x,
          y = _lineData$startPoint.y;
      var imageSize = 20;
      return {
        x: x - imageSize * scaleValue,
        y: y - imageSize * scaleValue,
        width: imageSize,
        height: imageSize
      };
    }, [lineData, rotation, toRatioValue]);
    var moveStyle = (0, _react.useMemo)(function () {
      var _lineData$endPoint = lineData.endPoint,
          x = _lineData$endPoint.x,
          y = _lineData$endPoint.y;
      var imageSize = 20;
      var radianAngle = rotation * Math.PI / 180;
      var offsetX = -lineHeight * Math.sin(radianAngle);
      var offsetY = lineHeight * Math.cos(radianAngle);
      return {
        x: x + offsetX * scaleValue,
        y: y + offsetY * scaleValue,
        width: imageSize,
        height: imageSize
      };
    }, [lineData, rotation, toRatioValue]);
    var labelStyle = (0, _react.useMemo)(function () {
      var startPoint = lineData.startPoint,
          endPoint = lineData.endPoint;

      var _calculateMidPoint = (0, _utils.calculateMidPoint)(startPoint, endPoint),
          x = _calculateMidPoint.x,
          y = _calculateMidPoint.y;

      var imageSizeX = toRatioValue(35);
      var imageSizeY = toRatioValue(12);
      var radianAngle = rotation * Math.PI / 180;
      var offsetX = imageSizeX * Math.sin(radianAngle);
      var offsetY = -imageSizeY * Math.cos(radianAngle);
      return {
        x: x - imageSizeX + offsetX,
        y: y - imageSizeY + offsetY,
        angle: rotation
      };
    }, [lineData, rotation, toRatioValue]);
    var handleMoveShouldSetPanResponder = (0, _react.useCallback)(function (evt, gestureState) {
      return (0, _utils.touchableRadius)(evt) && active && isEdit;
    }, [active, isEdit]);
    var isSafeMove = (0, _react.useCallback)(function (curPos, lastPos, fixedPoint) {
      if (lastPos) {
        var preDistance = (0, _utils.calculatePointDistance)(lastPos, fixedPoint) * pixelSize / 100;
        var curDistance = (0, _utils.calculatePointDistance)(curPos, fixedPoint) * pixelSize / 100;

        if (curDistance - preDistance > 0 && curDistance >= 30.5) {
          _logger.default.d('++++++++++++超出最大距离限制', curDistance);

          return false;
        }

        if (curDistance - preDistance < 0 && curDistance < 0.7) {
          _logger.default.d('++++++++++++超出最小距离限制', curDistance);

          return false;
        }
      }

      return true;
    }, [pixelSize]);
    var isSafeRelease = (0, _react.useCallback)(function (curPos, fixedPoint) {
      var curDistance = (0, _utils.calculatePointDistance)(curPos, fixedPoint) * pixelSize / 100;
      return curDistance < maxDistance && curDistance > minDistance;
    }, [pixelSize]);
    var onDeleteClick = (0, _react.useCallback)(function () {
      _logger.default.d('++++++++++++++onDeleteClick');

      if (active) {
        onVirtualDoorsillsChange && onVirtualDoorsillsChange(actionType, id, 'del');
      }
    }, [actionType, active, id, onVirtualDoorsillsChange]);
    var onActiveClick = (0, _react.useCallback)(function () {
      _logger.default.d('++++++++++++++onactiveClick', active);

      if (!active) {
        onVirtualDoorsillsChange && onVirtualDoorsillsChange(actionType, id, 'active');
      }
    }, [actionType, active, id, onVirtualDoorsillsChange]);
    var onModClick = (0, _react.useCallback)(function () {
      _logger.default.d('++++++++++++++onModClick', id, active);

      if (active && startPoint.current != null && endPoint.current != null) {
        var _rotation = (0, _utils.calculatePointRotate)(startPoint.current, endPoint.current);

        var radianAngle = _rotation * Math.PI / 180;
        var offsetX = -lineHeight * Math.sin(radianAngle);
        var offsetY = lineHeight * Math.cos(radianAngle);
        var point = [{
          x: Math.round(startPoint.current.x),
          y: Math.round(startPoint.current.y)
        }, {
          x: Math.round(endPoint.current.x),
          y: Math.round(endPoint.current.y)
        }, {
          x: Math.round(endPoint.current.x + offsetX),
          y: Math.round(endPoint.current.y + offsetY)
        }, {
          x: Math.round(startPoint.current.x + offsetX),
          y: Math.round(startPoint.current.y + offsetY)
        }];
        onVirtualDoorsillsChange && onVirtualDoorsillsChange(actionType, id, 'mod', point);
      }
    }, [id, active, lineHeight, onVirtualDoorsillsChange, actionType]);
    var translationPanResponder = (0, _react.useMemo)(function () {
      return _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return isEdit;
        },
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
          if (!active) {
            return;
          }

          if (dropNextEvt.current > 0) {
            dropNextEvt.current--;
            return;
          }

          if (Math.abs(gestureState.vx) + Math.abs(gestureState.vx) > 6) {
            dropNextEvt.current++;
            return;
          }

          if (Math.abs(gestureState.dx) >= width || Math.abs(gestureState.dx) >= height) {
            dropNextEvt.current++;
            return;
          }

          var dx = gestureState.dx / scaleRatio;
          var dy = gestureState.dy / scaleRatio;
          var _startPoint$current = startPoint.current,
              startX = _startPoint$current.x,
              startY = _startPoint$current.y;
          var _endPoint$current = endPoint.current,
              endX = _endPoint$current.x,
              endY = _endPoint$current.y;
          setLineData({
            startPoint: {
              x: startX + dx,
              y: startY + dy
            },
            endPoint: {
              x: endX + dx,
              y: endY + dy
            }
          });
        },
        onPanResponderRelease: function onPanResponderRelease(evt, gestureState) {
          var moveDistance = Math.sqrt(gestureState.dx * gestureState.dx + gestureState.dy * gestureState.dy);

          if (evt.nativeEvent.changedTouches.length === 1 && moveDistance < 1) {
            onActiveClick();
          } else if (active) {
            var dx = gestureState.dx / scaleRatio;
            var dy = gestureState.dy / scaleRatio;
            var _startPoint$current2 = startPoint.current,
                startX = _startPoint$current2.x,
                startY = _startPoint$current2.y;
            var _endPoint$current2 = endPoint.current,
                endX = _endPoint$current2.x,
                endY = _endPoint$current2.y;
            startPoint.current = {
              x: startX + dx,
              y: startY + dy
            };
            endPoint.current = {
              x: endX + dx,
              y: endY + dy
            };
            onModClick();
          }
        },
        onPanResponderTerminationRequest: function onPanResponderTerminationRequest(evt, gestureState) {
          return evt.nativeEvent.touches.length > 1;
        }
      });
    }, [active, handleMoveShouldSetPanResponder, isEdit, onActiveClick, onModClick, scaleRatio]);
    var startPointPanResponder = (0, _react.useMemo)(function () {
      return _reactNative.PanResponder.create({
        onStartShouldSetPanResponder: function onStartShouldSetPanResponder() {
          return isEdit && active;
        },
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderMove: function onPanResponderMove(evt, gestureState) {
          if (dropNextEvt.current > 0) {
            dropNextEvt.current--;
            return;
          }

          if (Math.abs(gestureState.vx) + Math.abs(gestureState.vx) > 6) {
            dropNextEvt.current++;
            return;
          }

          if (Math.abs(gestureState.dx) >= width || Math.abs(gestureState.dy) >= height) {
            dropNextEvt.current++;
            return;
          }

          var dx = gestureState.dx / scaleRatio;
          var dy = gestureState.dy / scaleRatio;
          var _startPoint$current3 = startPoint.current,
              startX = _startPoint$current3.x,
              startY = _startPoint$current3.y;
          var lastPos = lastPosition.current;
          var curPos = {
            x: startX + dx,
            y: startY + dy
          };

          if (isSafeMove(curPos, lastPos, endPoint.current)) {
            lastPosition.current = curPos;
            setLineData(function (preData) {
              return (0, _objectSpread2.default)({}, preData, {
                startPoint: curPos
              });
            });
          }
        },
        onPanResponderRelease: function onPanResponderRelease(e, gestureState) {
          var dx = gestureState.dx / scaleRatio;
          var dy = gestureState.dy / scaleRatio;
          var _startPoint$current4 = startPoint.cur