
class ProductFavoriteModule {

    #callback;

    reverseBtnLikedStatut = (btnAddFavorite, targetStatus = null) => {
        if (btnAddFavorite.querySelector(".favorite-icon") != null) {
            btnAddFavorite.querySelector(".favorite-icon").classList.remove("fa-heart", "fa-regular");
            if (btnAddFavorite.getAttribute("data-status") == "like") {
                btnAddFavorite.setAttribute("data-status", "unlike");
                btnAddFavorite.querySelector(".favorite-text").textContent = "Retirer des favoris";
                btnAddFavorite.querySelector(".favorite-icon").classList.add("fa", "fa-heart");
            } else {
                btnAddFavorite.setAttribute("data-status", "like");
                btnAddFavorite.querySelector(".favorite-text").textContent = "Ajouté aux favoris";
                btnAddFavorite.querySelector(".favorite-icon").classList.add("fa-regular", "fa-heart");
            }
        } else {
            if (targetStatus != null && targetStatus != btnAddFavorite.getAttribute("data-status"))
                if (btnAddFavorite.getAttribute("data-status") == "like") {
                    btnAddFavorite.setAttribute("data-status", "unlike");
                } else {
                    btnAddFavorite.setAttribute("data-status", "like");
                }
        }
    }

    USER_INTERACTION_CALLBACK = (reponse) => {
        let btnAddFavoriteCopy = document.querySelector(".btn-add-favorite[data-target='" + reponse.data.target + "']");
        btnAddFavoriteCopy.removeAttribute('disabled');

        if (reponse.statut) {
            btnAddFavoriteCopy.setAttribute('data-status', reponse.data.newStatus)
            this.reverseBtnLikedStatut(btnAddFavoriteCopy, reponse.data.newStatus)
            if (reponse.data.newStatus == "unlike") {
                globalToastify("💔😪 Produit retiré des favoris", "info");
            } else {
                globalToastify("💖🔥  Produit ajoutés au favoris", "success");
            }
            console.log(this.#callback)
            if (this.#callback != null) {
                (this.#callback)(btnAddFavoriteCopy.closest("div.product-bloc"));
            }
        } else {
            this.reverseBtnLikedStatut(btnAddFavoriteCopy);
            globalToastify(reponse.error.general != "" ? reponse.error.general : "error", "error");
        }
    }

    constructor(getCallback = null) {
        let btnAddFavorites = document.querySelectorAll(".btn-add-favorite");
        this.#callback = getCallback;

        // When click on product favorite
        if (btnAddFavorites != null) {
            btnAddFavorites.forEach(btnAddFavorite => {

                btnAddFavorite.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // check if user is connected
                    if (document.getElementById('is-auth').value == "false") {
                        globalToastify("⚠️ Connectez-vous, pour l'ajouter à vos favoris");
                        return;
                    }

                    btnAddFavorite.disabled = true;
                    // update ui liked
                    this.reverseBtnLikedStatut(btnAddFavorite);
                    // save user preference
                    let route = jsRoute("app-product-switch-favorite-process");
                    let formData = new FormData();
                    formData.set('_token', document.getElementById('_token').value);
                    formData.set('product', btnAddFavorite.dataset.target);

                    let config = {
                        method: Http.METHOD_POST,
                        data: formData,
                        url: route,
                    };

                    new Http().call(config, this.USER_INTERACTION_CALLBACK);
                })
            });
        }

    }

}