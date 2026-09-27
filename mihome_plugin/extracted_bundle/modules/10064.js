ow");
  var flowBoundAnnotation = createFlowAnnotation("flow.bound", {
    bound: true
  });
  var flow = (0, _extends3.default)(function flow(arg1, arg2) {
    if (is20223Decorator(arg2)) {
      return flowAnnotation.decorate_20223_(arg1, arg2);
    }

    if (isStringish(arg2)) {
      return storeAnnotation(arg1, arg2, flowAnnotation);
    }

    var generator = arg1;
    var name = generator.name || "<unnamed flow>";

    var res = function res() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = undefined;
      var promise = new Promise(function (resolve, reject) {
        var stepId = 0;
        rejector = reject;

        function onFulfilled(res) {
          pendingPromise = undefined;
          var ret;

          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
          } catch (e) {
            return reject(e);
          }

          next(ret);
        }

        function onRejected(err) {
          pendingPromise = undefined;
          var ret;

          try {
            ret = action(name + " - runid: " + runId + " - yield " + stepId++, gen["throw"]).call(gen, err);
          } catch (e) {
            return reject(e);
          }

          next(ret);
        }

        function next(ret) {
          if (isFu