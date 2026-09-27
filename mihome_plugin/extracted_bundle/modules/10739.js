1;
    }

    return 0;
  }

  function isNewerVersion439_610() {
    var _Device$extraObj;

    return compareVersions((_Device$extraObj = _miot.Device.extraObj) == null ? undefined : _Device$extraObj.fw_version, VersionMode.Version439_610) > 0;
  }

  function isNewerVersion439_611() {
    var _Device$extraObj2;

    return compareVersions((_Device$extraObj2 = _miot.Device.extraObj) == null ? undefined : _Device$extraObj2.fw_version, VersionMode.Version439_