 _$$_REQUIRE(_dependencyMap[12]);

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
      width = _Dimensions$get.width,
      height = _Dimensions$get.height;

  var maxDistance = 30;
  var minDistance = 1;

  var VirtualDoorsill = function VirtualDoorsill(props) {
    var _points$, _points$2, _points$3, _points$4, _points$5, _points$6, _points$7, _points$8;

    var id = props.id,
        actionType = props.actionType,
        points = props.points