/**
 * @param {*} inputId 
 * @param {*} defaultCountry 
 * @param {*} value 
 * @returns 
 */
function getIntlTelInput(inputId, defaultCountry, defaultCountryCode, phoneNumber) {
    let intlTelInput;
    const phoneInput = document.getElementById(inputId);
    const phoneIndicatif = document.getElementById("indicatif-"+inputId);
    
    if (phoneInput == null) {
        return;
    }

    if (phoneInput != undefined) {
        intlTelInput = window.intlTelInput(phoneInput, {
        initialCountry: defaultCountry,
        separateDialCode: true,
        utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    }

    // Valeur par default
    phoneInput.value = phoneNumber;
    phoneIndicatif.value = defaultCountryCode;

    // Filtrer les valeurs
    phoneInput.addEventListener("keypress", (evt) => {
        if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57) {
            evt.preventDefault();
        }
    })

    // Ecouteur du changement de l'indicatif
    phoneInput.addEventListener("countrychange", () => {
        phoneIndicatif.value = intlTelInput.getSelectedCountryData().dialCode;
    });

    return intlTelInput;
}
