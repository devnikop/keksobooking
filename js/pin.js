(function() {
  var addCardPopup = function({ data }) {
    var cardNode = window.card.generateCard({ data });
    window.form.mapContainerElement.insertBefore(
      cardNode,
      window.form.mapFiltersElement
    );
  };

  var generatePinNode = function({ offer }) {
    var buttonNode = window.util.createNode({
      tagName: `button`,
      classNames: [`map__pin`]
    });
    buttonNode.type = `button`;
    buttonNode.dataset.id = offer.id;
    buttonNode.style.top = `${offer.location.y}px`;
    buttonNode.style.left = `${offer.location.x}px`;
    buttonNode.addEventListener(`click`, function() {
      const currentPopup = document.querySelector(`.map__card`);
      if (currentPopup) {
        currentPopup.remove();
      }
      addCardPopup({ data: window.map.offers[buttonNode.dataset.id] });
    });

    var imgNode = window.util.createNode({ tagName: `img` });
    imgNode.src = offer.author.avatar;
    imgNode.width = 40;
    imgNode.height = 40;
    imgNode.draggable = false;
    imgNode.alt = offer.offer.title;

    buttonNode.appendChild(imgNode);
    return buttonNode;
  };

  var generatePinNodes = function({ offers }) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      fragment.appendChild(generatePinNode({ offer: offers[i] }));
    }

    return fragment;
  };

  window.pin = {
    addCardPopup,
    generatePinNodes
  };
})();
