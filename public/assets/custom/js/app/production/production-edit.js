const EDIT_PRODUCTION_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    if (reponse.statut) {
        $("#productionModal").modal("hide");
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'Modification effectuée',
                text: "Les modification ont été effectuée avec success",
                showConfirmButton: true,
                confirmButtonColor: '#1e1e1e',
                confirmButtonText: "D'accord"

            },
            {
                confirm: location.href,
                confirmType: Maudia.TYPE_URL
            }
        );
    } else {
        myFullLoader('off');
        if (reponse.error != null) {
            form.putError(reponse.error)
        }
    }
}

const CLOSED_PRODUCTION = (production) => {
    myFullLoader('on');
    let formData = new FormData();
    formData.set("_token", document.getElementById("_token").value)
    formData.set("closed_status", "2")

    let config = {
        method: Http.METHOD_POST,
        data: formData,
        url: jsRoute("app-production-edit-process", { production: production.id })
    };
    new Http().call(config, (reponse) => {
        if (reponse.statut) {
            location.href = location.href
        } else {
            alert("Un probleme est survenu, veuillez réessayer plus tard")
            myFullLoader('off');
        }
    });
}


window.addEventListener("DOMContentLoaded", () => {
    let formEditProduction = new Formidable("formProduction", ["name", "goal", "exception_completion_at"], "submit")
    let production = JSON.parse(document.getElementById('production-data-input').value)
    const btnCloseProduction = document.getElementById('btn-close-production')

    // Quand on soumet le formulaire de  modification de profil
    formEditProduction.getForm().addEventListener("submit", (event) => {
        event.preventDefault();
        formEditProduction.removeError();
        formEditProduction.updateUI(Formidable.UI_LOADING);
        myFullLoader('on');

        let formData = formEditProduction.getValue("*");
        formData.set("_token", document.getElementById("_token").value);

        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: jsRoute("app-production-edit-process", { production: production.id })
        };

        new Http().call(config, EDIT_PRODUCTION_CALLBACK, formEditProduction);
    })

    if (btnCloseProduction) {
        btnCloseProduction.addEventListener("click", () => {
            new Maudia().confirmationDialog(
                {
                    title: "Cloturation",
                    text: "Voulez-vous vraiment vous cloturer cette production ?",
                    showCancelButton: true,
                    confirmButtonColor: "#e85347",
                    cancelButtonColor: "#000000",
                    cancelButtonText: "Annuler",
                    confirmButtonText: "Clöturer",
                },
                {
                    confirm: [() => {
                        myFullLoader('on')
                        CLOSED_PRODUCTION(production)
                    }, {}],
                    confirmType: Maudia.TYPE_FUNCTION,
                }
            );
        })
    }
});