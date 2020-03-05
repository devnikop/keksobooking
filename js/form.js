(function() {
  var Element = {
    map: {
      BLOCK: `map`,
      FADED: `map--faded`,

      PIN_MAIN: `map__pin--main`,
      PINS: `map__pins`,
      FILTERS_CONTAINER: `map__filters-container`,
      FILTERS_FORM: `map__filters`,
      FEATURES: `map__features`
    },
    adForm: {
      BLOCK: `ad-form`,
      DISABLED: `ad-form--disabled`,

      ADDRESS_INPUT: `address`
    }
  };

  var getElement = {
    get map() {
      return document.querySelector(`.${Element.map.BLOCK}`);
    },

    get mapPinMain() {
      return this.map.querySelector(`.${Element.map.PIN_MAIN}`);
    },

    get mapPins() {
      return this.map.querySelector(`.${Element.map.PINS}`);
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
    }
  };

  var disableAllForms = function() {
    getElement.allAdFormGroup.forEach(groupEl =>
      window.util.setNodeDisable(groupEl)
    );
    getElement.allMapFiltersSelect.forEach(filterEl =>
      window.util.setNodeDisable(filterEl)
    );
    window.util.setNodeDisable(getElement.mapFeatures);
  };

  var activateAllForms = function() {
    getElement.allAdFormGroup.forEach(groupEl =>
      window.util.setNodeEnable(groupEl)
    );
    getElement.allMapFiltersSelect.forEach(filterEl =>
      window.util.setNodeEnable(filterEl)
    );
    window.util.setNodeEnable(getElement.mapFeatures);
    getElement.adForm.classList.remove(Element.adForm.DISABLED);
  };

  var startProgram = function() {
    var activateMap = function() {
      getElement.map.classList.remove(Element.map.FADED);
    };

    var successHandler = function(offers) {
      offers.forEach((offer, index) => {
        offer.id = index;
      });
      window.map = {
        offers
      };
      // 3. generate "#pin" elements
      var pinNodes = window.pin.generatePinNodes({ offers });
      // 4. append pins in '.map__pins'
      getElement.mapPins.appendChild(pinNodes);
      // 5. generate card & append in .map before .map__filters-container
      window.pin.addCardPopup({ data: offers[0] });
      activateAllForms();
    };

    var errorHandler = function(errorMessage) {
      var errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      var main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    activateMap();
    window.backend.load(successHandler, errorHandler);
  };

  // 8.map-pin--main
  var onMapPinMainMousedownHandler = function(evt) {
    var currentElement = this;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMapPinMousemoveHandler = function(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      currentElement.style.top = currentElement.offsetTop - shift.y + "px";
      currentElement.style.left = currentElement.offsetLeft - shift.x + "px";
    };

    var removeMapPinHandlers = function() {
      document.removeEventListener(`mousemove`, onMapPinMousemoveHandler);
      document.removeEventListener(`mouseup`, onMapPinMouseupHandler);
    };

    var onMapPinMouseupHandler = function() {
      window.form.startProgram();
      removeMapPinHandlers();
    };

    document.addEventListener(`mousemove`, onMapPinMousemoveHandler);
    document.addEventListener(`mouseup`, onMapPinMouseupHandler);
  };

  getElement.mapPinMain.addEventListener(
    `mousedown`,
    onMapPinMainMousedownHandler,
    {
      once: true
    }
  );
  // 9.fill address
  getElement.addressInput.value = `${getElement.map.offsetWidth /
    2}, ${getElement.map.offsetHeight / 2}`;

  getElement.adForm.addEventListener(`submit`, function(evt) {
    evt.preventDefault();

    var errorHandler = function(errorMessage) {
      var errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      var main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    window.backend.upload(
      new FormData(getElement.adForm),
      function(response) {
        response;
      },
      errorHandler
    );
  });

  disableAllForms();

  window.form = {
    mapContainerElement: getElement.map,
    mapFiltersElement: getElement.mapFiltersContainer,
    startProgram
  };
})();
