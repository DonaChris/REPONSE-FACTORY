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

function stopSkeleton(elements) {
    if (elements != null) {
        elements.forEach(element => {
            element.onload = function () {
                element.classList.remove('app-skelleton', 'app-skelleton-sm', 'app-skelleton-md', 'app-skelleton-lg');
            };
        })
    }
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

function initModalInfo(buttons) {
    let targetButtons = document.querySelectorAll(buttons);

    if (targetButtons != null) {
        targetButtons.forEach(targetButton => {
            targetButton.addEventListener('click', () => {
                // Bind data in model
                fireModalInfo(targetButton.dataset.modalTitle, targetButton.dataset.modalContent)
            })
        })
    }
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

function mySingature() {
    // Signed website
    // =========> Console Signature
    console.log("%cAVERTISSEMENT %c\nEn utilisant cette console, vous vous exposez au risque que des personnes malveillantes se fassent passer pour vous et volent vos informations grâce à une attaque appelée Self-XSS.\nNe saisissez pas et ne copiez pas du code que vous ne comprenez pas. ", "font-size: 20px; font-weight:bold; color: white; background: red", "font-size: 15px; color:black; font-weight:bold");
    console.log("\n%cINFORMATIONS LEGALES%c\nPour signaler un probleme ou un disfonctionnement du site, veuillez contacter notre web master%c.\nWEB MASTER: %cDEKOUN Cédric%c \nContact : %chttps://www.linkedin.com/in/dekoun-cedric/", "font-size: 20px; font-weight:bold; color: white; background: green", "font-size: 15px; color:black; font-weight:bold", "font-size: 18px; color: black; font-weight:bold", "font-size: 18px; color: blue; font-weight:bold", "font-size: 18px; color: black; font-weight:bold", "font-size: 18px; color: blue; font-weight:bold");
}

function seekBarAlert() {
    const btnSeekBars = document.querySelectorAll(".btn-seekbar");
    if (btnSeekBars != null) {
        btnSeekBars.forEach(btnSeekBar => {
            btnSeekBar.addEventListener("click", () => {
                if (btnSeekBar.classList.contains("btn-seekbar-active")) {
                    globalToastify(btnSeekBar.dataset.message);
                    return
                }
                location.href = btnSeekBar.dataset.href;
            })
        })
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
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

    // global variable who indicate if user is connected or not
    let isAuthentificate = JSON.parse(document.getElementById("is-auth").value);

    // On img load, we remove skeleton animation
    stopSkeleton(skelletonElements);

    // init modal components
    initModalInfo(".app-modaler-info-btn");

    // Console signature
    mySingature();

    // bind btn seekbar type functionality
    seekBarAlert();

    // restore shopping cart count
    refreshCartItemIndication();

    // Init like and unlike product functionnality
    new ProductFavoriteModule((targetProduct) => {
        // We need to 
        if (location.href == jsRoute('app-product-favorites')) {
            targetProduct.remove();
            if (document.querySelectorAll("div.product-bloc").length < 1) {
                location.href = location.href
            }
        }
    })

    // Hide toolbar when scroll
    let toolbarSearchSection = document.querySelector(".menu-toolbar .toolbar-search");
    if (toolbarSearchSection != null && window.getComputedStyle(toolbarSearchSection, null).display == "block") {
        navBarCollapse(toolbarSearchSection);
    }

    // padding top to main div content
    // to prevent mobile fixed bar to hidden main content
    let topAppOffset = document.querySelector('.top-app-offset');
    let searchBarInMobileToolbat = document.querySelector('.menu-toolbar .toolbar-search');
    if (window.getComputedStyle(searchBarInMobileToolbat, null).display == "none") {
        topAppOffset.style.padding = "38px";
    } else {
        topAppOffset.style.padding = "74px";
    }

    // Logout
    let logOutBtns = document.querySelectorAll(".logOutBtn");
    if (logOutBtns != null) {
        logOutBtns.forEach((logOutBtn) => {
            logOutBtn.addEventListener("click", () => {
                new Maudia().confirmationDialog(
                    {
                        title: "Déconnexion",
                        text: "Voulez-vous vraiment vous déconnecter de votre compte ?",
                        showCancelButton: true,
                        confirmButtonColor: "#000000",
                        cancelButtonColor: "#e85347",
                        cancelButtonText: "Se déconnecter",
                        confirmButtonText: "Retour",
                    },
                    {
                        confirm: [() => {
                            location.href = jsRoute("app-log-out");
                            myFullLoader('on');
                        }, {}],
                        confirmType: Maudia.TYPE_FUNCTION,
                    }
                );
            });
        });
    }

    // Active menu
    let menuItems = document.querySelectorAll(".menu-item");
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

    // Bottom nav
    if (bottomNavItems != null) {
        bottomNavItems.forEach(bottomNavItem => {
            // Bottom nav interaction
            bottomNavItem.addEventListener('click', () => {
                location.href = bottomNavItem.dataset.href;
            })
            // bottom nav active manu
            if (location.href.indexOf(bottomNavItem.dataset.href) > -1) {
                bottomNavItem.classList.add("active");
            }
        })

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

    // Zoom on image initialisation
    if (document.getElementById("img-to-zoom") != null) {
        $('#img-to-zoom').zoom();
    }

    // onclick on btn share
    let btnShares = document.querySelectorAll(".btn-share");
    let btnShareLinkTextArea = document.getElementById("share-link-textarea");
    let btnShareLinkInput = document.getElementById("share-link-input");
    let btnShareLinkCopy = document.getElementById("share-link-btn-copy");

    if (btnShares != null) {
        btnShares.forEach(btnShare => {
            btnShare.addEventListener('click', () => {
                shareLink(btnShare.dataset.link, btnShare.dataset.title);
            })
        })
    }

    btnShareLinkCopy.onclick = () => {
        btnShareLinkTextArea.select(); //select input value
        if (document.execCommand("copy")) { //if the selected text copy
            btnShareLinkInput.classList.add("active");
            btnShareLinkCopy.innerText = "✔️ Copié";
            setTimeout(() => {
                window.getSelection().removeAllRanges(); //remove selection from document
                btnShareLinkInput.classList.remove("active");
                btnShareLinkCopy.innerText = "Copier";
            }, 3000);
        }
    }
});
