2.sent;

            if (!(!fileInfo || !fileInfo.path)) {
              _context2.next = 13;
              break;
            }

            errorMessage = fileInfo ? fileInfo.message : 'No fileInfo available';
            throw new Error("\u6587\u4EF6\u4E0B\u8F7D\u5931\u8D25: " + errorMessage);

          case 13:
            _logger.default.d('地图列表下载文件成功:');

            _context2.next = 16;
            return _regenerator.default.awrap(_miot.Host == null ? undefined : (_Host$file = _miot.Host.file) == null ? undefined : _Host$file.readFile(obj_name));

          case 16:
            fileContent = _context2.sent;

            if (!(!fileContent || (fileContent == null ? undefined : fileContent.code) !== undefined)) {
              _context2.next = 20;
              break;
            }

            _errorMessage2 = fileContent ? fileContent == null ? undefined : fileContent.message : 'Failed to read file content';
            throw new Error("Error in readFile: " + _errorMessage2 + ", fileName: " + obj_name);

          case 20:
            _logger.default.d('地图列表读取文件成功:');

            return _context2.abrupt("return", parseJSON(fileContent, obj_name));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](1);

            if (!(retryCount > 0)) {
              _context2.next = 31;
              break;
            }

            _logger.default.d("Retrying getMapInfos FileContent... (" + retryCount + " retries left)");

            _context2.next = 30;
            return _regenerator.default.awrap(new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            }));

          case 30:
            return _context2.abrupt("return", getMapInfosFileContent(obj_name, retryCount - 1));

          case 31:
            _logger.default.e('Error in getMapInfosFileContent:', _context2.t0, obj_name);

            return _context2.abrupt("return", null);

          case 33:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 24]]);
  }

  function isFileExists(fileName) {
    return _miot.Host.file.isFileExists(fileName);
  }

  function getFileDownloadUrl(obj_name, pwd) {
    var res, fileInfo, errorMessage, errorCode;
    return _regenerator.default.async(function getFileDownloadUrl$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _regenerator.default.awrap(_miot.Service.callSmartHomeAPI('/v2/home/getfileurl_v3', {
              did: _miot.Device.deviceID,
              obj_name: obj_name
            }));

          case 3:
            res = _context3.sent;

            if (!(res && res.url)) {
              _context3.next = 17;
              break;
            }

            _logger.default.d('++++++++++++++++++地图列表文件url', res.url);

            _context3.next = 8;
            return _regenerator.default.awrap(_miot.Host.file.downloadFile(res.url, obj_name));

          case 8:
            fileInfo = _context3.sent;

            if (!(fileInfo && fileInfo.path)) {
              _context3.next = 13;
              break;
            }

            return _context3.abrupt("return", fileInfo.path);

          case 13:
            errorMessage = fileInfo ? fileInfo.message : 'No fileInfo available';
            throw new Error("Error in downloadFile: " + errorMessage);

          case 15:
            _context3.next = 19;
            break;

          case 17:
            errorCode = res ? res.code : 'No response';
            throw new Error("API returned an error with code: " + errorCode);

          case 19:
            _context3.next = 25;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](0);

            _logger.default.e('Error in getFileDownloadUrl:', _context3.t0);

            throw _context3.t0;

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 21]]);
  }

  function readFile(fileName) {
    var fileContent, errorMessage;
    return _regenerator.default.async(function readFile$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _regenerator.default.awrap(_miot.Host.file.readFile(fileName));

          cas