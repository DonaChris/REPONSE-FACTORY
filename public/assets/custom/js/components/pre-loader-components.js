window.addEventListener("DOMContentLoaded", () => {

    //document.getElementById("m-preloader").style.display = "none";

    setTimeout(() => {
        // Cacher le préloader
        document.getElementById("m-preloader").style.opacity = "0";

        setTimeout(() => {
            document.getElementById("m-preloader").style.display = "none";
        }, 500);
    }, 1000);
});
