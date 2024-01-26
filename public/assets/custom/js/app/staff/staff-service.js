export class StaffService {
    static #URL_ADD_NAME = "app-staff-add-process"

    static create(moreData, formAdd, callback) {
        // Quand on soumet le formulaire de  modification de profil
        formAdd.getForm().addEventListener("submit", (event) => {
            event.preventDefault();
            formAdd.removeError();
            formAdd.updateUI(Formidable.UI_LOADING);
            myFullLoader('on');

            let formData = formAdd.getValue("*");
            formData.set("_token", document.getElementById("_token").value);

            let config = {
                method: Http.METHOD_POST,
                data: formData,
                url: jsRoute(StaffService.#URL_ADD_NAME, { production: moreData.staffId })
            };

            new Http().call(config, (form, reponse) => {
                form.updateUI(Formidable.UI_REPOSE);
                if (reponse.statut) {
                    $("#" + moreData.formModalRef).modal("hide");
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

                if (callback) {
                    callback(reponse)
                }
            }, formAdd);
        })
    }
}