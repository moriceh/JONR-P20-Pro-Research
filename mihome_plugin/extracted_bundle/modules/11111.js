xports.flipOutY = exports.flipOutX = exports.flipInY = exports.flipInX = undefined;
  var flipInX = {
    easing: 'ease-in',
    style: {
      backfaceVisibility: 'visible',
      perspective: 400
    },
    0: {
      opacity: 0,
      rotateX: '90deg'
    },
    0.4: {
      rotateX: '-20deg'
    },
    0.6: {
      opacity: 1,
      rotateX: '10deg'
    },
    0.8: {
      rotateX: '-5deg'
    },
 