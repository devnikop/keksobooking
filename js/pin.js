(function() {
  var Element = {
    map: {
      BLOCK: `map`,

      PINS: `map__pins`,
      CURRENT_PIN: `map__pin:not(.map__pin--main)`
    }
  };

  var getElement = {
    get map() {
      return document.querySelector(`.${Element.map.BLOCK}`);
    },

    get mapPins() {
      return this.map.querySelector(`.${Element.map.PINS}`);
    },

    get currentPins() {
      return this.mapPins.querySelectorAll(`.${Element.map.CURRENT_PIN}`);
    }
  };

  var PINS_MAX_COUNT = 5;

  var addCardPopup = function({ data }) {
    var cardNode = window.card.generateCard({ data });
    window.form.mapContainerElement.insertBefore(
      cardNode,
      window.form.mapFiltersElement
    );
  };

  var removeCurrentCardPopup = function() {
    const currentPopup = document.querySelector(`.map__card`);
    if (currentPopup) {
      currentPopup.remove();
    }
  };

  var onPinButtonClick = function() {
    var currentElement = this;

    removeCurrentCardPopup();
    addCardPopup({ data: window.map.offers[currentElement.dataset.id] });
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

    var onPinButtonClickBound = onPinButtonClick.bind(buttonNode);
    buttonNode.addEventListener(`click`, onPinButtonClickBound);

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

    var pinsCount =
      offers.length < PINS_MAX_COUNT ? offers.length : PINS_MAX_COUNT;
    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(generatePinNode({ offer: offers[i] }));
    }

    return fragment;
  };

  var addNewPins = function({ offers }) {
    window.util.removeElements({ elements: getElement.currentPins });
    if (!offers.length) {
      console.log(`empty filteredOffers`);
      return;
    }
    var pinNodes = generatePinNodes({ offers });
    getElement.mapPins.appendChild(pinNodes);
    removeCurrentCardPopup();
    window.pin.addCardPopup({ data: offers[0] });
  };

  window.pin = {
    addNewPins,
    addCardPopup,
    generatePinNodes
  };
})();
