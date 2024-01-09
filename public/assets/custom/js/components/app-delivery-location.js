class DeliveryOption {

    #location = { adress: "", price: "", ref: "", country: "" }
    #btnDeliveryOptions
    #callback

    constructor(selector, current = null) {
        this.#btnDeliveryOptions = document.querySelectorAll(".btn-select-delivery-option");
        const submitCustomLocation = document.getElementById("submit-custom-location");
        const customLocationInput = document.getElementById("custom-location");

        // select dafault active option
        if (current != null) {
            this.setCurrentLocationUI(current)
        }

        // When click on location
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener("click", () => {
                $("#modal-delivery-option").modal("show");
            })
        })

        // when select one available adresse
        if (this.#btnDeliveryOptions.length > 0) {
            this.#btnDeliveryOptions.forEach(btnDeliveryOption => {
                btnDeliveryOption.addEventListener("click", () => {
                    this.location = {
                        adress: btnDeliveryOption.dataset.adress,
                        price: btnDeliveryOption.dataset.price,
                        ref: btnDeliveryOption.dataset.ref,
                        country: btnDeliveryOption.dataset.country
                    }

                    // active class
                    this.#btnDeliveryOptions.forEach(element => element.classList.remove("active"))
                    btnDeliveryOption.classList.add("active")

                    // callbackfunction
                    this.#callback(this.location)
                    $("#modal-delivery-option").modal("hide");
                })
            })
        }

        // When submit custom location 
        submitCustomLocation.addEventListener("click", () => {
            if (customLocationInput.value.trim().length < 1) {
                globalToastify("Veuillez entrer une adresse valide", "error")
                return
            }

            this.location = {
                adress: customLocationInput.value.trim(),
                price: "0",
                ref: "custom"
            }

            // remove active class
            this.#btnDeliveryOptions.forEach(element => element.classList.remove("active"))

            // callbackfunction
            this.#callback(this.location)
            $("#modal-delivery-option").modal("hide");

        })
    }

    get location() {
        return this.#location
    }

    set location(data) {
        this.location.adress = data.adress;
        this.location.price = data.price;
        this.location.ref = data.ref;
        this.location.country = data.country;
    }

    setCurrentLocationUI(locationRef = null) {
        // active class
        this.#btnDeliveryOptions.forEach(element => element.classList.remove("active"))
        if (locationRef != null) {
            document.querySelectorAll(".btn-select-delivery-option[data-ref='" + locationRef + "']").classList.add("active")
        }
    }

    /**
     * 
     * @param {*} callback callback function is call with the current location selection
     */
    addOnLocationSelection(callback) {
        this.#callback = callback
    }
}