1]);

  var mapConfig = {
    mapColor: {
      defaultColor: {
        "0": '#00000000',
        "1": '#CC6D7D7D',
        "2": '#FFD6E4E4'
      },
      originMapColors: ['#FFBFE8E4', '#FFF1E5B6', '#FFC5DAF6', '#FFF4CDBD'],
      highlightMapColors: ['#FF2CD5AE', '#FFEDC357', '#FF7AAFF5', '#FFEA6025'],
      originMapColor: '#FFE1E5E9'
    }
  };

  var objectConvertBase64String = function objectConvertBase64String(obj) {
    try {
      if (!obj || typeof obj !== 'o