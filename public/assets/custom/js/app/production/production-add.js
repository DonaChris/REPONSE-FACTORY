const CREATE_PRODUCTION_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    if (reponse.statut) {
        $("#productionModal").modal("hide");
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'Production ajoutée',
                text: "L'ajout de la nouvelle production s'est déroulé avec success",
                showConfirmButton: true,
                confirmButtonColor: '#1e1e1e',
                confirmButtonText: "D'accord"

            },
            {
                confirm: location.href,
                confirmType: Maudia.TYPE_URL,
            }
        );
    } else {
        myFullLoader('off');
        if (reponse.error != null) {
            form.putError(reponse.error);
        }
    }
}


window.addEventListener("DOMContentLoaded", () => {
    const _token = document.getElementById("_token").value;
    let formCreateProduction = new Formidable("formProduction", ["name", "goal", "exception_completion_at"], "submit");

    // Quand on soumet le formulaire de  modification de profil
    formCreateProduction.getForm().addEventListener("submit", (event) => {
        event.preventDefault();
        formCreateProduction.removeError();
        formCreateProduction.updateUI(Formidable.UI_LOADING);
        myFullLoader('on');

        let formData = formCreateProduction.getValue("*");
        formData.set("_token", _token);

        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: jsRoute("app-production-create-process")
        };

        new Http().call(config, CREATE_PRODUCTION_CALLBACK, formCreateProduction);
    })
});