(function() {
  var mapContainerElement = document.querySelector(`.map`);
  var mapPinsElements = mapContainerElement.querySelector(`.map__pins`);
  var mapFiltersElement = mapContainerElement.querySelector(
    `.map__filters-container`
  );

  var adFormElement = document.querySelector(`.ad-form`);
  var adFormGroupElements = adFormElement.querySelectorAll(`fieldset`);
  var addressInputElement = adFormElement.querySelector(`#address`);

  var mapFilterElement = mapFiltersElement.querySelector(`.map__filters`);
  var mapFilterSelectElements = mapFilterElement.querySelectorAll(`select`);
  var mapFilterFieldsetElement = mapFilterElement.querySelector(`fieldset`);

  var activateAllForms = function() {
    for (var i = 0; i < adFormGroupElements.length; i++) {
      adFormGroupElements[i].disabled = false;
    }
    for (var i = 0; i < mapFilterSelectElements.length; i++) {
      mapFilterSelectElements[i].disabled = false;
    }
    mapFilterFieldsetElement.disabled = false;
  };

  var startProgram = function() {
    // 2. activate map
    mapContainerElement.classList.remove(`map--faded`);

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
      mapPinsElements.appendChild(pinNodes);
      // 5. generate card & append in .map before .map__filters-container
      window.pin.addCardPopup({ data: offers[0] });
      activateAllForms();
      adFormElement.classList.remove(`ad-form--disabled`);
    };

    var errorHandler = function(errorMessage) {
      var errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      var main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    window.backend.load(successHandler, errorHandler);
  };

  var setAllFormsDisable = function() {
    // 6. disable form elements
    for (var i = 0; i < adFormGroupElements.length; i++) {
      window.util.setNodeDisable(adFormGroupElements[i]);
    }
    // 7. disable filter
    for (var i = 0; i < mapFilterSelectElements.length; i++) {
      window.util.setNodeDisable(mapFilterSelectElements[i]);
    }
    window.util.setNodeDisable(mapFilterFieldsetElement);
  };

  setAllFormsDisable();

  // 8.map-pin--main
  var mapPinMainElement = mapContainerElement.querySelector(`.map__pin--main`);
  mapPinMainElement.addEventListener(
    `mousedown`,
    function(evt) {
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMapPinMousemoveHandler = function(moveEvt) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        mapPinMainElement.style.top =
          mapPinMainElement.offsetTop - shift.y + "px";
        mapPinMainElement.style.left =
          mapPinMainElement.offsetLeft - shift.x + "px";
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
    },
    { once: true }
  );
  // 9.fill address
  addressInputElement.value = `${mapContainerElement.offsetWidth /
    2}, ${mapContainerElement.offsetHeight / 2}`;

  adFormElement.addEventListener(`submit`, function(evt) {
    evt.preventDefault();

    var errorHandler = function(errorMessage) {
      var errorTemplate = document
        .querySelector(`#error`)
        .content.cloneNode(true);

      var main = document.querySelector(`main`);
      document.body.insertBefore(errorTemplate, main);
    };

    window.backend.upload(
      new FormData(adFormElement),
      function(response) {
        response;
      },
      errorHandler
    );
  });

  window.form = {
    mapContainerElement,
    mapFiltersElement,
    startProgram
  };
})();
