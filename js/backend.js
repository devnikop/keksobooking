(function () {
  var URL_UPLOAD = `https://js.dump.academy/keksobooking`;
  var URL_LOAD = `https://js.dump.academy/keksobooking/data`;

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError("Статус ответа: " + xhr.status + " " + xhr.statusText);
      }
    });

    xhr.open("POST", URL_UPLOAD);
    xhr.send(data);
  };

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open("GET", URL_LOAD);

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError("Статус ответа: " + xhr.status + " " + xhr.statusText);
      }
    });

    xhr.send();
  };

  window.backend = {
    load,
    upload,
  };
})();
