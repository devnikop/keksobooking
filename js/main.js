"use strict";

var OFFER_COUNT = 8;
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

var getRandomNumber = function({ max }) {
  return Math.ceil(Math.random() * max);
};

var getRandomInt = function({ min, max }) {
  min = Math.ceil(min);
  max = Math.floor(max);
  var maxInclusive = max + 1;
  return Math.floor(Math.random() * (maxInclusive - min) + min);
};

var getRandomItemFromArray = function({ sourceArray }) {
  var randomIndex = getRandomNumber({ max: sourceArray.length }) - 1;
  return sourceArray[randomIndex];
};

var findInArray = function({ item, checkArray }) {
  for (var j = 0; j < checkArray.length; j++) {
    if (checkArray[j] === item) {
      return true;
    }
  }
  return false;
};

var getShuffledArray = function({
  outputArrayLength,
  sourceArrayLength,
  sourceArray
}) {
  var outputArray = [];

  var i = 0;
  while (i < outputArrayLength) {
    var sourceRandomIndex = getRandomNumber({ max: sourceArrayLength }) - 1;
    var sourceItem = sourceArray[sourceRandomIndex];

    var isAlreadyExist = findInArray({
      item: sourceItem,
      checkArray: outputArray
    });

    if (isAlreadyExist) {
      continue;
    } else {
      i++;
    }

    outputArray.push(sourceItem);
  }

  return outputArray;
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
  return getRandomInt({ min: OfferMock.Price.MIN, max: OfferMock.Price.MAX });
};

var getType = function() {
  return getRandomItemFromArray({ sourceArray: OfferMock.TYPE_LIST });
};

var getRoomCount = function() {
  return getRandomInt({ min: OfferMock.Rooms.MIN, max: OfferMock.Rooms.MAX });
};

var getGuestCount = function() {
  return getRandomInt({
    min: OfferMock.Guests.MIN,
    max: OfferMock.Guests.MAX
  });
};

var getCheckinTime = function() {
  return getRandomItemFromArray({ sourceArray: OfferMock.CHECKIN_LIST });
};

var getCheckoutTime = function() {
  return getRandomItemFromArray({ sourceArray: OfferMock.CHECKOUT_LIST });
};

var getDescription = function() {
  return ``;
};

var getUniqueArray = function({ sourceArray, useAll = false }) {
  var sourceArrayLength = sourceArray.length;
  var outputArrayLength = 0;

  if (useAll) {
    outputArrayLength = sourceArrayLength;
  } else {
    outputArrayLength = getRandomNumber({ max: sourceArrayLength }) - 1;
  }

  var outputArray = getShuffledArray({
    outputArrayLength,
    sourceArrayLength,
    sourceArray
  });

  return outputArray;
};

var getCoordinates = function() {
  var coords = {
    x:
      getRandomInt({
        min: OfferMock.CoordX.MIN,
        max: OfferMock.CoordX.MAX
      }) -
      OfferMock.Avatar.WIDTH / 2,
    y:
      getRandomInt({
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
      features: getUniqueArray({ sourceArray: OfferMock.FEATURES_LIST }),
      description: getDescription(),
      photos: getUniqueArray({ sourceArray: OfferMock.PHOTOS, useAll: true })
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

var mapContainerElement = document.querySelector(`.map`);
var mapPinsElements = mapContainerElement.querySelector(`.map__pins`);

var generatePinNode = function({ offer }) {
  var buttonNode = document.createElement(`button`);
  buttonNode.classList.add(`map__pin`);
  buttonNode.type = `button`;
  buttonNode.style.top = `${offer.location.y}px`;
  buttonNode.style.left = `${offer.location.x}px`;

  var imgNode = document.createElement(`img`);
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

// 1. generate offers
var offers = generateOffers({ count: OFFER_COUNT });
console.log(offers);
// 2. activate map
mapContainerElement.classList.remove(`map--faded`);
// 3. generate "#pin" elements
var pinNodes = generatePinNodes({ offers });
// 4. append pins in '.map__pins'
mapPinsElements.appendChild(pinNodes);
