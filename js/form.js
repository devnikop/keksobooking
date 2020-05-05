(function () {
  const Element = {
    map: {
      BLOCK: `map`,
      FADED: `map--faded`,

      PIN_MAIN: `map__pin--main`,
      FILTERS_CONTAINER: `map__filters-container`,
      FILTERS_FORM: `map__filters`,
      FEATURES: `map__features`,
    },
    adForm: {
      BLOCK: `ad-form`,
      DISABLED: `ad-form--disabled`,

      ADDRESS_INPUT: `address`,
    },
  };

  const getElement = {
    get map() {
      return document.querySelector(`.${Element.map.BLOCK}`);
    },

    get mapPinMain() {
      return this.map.querySelector(`.${Element.map.PIN_MAIN}`);
    },

    get mapFiltersContainer() {
      return this.map.querySelector(`.${Element.map.FILTERS_CONTAINER}`);
    },

    get adForm() {
      return document.querySelector(`.${Element.adForm.BLOCK}`);
    },

    get allAdFormGroup() {
      return this.adForm.querySelectorAll(`fieldset`);
    },

    get addressInput() {
      return this.adForm.querySelector(`#${Element.adForm.ADDRESS_INPUT}`);
    },

    get mapFiltersForm() {
      return this.mapFiltersContainer.querySelector(
          `.${Element.map.FILTERS_FORM}`
      );
    },

    get allMapFiltersSelect() {
      return this.mapFiltersForm.querySelectorAll(`select`);
    },

    get mapFeatures() {
      return this.mapFiltersForm.querySelector(`.${Element.map.FEATURES}`);
    },
  };

  const disableAllForms = () => {
    getElement.allAdFormGroup.forEach((groupEl) =>
      window.util.setNodeDisable(groupEl)
    );
    getElement.allMapFiltersSelect.forEach((filterEl) =>
      window.util.setNodeDisable(filterEl)
    );
    window.util.setNodeDisable(getElement.mapFeatures);
  };

  const activateAllForms = () => {
    getElement.allAdFormGroup.forEach((groupEl) =>
      window.util.setNodeEnable(groupEl)
    );
    getElement.allMapFiltersSelect.forEach((filterEl) =>
      window.util.setNodeEnable(filterEl)
    );
    window.util.setNodeEnable(getElement.mapFeatures);
    getElement.adForm.classList.remove(Element.adForm.DISABLED);
  };

  const startProgram = () => {
    const activateMap = () => {
      getElement.map.classList.remove(Element.map.FADED);
    };

    const successHandler = (offers) => {
      offers.forEach((offer, index) => {
        offer.id = index;
      });
      window.map = {offers};
      window.pin.addNewPins({offers});
      activateAllForms();
    };

    const errorHandler = (errorMessage) => {
      const errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      const main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    activateMap();
    window.backend.load(successHandler, errorHandler);
  };

  // 8.map-pin--main
  const handlerPinMousedown = (evt) => {
    const currentElement = evt.target;

    const startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMapPinMousemoveHandler = (moveEvt) => {
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      currentElement.style.top = currentElement.offsetTop - shift.y + `px`;
      currentElement.style.left = currentElement.offsetLeft - shift.x + `px`;
    };

    const removeMapPinHandlers = () => {
      document.removeEventListener(`mousemove`, onMapPinMousemoveHandler);
      document.removeEventListener(`mouseup`, onMapPinMouseupHandler);
    };

    const onMapPinMouseupHandler = () => {
      window.form.startProgram();
      removeMapPinHandlers();
    };

    document.addEventListener(`mousemove`, onMapPinMousemoveHandler);
    document.addEventListener(`mouseup`, onMapPinMouseupHandler);
  };

  getElement.mapPinMain.addEventListener(
      `mousedown`,
      handlerPinMousedown,
      {
        once: true,
      }
  );
  // 9.fill address
  getElement.addressInput.value = `${getElement.map.offsetWidth / 2}, ${
    getElement.map.offsetHeight / 2
  }`;

  getElement.adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    const errorHandler = (errorMessage) => {
      const errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      const main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    window.backend.upload(
        new FormData(getElement.adForm),
        (response) => {
          response;
        },
        errorHandler
    );
  });

  disableAllForms();

  window.form = {
    mapContainerElement: getElement.map,
    mapFiltersElement: getElement.mapFiltersContainer,
    startProgram,
  };
})();
