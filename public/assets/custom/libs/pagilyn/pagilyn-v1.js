class Pagilyn {
    // lib name
    static APP_NAME = "Pagilyn";
    // key of the main json configuration who is also a json not a simple value
    availabelJsonConfigKeysArray = ["pagination", "search"];
    // Parent bloc
    parentBloc = null;
    // Childs bloc
    parentChildBlocs = null;
    parentChildBlocsCopy = null;
    // user configuration
    userConfig = null;
    // user configuration
    finalConfig = null;
    // Default JSON config with all option available
    defaultConfig = {
        // search configarution
        search: {
            enable: true,
            visible: true, // (boolean) : // true, false
            targetInput: "pagilyn-search-input", // target input for search
        },
        /**
         *   Pagination options
         */
        pagination: {
            enable: true, // (bool) : if pagination section will be visible or not
            current: 1, // (int) active page
            limit: 20, // (int) element to be displayed per page
            total: null, // (int) The total of element if limit and pagination not exist in local mode only
            buttonsCount: 5, // (int) Pagination total button to display whithout back and next page button include
            nextButton: true, // (bool) : if pagination next button will be visible or not
            prevButton: true, // (bool) : if pagination back button will be visible or not
            nextButtonText: "Suivant",
            prevButtonText: "Précédent",
            activeClass: "pagilyn-pagination-button-active", // class to be added at the current page button in the pagination section
            commonClass: "pagilyn--pagination-button", // class to be added at the all button in the pagination section
        },
    };

    // contructor
    constructor(parentBloc, config = null) {
        if (typeof parentBloc !== "string") {
            throw (
                Pagilyn.APP_NAME +
                " : parent Bloc parameter must be string. Giver: " +
                typeof parentBloc
            );
        } else {
            // process
            this.parentBloc = parentBloc;
            this.initialisation(parentBloc, config);
        }
    }

    bindUserConfig(userConfig) {
        let context = this;
        let finalJson = this.defaultConfig;

        Object.keys(userConfig).forEach(function (key) {
            if (finalJson.hasOwnProperty(key)) {
                // Ici on vérifié si la configuration est un object
                // afin d'éviter d'écraser la config par défault
                // On n'affecte que les propriétés redéfini par l'utilisateur
                // sans touché aux autres propriétés.
                if (context.availabelJsonConfigKeysArray.includes(key)) {
                    Object.keys(userConfig[key]).forEach(function (subKey) {
                        finalJson[key][subKey] = userConfig[key][subKey];
                    });
                }
            }
        });

        return finalJson;
    }

    initialisation(container, config) {
        // override defaut config with the user config json if is set
        if (config != null) {
            this.finalConfig = this.bindUserConfig(config);
        }

        // checking if thr parent bloc exist
        this.container = document.querySelector(container);
        if (typeof this.container !== "object" || this.container === null) {
            throw Pagilyn.APP_NAME + " : Container or parent bloc not found";
        }

        // checking if the parent bloc has at least one child element
        else if (document.querySelectorAll(container + " > *").length < 1) {
            throw (
                Pagilyn.APP_NAME +
                " : Container is empty or has no child element"
            );
        }

        // render
        else {
            this.parentChildBlocs = document.querySelectorAll(
                container + " > *"
            );
            this.parentChildBlocsCopy = this.parentChildBlocs;
            this.finalConfig.pagination.total =
                this.parentChildBlocsCopy.length;
            this.container.style.transition = ".4s";
            this.render();
        }
    }

    render() {
        try {
            // generatte search input or not
            if (this.finalConfig.search.enable) {
                if (document.querySelector(".pagilyn-search") == null) {
                    this.processSearchable(this.finalConfig.search);
                    this.onSearchListener();
                }
            }

            // generatte pagination or not
            if (this.finalConfig.pagination.enable) {
                this.processPagination(this.finalConfig.pagination);
            }

            // process view
            this.processView(this.finalConfig.pagination);
        } catch (error) {
            console.log(e);
        }
    }

    getTotal() {
        return this.finalConfig.pagination.total;
    }

    proportiesFix(json, propertie, defaultValue) {
        let corectValue = defaultValue;
        if (typeof json[propertie] !== "undefined" && json[propertie] != null) {
            corectValue = json[propertie];
        }
        return corectValue;
    }

    bindDataPaginationButton(paginationConfig) {
        /* current: 1, // (int) page actuel
        limit: 10, // (int) Nombre d'élément par page
        total: 100, // (int) Nombre d'élément au total
        buttonsCount: 5, // (int) Nombre total de bouton a affiché au niveau de la section pagination
        server: null */

        let paginationArray = [];
        let btnCount = 5; // paginationConfig.buttonsCount
        let btnOffset = Math.ceil((btnCount - 1) / 2);
        let btnPossibilites = [];
        let treeDot = false;

        // Nombre total de page possible en fonction du total et de la limite
        // On utilise la fonction ceil pour arrondir le resultat
        let possibleBtnCount = Math.ceil(
            this.getTotal() / paginationConfig.limit
        );
        this.maxPagination = possibleBtnCount;
        for (let i = 1; i <= possibleBtnCount; i++) {
            btnPossibilites.push(i);
        }

        // Ici on soustrait du milieu du tableau certains pages
        // Pour ensuite les remplacé par 3 points de suspension
        // afin de ne pas dépasser la limit du bouton a afficher
        if (possibleBtnCount > btnCount) {
            treeDot = true;
            let copyPagButtons = btnPossibilites;
            btnPossibilites = [];
            let startPagBtns = [],
                endPagBtns = [copyPagButtons.length - 1, copyPagButtons.length];

            if (paginationConfig.current >= copyPagButtons.length - 1) {
                startPagBtns = [
                    copyPagButtons.length - 3,
                    copyPagButtons.length - 2,
                ];
            } else {
                startPagBtns = [paginationConfig.current];
                if (paginationConfig.current == 1) {
                    startPagBtns.push(2);
                } else {
                    startPagBtns.unshift(paginationConfig.current - 1);
                }
            }

            btnPossibilites = btnPossibilites.concat(startPagBtns, endPagBtns);
        }
        // Récupération du bouton de la pagination
        paginationArray = btnPossibilites;

        // Adding previous a the button array start
        if (paginationConfig.prevButton) {
            paginationArray.unshift(this.finalConfig.pagination.prevButtonText);
        }

        // Adding next a the button array end
        if (paginationConfig.nextButton) {
            paginationArray.push(this.finalConfig.pagination.nextButtonText);
        }

        // Adding three in the middel of the button array if need
        if (treeDot) {
            let middleIndex = parseInt(Math.floor(paginationArray.length / 2));
            paginationArray.splice(middleIndex, 0, "...");
        }

        return paginationArray;
    }

    processPagination(paginationConfig) {
        let paginationButtonArray =
            this.bindDataPaginationButton(paginationConfig);
        let paginationButtons = [];
        let moreRef = "";

        // Check active class, commom class, current page;
        paginationConfig.activeClass = this.proportiesFix(
            paginationConfig,
            "activeClass",
            "pagilyn--pagination-button-active"
        );
        paginationConfig.commonClass = this.proportiesFix(
            paginationConfig,
            "commonClass",
            "pagilyn-pagination-button"
        );
        paginationConfig.current = this.proportiesFix(
            paginationConfig,
            "current",
            1
        );

        // Convert arrayButon ttext to html button
        // and put it in a array
        for (let i = 0; i < paginationButtonArray.length; i++) {
            moreRef = "";
            let buttonText = paginationButtonArray[i];
            let activeClass =
                buttonText == paginationConfig.current
                    ? paginationConfig.activeClass
                    : "";
            let btnPageRef = buttonText;

            // Previous button should ref to the current page minus 1
            // And allways shuold be at least équal to 1;
            if (paginationConfig.prevButton && i == 0) {
                moreRef = "prev";
                btnPageRef =
                    paginationConfig.current - 1 < 1
                        ? 1
                        : paginationConfig.current - 1;
            }
            // Nextt button should ref to the current page plus 1
            // And allways shuold be at most équal to max pagination possible;
            if (
                paginationConfig.nextButton &&
                i == paginationButtonArray.length - 1
            ) {
                moreRef = "next";
                let nextpage = parseInt(paginationConfig.current) + 1;
                btnPageRef =
                    nextpage > this.maxPagination
                        ? this.maxPagination
                        : nextpage;
            }

            paginationButtons.push(
                `<button data-ref="${moreRef}" data-pagilyn-page="${btnPageRef}" type="button" ${buttonText == "..." ? "diseable" : ""
                }  class="${paginationConfig.commonClass + " " + activeClass}">
                    ${buttonText}
                </button>`
            );
        }

        // html button array to string;
        let htmlPaginationButtons = `<div class="pagilyn--pagination-block">${paginationButtons.join(
            ""
        )}</div>`;

        // Before we start process, whe should
        // * remove pagination bloc
        if (document.querySelector(".pagilyn--pagination-block") != null) {
            document.querySelector(".pagilyn--pagination-block").remove();
        }
        // adding button to view
        this.container.insertAdjacentHTML("afterend", htmlPaginationButtons);

        this.onclickBtnPagination(); // register on click event on pagination button
    }

    processSearchable(searchConfig) {
        let searchVisibility = "";
        if (!searchConfig.visible) {
            searchVisibility = "hidden";
        }
        this.container.insertAdjacentHTML(
            "beforebegin",
            "<div class='pagilyn-search' " +
            searchVisibility +
            "> <input class='pagilyn-search-input' value='' placeholder='Type to search'> </div>"
        );
    }

    processView(paginationConfig) {
        // determine start indexes of child element who should be visible
        let startIndex = 0;
        let limitIndex = 0;
        if (parseInt(paginationConfig.current) > 0) {
            startIndex =
                (parseInt(paginationConfig.current) - 1) *
                parseInt(paginationConfig.limit);
        }
        limitIndex = startIndex + parseInt(paginationConfig.limit) - 1;
        // hiding all right item
        this.parentChildBlocs.forEach((childBloc) => {
            childBloc.classList.add("pagilyn--bloc-hidden");
        });
        // hiding or showing right item
        this.parentChildBlocsCopy.forEach((childBloc, index) => {
            if (index >= startIndex && index <= limitIndex) {
                if (childBloc.classList.contains("pagilyn--bloc-hidden")) {
                    childBloc.classList.remove("pagilyn--bloc-hidden");
                }
            }
        });
    }

    setCurrentpage(page) {
        // if mode local
        // here we just need to shift to the right offset
        this.finalConfig.pagination.current = page;
    }

    onclickBtnPagination() {
        let paginationButtons = document.querySelectorAll(
            ".pagilyn--pagination-block button"
        );
        paginationButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (!button.hasAttribute("diseable")) {
                    // Escape unlogic pagination
                    // ex: when he click on the button page reference to current page
                    // ex: current page is 1 and he click previous again;
                    //ex:  current page is max and he click next again;
                    if (
                        this.finalConfig.pagination.current !=
                        button.dataset.pagilynPage
                    ) {
                        this.setCurrentpage(button.dataset.pagilynPage);
                        this.render();
                        location.href = location.pathname + this.parentBloc;
                    }
                }
            });
        });
    }

    onSearchListener() {
        let searchInputs = document.querySelectorAll(".pagilyn-search-input");
        let context = this;
        if (searchInputs != null) {
            searchInputs.forEach((searchInput) => {
                searchInput.addEventListener("keyup", () => {
                    let matchChildBloc = [];
                    context.parentChildBlocs.forEach((childBloc) => {
                        if (
                            searchInput.value.length.trim > 0 ||
                            searchInput.value == null
                        ) {
                            matchChildBloc = context.parentChildBlocs;
                        } else if (
                            childBloc.textContent
                                .toLowerCase()
                                .indexOf(searchInput.value.toLowerCase()) > -1
                        ) {
                            matchChildBloc.push(childBloc);
                        }
                    });
                    console.log(matchChildBloc);
                    context.finalConfig.pagination.current = 1;
                    context.parentChildBlocsCopy = matchChildBloc;
                    context.finalConfig.pagination.total =
                        matchChildBloc.length;
                    this.render();
                });
            });
        }
    }
}
