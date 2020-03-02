(function() {
  var HousingTypeMap = {
    flat: `Квартира`,
    bungalo: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  var getFeatureNodes = function({ features }) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < features.length; i++) {
      var popupFeatureNode = window.util.createNode({
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
      var popupPhotoNode = window.util.createNode({
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
    var popupNode = window.util.createNode({
      tagName: `article`,
      classNames: [`map__card`, `popup`]
    });

    var popupAvatarNode = window.util.createNode({
      tagName: `img`,
      classNames: [`popup__avatar`]
    });
    popupAvatarNode.src = data.author.avatar;
    popupAvatarNode.alt = `Аватар пользователя`;
    popupAvatarNode.width = 70;
    popupAvatarNode.height = 70;

    var popupCloseNode = window.util.createNode({
      tagName: `button`,
      classNames: [`popup__close`]
    });
    popupCloseNode.type = `button`;
    popupCloseNode.textContent = `Закрыть`;
    popupCloseNode.addEventListener(`click`, function() {
      popupNode.remove();
    });

    var popupTitleNode = window.util.createNode({
      tagName: `h3`,
      classNames: [`popup__title`]
    });
    popupTitleNode.textContent = data.offer.title;

    var popupAddressNode = window.util.createNode({
      tagName: `p`,
      classNames: [`popup__text`, `popup__text--address`]
    });
    popupAddressNode.textContent = data.offer.address;

    var popupPriceSpanNode = window.util.createNode({
      tagName: `span`
    });
    popupPriceSpanNode.textContent = `/ночь`;

    var popupPriceNode = window.util.createNode({
      tagName: `p`,
      classNames: [`popup__text`, `popup__text--price`]
    });
    popupPriceNode.textContent = `${data.offer.price}₽`;
    popupPriceNode.appendChild(popupPriceSpanNode);

    var popupTypeNode = window.util.createNode({
      tagName: `h4`,
      classNames: [`popup__type`]
    });
    popupTypeNode.textContent = HousingTypeMap[data.offer.type];

    var popupCapacityNode = window.util.createNode({
      tagName: `p`,
      classNames: [`popup__text`, `popup__text--capacity`]
    });
    popupCapacityNode.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;

    var popupTimeNode = window.util.createNode({
      tagName: `p`,
      classNames: [`popup__text`, `popup__text--time`]
    });
    popupTimeNode.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

    var popupFeaturesNode = window.util.createNode({
      tagName: `ul`,
      classNames: [`popup__features`]
    });
    popupFeaturesNode.appendChild(
      getFeatureNodes({ features: data.offer.features })
    );

    var popupDescriptionNode = window.util.createNode({
      tagName: `p`,
      classNames: [`popup__description`]
    });
    popupDescriptionNode.textContent = data.offer.description;

    var popupPhotosNode = window.util.createNode({
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

  window.card = {
    generateCard
  };
})();
