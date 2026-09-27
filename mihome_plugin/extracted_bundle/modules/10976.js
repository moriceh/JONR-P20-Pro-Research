s"], [param]);
  }

  function setCarpetMarking(params) {
    var paramStr = JSON.stringify(params);
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["carpet-marking"], [paramStr]);
  }

  function carpetPreference(params) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["carpet-preference"], [params]);
  }

  function bitTest(params) {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["bit-test"], [params]);
  }

  function enterBitMode() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["enter-bit-mode"]);
  }

  function quitBitMode() {
    return (0, _resourcesAdapter.doSpecAction)(_consts.actionCodes["quit-bit-mode"]);
  }

  var _default = {
    bitTest: bitTest,
    enterBitMode: enterBitMode,
    quitBitMode: quitBitMode,
    setcarpetcleantwice: setcarpetcleantwice,
    setca