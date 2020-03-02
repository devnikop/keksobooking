(function() {
  var OfferMock = {
    Avatar: {
      WIDTH: 40,
      HEIGHT: 40
    },
    TITLE_LIST: [
      `Большая уютная квартира`,
      `Маленькая неуютная квартира`,
      `Огромный прекрасный дворец`,
      `Маленький ужасный дворец`,
      `Красивый гостевой домик`,
      `Некрасивый негостеприимный домик`,
      `Уютное бунгало далеко от моря`,
      `Неуютное бунгало по колено в воде`
    ],
    Price: {
      MIN: 1000,
      MAX: 1000000
    },
    TYPE_LIST: [`palace`, `flat`, `house`, `bungalo`],
    Rooms: {
      MIN: 1,
      MAX: 5
    },
    Guests: {
      MIN: 1,
      MAX: 8
    },
    CHECKIN_LIST: [`12:00`, `13:00`, `14:00`],
    CHECKOUT_LIST: [`12:00`, `13:00`, `14:00`],
    FEATURES_LIST: [
      `wifi`,
      `dishwasher`,
      `parking`,
      `washer`,
      `elevator`,
      `conditioner`
    ],
    PHOTOS: [
      `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
      `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
    ],
    CoordX: {
      MIN: 130,
      MAX: 630
    },
    CoordY: {
      MIN: 130,
      MAX: 630
    }
  };

  var getAvatarSrc = function({ index }) {
    return `img/avatars/user0${index}.png`;
  };

  var getTitleText = function({ sourceArray, index }) {
    return sourceArray[index];
  };

  var getAddress = function() {
    return `600, 350`;
  };

  var getPrice = function() {
    return window.util.getRandomInt({
      min: OfferMock.Price.MIN,
      max: OfferMock.Price.MAX
    });
  };

  var getType = function() {
    return window.util.getRandomItemFromArray({
      sourceArray: OfferMock.TYPE_LIST
    });
  };

  var getRoomCount = function() {
    return window.util.getRandomInt({
      min: OfferMock.Rooms.MIN,
      max: OfferMock.Rooms.MAX
    });
  };

  var getGuestCount = function() {
    return window.util.getRandomInt({
      min: OfferMock.Guests.MIN,
      max: OfferMock.Guests.MAX
    });
  };

  var getCheckinTime = function() {
    return window.util.getRandomItemFromArray({
      sourceArray: OfferMock.CHECKIN_LIST
    });
  };

  var getCheckoutTime = function() {
    return window.util.getRandomItemFromArray({
      sourceArray: OfferMock.CHECKOUT_LIST
    });
  };

  var getDescription = function() {
    return ``;
  };

  var getCoordinates = function() {
    var coords = {
      x:
        window.util.getRandomInt({
          min: OfferMock.CoordX.MIN,
          max: OfferMock.CoordX.MAX
        }) -
        OfferMock.Avatar.WIDTH / 2,
      y:
        window.util.getRandomInt({
          min: OfferMock.CoordY.MIN,
          max: OfferMock.CoordY.MAX
        }) -
        OfferMock.Avatar.HEIGHT / 2
    };

    return coords;
  };

  var generateOneOffer = function({ index }) {
    var ordinalIndex = index + 1;

    var coords = getCoordinates();

    return {
      id: index,
      author: {
        avatar: getAvatarSrc({ index: ordinalIndex })
      },
      offer: {
        title: getTitleText({ sourceArray: OfferMock.TITLE_LIST, index }),
        address: `${coords.x}, ${coords.y}`,
        price: getPrice(),
        type: getType(),
        rooms: getRoomCount(),
        guests: getGuestCount(),
        checkin: getCheckinTime(),
        checkout: getCheckoutTime(),
        features: window.util.getUniqueArray({
          sourceArray: OfferMock.FEATURES_LIST
        }),
        description: getDescription(),
        photos: window.util.getUniqueArray({
          sourceArray: OfferMock.PHOTOS,
          useAll: true
        })
      },
      location: {
        x: coords.x,
        y: coords.y
      }
    };
  };

  var generateOffers = function({ count }) {
    for (var arrayOfObjects = [], i = 0; i < count; i++) {
      arrayOfObjects.push(generateOneOffer({ index: i }));
    }
    return arrayOfObjects;
  };

  window.data = generateOffers;
})();
