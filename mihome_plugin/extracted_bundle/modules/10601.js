   None: 0,
    IconName: 1,
    NoneSelected: 2,
    IconNameSelected: 3,
    SequenceNumber: 4,
    selectedAndOtherIconName: 5
  });
  exports.AreaTipType = AreaTipType;

  var AreaTipView = function AreaTipView(props) {
    var x = props.x,
        y = props.y,
        tipType = props.tipType,
        iconType = props.iconType,
        id = props.id,
        name = props.name,
        sequePriority = props.sequePriority,
        isSelected = props.isSelect