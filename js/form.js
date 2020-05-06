(function () {
  const Import = {
    addNewPins: window.pin.addNewPins,
    load: window.backend.load,
    setNodeDisable: window.util.setNodeDisable,
    setNodeEnable: window.util.setNodeEnable,
    upload: window.backend.upload,
  };

  const Classname = {
    AD_FORM_DISABLED: `ad-form--disabled`,
    MAP_FADED: `map--faded`,
  };

  const Selector = {
    AD_FORM_ADDRESS_INPUT: `#address`,
    AD_FORM: `.ad-form`,
    FIELDSET: `fieldset`,
    MAP_FEATURES: `.map__features`,
    MAP_FILTERS_FORM: `.map__filters`,
    MAP_PIN_MAIN: `.map__pin--main`,
    MAP: `.map`,
    SELECT: `select`,
    MAIN: `main`,
    ERROR: `#error`
  };

  // #region DOM nodes
  const $adForm = document.querySelector(Selector.AD_FORM);
  const $map = document.querySelector(Selector.MAP);
  const $main = document.querySelector(Selector.MAIN);
  const $errorTemplate = document.querySelector(Selector.ERROR);

  const $adFormAddressInput = $adForm.querySelector(Selector.AD_FORM_ADDRESS_INPUT);
  const $adFormGroups = $adForm.querySelectorAll(Selector.FIELDSET);
  const $mapFiltersForm = $map.querySelector(Selector.MAP_FILTERS_FORM);
  const $mapPinMain = $map.querySelector(Selector.MAP_PIN_MAIN);

  const $mapFeatures = $mapFiltersForm.querySelector(Selector.MAP_FEATURES);
  const $mapFiltersSelects = $mapFiltersForm.querySelectorAll(Selector.SELECT);
  // #endregion

  const disableAllForms = () => {
    $adFormGroups.forEach((groupEl) => Import.setNodeDisable(groupEl));
    $mapFiltersSelects.forEach((filterEl) => Import.setNodeDisable(filterEl));
    Import.setNodeDisable($mapFeatures);
  };

  const activateAllForms = () => {
    $adFormGroups.forEach((groupEl) => Import.setNodeEnable(groupEl));
    $mapFiltersSelects.forEach((filterEl) => Import.setNodeEnable(filterEl));
    Import.setNodeEnable($mapFeatures);
    $adForm.classList.remove(Classname.AD_FORM_DISABLED);
  };

  const startProgram = () => {
    const activateMap = () => $map.classList.remove(Classname.MAP_FADED);

    const successHandler = (offers) => {
      offers.forEach((offer, index) => {
        offer.id = index;
      });
      window.map = {offers};
      Import.addNewPins({offers});
      activateAllForms();
    };

    const errorHandler = (errorMessage) => {
      document.body.insertBefore($errorTemplate.content.cloneNode(true), $main);
    };

    activateMap();
    Import.load(successHandler, errorHandler);
  };

  // 8.map-pin--main
  const handlerPinMousedown = (evt) => {
    const currentElement = evt.target;

    const startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const handlerPinMousemove = (moveEvt) => {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      currentElement.style.top = currentElement.offsetTop - shift.y + `px`;
      currentElement.style.left = currentElement.offsetLeft - shift.x + `px`;
    };

    const removeMapPinHandlers = () => {
      document.removeEventListener(`mousemove`, handlerPinMousemove);
      document.removeEventListener(`mouseup`, handlerPinMouseup);
    };

    const handlerPinMouseup = () => {
      startProgram();
      removeMapPinHandlers();
    };

    document.addEventListener(`mousemove`, handlerPinMousemove);
    document.addEventListener(`mouseup`, handlerPinMouseup);
  };

  $mapPinMain.addEventListener(`mousedown`, handlerPinMousedown, {once: true});

  // 9.fill address
  $adFormAddressInput.value = `${$map.offsetWidth / 2}, ${
    $map.offsetHeight / 2
  }`;

  $adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const errorHandler = (errorMessage) => {
      document.body.insertBefore($errorTemplate.content.cloneNode(true), $main);
    };

    Import.upload(new FormData($adForm), (response) => response, errorHandler);
  });

  disableAllForms();
})();
