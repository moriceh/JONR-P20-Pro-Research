tem) {
        return _react.default.createElement(_reactNative.TouchableOpacity, {
          key: item.key,
          style: [styles.listRow, {
            borderColor: selectedChecked === item.key ? "#2CD5AE" : "#E3EBEB"
          }],
          onPress: function onPress() {
            return handleFloorSelection(item.key);
          }
        }, _react.default.createElement(_Mchoice.default, {
          checked: item.key === selectedChecked,
          onPress: function onPress() {
            return handleFloorSelection(item.key);
          }
        }), _react.default.createElement(_reactNative.Text, {
          style: {
            fontWeight: item.key === selectedChecked ? "500" : "400",
           