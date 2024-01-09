const NEWSLETTER_SUBSCRIPTION_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    if (reponse.statut) {
        form.get("newsletter-input").value = "";
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'E-mail sauvegardée',
                text: "Vous avez souscrit à notre service de newsletter avec succès",
                showConfirmButton: true,
                confirmButtonColor: '#1e1e1e',
                confirmButtonText: "D'accord"
            });
    } else {
        toastr["error"](reponse.error.general, "Erreur");
    }
}

window.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("form-newsletter") != null) {
        // form
        let formNelleter = new Formidable("form-newsletter", ["newsletter-input"], "newsletter-submit");

        // When submit add /edit  form
        formNelleter.getForm().addEventListener("submit", (event) => {
            event.preventDefault();
            formNelleter.removeError();
            formNelleter.updateUI(Formidable.UI_LOADING);

            let route = jsRoute("website-newsletter-process");
            let formData = formNelleter.getValue("*");
            formData.set('_token', document.getElementById("_token").value)

            let config = {
                method: Http.METHOD_POST,
                data: formData,
                url: route,
            };

            new Http().call(config, NEWSLETTER_SUBSCRIPTION_CALLBACK, formNelleter);
        })
    }
});