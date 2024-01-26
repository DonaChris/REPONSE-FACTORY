// Sidebar functions
function initSideBarNavUI() {
    $("#side-bar-overlay").css({
        'display': 'none',
        'opacity': '0'
    });
    document.getElementById("sidebar-bloc").style.transform = "translateX(-100%)";
}

function openSideBarNav() {
    // show overlay
    $("#side-bar-overlay").css("display", "block");
    setTimeout(() => {
        $("#side-bar-overlay").animate({
            "opacity": "1"
        }, 100);
    }, 10);
    // show sidebar menu block
    document.getElementById("sidebar-bloc").style.transform = "translateX(0%)";
}

function closeSideBarNav() {
    // hide overlay
    $("#side-bar-overlay").animate({
        "opacity": "0"
    }, 100);
    setTimeout(() => {
        $("#side-bar-overlay").css("display", "none");
    }, 150);
    // hide sidebar menu block
    document.getElementById("sidebar-bloc").style.transform = "translateX(-100%)";
}


function globalToastify(text, type = "info") {
    Toastify({
        text: text == "error" ? "🔴 Un probleme est survenu, veuillez réessayer plus tard" : text,
        gravity: "bottom",
        position: 'center',
        // close: true,
        className: "toastify-" + type,
        style: {
            color: '#ffffff',
            padding: "15px 25px",
            fontSize: "15px",
            borderRadius: "7px"
        }
    }).showToast();
}

function setSkeleton(elements) {
    elements.forEach(element => {
        if (element.offsetWidth < 502) {
            element.classList.add('app-skelleton-sm');
        } else if (element.offsetWidth < 942) {
            element.classList.add('app-skelleton-md');
        } else {
            element.classList.add('app-skelleton-lg');
        }
    });
}

function shareLink(link, title = "") {
    let shareModal = document.getElementById("modal-share")
    // bind url
    shareModal.querySelector(".modal-body .share-btns").innerHTML = `
        <div class="shareon" data-url="${link}">
        <a class="facebook" data-title="${title}"></a>
        <a class="linkedin" data-title="${title}"></a>
        <a class="telegram" data-title="${title}"></a>
        <a class="twitter" data-title="${title}"></a>
        <a class="whatsapp" data-title="${title}"></a>
    </div>
    `;
    Shareon.init();

    document.getElementById("share-link-textarea").value = link;
    document.getElementById("share-link-input").value = link;

    // modal show
    $("#modal-share").modal("show");

}

function fireModalInfo(title, content) {
    let targetModal = document.querySelector("#app-modal-info");
    // Bind data in model
    if (title == "") {
        targetModal.querySelector("#app-modal-title").textContent = "Information";
    } else {
        targetModal.querySelector("#app-modal-title").textContent = title;
    }

    targetModal.querySelector("#app-modal-content").innerHTML = content;
    // showIng modal
    $("#app-modal-info").modal("show");
}

function incrementButton(callback = null) {
    /* Incrment input */
    let incrementInputs = document.querySelectorAll(".form-group--number");
    let actionData = { value: 0, action: "" };
    let callbackFunc = callback;
    if (incrementInputs != null) {
        incrementInputs.forEach(incrementInput => {
            let donwButon = incrementInput.querySelector(".down");
            let upButon = incrementInput.querySelector(".up");
            let input = incrementInput.querySelector("input");
            // if input not null
            if (input != null) {
                // when click on down button
                if (donwButon != null) {
                    donwButon.addEventListener("click", () => {
                        let currentValue = parseInt(input.value);
                        currentValue = currentValue > 1 ? (currentValue - 1) : 1;
                        input.value = currentValue;
                        // call callback function
                        if (callbackFunc != null) {
                            actionData.targetBtn = donwButon;
                            actionData.action = "down";
                            actionData.value = currentValue;
                            callbackFunc(actionData);
                        }
                    })
                }

                // when click on up button
                if (upButon != null) {
                    upButon.addEventListener("click", () => {
                        let currentValue = parseInt(input.value) + 1;
                        input.value = currentValue;
                        // call callback function
                        if (callbackFunc != null) {
                            actionData.targetBtn = upButon;
                            actionData.action = "up";
                            actionData.value = currentValue;
                            callbackFunc(actionData);
                        }
                    })
                }
            }

        });
    }
}

