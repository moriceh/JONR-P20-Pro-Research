.props.tension,
            restSpeedThreshold: this.props.restSpeedThreshold,
            restDisplacementThreshold: this.props.restDisplacementThreshold,
            friction: this.props.friction,
            directionalDistanceChangeThreshold: this.props.directionalDistanceChangeThreshold,
            swipeToOpenPercent: this.props.swipeToOpenPercent,
            swipeToOpenVelocityContribution: this.props.swipeToOpenVelocityContribution,
            swipeToClosePercent: this.props.swipeToClosePercent,
            item: item,
            useNativeDriver: this.props.useNativeDriver,
            onPreviewEnd: this.props.onPreviewEnd
          }, HiddenComponent, VisibleComponent);
        }
      }
    }, {
      key: "renderRow",
      value: function renderRow(rowData, secId, rowId, rowMap) {
        var key = "" + secId + rowId;
        var Component = this.props.renderRow(rowData, secId, rowId, rowMap);
        var HiddenComponent = this.props.renderHiddenRow && this.props.renderHiddenRow(rowData, secId, rowId, rowMap);
        var previewRowId = this.props.dataSource && this.props.dataSource.getRowIDForFlatIndex(this.props.previewRowIndex || 0);
        var shouldPreviewRow = (this.props.previewFirstRow || this.props.previewRowIndex) && rowId === previewRowId;
        return this.renderCell(Component, HiddenComponent, key, rowData, shouldPreviewRow);
      }
    }, {
      key: "renderItem",
      value: function renderItem(rowData, rowMap) {
        var Component = this.props.renderItem(rowData, rowMap);
        var HiddenComponent = this.props.renderHiddenItem && this.props.renderHiddenItem(rowData, rowMap);
        var item = rowData.item,
            index = rowData.index;
        var key = item.key;

        if (this.props.keyExtractor) {
          key = this.props.keyExtractor(item, index);
        }

        var shouldPreviewRow = typeof key !== 'undefined' && this.props.previewRowKey === key;
        return this.renderCell(Component, HiddenComponent, key, item, shouldPreviewRow);
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            useSectionList = _this$props.useSectionList,
            renderListView = _this$props.renderListView,
            props = (0, _objectWithoutProperties2.default)(_this$props, ["useSectionList", "renderListView"]);

        if (renderListView) {
          var useRenderRow = !!this.props.renderRow;
          return renderLis