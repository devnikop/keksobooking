(function () {
  const URL_UPLOAD = `https://javascript.pages.academy/keksobooking`;
  const URL_LOAD = `https://javascript.pages.academy/keksobooking/data`;

  const upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);
  };

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL_LOAD);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.send();
  };

  window.backend = {
    load,
    upload,
  };
})();
