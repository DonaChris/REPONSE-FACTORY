class Maudia {

    static TYPE_URL = "url";
    static TYPE_FUNCTION = "function";

    static TYPE_CONFIRM = "confirm";
    static TYPE_CANCEL = "cancel";

    /**
     * 
     * @param {*} config json de swal
     * @param {*} callback {confirm: , cancel:, typeConfirm, typeCancel}
     */
    confirmationDialog(config, callback = null) {
        Swal.fire(config)

        // Colorié en noir le text du boutton, parceque par défault, ça vient en couleur blanche
        document.querySelector('button.swal2-confirm.swal2-styled').style.color = "#364a63";

        // Parceque ça place le bouton retour à droite, et non à gauche 
        // Je suis donc obligé d'écouter le click sur le bouton retour
        document.querySelector('button.swal2-cancel.swal2-styled').addEventListener("click", () => {
            this.callBacker(Maudia.TYPE_CANCEL, callback);
        });

        document.querySelector('button.swal2-confirm.swal2-styled').addEventListener("click", () => {
            this.callBacker(Maudia.TYPE_CONFIRM, callback);
            Swal.close();
        });
    }


    /**
     * 
     * @param {*} type url ou function
     * @param {*} callback le lien, la fonction meme
     */
    callBacker(type, callback) {
        if (callback != null && callback[type] != undefined && callback[type] != null) {
            if (callback[type + "Type"] == Maudia.TYPE_FUNCTION) {
                let func = callback[type][0];
                func(callback[type][1]);
            } else if (callback[type + "Type"] == Maudia.TYPE_URL) {
                location.href = callback[type];
            }
        }
    }

}