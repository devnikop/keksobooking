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

var HousingTypeMap = {
  flat: `Квартира`,
  bungalo: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};

var createNode = function({ tagName, classNames }) {
  var node = document.createElement(tagName);
  if (classNames && classNames.length) {
    for (var i = 0; i < classNames.length; i++) {
      node.classList.add(classNames[i]);
    }
  }
  return node;
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

var generatePinNode = function({ offer }) {
  var buttonNode = createNode({
    tagName: `button`,
    classNames: [`map__pin`]
  });
  buttonNode.type = `button`;
  buttonNode.dataset.id = offer.id;
  buttonNode.style.top = `${offer.location.y}px`;
  buttonNode.style.left = `${offer.location.x}px`;
  buttonNode.addEventListener(`click`, function() {
    const currentPopup = document.querySelector(`.map__card`);
    currentPopup.remove();
    addCardPopup({ data: offers[buttonNode.dataset.id] });
  });

  var imgNode = createNode({ tagName: `img` });
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

var getFeatureNodes = function({ features }) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var popupFeatureNode = createNode({
      tagName: `li`,
      classNames: [`popup__feature`, `popup__feature--${features[i]}`]
    });
    fragment.appendChild(popupFeatureNode);
  }
  return fragment;
};

var getPopupPhotoNodes = function({ photos }) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    var photo = photos[i];
    var popupPhotoNode = createNode({
      tagName: `img`,
      classNames: [`popup__photo`]
    });
    popupPhotoNode.src = photo;
    popupPhotoNode.alt = `Фотография жилья`;
    popupPhotoNode.width = 45;
    popupPhotoNode.height = 40;
    fragment.appendChild(popupPhotoNode);
  }
  return fragment;
};

var generateCard = function({ data }) {
  var popupNode = createNode({
    tagName: `article`,
    classNames: [`map__card`, `popup`]
  });

  var popupAvatarNode = createNode({
    tagName: `img`,
    classNames: [`popup__avatar`]
  });
  popupAvatarNode.src = data.author.avatar;
  popupAvatarNode.alt = `Аватар пользователя`;
  popupAvatarNode.width = 70;
  popupAvatarNode.height = 70;

  var popupCloseNode = createNode({
    tagName: `button`,
    classNames: [`popup__close`]
  });
  popupCloseNode.type = `button`;
  popupCloseNode.textContent = `Закрыть`;
  popupCloseNode.addEventListener(`click`, function() {
    popupNode.remove();
  });

  var popupTitleNode = createNode({
    tagName: `h3`,
    classNames: [`popup__title`]
  });
  popupTitleNode.textContent = data.offer.title;

  var popupAddressNode = createNode({
    tagName: `p`,
    classNames: [`popup__text`, `popup__text--address`]
  });
  popupAddressNode.textContent = data.offer.address;

  var popupPriceSpanNode = createNode({
    tagName: `span`
  });
  popupPriceSpanNode.textContent = `/ночь`;

  var popupPriceNode = createNode({
    tagName: `p`,
    classNames: [`popup__text`, `popup__text--price`]
  });
  popupPriceNode.textContent = `${data.offer.price}₽`;
  popupPriceNode.appendChild(popupPriceSpanNode);

  var popupTypeNode = createNode({
    tagName: `h4`,
    classNames: [`popup__type`]
  });
  popupTypeNode.textContent = HousingTypeMap[data.offer.type];

  var popupCapacityNode = createNode({
    tagName: `p`,
    classNames: [`popup__text`, `popup__text--capacity`]
  });
  popupCapacityNode.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;

  var popupTimeNode = createNode({
    tagName: `p`,
    classNames: [`popup__text`, `popup__text--time`]
  });
  popupTimeNode.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  var popupFeaturesNode = createNode({
    tagName: `ul`,
    classNames: [`popup__features`]
  });
  popupFeaturesNode.appendChild(
    getFeatureNodes({ features: data.offer.features })
  );

  var popupDescriptionNode = createNode({
    tagName: `p`,
    classNames: [`popup__description`]
  });
  popupDescriptionNode.textContent = data.offer.description;

  var popupPhotosNode = createNode({
    tagName: `div`,
    classNames: [`popup__photos`]
  });
  popupPhotosNode.appendChild(
    getPopupPhotoNodes({ photos: data.offer.photos })
  );

  popupNode.appendChild(popupAvatarNode);
  popupNode.appendChild(popupCloseNode);
  popupNode.appendChild(popupTitleNode);
  popupNode.appendChild(popupAddressNode);
  popupNode.appendChild(popupPriceNode);
  popupNode.appendChild(popupTypeNode);
  popupNode.appendChild(popupCapacityNode);
  popupNode.appendChild(popupTimeNode);
  popupNode.appendChild(popupFeaturesNode);
  popupNode.appendChild(popupDescriptionNode);
  popupNode.appendChild(popupPhotosNode);

  return popupNode;
};

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

var addCardPopup = function({ data }) {
  var cardNode = generateCard({ data });
  mapContainerElement.insertBefore(cardNode, mapFiltersElement);
};

var startProgram = function() {
  // 2. activate map
  mapContainerElement.classList.remove(`map--faded`);
  // 3. generate "#pin" elements
  var pinNodes = generatePinNodes({ offers });
  // 4. append pins in '.map__pins'
  mapPinsElements.appendChild(pinNodes);
  // 5. generate card & append in .map before .map__filters-container
  addCardPopup({ data: offers[0] });
  activateAllForms();
  adFormElement.classList.remove(`ad-form--disabled`);
};

var setNodeDisable = function(element) {
  element.disabled = true;
};

var setNodeEnable = function(element) {
  element.disabled = false;
};

var setAllFormsDisable = function() {
  // 6. disable form elements
  for (var i = 0; i < adFormGroupElements.length; i++) {
    setNodeDisable(adFormGroupElements[i]);
  }
  // 7. disable filter
  for (var i = 0; i < mapFilterSelectElements.length; i++) {
    setNodeDisable(mapFilterSelectElements[i]);
  }
  setNodeDisable(mapFilterFieldsetElement);
};

// 1. generate offers
var offers = generateOffers({ count: OFFER_COUNT });
setAllFormsDisable();

// 8.map-pin--main
var mapPinMainElement = mapContainerElement.querySelector(`.map__pin--main`);
mapPinMainElement.addEventListener(
  `mouseup`,
  function() {
    startProgram();
  },
  { once: true }
);
// 9.fill address
addressInputElement.value = `${mapContainerElement.offsetWidth /
  2}, ${mapContainerElement.offsetHeight / 2}`;
