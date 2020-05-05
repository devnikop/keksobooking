(function () {
  const IMAGE_EXTN = [`gif`, `jpg`, `jpeg`, `png`];

  const Selector = {
    AD_FORM_HEADER: `.ad-form-header`,
    FORM_FILE_PREVIEW: `.ad-form-header__preview img`,
    FORM_INPUT_FILE: `.ad-form__field input`,
  };

  const isFileExtMatch = (extensionList, fileName) =>
    extensionList.some((it) => fileName.endsWith(it));

  const $wrapper = document.querySelector(Selector.AD_FORM_HEADER);
  const $inputFile = $wrapper.querySelector(Selector.FORM_INPUT_FILE);
  const $preview = $wrapper.querySelector(Selector.FORM_FILE_PREVIEW);

  const handlerInputFileChange = () => {
    const file = $inputFile.files[0];
    const fileName = file.name.toLowerCase();

    if (isFileExtMatch(IMAGE_EXTN, fileName)) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        $preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  $inputFile.addEventListener(`change`, handlerInputFileChange);
})();
