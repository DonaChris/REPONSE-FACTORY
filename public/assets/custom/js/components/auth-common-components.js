
// global when page ready
$(document).ready(function () {

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
