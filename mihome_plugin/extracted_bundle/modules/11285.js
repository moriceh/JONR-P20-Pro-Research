tView(props, this.setRefs.bind(this), this.onScroll.bind(this), useRenderRow ? this.renderRow.bind(this, this._rows) : this.renderItem.bind(this));
        }

        if (useSectionList) {
          var _ListComponent = this.props.useAnimatedList ? _reactNative.Animated.SectionList : _reactNative.SectionList;

          return _react.default.createElement(_ListComponent, (0, _extends2.default)({}, props, this.listViewProps, {
            ref: this._onRef,
            onScroll: this._onScroll,
            renderItem: this._renderItem
          }));
        }

        var ListComponent = this.props.useAnimatedList ? _reactNative.Animated.FlatList : _reactNative.FlatList;
        return _react.default.createElement(ListComponent, (0, _extends2.default)({}, props, this.listViewProps, {
          ref: this._onRef,
          onScroll: this._onScroll,
          renderItem: this._renderItem
        }));
      }
    }]);
    return SwipeListView;
  }(_react.PureComponent);

  SwipeListView.propTypes = {
    renderListView: _propTypes.default.func,
    renderItem: _propTypes.default.func,
    renderHiddenItem: _propTypes.default.func,
    leftOpenValue: _propTypes.default.number,
    rightOpenValue: _propTypes.default.number,
    leftActivationValue: _propTypes.default.number,
    rightActivationValue: _propTypes.default.number,
    leftActionValue: _propTypes.default.number,
    rightActionValue: _propTypes.default.number,
    initialLeftActionState: _propTypes.default.bool,
    initialRightActionState: _propTypes.default.bool,
    stopLeftSwipe: _propTypes.default.number,
    stopRightSwipe: _propTypes.default.number,
    closeOnScroll: _propTypes.default.bool,
    closeOnRowPress: _propTypes.default.bool,
    closeOnRowBeginSwipe: _propTypes.default.bool,
    closeOnRowOpen: _propTypes.default.bool,
    disableLeftSwipe: _propTypes.default.bool,
    disableRightSwipe: _propTypes.default.bool,
    recalculateHiddenLayout: _propTypes.default.bool,
    disableHiddenLayoutCalculation: _propTypes.default.bool,
    swipeGestureBegan: _propTypes.default.func,
    swipeGestureEnded: _propTypes.default.func,
    onRowOpen: _propTypes.default.func,
    onRowDidOpen: _propTypes.default.func,
    onRowClose: _propTypes.default.func,
    onRowDidClose: _propTypes.default.func,
    onLeftAction: _propTypes.default.func,
    onRightAction: _propTypes.default.func,
    onLeftActionStatusChange: _propTypes.default.func,
    onRightActionStatusChange: _propTypes.default.func,
    onScrollEnabled: _propTypes.default.func,
    onScroll: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    swipeRowStyle: _propTypes.default.object,
    listViewRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]),
    previewRowKey: _propTypes.default.string,
    previewFirstRow: _propTypes.default.bool,
    previewRowIndex: _propTypes.default.number,
    previewDuration: _propTypes.default.number,
    previewRepeat: _propTypes.default.bool,
    previewRepeatDelay: _propTypes.default.number,
    previewOpenDelay: _propTypes.default.number,
    previewOpenValue: _propTypes.default.number,
    friction: _propTypes.default.number,
    tension: _propTypes.default.number,
    restSpeedThreshold: _propTypes.default.number,
    restDisplacementThreshold: _propTypes.default.number,
    directionalDistanceChangeThreshold: _propTypes.default.number,
    swipeToOpenPercent: _propTypes.default.number,
    swipeToOpenVelocityContribution: _propTypes.default.number,
    swipeToClosePercent: _propTypes.default.number,
    shouldItemUpdate: _propTypes.default.func,
    onSwipeValueChange: _propTypes.default.func,
    useNativeDriver: _propTypes.default.bool,
    useAnimatedList: _propTypes.default.bool,
    keyExtractor: _propTypes.default.func,
    onPreviewEnd: _propTypes.default.func
  };
  SwipeListView.defaultProps = {
    leftOpenValue: 0,
    rightOpenValue: 0,
    closeOnRowBeginSwipe: false,
    closeOnScroll: true,
    closeOnRowPress: true,
    closeOnRowOpen: true,
    disableLeftSwipe: false,
    disableRightSwipe: false,
    recalculateHiddenLayout: false,
    disableHiddenLayoutCalculation: false,
    previewFirstRow: false,
    directionalDistanceChangeThreshold: 2,
    swipeToOpenPercent: 50,
    swipeToOpenVelocityContribution: 0,
    swipeToClosePercent: 50,
    useNativeDriver: true,
    previewRepeat: false,
    previewRepeatDelay: 1000,
    useAnimatedList: