(function () {
  const PINS_COUNT_MAX = 5;

  const Classname = {
    MAP_PIN: `map__pin`
  };

  const Selector = {
    MAP: `.map`,
    MAP_PINS: `.map__pins`,
    MAP_PINS_CURRENT: `.map__pin:not(.map__pin--main)`
  };

  const $wrapper = document.querySelector(Selector.MAP);
  const $mapPins = $wrapper.querySelector(Selector.MAP_PINS);

  const addCardPopup = ({data}) => {
    const cardNode = window.card.generateCard({data});
    window.form.mapContainerElement.insertBefore(
        cardNode,
        window.form.mapFiltersElement
    );
  };

  const removeCurrentCardPopup = () => {
    const currentPopup = document.querySelector(`.map__card`);
    if (currentPopup) {
      currentPopup.remove();
    }
  };

  const handlerPinClick = (evt) => {
    const currentElement = evt.currentTarget;

    removeCurrentCardPopup();
    addCardPopup({data: window.map.offers[currentElement.dataset.id]});
  };

  const generatePinNode = ({offer}) => {
    const buttonNode = window.util.createNode({
      tagName: `button`,
      classNames: [Classname.MAP_PIN],
    });
    buttonNode.type = `button`;
    buttonNode.dataset.id = offer.id;
    buttonNode.style.top = `${offer.location.y}px`;
    buttonNode.style.left = `${offer.location.x}px`;

    const imgNode = window.util.createNode({tagName: `img`});
    imgNode.src = offer.author.avatar;
    imgNode.width = 40;
    imgNode.height = 40;
    imgNode.alt = offer.offer.title;

    buttonNode.append(imgNode);
    buttonNode.addEventListener(`click`, handlerPinClick);
    return buttonNode;
  };

  const getPinCount = ({offers}) =>
    offers.length < PINS_COUNT_MAX ? offers.length : PINS_COUNT_MAX;

  const generatePinNodes = ({offers}) => {
    const pinsCount = getPinCount({offers});
    const offerList = offers.slice(0, pinsCount);
    return offerList.reduce((acc, offer) => {
      acc.append(generatePinNode({offer}));
      return acc;
    }, document.createDocumentFragment());
  };

  const addNewPins = ({offers}) => {
    const currentPins = $mapPins.querySelectorAll(Selector.MAP_PINS_CURRENT);
    window.util.removeElements({elements: currentPins});
    if (!offers.length) {
      // eslint-disable-next-line no-console
      console.log(`empty filteredOffers`);
      return;
    }
    const pinNodes = generatePinNodes({offers});
    $mapPins.append(pinNodes);
    removeCurrentCardPopup();
    addCardPopup({data: offers[0]});
  };

  window.pin = {
    addNewPins,
  };
})();
