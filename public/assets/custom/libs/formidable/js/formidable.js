class Formidable {

    form = null;
    formElement = [];
    formInputIds = [];
    formBtnSubmit;

    static ELEMENT_FORM = "form";
    static ELEMENT_INPUT = "formInputIds";
    static ELEMENT_BTN = "submit";

    static #ELEMENT_PROPERTY_SHOW = "show";
    static #ELEMENT_PROPERTY_HIDE = "hide";
    static #ELEMENT_PROPERTY_LOCK = "lock";
    static #ELEMENT_PROPERTY_UNLOCK = "unlock";

    static ATTRIBUTE_REQUIRE = "required";

    static ALL = "*";

    static UI_LOADING = false;
    static UI_REPONSE = true;

    /**
     * 
     * @param {string} form : l'id du formulaire
     * @param {Array} formInputIds : la liste des ids des input, textarea...
     * @param {string} btnSubmitId : l'id du bouton submit
     */
    constructor(form, formInputIds, btnSubmitId) {
        this.formInputIds = formInputIds;
        this.register(Formidable.ELEMENT_FORM, form);
        this.register(Formidable.ELEMENT_INPUT, formInputIds);
        this.register(Formidable.ELEMENT_BTN, btnSubmitId);

        // Hide error ui when user change Input Value 
        //this.addOnEvent(Formidable.ELEMENT_INPUT, "change");

        // Animation smooth
        this.getForm().style.transition = ".2s ease-in-out";
    }

    register(type, target) {
        switch (type) {
            case Formidable.ELEMENT_FORM:
                this.form = target;
                break;

            case Formidable.ELEMENT_INPUT:
                let objInput = new Object();
                target.forEach(formInputId => {
                    objInput[formInputId] = document.getElementById(formInputId);
                });
                this.formElement = objInput;
                break;

            case Formidable.ELEMENT_BTN:
                this.formBtnSubmit = target;
                break;
        }
    }

    // Add Event listener
    // #addOnEvent(element = Formidable.ELEMENT_INPUT, event) {
    //     // let targetElements = [];
    //     // if ( typeof element == 'object' ) {
    //     //     this.formElement
    //     //     array.forEach(element => {

    //     //     });
    //     // }

    // }

    // UI methode
    /**
     * @param {bool} onPause 
     * @description true = vue principale
     * @description false = en cours d'un traitement
     */
    updateUI(onPause = true) {
        this.getForm().style.opacity = (onPause) ? 1 : .4;
        this.getSubmitBtn("spin-progress").style.display = (onPause) ? "none" : "inline-block";
        this.getSubmitBtn("text").style.display = (onPause) ? "block" : "none";
        this.getSubmitBtn("bloc").disabled = (onPause) ? false : true;
    }

    getSubmitBtn(tag = "bloc") {
        let element;
        if (tag == "spin-progress") {
            element = document.querySelector("#" + this.formBtnSubmit + " > span.spin-progress");
        } else if (tag == "text") {
            element = document.querySelector("#" + this.formBtnSubmit + " > span.text");
        } else if (tag == "bloc") {
            element = document.querySelector("#" + this.formBtnSubmit);
        }
        return element;
    }

    submit() {
        this.getSubmitBtn().click();
    }

    show(element = Formidable.ALL) {
        this.updateElementUI(element, Formidable.#ELEMENT_PROPERTY_SHOW);
    }

    hide(element = Formidable.ALL) {
        this.updateElementUI(element, Formidable.#ELEMENT_PROPERTY_HIDE);
    }

    lock(element = Formidable.ALL) {
        this.updateElementUI(element, Formidable.#ELEMENT_PROPERTY_LOCK);
    }

    unlock(element = Formidable.ALL) {
        this.updateElementUI(element, Formidable.#ELEMENT_PROPERTY_UNLOCK);
    }

    updateElementUI(element, property) {
        let elementsTarget = this.elementsGetter(element);

        Object.entries(elementsTarget).forEach(input => {
            let inputId = input[0];
            let inputElement = input[1];
            switch (property) {
                case Formidable.#ELEMENT_PROPERTY_SHOW:
                case Formidable.#ELEMENT_PROPERTY_HIDE:
                    this.formElement[inputId].style.display = property == Formidable.#ELEMENT_PROPERTY_SHOW ? "block" : "hide";
                    break;

                case Formidable.#ELEMENT_PROPERTY_LOCK:
                    this.formElement[inputId].setAttribute("readonly", "readonly");
                    break;

                case Formidable.#ELEMENT_PROPERTY_UNLOCK:
                    this.formElement[inputId].removeAttribute("readonly");
                    break;
            }
        });
    }

    hideBtnSubmit() {
        this.getSubmitBtn("bloc").style.display = "none";
    }

    showBtnSubmit() {
        this.getSubmitBtn("bloc").style.display = "block";
    }

    removeAttribute(attribute, target) {
        let targetElements = this.elementsGetter(target);
        Object.entries(targetElements).forEach(targetElement => {
            targetElement[1].removeAttribute(attribute);
        })
    }

    setAttribute(target, attribute, value = null) {
        let targetElements = this.elementsGetter(target);
        Object.entries(targetElements).forEach(targetElement => {
            targetElement[1].setAttribute(attribute, value != null ? value : "");
        })
    }

    /***
     * Retourne le résultat du getElementById du formulaire
     */
    getForm() {
        return document.getElementById(this.form);
    }

    get(element) {
        return this.formElement[element] ? this.formElement[element] : null;
    }

    getValue(inputs = Formidable.ALL) {
        let objValue;

        if (inputs == Formidable.ALL) {
            let elementsTarget = this.elementsGetter(inputs);
            objValue = new FormData();
            Object.entries(elementsTarget).forEach(element => {
                if (element[1] != null) {
                    if (element[1].tagName.toLowerCase() == 'input' && element[1].type == 'file') {
                        objValue.append([element[0]], (element[1]).files[0]);
                    } else {
                        objValue.append([element[0]], (element[1]).value);
                    }
                } else {
                    objValue.append([element[0]], (element[1]).value);
                }
            })
        } else {
            objValue = document.getElementById(inputs).value;
        }

        return objValue;
    }

    static getCheckedValue(inputName) {
        let checkBoxes = document.querySelectorAll("input[name='" + inputName + "']");
        checkBoxes.forEach(checkBox => {
            if (checkBox.checked) {
                return checkBox.value;
            }
        });
    }

    getRadioValue(inputName) {

    }

    /**
     * @param object ({inputId : value}) les valeurs a remplir dans les champs suivant les clés
     */
    setValue(json) {
        if (Object.keys(json).length > 0) {
            Object.keys(json).forEach(key => {
                this.formElement[key].value = json[key];
            })
        }
    }

    /**
     * @name removeError
     * @param *string *object : Inputs liste des ids des éléments sur lequel on veux agir
     */
    removeError(inputs = Formidable.ALL) {
        let elementsToClear = this.elementsGetter(inputs);
        if (Object.keys(elementsToClear).length > 0) {
            Object.entries(elementsToClear).forEach(element => {
                let inputId = element[0];
                let input = element[1];
                // Remove Red Border
                if (input != undefined && input.classList.contains("formidabable-input-error")) {
                    input.classList.remove("formidabable-input-error");
                }
                // Hide error span if exist
                let errorDiv = document.querySelector("#" + this.form + " div[data-formidable-errorfor='" + inputId + "'] div.error");
                if (errorDiv != undefined) {
                    errorDiv.innerHTML = "";
                }
            })
        }
    }

    /**
     * @name putError
     * @param {*} errors : tableau associatif {inputId: errorMessage}
     */
    putError(errors) {
        if (Object.keys(errors).length > 0) {
            if (typeof errors == "object") {
                Object.entries(errors).forEach(error => {
                    // récupération de l'élément parent
                    // ajout du <span> au voisinage direct du parent pour
                    // eviter de modifier l'achitecture des enfants (l'input, label...)
                    let inputId = error[0];

                    if ((this.formInputIds).includes(inputId)) {
                        let errorMessage = typeof (error[1]) == "object" ? error[1].toString() : error[1];
                        let input = this.formElement[inputId];
                        let parentbloc = document.querySelector("#" + this.form + " div[data-formidable-errorfor='" + inputId + "'] div.error");

                        input.classList.add("formidabable-input-error");
                        parentbloc.innerHTML = "<span style='color:#dc3545; font-size:.9rem;' data-formidable-errorfor='" + inputId + "'>"
                            + "<i class='fa fa-exclamation-circle' style='margin-right:5px'></i>"
                            + errorMessage
                            + "</span>";
                    } else {
                        toastr["error"](errors[inputId], "Erreur");
                    }

                })
            }
        } else {
            toastr["error"]("Un problème est survenu, veuillez réessayer plus tard", "Erreur");
        }
    }

    elementsGetter(wanted) {
        let targetArrays = [];
        switch (wanted) {
            case Formidable.ALL:
                targetArrays = this.formElement;
                break;

            case (typeof wanted == 'string'):
                targetArrays.push(this.formElement[wanted]);
                break;

            default:
                if (typeof (wanted) == 'object') {
                    wanted.forEach(input => {
                        targetArrays.push(this.formElement[input]);
                    })
                }
                break;
        }
        return targetArrays;
    }





    /**
     * 
     * Fonction retour qui se rend sur un lien
     *
     * Api JSON Callback format
     * {
     *  statut: true/false,  
     *  route: "url", 
     *  error : {
     *      general : "bla-bla",
     *      ...
     *  }
     * }
     *
     *  */
    static DEFAULT_CALLACK(form, reponse) {
        if (reponse.statut) {
            form.lock(); // ajouter read only aux input
            form.hideBtnSubmit(); // Cacher le bouton submit
            if (reponse.hasOwnProperty("success")) {
                toastr["success"](reponse.success.message, "Succès");
            }
            setTimeout(() => {
                location.href = reponse.redirection;
            }, 700);
        } else {
            form.updateUI(Formidable.UI_REPOSE);
            if (reponse.error != null) {
                form.putError(reponse.error);
            }
        }
    }

    /**
     * 
     * Fonction retour qui afficher un toast en cas de success ou erreur générale
     *
     * Api JSON Callback format
     * {
     *  statut: true/false, 
     *  success : {
     *      message: "blabla"
     *  }, 
     *  callback: "url", 
     *  more: {
     *      resetForm : true/false
     *  }
     *  error : {
     *      general : "bla-bla",
     *      ...
     *  }
     * }
     *
     *  */
    static TOAST_CALLACK(form, reponse) {
        if (typeof myFullLoader === 'function' && !reponse.statut) {
            myFullLoader("off");
        }

        if (form != null) {
            form.updateUI(Formidable.UI_REPONSE);
        }

        if (reponse.statut) {
            toastr["success"](reponse.success.message, "Succès");
            if (reponse.redirection != null) {
                if (form != null) {
                    form.lock(); // ajouter read only aux input
                    form.hideBtnSubmit(); // Cacher le bouton submit
                }
                setTimeout(() => {
                    location.href = reponse.redirection;
                }, 1000)
            } else {
                myFullLoader("off");
            }
            if (reponse.more.resetForm != null && reponse.more.resetForm && form != null) {
                form.reset();
            }
        } else {
            if (typeof reponse.error !== 'undefined') {
                if (reponse.error != null) {
                    if (form != null && reponse.error.general === 'undefined') {
                        form.putError(reponse.error);
                    } else {
                        toastr["error"](reponse.error.general, "Erreur");
                    }
                }
            } else {
                console.log(reponse);
            }
        }
    }

    static TOAST_NO_FORM_CALLACK(reponse) {
        Formidable.TOAST_CALLACK(null, reponse);
    }

}