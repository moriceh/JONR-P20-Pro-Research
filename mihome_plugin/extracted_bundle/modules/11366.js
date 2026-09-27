lement(_reactNative.View, {
        style: styles.content_card_laft
      }, _react.default.createElement(_reactNative.View, {
        style: styles.card_laft_title
      }, _react.default.createElement(_reactNative.View, {
        style: styles.card_laft_badge
      }, record.resultCode === 0 ? _react.default.createElement(_reactNative.View, {
        style: styles.card_top_complete
      }) : _react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        style: {
          width: (0, _screenAdapte.sizeW)(16),
          height: (0, _screenAdapte.sizeH)(16)
        },
        source: closeleaningRecords.error
      })), _react.default.createElement(_reactNative.Text, {
        style: styles.card_title
      }, _cleanTitle(record.cleanType))), _react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: "row",
          marginTop: (0, _screenAdapte.sizeH)(6)
        }
      }, _react.default.createElement(_reactNative.View, {
        style: styles.card_laft_badge
      }), _react.default.createElement(_reactNative.Text, {
        style: styles.card_time_texts
      }, record.time))), _react.default.createElement(_reactNative.View, {
        style: styles.content_card_right
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.card_time_count
      }, configStore.unitSet === _enum.UnitType.SquareMeter ? record.cleanArea : (0, _index.meterToFoot)(record.cleanArea, 1)), _react.default.createElement(_reactNative.Text, {
        style: [styles.card_time_count, {
          marginRight: (0, _screenAdapte.sizeW)(8),
          alignSelf: 'flex-end'
        }]
      }, configStore.unitSet === _enum.UnitType.SquareMeter ? 'm²' : 'ft²'), _react.default.createElement(_reactNative.Text, {
        style: [styles.card_time_count, {
          marginRight: (0, _screenAdapte.sizeW)(8)
        }]
      }, "|"), _react.default.createElement(_reactNative.Text, {
        style: [styles.card_time_count, {
          marginRight: (0, _screenAdapte.sizeW)(1)
        }]
      }, cleanTimeStr(record.cleanTime) + "min"), _react.default.createElement(_reactNative.Image, {
        style: {
          width: (0, _screenAdapte.sizeW)(7),
          height: (0, _screenAdapte.sizeH)(11),
          marginLeft: (0, _screenAdapte.sizeW)(16)
        },
        resizeMode: "cover",
        source: _Images.default.common.right_arrow
      })));
    };

    function _cleanTitle(type) {
      switch (type) {
        case CleanType.SmartClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword171;

        case CleanType.AreaClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword172;

        case CleanType.ZoneClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword173;

        case CleanType.SpotClean:
          return _multilingual.default == null ? undefined : _multilingual.default.keyword446;

        default:
          return "";
      }
    }

    return _react.default.createElement(_reactNative.View, {
      style: styles.rose
    }, _react.default.createElement(_reactNative.View, {
      style: styles.header_data
    }, currentScheme === "light" && _react.default.createElement(_reactNativeLinearGradient.default, {
      colors: ['#D6FEFD', '#EAF2F4'],
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: '100%',
        height: (0, _screenAdapte.sizeH)(283)
      }
    }), _react.default.createElement(_reactNative.View, {
      onLayout: onLayout,
      style: [styles.top_data, {
        backgroundColor: currentScheme === "light" ? "transparent" : "xm#1C1C1E"
      }]
    }, _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, (0, _mobxReactLite.useObserver)(function () {
      return _react.default.createElement(TopItemView, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword167,
        value: configStore.unitSet === _enum.UnitType.SquareMeter ? robotStore.cleanAreaTotal : (0, _index.meterToFoot)(robotStore.cleanAreaTotal, 1),
        unit: configStore.unitSet === _enum.UnitType.SquareMeter ? 'm²' : 'ft²'
      });
    })), _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, (0, _mobxReactLite.useObserver)(function () {
      return _react.default.createElement(TopItemView, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword168,
        value: robotStore.cleanRecords.length >= 15 ? robotStore.cleanTimeTotalHourAndMin : timeData(),
        type: "time"
      });
    })), _react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, (0, _mobxReactLite.useObserver)(function () {
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        onPress: reportLogAction
      }, _react.default.createElement(TopItemView, {
        title: _multilingual.default == null ? undefined : _multilingual.default.keyword169,
        value: robotStore.cleanCountTotal
      }));
    })))), _react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false
    }, (cleanRecords == null ? undefined : cleanRecords.length) ? _react.default.createElement(_reactNative.View, {
      style: {
        padding: 16
      }
    }, _react.default.createElement(_reactNative.View, {
      style: styles.content
    }, _react.default.createElement(_mobxReactLite.Observer, null, function () {
      return cleanRecords == null ? undefined : cleanRecords.map(function (item, index) {
        var _item$records;

        return _react.default.createElement(DateRenderItem, {
          key: index,
          item: item
        }, item.records && ((_item$records = item.records) == null ? undefined : _item$records.map(function (record, innerIndex) {
          return _react.default.createElement(RecordsRenderItem, {
            key: innerIndex,
            record: record,
            date: item.date
          });
        })));
      });
    }), _react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _screenAdapte.sizeH)(35)
      }
    }))) : _react.default.createElement(_reactNative.View, {
      style: {
        justifyContent: 'flex-start',
        flex: 1
      }
    }, _react.default.createElement(_BlankPage.default, {
      type: _BlankPage.default.TYPE.UNDERLINE,
      message: _multilingual.default == null ? undefined : _multilingual.default.keyword58,
      iconStyle: {
        alignSelf: "center"
      }
    }))));
  };

  var styles = (0, _DynamicStyleSheet.dynamicStyleSheet)({
    navigationBar: {
      backgroundColor: new _DynamicColor.default("#D6FEFD", "#000")
    },
    rose: {
      backgroundColor: new _DynamicColo