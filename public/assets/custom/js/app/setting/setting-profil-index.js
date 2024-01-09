const SETTING_PROFIL_DETAIL_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    myFullLoader('off');
    if (reponse.statut) {
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'Profil modifié',
                text: "Informations de profil mis à jour",
                showConfirmButton: true,
                confirmButtonColor: '#1e1e1e',
                confirmButtonText: "D'accord"
            });
    } else {
        if (reponse.error != null) {
            form.putError(reponse.error);
        }
    }
}

const SETTING_PROFIL_PASSWORD_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    myFullLoader('off');
    if (reponse.statut) {
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'Mot de passe modifié',
                text: "Modification de votre mot de passe s'est effectué avec succès",
                showConfirmButton: true,
                confirmButtonColor: '#1e1e1e',
                confirmButtonText: "D'accord"
            });
        form.get('current-password').value = "";
        form.get('new-password').value = "";
    } else {
        if (reponse.error != null) {
            form.putError(reponse.error);
        }
    }
}


window.addEventListener("DOMContentLoaded", () => {
    const _token = document.getElementById("_token").value;
    let userDetail = JSON.parse(document.getElementById('global-user-detail').value);
    let formProfil = new Formidable("formDetail", ["fullname", "image", "phone", "indicatif-phone", "email", "sexe", "birthday"], "submit");
    let formPassword = new Formidable("formPassword", ["current-password", "new-password"], "submit-password");

    // init img picker
    imgPreviewPicker("#btn-change-profil-picture", "#image", ".previewer-img");

    // init phone input
    getIntlTelInput("phone", userDetail.format.phone.codeIso, userDetail.format.phone.code, userDetail.format.phone.number);

    // Quand on soumet le formulaire de  modification de profil
    formProfil.getForm().addEventListener("submit", (event) => {
        event.preventDefault();
        formProfil.removeError();
        formProfil.updateUI(Formidable.UI_LOADING);
        myFullLoader('on');

        let formData = formProfil.getValue("*");
        formData.set("_token", _token);
        formData.set("phone", document.getElementById("indicatif-phone").value + "_" + formProfil.getValue("phone"));

        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: jsRoute("app-my-account-process")
        };

        new Http().call(config, SETTING_PROFIL_DETAIL_CALLBACK, formProfil);
    })

    // Quand on soumet le formulaire de  modification de mot de passe
    formPassword.getForm().addEventListener("submit", (event) => {
        event.preventDefault();
        formPassword.removeError();
        formPassword.updateUI(Formidable.UI_LOADING);
        myFullLoader('on');

        let formData = formPassword.getValue("*");
        formData.set("_token", _token);

        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: jsRoute("app-my-account-password-process")
        };

        new Http().call(config, SETTING_PROFIL_PASSWORD_CALLBACK, formPassword);
    })
});