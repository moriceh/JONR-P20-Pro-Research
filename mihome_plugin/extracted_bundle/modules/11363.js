rtLogAction() {
      var now = Date.now();

      if (now - lastClickTime > 3000) {
        clickCount = 0;
      }

      lastClickTime = now;
      clickCount++;

      if (clickCount === 10) {
        _resourceManager.actions.reportLog().then(function (res) {
          _logger.default.d('reportLog', res);

          commonStore.showToast(res ? 'reportLog succ' : 'reportLog failed');
        });

        clickCount = 0;
      }
    };

    var cleanRecords = (0, _react.useMemo)(function () {
      try {
        return robotStore.cleanRecords.reverse().reduce(function (result, currentRecord) {
          var date = currentRecord.d,
              time = currentRecord.t,
              cleanType = currentRecord.M,
              cleanArea = currentRecord.A,
              cleanTime = currentRecord.T,
              mapFileUrl = currentRecord.U,
              resultCode = currentRecord.c;
          var showDate = getDate(date);

          var _time$split = time.split(':'),
              _time$split2 = (0, _slicedToArray2.default)(_time$split, 2),
              hour = _time$split2[0],
              minute = _time$split2[1];

          var showTime = hour + ":" + minute;
          var existingDateRecord = result.find(function (item) {
            return item.date === showDate;
          });

          if (existingDateRecord) {
            existingDateRecord.records.push({
              time: showTime,
              cleanType: cleanType,
              cleanArea: cleanArea,
              cleanTime: cleanTime,
              resultCode: resultCode,
              mapFileUrl: mapFileUrl
            });
          } else {
            result.push({
              date: showDate,
              records: [{
                time: showTime,
                cleanType: cleanType,
                cleanArea: cleanArea,
                cleanTime: cleanTime,
                resultCode: resultCode,
                mapFileUrl: mapFileUrl
              }]
            });
          }

          return result;
        }, []);
      } catch (error) {
        _logger.default.e("清扫记录转换到同一日期下-(日期倒序) An error occurred while processing cleanRecords:", error);

        return [];
      }
    }, [robotStore.cleanRecords]);

    var timeData = function timeData() {
      if (robotStore.cleanRecords.length !== 0) {
        var totalCleanTime = robotStore.cleanRecords.reduce(function (acc, obj) {
          var cleanTime = parseInt(cleanTimeStr(obj.T), 10);
          return acc + cleanTime;
        }, 0);
        var hour = Math.floor(totalCleanTime / 60);
        var min = totalCleanTime % 60;

        if (hour > 100) {
          return {
            hour: hour,
            min: ''
          };
        } else {
          return {
            hour: hour ? hour.toString() : '',
            min: min.toString()
          };
        }
      } else {
        return {
          hour: '',
          min: 0
        };
      }
    };

    var TopItemView = function TopItemView(_ref) {
      var title = _ref.title,
          _ref$value = _ref.value,
          value = _ref$value === undefined ? {} : _ref$value,
          _ref$unit = _ref.unit,
          unit = _ref$unit === undefined ? '' : _ref$unit,
          _ref$type = _ref.type,
          type = _ref$type === undefined ? '' : _ref$type,
          numberDataWidth = _ref.numberDataWidth;

      function textView(value1, unit1, value2, unit2) {
        return _react.default.createElement(_reactNative.View, {
          style: {
            flexDirection: 'row',
            justifyContent: 'center'
          }
        }, _react.default.createElement(_reactNative.Text, {
          style: styles.number_texts
        }, value1), _react.default.createElement(_reactNative.Text, {
          style: styles.number_un
        }, unit1), value2 && _react.default.createElement(_reactNative.Text, {
          style: styles.number_texts
        }, value2), unit2 && _react.default.createElement(_reactNative.Text, {
          style: styles.number_un
        }, unit2));
      }

      var itemView = function itemView() {
        if (type === 'time') {
          var _value$hour = value.hour,
              hour = _value$hour === undefined ? '' : _value$hour,
              _value$min = value.min,
              min = _value$min === undefined ? '' : _value$min;

          if (hour) {
            if (min) {
              return textView(hour, 'h', min, 'm');
            } else {
              return textView(hour, 'h');
            }
          } else {
            return textView(min, 'min');
          }
        } else {
          return textView(value, unit);
        }
      };

      return _react.default.createElement(_reactNative.View, {
        style: [styles.header_row]
      }, _react.default.createElement(_reactNative.View, {
        style: styles.header_row_numbers
      }, itemView()), _react.default.createElement(_reactNative.View, {
        style: [styles.header_row_title]
      }, _react.default.createElement(_reactNative.Text, {
        style: styles.number_titles
      }, title)));
    };

    var DateRenderItem = function DateRenderItem(_ref2) {
      var item = _ref2.item,
          children = _ref2.children;
      return _react.default.createElement(_reactNative.View, {
        style: styles.content_row
      }, _react.default.createElement(_reactNative.Text, {
        style: [styles.card_date_texts, {
          marginBottom: (0, _screenAdapte.sizeH)(8)
        }]
      }, item.date), children);
    };

    var RecordsRenderItem = function RecordsRenderItem(_ref3) {
      var record = _ref3.record,
          date = _ref3.date;
      return _react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          props.navigation.navigate("CleanLog", {
            title: _multilingual.default == null ? undefined : _multilingual.default.keyword166,
            data: (0, _objectSpread2.default)({}, record, {
              date: date
            })
          });
        },
        style: [styles.content_card]
      }, _react.default.createE