window.addEventListener("DOMContentLoaded", () => {
    // Récupération du Formulaire
    let formLogin = new Formidable(
        "formLogin",
        ["email", "password"],
        "submit"
    );

    // Quand on soumet le formulaire
    formLogin.getForm().addEventListener("submit", (event) => {
        event.preventDefault();
        formLogin.removeError();
        formLogin.updateUI(Formidable.UI_LOADING);

        let formData = formLogin.getValue("*");
        formData.set("_token", document.getElementById("_token").value);
        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: jsRoute("auth-login-process"),
        };
        new Http().call(config, Formidable.DEFAULT_CALLACK, formLogin);
    });
});
