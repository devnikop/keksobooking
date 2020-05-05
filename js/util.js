(function () {
  const createNode = ({tagName, classNames = []}) => {
    const node = document.createElement(tagName);
    if (classNames.length) {
      classNames.forEach((className) => {
        node.classList.add(className);
      });
    }
    return node;
  };

  const setNodeDisable = (element) => {
    element.disabled = true;
  };

  const setNodeEnable = (element) => {
    element.disabled = false;
  };

  const removeElements = ({elements}) =>
    elements.forEach((element) => element.remove());

  window.util = {
    createNode,
    setNodeDisable,
    setNodeEnable,
    removeElements,
  };
})();
