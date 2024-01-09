function customDataTableSearch(targetDataTable = null, element = ".custom-search-input") {
    let customSearchInputs = document.querySelectorAll(element);
    if (customSearchInputs != null && targetDataTable != null) {
        customSearchInputs.forEach(customSearchInput => {
            customSearchInput.addEventListener("keyup", (e) => {
                  targetDataTable.search(customSearchInput.value).draw();
            })
        })
    }
}

function customDataTableExport(customButtonsSelector = ".custom-datatable-export") {
    let customExportButtons = document.querySelectorAll(customButtonsSelector);
    if (customExportButtons != null) {
        customExportButtons.forEach(customExportButton => {
            customExportButton.addEventListener("click", (event) => {
                document.querySelector(".buttons-"+customExportButton.dataset.exportFormat+".buttons-html5").click();
            })
        })
    }
}