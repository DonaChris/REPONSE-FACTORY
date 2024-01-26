import { StaffService } from "../staff/staff-service.js?b";

window.addEventListener("DOMContentLoaded", () => {

    let formAddStaff = new Formidable("form-staff", [
        "staff-surname",
        "staff-name",
        "staff-email",
        "staff-ifu",
        "staff-phone",
        "staff-birthDate",
        "staff-type"
    ], "staff-submit")

    let moreData = {
        staffId: document.getElementById("staff-production").value,
        formModalRef: "staffModal"
    }
    StaffService.create(moreData, formAddStaff);

});