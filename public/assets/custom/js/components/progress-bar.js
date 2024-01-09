document.getElementById("step1").style.display = "block";
document.getElementById("step2").style.display = "none";
document.getElementById("step3").style.display = "none";
document.getElementById("step4").style.display = "none";

//step 1
document.getElementById("nextStep1").addEventListener("click", function() {
    document.getElementById("step1").style.display = "none";
    document.getElementById("step2").style.display = "block";
});

//step 2
document.getElementById("prevStep2").addEventListener("click", function() {
    document.getElementById("step1").style.display = "block";
    document.getElementById("step2").style.display = "none";
});

document.getElementById("nextStep2").addEventListener("click", function() {
    document.getElementById("step2").style.display = "none";
    document.getElementById("step3").style.display = "block";
});

//step 3
document.getElementById("prevStep3").addEventListener("click", function() {
    document.getElementById("step2").style.display = "block";
    document.getElementById("step3").style.display = "none";
});

document.getElementById("nextStep3").addEventListener("click", function() {
    document.getElementById("step3").style.display = "none";
    document.getElementById("step4").style.display = "block";
});

//step 4
document.getElementById("prevStep4").addEventListener("click", function() {
    document.getElementById("step3").style.display = "block";
    document.getElementById("step4").style.display = "none";
});

