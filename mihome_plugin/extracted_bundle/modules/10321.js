  fn: function fn(value) {
                  return robotStore.setWaterMode(value);
                }
              }, {
                param: _consts.propertyCodes["clean-count"],
                fn: function fn(value) {
                  return robotStore.setCleanCount(value);
                }
              }];
              specsPart2 = [{
                param: _consts.propertyCodes["auto-water-change"],
                fn: function fn(value) {
                  return robotStore.setAutoWaterInstalled(value);
                }
              }, {
                param: _consts.propertyCodes["clean-water-cistern"],
                fn: function fn(value) {
                  return robotStore.setCleanWaterCistern(value);
                }
              }, {
                param: _consts.propertyCodes["drain-cistern"],
                fn: function fn(value) {
                  return robotStore.setDrainCistern(value);
                }
              }, {
                param: _consts.propertyCodes["dust-bag"],
                fn: function fn(value) {
                  return robotStore.setDustBag(value);
                }
              }, {
                param: _consts.propertyCodes["mop-clean-tank"],
                fn: function fn(value) {
                  return robotStore.setMopCleanTank(value);
                }
              }];

              if ((0, _version.isNewerVersion439_628)()) {
                specsPart2.push({
                  param: _con