function imgNavigation() {
    let productThumbnailsImg = document.querySelectorAll(".product-img-thumbnail");
    let mainImgPrealoder = document.getElementById('img-preloader');
    let productMainImg = document.getElementById('product-img-main');

    if (productThumbnailsImg) {
        // when click on product thumnails img
        productThumbnailsImg.forEach(productThumbnailImg => {
            productThumbnailImg.addEventListener('click', () => {
                // display img prelaoder
                mainImgPrealoder.removeAttribute("hidden");
                productMainImg.style.opacity = .7;
                // remove Active class
                productThumbnailsImg.forEach(element => { element.classList.remove('active') })
                // set cureent active
                productThumbnailImg.classList.add('active');
                // Load img to main img section
                productMainImg.src = productThumbnailImg.dataset.picture;
                // Update thumbnail zoom component
                let zoomComponents = document.querySelector("img.zoomImg");
                if (zoomComponents != null) {
                    zoomComponents.src = productThumbnailImg.dataset.picture;
                }

                // hie img prelaoder
                productMainImg.onload = function () {
                    mainImgPrealoder.setAttribute("hidden", "hidden");
                    productMainImg.style.opacity = 1;
                };
            })
        });
    }
}

// init variable
let skelletonElements = document.querySelectorAll('img.app-skelleton')

// hiding sidebar before page load
if (document.getElementById("sidebar-bloc") != null) {
    initSideBarNavUI();
}

// On img load, we set adaquat skeleton animation time en function of element width
setSkeleton(skelletonElements);


// cleat user détail in hidden input, for secure
setTimeout(() => {
    if (document.getElementById("global-user-detail") != null) {
        document.getElementById('global-user-detail').remove();
    }
}, 5000);

// global when page ready
$(document).ready(function () {
    // global variable who indicate if user is connected or not
    let isAuthentificate = JSON.parse(document.getElementById("is-auth").value)

    // Active menu
    let menuItems = document.querySelectorAll(".menu-item")
    let hasFoundMenu = false;
    if (menuItems != null) {
        // check if any menu who has full current url
        menuItems.forEach(menuItem => {
            if (location.href == menuItem.getAttribute("href")) {
                hasFoundMenu = true;
                menuItem.classList.add("active")
            }
        })
        if (!hasFoundMenu) {
            // check for menu who containes most common part with the current url
            menuItems.forEach(menuItem => {
                if ((location.href).indexOf(menuItem.getAttribute("href")) > -1) {
                    menuItem.classList.add("active")
                }
            })
        }
    }

    // Form action btn
    let formActionIconBtns = document.querySelectorAll(".form-action-icon");
    if (formActionIconBtns != null) {
        formActionIconBtns.forEach((formActionIconBtn) => {
            formActionIconBtn.addEventListener("click", () => {
                switch (formActionIconBtn.dataset.action) {
                    case "password":
                        let targets = document.querySelectorAll(
                            formActionIconBtn.dataset.targets
                        );
                        if (targets != null) {
                            formActionIconBtn.classList.remove(
                                "fa-eye",
                                "fa-eye-slash"
                            );
                            targets.forEach((target) => {
                                if (target.getAttribute("type") == "password") {
                                    target.setAttribute("type", "text");
                                    formActionIconBtn.classList.add("fa-eye");
                                } else {
                                    target.setAttribute("type", "password");
                                    formActionIconBtn.classList.add(
                                        "fa-eye-slash"
                                    );
                                }
                            });
                        }
                        break;
                }
            });
        });
    }

});
