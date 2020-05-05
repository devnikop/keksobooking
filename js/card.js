(function () {
  const Classname = {
    MAP_CARD: `map__card`,

    POPUP_AVATAR: `popup__avatar`,
    POPUP_CLOSE: `popup__close`,
    POPUP_DESCRIPTION: `popup__description`,
    POPUP_FEATURE: `popup__feature`,
    POPUP_FEATURES: `popup__features`,
    POPUP_PHOTO: `popup__photo`,
    POPUP_PHOTOS: `popup__photos`,
    POPUP_TEXT_ADDRESS: `popup__text--address`,
    POPUP_TEXT_CAPACITY: `popup__text--capacity`,
    POPUP_TEXT_PRICE: `popup__text--price`,
    POPUP_TEXT_TIME: `popup__text--time`,
    POPUP_TEXT: `popup__text`,
    POPUP_TITLE: `popup__title`,
    POPUP_TYPE: `popup__type`,
    POPUP: `popup`,
  };

  const HousingTypeMap = {
    flat: `Квартира`,
    bungalo: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`,
  };

  const getFeatureNodes = ({features}) =>
    features.reduce((acc, feature) => {
      const popupFeatureNode = window.util.createNode({
        tagName: `li`,
        classNames: [
          Classname.POPUP_FEATURE,
          `${Classname.POPUP_FEATURE}--${feature}`
        ],
      });
      acc.append(popupFeatureNode);
      return acc;
    }, document.createDocumentFragment());

  const getPopupPhotoNodes = ({photos}) =>
    photos.reduce((acc, photo) => {
      const popupPhotoNode = window.util.createNode({
        tagName: `img`,
        classNames: [Classname.POPUP_PHOTO],
      });
      popupPhotoNode.src = photo;
      popupPhotoNode.alt = `Фотография жилья`;
      popupPhotoNode.width = 45;
      popupPhotoNode.height = 40;

      acc.append(popupPhotoNode);
      return acc;
    }, document.createDocumentFragment());

  const generateCard = ({data}) => {
    const popupNode = window.util.createNode({
      tagName: `article`,
      classNames: [Classname.MAP_CARD, Classname.POPUP],
    });

    const popupAvatarNode = window.util.createNode({
      tagName: `img`,
      classNames: [Classname.POPUP_AVATAR],
    });
    popupAvatarNode.src = data.author.avatar;
    popupAvatarNode.alt = `Аватар пользователя`;
    popupAvatarNode.width = 70;
    popupAvatarNode.height = 70;

    const popupCloseNode = window.util.createNode({
      tagName: `button`,
      classNames: [Classname.POPUP_CLOSE],
    });
    popupCloseNode.type = `button`;
    popupCloseNode.textContent = `Закрыть`;
    popupCloseNode.addEventListener(`click`, () => popupNode.remove());

    const popupTitleNode = window.util.createNode({
      tagName: `h3`,
      classNames: [Classname.POPUP_TITLE],
    });
    popupTitleNode.textContent = data.offer.title;

    const popupAddressNode = window.util.createNode({
      tagName: `p`,
      classNames: [Classname.POPUP_TEXT, Classname.POPUP_TEXT_ADDRESS],
    });
    popupAddressNode.textContent = data.offer.address;

    const popupPriceSpanNode = window.util.createNode({
      tagName: `span`,
    });
    popupPriceSpanNode.textContent = `/ночь`;

    const popupPriceNode = window.util.createNode({
      tagName: `p`,
      classNames: [Classname.POPUP_TEXT, Classname.POPUP_TEXT_PRICE],
    });
    popupPriceNode.textContent = `${data.offer.price}₽`;
    popupPriceNode.append(popupPriceSpanNode);

    const popupTypeNode = window.util.createNode({
      tagName: `h4`,
      classNames: [Classname.POPUP_TYPE],
    });
    popupTypeNode.textContent = HousingTypeMap[data.offer.type];

    const popupCapacityNode = window.util.createNode({
      tagName: `p`,
      classNames: [Classname.POPUP_TEXT, Classname.POPUP_TEXT_CAPACITY],
    });
    popupCapacityNode.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`;

    const popupTimeNode = window.util.createNode({
      tagName: `p`,
      classNames: [Classname.POPUP_TEXT, Classname.POPUP_TEXT_TIME],
    });
    popupTimeNode.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

    const popupFeaturesNode = window.util.createNode({
      tagName: `ul`,
      classNames: [Classname.POPUP_FEATURES],
    });
    popupFeaturesNode.append(
        getFeatureNodes({features: data.offer.features})
    );

    const popupDescriptionNode = window.util.createNode({
      tagName: `p`,
      classNames: [Classname.POPUP_DESCRIPTION],
    });
    popupDescriptionNode.textContent = data.offer.description;

    const popupPhotosNode = window.util.createNode({
      tagName: `div`,
      classNames: [Classname.POPUP_PHOTOS],
    });
    popupPhotosNode.append(
        getPopupPhotoNodes({photos: data.offer.photos})
    );

    popupNode.append(popupAvatarNode);
    popupNode.append(popupCloseNode);
    popupNode.append(popupTitleNode);
    popupNode.append(popupAddressNode);
    popupNode.append(popupPriceNode);
    popupNode.append(popupTypeNode);
    popupNode.append(popupCapacityNode);
    popupNode.append(popupTimeNode);
    popupNode.append(popupFeaturesNode);
    popupNode.append(popupDescriptionNode);
    popupNode.append(popupPhotosNode);

    return popupNode;
  };

  window.card = {
    generateCard,
  };
})();
