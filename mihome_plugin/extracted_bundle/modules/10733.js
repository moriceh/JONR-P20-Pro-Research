9_648: "4.3.9_0648",
    Version439_681: "4.3.9_0681",
    Version439_698: "4.3.9_0698",
    Version439_699: "4.3.9_0699",
    Version439_756: "4.3.9_0756"
  });

  function compareVersions(v1, v2) {
    if (!v1) return -1;

    var normalize = function normalize(version) {
      return version.split("_")[0].split(".").map(Number);
    };

    var _ref = [normalize(v1), normalize(v2)],
        n1 = _ref[0],
        n2 = _ref[1];

    for (var i = 0; i < M