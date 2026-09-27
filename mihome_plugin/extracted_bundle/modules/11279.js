er.setNativeProps({
            scrollEnabled: enable
          });
        }

        this.props.onScrollEnabled && this.props.onScrollEnabled(enable);
      }
    }, {
      key: "safeCloseOpenRow",
      value: function safeCloseOpenRow() {
        var rowRef = this._rows[this.openCellKey];

        if (rowRef && rowRef.closeRow) {
          this._rows[this.openCellKey].closeRow();
        }
      }
    }, {
      key: "rowSwipeGestureBegan",
      value: function rowSwipeGestureBegan(key) {
        if (this.props.closeOnRowBeginSwipe && this.openCellKey && this.openCellKey !== key) {
          this.safeCloseOpenRow();
        }

        if (this.props.swipeGestureBegan) {
          this.props.swipeGestureBegan(key);
        }
      }
    }, {
      key: "rowSwipeGestureEnded",
      value: function rowSwipeGestureEnded(key, data) {
        if (this.props.swipeGestureEnded) {
          this.props.swipeGestureEnded(key, data);
        }
      }
    }, {
      key: "onRowOpen",
      value: function onRowOpen(key, toValue) {
        if (this.openCellKey && this.openCellKey !== key && this.props.closeOnRowOpen && !this.props.closeOnRowBeginSwipe) {
          this.safeCloseOpenRow();
        }

        this.openCellKey = key;
        this.props.onRowOpen && this.props.onRowOpen(key, this._rows, toValue);
      }
    }, {
      key: "onRowPress",
      value: function onRowPress() {
        if (this.openCellKey) {
          if (this.props.closeOnRowPress) {
            this.safeCloseOpenRow();
            this.openCellKey = null;
          }
        }
      }
    }, {
      key: "onScroll",
      value: function onScroll(e) {
        if (_reactNative.Platform.OS === 'ios') {
          this.yScrollOffset = e.nativeEvent.contentOffset.y;
        }

        if (this.openCellKey) {
          if (this.props.closeOnScroll) {
            this.safeCloseOpenRow();
            this.openCellKey = null;
          }
        }

        typeof this.props.onScroll === 'function' && this.props.onScroll(e);
      }
    }, {
      key: "onLayout",
      value: function onLayout(e) {
        this.layoutHeight = e.nativeEvent.layout.height;
        this.props.onLayout && this.props.onLayout(e);
      }
    }, {
      key: "onContentSizeChange",
      value: function onContentSizeChange(w, h) {
        var height = h - this.layoutHeight;

        if (this.yScrollOffset >= height && height > 0) {
          if (this._listView instanceof _reactNative.FlatList) {
            this._listView && this._listView.scrollToEnd();
          } else if (this._listView instanceof _reactNative.SectionList) {
            this._listView.scrollToEnd && this._listView.scrollToEnd();
          } else if (this._listView instanceof _reactNative.Animated.FlatList) {
            this._listView.scrollToEnd && this._listView.scrollToEnd();
          }
        }

        this.props.onContentSizeChange && this.props.onContentSizeChange(w, h);
      }
    }, {
      key: "setRefs",
      value: function setRefs(ref) {
        this._listView = ref;

        if (typeof this.props.listViewRef === 'function') {
          this.props.listViewRef && this.props.listViewRef(ref);
        } else if (typeof this.props.listViewRef === 'object') {
          if (Object.keys(this.props.listViewRef).includes('current')) {
            this.props.listViewRef.current = ref;
          }
        }
      }
    }, {
      key: "closeAllOpenRows",
      value: function closeAllOpenRows() {
        var _this2 = this;

        Object.keys(this._rows).forEach(function (rowKey) {
          var row = _this2._rows[rowKey];

          if (row) {
            var rowTranslateX = Math.round(row.currentTranslateX || 0);

            if (row.closeRow && rowTranslateX !== 0) {
              row.closeRow();
            }
          }
        });
      }
    }, {
      key: "manuallyOpenAllRows",
      value: function manuallyOpenAllRows(toValue) {
        var _this3 = this;

        Object.keys(this._rows).forEach(function (rowKey) {
          var row = _this3._rows[rowKey];

          if (row && row.manuallySwipeRow) {
            row.manuallySwipeRow(toValue);
          }
        });
      }
    }, {
      key: "renderCell",
      value: function renderCell(VisibleComponent, HiddenComponent, key, item, shouldPreviewRow) {
        var _this4 = this;

        if (!HiddenComponent) {
          return _react.default.cloneElement(VisibleComponent, (0, _objectSpread2.default)({}, VisibleComponent.props, {
            ref: function ref(row) {
              return _this4._rows[key] = row;
            },
            onRowOpen: function onRowOpen(toValue) {
              return _this4.onRowOpen(key, toValue);
            },
            onRowDidOpen: function onRowDidOpen(toValue) {
              return _this4.props.onRowDidOpen && _this4.props.onRowDidOpen(key, _this4._rows, toValue);
            },
            onRowClose: function onRowClose() {
              return _this4.props.onRowClose && _this4.props.onRowClose(key, _this4._rows);
            },
            onRowDidClose: function onRowDidClose() {
              return _this4.props.onRowDidClose && _this4.props.onRowDidClose(key, _this4._rows);
            },
            onRowPress: function onRowPress() {
              return _this4.onRowPress();
            },
            setScrollEnabled: function setScrollEnabled(enable) {
              return _this4.setScrollEnabled(enable);
            },
            swipeGestureBegan: function swipeGestureBegan() {
              return _this4.rowSwipeGestureBegan(key);
            },
            swipeGestureEnded: function swipeGestureEnded(_, data) {
              return _this4.rowSwipeGestureEnded(key, data);
            }
          }));
        } else {
          return _react.default.createElement(_SwipeRow.default, {
            onSwipeValueChange: this.props.onSwipeValueChange ? function (data) {
              return _this4.props.onSwipeValueChange((0, _objectSpread2.default)({}, data, {
                key: key
              }));
            } : null,
            ref: function ref(row) {
              return _this4._rows[key] = row;
            },
            swipeGestureBegan: function swipeGestureBegan() {
              return _this4.rowSwipeGestureBegan(key);
            },
            swipeGestureEnded: function swipeGestureEnded(_, data) {
              return _this4.rowSwipeGestureEnded(key, data);
            },
            onRowOpen: function onRowOpen(toValue) {
              return _this4.onRowOpen(key, toValue);
            },
            onRowDidOpen: function onRowDidOpen(toValue) {
              return _this4.props.onRowDidOpen && _this4.props.onRowDidOpen(key, _this4._rows, toValue);
            },
            onRowClose: function onRowClose() {
              return _this4.props.onRowClose && _this4.props.onRowClose(key, _this4._rows);
            },
            onRowDidClose: function onRowDidClose() {
              return _this4.props.onRowDidClose && _this4.props.onRowDidClose(key, _this4._rows);
            },
            onRowPress: function onRowPress() {
              return _this4.onRowPress(key);
            },
            leftActivationValue: item.leftActivationValue || this.props.leftActivationValue,
            rightActivationValue: item.rightActivationValue || this.props.rightActivationValue,
            leftActionValue: item.leftActionValue || this.props.leftActionValue || 0,
            rightActionValue: item.rightActionValue || this.props.rightActionValue || 0,
            initialLeftActionState: item.initialLeftActionState || this.props.initialLeftActionState,
            initialRightActionState: item.initialRightActionState || this.props.initialRightActionState,
            onLeftAction: function onLeftAction() {
              return item.onLeftAction || _this4.props.onLeftAction && _this4.props.onLeftAction(key, _this4._rows);
            },
            onRightAction: function onRightAction() {
              return item.onRightAction || _this4.props.onRightAction && _this4.props.onRightAction(key, _this4._rows);
            },
            onLeftActionStatusChange: this.props.onLeftActionStatusChange ? function (data) {
              return _this4.props.onLeftActionStatusChange((0, _objectSpread2.default)({}, data, {
                key: key
              }));
            } : null,
            onRightActionStatusChange: this.props.onRightActionStatusChange ? function (data) {
              return _this4.props.onRightActionStatusChange((0, _objectSpread2.default)({}, data, {
                key: key
              }));
            } : null,
            shouldItemUpdate: this.props.shouldItemUpdate ? function (currentItem, newItem) {
              return _this4.props.shouldItemUpdate(currentItem, newItem);
            } : null,
            setScrollEnabled: function setScrollEnabled(enable) {
              return _this4.setScrollEnabled(enable);
            },
            leftOpenValue: item.leftOpenValue || this.props.leftOpenValue,
            rightOpenValue: item.rightOpenValue || this.props.rightOpenValue,
            closeOnRowPress: item.closeOnRowPress || this.props.closeOnRowPress,
            disableLeftSwipe: item.disableLeftSwipe || this.props.disableLeftSwipe,
            disableRightSwipe: item.disableRightSwipe || this.props.disableRightSwipe,
            stopLeftSwipe: item.stopLeftSwipe || this.props.stopLeftSwipe,
            stopRightSwipe: item.stopRightSwipe || this.props.stopRightSwipe,
            recalculateHiddenLayout: this.props.recalculateHiddenLayout,
            disableHiddenLayoutCalculation: this.props.disableHiddenLayoutCalculation,
            style: this.props.swipeRowStyle,
            preview: shouldPreviewRow,
            previewDuration: this.props.previewDuration,
            previewOpenDelay: this.props.previewOpenDelay,
            previewOpenValue: this.props.previewOpenValue,
            previewRepeat: this.props.previewRepeat,
            previewRepeatDelay: this.props.previewRepeatDelay,
            tension: this