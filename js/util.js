(function() {
  var getRandomNumber = function({ max }) {
    return Math.ceil(Math.random() * max);
  };

  var getRandomItemFromArray = function({ sourceArray }) {
    var randomIndex = getRandomNumber({ max: sourceArray.length }) - 1;
    return sourceArray[randomIndex];
  };

  var findInArray = function({ item, checkArray }) {
    for (var j = 0; j < checkArray.length; j++) {
      if (checkArray[j] === item) {
        return true;
      }
    }
    return false;
  };

  var getRandomInt = function({ min, max }) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var maxInclusive = max + 1;
    return Math.floor(Math.random() * (maxInclusive - min) + min);
  };

  var getShuffledArray = function({
    outputArrayLength,
    sourceArrayLength,
    sourceArray
  }) {
    var outputArray = [];

    var i = 0;
    while (i < outputArrayLength) {
      var sourceRandomIndex = getRandomNumber({ max: sourceArrayLength }) - 1;
      var sourceItem = sourceArray[sourceRandomIndex];

      var isAlreadyExist = findInArray({
        item: sourceItem,
        checkArray: outputArray
      });

      if (isAlreadyExist) {
        continue;
      } else {
        i++;
      }

      outputArray.push(sourceItem);
    }

    return outputArray;
  };

  var getUniqueArray = function({ sourceArray, useAll = false }) {
    var sourceArrayLength = sourceArray.length;
    var outputArrayLength = 0;

    if (useAll) {
      outputArrayLength = sourceArrayLength;
    } else {
      outputArrayLength = getRandomNumber({ max: sourceArrayLength }) - 1;
    }

    var outputArray = getShuffledArray({
      outputArrayLength,
      sourceArrayLength,
      sourceArray
    });

    return outputArray;
  };

  var createNode = function({ tagName, classNames }) {
    var node = document.createElement(tagName);
    if (classNames && classNames.length) {
      for (var i = 0; i < classNames.length; i++) {
        node.classList.add(classNames[i]);
      }
    }
    return node;
  };

  var setNodeDisable = function(element) {
    element.disabled = true;
  };

  var setNodeEnable = function(element) {
    element.disabled = false;
  };

  window.util = {
    getRandomInt,
    getRandomItemFromArray,
    getUniqueArray,
    createNode,
    setNodeDisable,
    setNodeEnable
  };
})();
