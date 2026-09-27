++;
          var neighbors = (_ref9 = (_graphRelations$find2 = graphRelations.find(function (item) {
            return item[node];
          })) == null ? undefined : _graphRelations$find2[node]) != null ? _ref9 : [];
          neighbors.forEach(function (neighbor) {
            if (!coloredNodes[neighbor]) {
              colorNode(neighbor);
            }
          });
          break;
        }
      }
    }

    graphRelations.forEach(function (rela