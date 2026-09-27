(target, options)[$mobx];
      ownKeys(descriptors).forEach(function (key) {
        adm.extend_(key, descriptors[key], !annotations ? true : key in annotations ? annotations[key] : true);
      });
    });
    return target;
  }

  function getDependencyTree(thing, property) {
    return nodeToDependencyTree(getAtom(thing, property));
  }

  function nodeToDependencyTree(node) {
    var result = {
      name: node.name_
    };

    if (node.observing_ && node.observing_.length > 0) {
      result.dependencies = unique(node.observing_).map(nodeToDependencyTr