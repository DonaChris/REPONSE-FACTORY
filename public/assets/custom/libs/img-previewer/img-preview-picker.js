function imgPreviewPicker(btn, input, previewer) {
    let button = document.querySelector(btn);
    let fileInput = document.querySelector(input);
    let imgPreviewer = document.querySelector(previewer);

    // Show image moal
    button.addEventListener("click", () => {
        fileInput.click();
    })

    // load preview
    fileInput.addEventListener("change", () => {
        if (fileInput != null && fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgPreviewer.setAttribute('src', e.target.result);
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    })
}