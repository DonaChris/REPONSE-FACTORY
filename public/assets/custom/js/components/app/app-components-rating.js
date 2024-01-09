function ratingInteraction() {
    let rattingButtons = document.querySelectorAll(".rating-bloc i");
    if (rattingButtons != null) {
        rattingButtons.forEach(rattingButton => {
            // when click on rating button indice
            rattingButton.addEventListener("click", () => {
                // Save rate indice
                document.getElementById("new-comment-rate").value = rattingButton.dataset.indice;
                // unactvie all rating button indice
                rattingButtons.forEach(ratButton => {
                    // acti from 1 to current index
                    if (parseInt(ratButton.dataset.indice) <= parseInt(rattingButton.dataset.indice)) {
                        if (!ratButton.classList.contains('is-active')) {
                            ratButton.classList.add('is-active')
                        }
                    } else {
                        ratButton.classList.remove('is-active')
                    }
                })

            })

            // when hover the rating button indice
        })
    }
}

function clearRating(input = null) {
    // removing start from each start indicator
    document.querySelectorAll(".rating-bloc i").forEach(ratingStar => {
        ratingStar.classList.remove("is-active");
    });

    if (input != null) {
        document.querySelectorAll(input).forEach(input => {
            input.value = "";
        })
    }
}

const SEND_REVIEW_CALLBACK = (form, reponse) => {
    form.updateUI(Formidable.UI_REPOSE);
    if (reponse.statut) {
        // clear form content
        form.get("new-comment-rate").value = "";
        form.get("new-comment-text").value = "";
        // clear rating star
        clearRating();
        // swal response
        new Maudia().confirmationDialog(
            {
                icon: 'success',
                title: 'Commentaire reçu',
                text: reponse.success.message,
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

window.addEventListener("DOMContentLoaded", () => {

    // form
    let formSendReviews = new Formidable("new-comment-form", ["app-product-id", "new-comment-rate", "new-comment-text"], "new-comment-submit");

    // When submit add comment
    formSendReviews.getForm().addEventListener("submit", (event) => {
        event.preventDefault();

        // check if user is connected
        if (document.getElementById('is-auth').value == "false") {
            globalToastify("⚠️ Vous devrez d'abord vous connecter");
            return;
        }

        formSendReviews.removeError();
        formSendReviews.updateUI(Formidable.UI_LOADING);

        let route = jsRoute("app-product-reviews-add-process");
        let formData = formSendReviews.getValue("*");
        formData.set('_token', document.getElementById('_token').value);

        let config = {
            method: Http.METHOD_POST,
            data: formData,
            url: route,
        };

        new Http().call(config, SEND_REVIEW_CALLBACK, formSendReviews);
    })

    // bind rating interaction ui
    ratingInteraction();
});