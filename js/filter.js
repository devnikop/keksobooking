(function() {
  var Element = {
    map: {
      BLOCK: `map`,

      FILTERS_FORM: `map__filters`,
      PINS: `map__pins`,

      HOUSING_TYPE: `housing-type`,
      HOUSING_PRICE: `housing-price`,
      HOUSING_ROOMS: `housing-rooms`,
      HOUSING_QUESTS: `housing-guests`,
      HOUSING_FEATURES: `housing-features`
    }
  };

  var getElement = {
    get map() {
      return document.querySelector(`.${Element.map.BLOCK}`);
    },

    get mapPins() {
      return this.map.querySelector(`.${Element.map.PINS}`);
    },

    get mapFiltersForm() {
      return this.map.querySelector(`.${Element.map.FILTERS_FORM}`);
    },

    get housingType() {
      return this.mapFiltersForm.querySelector(`#${Element.map.HOUSING_TYPE}`);
    },

    get housingPrice() {
      return this.mapFiltersForm.querySelector(`#${Element.map.HOUSING_PRICE}`);
    },

    get housingRooms() {
      return this.mapFiltersForm.querySelector(`#${Element.map.HOUSING_ROOMS}`);
    },

    get housingQuests() {
      return this.mapFiltersForm.querySelector(
        `#${Element.map.HOUSING_QUESTS}`
      );
    },

    get housingFeatures() {
      return this.mapFiltersForm.querySelector(
        `#${Element.map.HOUSING_FEATURES}`
      );
    }
  };

  var filter = {
    TypeMap: {
      flat: `flat`,
      bungalo: `bungalo`,
      house: `house`,
      palace: `palace`,
      any: `any`
    },

    PriceMap: {
      low: { min: 0, max: 9999 },
      middle: { min: 10000, max: 49999 },
      high: { min: 50000, max: Infinity },
      any: { min: -Infinity, max: Infinity }
    },

    RoomsMap: {
      1: 1,
      2: 2,
      3: 3,
      any: `any`
    },

    GuestsMap: {
      0: 0,
      1: 1,
      2: 2,
      any: `any`
    },

    byType: function({ initialOffers, filterValue }) {
      return initialOffers.filter(function(offer) {
        if (filterValue === filter.TypeMap.any) {
          return true;
        }

        return offer.offer.type === filterValue;
      });
    },

    byPrice: function({ initialOffers, filterValue }) {
      var priceRange = filter.PriceMap[filterValue];

      return initialOffers.filter(function(offer) {
        var price = offer.offer.price;
        if (price >= priceRange.min && price <= priceRange.max) {
          return true;
        }
      });
    },

    byRooms: function({ initialOffers, filterValue }) {
      return initialOffers.filter(function(offer) {
        if (filterValue === filter.RoomsMap.any) {
          return true;
        }

        return offer.offer.rooms === +filterValue;
      });
    },

    byGuests: function({ initialOffers, filterValue }) {
      return initialOffers.filter(function(offer) {
        if (filterValue === filter.GuestsMap.any) {
          return true;
        }

        return offer.offer.guests === +filterValue;
      });
    }
  };

  var onFilterFormChange = function() {
    var typeElement = getElement.housingType;
    var priceElement = getElement.housingPrice;
    var roomsElement = getElement.housingRooms;
    var guestsElement = getElement.housingQuests;

    var initialOffers = window.map.offers;
    var filteredOffers = initialOffers.slice();

    filteredOffers = filter.byType({
      initialOffers: filteredOffers,
      filterValue: typeElement.value
    });

    filteredOffers = filter.byPrice({
      initialOffers: filteredOffers,
      filterValue: priceElement.value
    });

    filteredOffers = filter.byRooms({
      initialOffers: filteredOffers,
      filterValue: roomsElement.value
    });

    filteredOffers = filter.byGuests({
      initialOffers: filteredOffers,
      filterValue: guestsElement.value
    });

    window.pin.addNewPins({ offers: filteredOffers });
  };

  getElement.mapFiltersForm.addEventListener(`change`, onFilterFormChange);
})();
