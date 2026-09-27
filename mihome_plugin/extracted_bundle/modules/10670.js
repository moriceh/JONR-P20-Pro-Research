bject') {
        throw new Error('Invalid object or empty object provided.');
      }

      var jsonStr = JSON.stringify(obj);

      var base64Str = _base.default.encode(jsonStr);

      return base64Str;
    } catch (error) {
      return '';
    }
  };

  exports.objectConvertBase64String = objectConvertBase64String;

  var colorMapping = _lodash.default.memoize(function (_ref) {
    var areas = _ref.areas,
        selectedAreas = _ref.selectedArea