(function () {
  const Selector = {
    MAP: `.map`,
    MAP_FILTERS_FORM: `.map__filters`,

    MAP_PINS: `.map__pins`,

    HOUSING_TYPE: `#housing-type`,
    HOUSING_PRICE: `#housing-price`,
    HOUSING_ROOMS: `#housing-rooms`,
    HOUSING_QUESTS: `#housing-guests`,
    MAP_CHECKBOX: `.map__checkbox`,
  };

  const $wrapper = document.querySelector(Selector.MAP);

  const $mapFiltersForm = $wrapper.querySelector(Selector.MAP_FILTERS_FORM);

  const $housingPrice = $mapFiltersForm.querySelector(Selector.HOUSING_PRICE);
  const $housingQuests = $mapFiltersForm.querySelector(Selector.HOUSING_QUESTS);
  const $housingRooms = $mapFiltersForm.querySelector(Selector.HOUSING_ROOMS);
  const $housingType = $mapFiltersForm.querySelector(Selector.HOUSING_TYPE);
  const $mapCheckboxes = $mapFiltersForm.querySelectorAll(Selector.MAP_CHECKBOX);

  const filter = {
    TypeMap: {
      flat: `flat`,
      bungalo: `bungalo`,
      house: `house`,
      palace: `palace`,
      any: `any`,
    },

    PriceMap: {
      low: {min: 0, max: 9999},
      middle: {min: 10000, max: 49999},
      high: {min: 50000, max: Infinity},
      any: {min: -Infinity, max: Infinity},
    },

    RoomsMap: {
      1: 1,
      2: 2,
      3: 3,
      any: `any`,
    },

    GuestsMap: {
      0: 0,
      1: 1,
      2: 2,
      any: `any`,
    },

    byType({initialOffers, filterValue}) {
      return initialOffers.filter((offer) => {
        if (filterValue === filter.TypeMap.any) {
          return true;
        }

        return offer.offer.type === filterValue;
      });
    },

    byPrice({initialOffers, filterValue}) {
      const priceRange = filter.PriceMap[filterValue];

      return initialOffers.filter((offer) => {
        const price = offer.offer.price;
        if (price >= priceRange.min && price <= priceRange.max) {
          return true;
        }
        return null;
      });
    },

    byRooms({initialOffers, filterValue}) {
      return initialOffers.filter((offer) => {
        if (filterValue === filter.RoomsMap.any) {
          return true;
        }

        return offer.offer.rooms === +filterValue;
      });
    },

    byGuests({initialOffers, filterValue}) {
      return initialOffers.filter((offer) => {
        if (filterValue === filter.GuestsMap.any) {
          return true;
        }

        return offer.offer.guests === +filterValue;
      });
    },
  };

  const filterElement = {
    type: $housingType,
    price: $housingPrice,
    rooms: $housingRooms,
    guests: $housingQuests,
  };

  const FilterMap = {
    type: filter.byType,
    price: filter.byPrice,
    rooms: filter.byRooms,
    guests: filter.byGuests,
  };

  const handleFormChange = () => {
    const initialOffers = window.map.offers;
    let filteredOffers = initialOffers.slice();

    Object.keys(FilterMap).forEach((item) => {
      filteredOffers = FilterMap[item]({
        initialOffers: filteredOffers,
        filterValue: filterElement[item].value,
      });
    });

    $mapCheckboxes.forEach((checkbox) =>
      checkbox.checked &&
      (filteredOffers = filteredOffers.filter((offer) =>
        offer.offer.features.includes(checkbox.value)
      ))
    );

    window.pin.addNewPins({offers: filteredOffers});
  };

  $mapFiltersForm.addEventListener(`change`, window.debounce(handleFormChange));
})();
