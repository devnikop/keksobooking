(function () {
  const getRandomNumber = ({max}) => {
    return Math.ceil(Math.random() * max);
  };

  const getRandomItemFromArray = ({sourceArray}) => {
    const randomIndex = getRandomNumber({max: sourceArray.length}) - 1;
    return sourceArray[randomIndex];
  };

  const findInArray = ({item, checkArray}) => {
    for (let j = 0; j < checkArray.length; j++) {
      if (checkArray[j] === item) {
        return true;
      }
    }
    return false;
  };

  const getRandomInt = ({min, max}) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const maxInclusive = max + 1;
    return Math.floor(Math.random() * (maxInclusive - min) + min);
  };

  const getShuffledArray = ({
    outputArrayLength,
    sourceArrayLength,
    sourceArray,
  }) => {
    const outputArray = [];

    let i = 0;
    while (i < outputArrayLength) {
      const sourceRandomIndex = getRandomNumber({max: sourceArrayLength}) - 1;
      const sourceItem = sourceArray[sourceRandomIndex];

      const isAlreadyExist = findInArray({
        item: sourceItem,
        checkArray: outputArray,
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

  const getUniqueArray = ({sourceArray, useAll = false}) => {
    const sourceArrayLength = sourceArray.length;
    let outputArrayLength = 0;

    if (useAll) {
      outputArrayLength = sourceArrayLength;
    } else {
      outputArrayLength = getRandomNumber({max: sourceArrayLength}) - 1;
    }

    const outputArray = getShuffledArray({
      outputArrayLength,
      sourceArrayLength,
      sourceArray,
    });

    return outputArray;
  };

  const createNode = ({tagName, classNames}) => {
    const node = document.createElement(tagName);
    if (classNames && classNames.length) {
      for (let i = 0; i < classNames.length; i++) {
        node.classList.add(classNames[i]);
      }
    }
    return node;
  };

  const setNodeDisable = (element) => {
    element.disabled = true;
  };

  const setNodeEnable = (element) => {
    element.disabled = false;
  };

  const removeElements = ({elements}) => {
    elements.forEach((element) => {
      element.remove();
    });
  };

  window.util = {
    getRandomInt,
    getRandomItemFromArray,
    getUniqueArray,
    createNode,
    setNodeDisable,
    setNodeEnable,
    removeElements,
  };
})();
