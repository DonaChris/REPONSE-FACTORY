function coolStepRender() {
    // get all step indicator
    let coolStepStateIndicators = document.querySelectorAll(".cool-step-state");
    let coolStepBtnNavigations = document.querySelectorAll(".cool-step-btn-navigation-prev, .cool-step-btn-navigation-next");

    // Onclick Indicator callback
    coolStepStateIndicators.forEach(coolStepStateIndicator => {

        // onclick on state indicator
        coolStepStateIndicator.addEventListener("click", () => {
            // fade out Animation
            $(".cool-step-body").fadeOut(200, () => {
                // For each in all indicators, we remove active class
                // And if in the iteration, this indicator data-target is minus or equal
                // to the select indicator, whe add active class to active this
                coolStepStateIndicators.forEach(coolIndicator => {
                    coolIndicator.classList.remove("cool-step-state-active");
                    if (parseInt(coolIndicator.dataset.target) <= parseInt(coolStepStateIndicator.dataset.target)) {
                        coolIndicator.classList.add("cool-step-state-active");
                    }
                    // All all cool-section and show the only one
                    let associatedSection = document.querySelector(".cool-step-section[data-step='" + coolIndicator.dataset.target + "']");
                    if (associatedSection.dataset.step != coolStepStateIndicator.dataset.target) {
                        associatedSection.classList.remove("cool-step-section-active");
                    } else {
                        if (!associatedSection.classList.contains("cool-step-section-active")) {
                            associatedSection.classList.add("cool-step-section-active");
                        }
                    }
                    // set section title
                    document.querySelector(".cool-step-title").textContent = coolStepStateIndicator.dataset.label;
                });

                $(".cool-step-body").fadeIn(250);
            })

        })


    })

    // Onclick navigation button next, back
    coolStepBtnNavigations.forEach(coolStepBtnNavigation => {
        coolStepBtnNavigation.addEventListener("click", () => {
            let newIndex = coolStepBtnNavigation.closest(".cool-step-section").dataset.step;

            if (coolStepBtnNavigation.classList.contains("cool-step-btn-navigation-next")) {
                newIndex++;
            } else {
                newIndex--;
            }
            let targetIndicator = document.querySelector(".cool-step-state[data-target='" + newIndex + "']");
            if (targetIndicator != null) {
                targetIndicator.click();
            }
        })
    })


}

function coolStepSetCurrent(index) {
    let targetStep = document.querySelector(".cool-step-state[data-target='" + index + "']");
    if (targetStep != null) {
        targetStep.click();
    }
}