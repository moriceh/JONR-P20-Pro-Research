ee);
    }

    return result;
  }

  function getObserverTree(thing, property) {
    return nodeToObserverTree(getAtom(thing, property));
  }

  function nodeToObserverTree(node) {
    var result = {
      name: node.name_
    };

    if (hasObservers(node)) {
      result.observers = Array.from(getObservers(node)).map(nodeToObserverTree);
    }

    return result;
  }

  function unique(list) {
    return Array.from(new Set(list));
  }

  var generatorId = 0;

  function FlowCancellationError() {
    this.message = "FLOW_CANCELLED";
  }

  FlowCancellationError.prototype = Object.create(Error.prototype);

  function isFlowCancellationError(error) {
    return error instanceof FlowCancellationError;
  }

  var flowAnnotation = createFlowAnnotation("fl