"use strict";

var OFFER_COUNT = 8;

// var getRandomNumber = function() {
//   return Math.ceil(Math.random() * 8);
// };

var getAvatarSrc = function({ index }) {
  return `img/avatars/user0${index}.png`;
};

var generateOneOffer = function({ index }) {
  return {
    author: {
      avatar: getAvatarSrc({ index })
    },
    offer: {
      title: "",
      address: "",
      price: "",
      type: "",
      rooms: "",
      guests: "",
      checkin: "",
      checkout: "",
      features: "",
      description: "",
      photos: ""
    },
    location: {
      x: "",
      y: ""
    }
  };
};

var generateOffers = function({ count }) {
  for (var arrayOfObjects = [], i = 1; i <= count; i++) {
    arrayOfObjects.push(generateOneOffer({ index: i }));
  }
  return arrayOfObjects;
};

var offers = generateOffers({ count: OFFER_COUNT });

console.log(offers);
