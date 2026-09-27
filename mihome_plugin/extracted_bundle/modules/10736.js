ath.max(n1.length, n2.length); i++) {
      var num1 = n1[i] || 0;
      var num2 = n2[i] || 0;

      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }

    var subVersion1 = v1.split("_")[1] ? Number(v1.split("_")[1]) : 0;
    var subVersion2 = v2.split("_")[1] ? Number(v2.split("_")[1]) : 0;

    if (subVersion1 > subVersion2) {
      return 1;
    } else if (subVersion1 < subVersion2) {
      return -