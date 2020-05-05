(function () {
  var FILE_TYPES = ["gif", "jpg", "jpeg", "png"];

  var getElement = {
    Selector: {
      AD_FORM_HEADER: `.ad-form-header`,
      FORM_FILE_PREVIEW: `.ad-form-header__preview img`,
      FORM_INPUT_FILE: `.ad-form__field input`,
    },

    get adFormHeader() {
      return document.querySelector(this.Selector.AD_FORM_HEADER);
    },

    get filePreview() {
      return this.adFormHeader.querySelector(this.Selector.FORM_FILE_PREVIEW);
    },

    get formInputFile() {
      return this.adFormHeader.querySelector(this.Selector.FORM_INPUT_FILE);
    },
  };

  var fileChooser = getElement.formInputFile;
  var preview = getElement.filePreview;

  fileChooser.addEventListener(`change`, function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
