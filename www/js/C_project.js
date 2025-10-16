window.addEventListener("load", initApp);
/**
* Définit tous les écouteurs d'événement
*/
function initApp() {
    const slider = document.getElementById("slider");
    slider.addEventListener("change", getValue);
    slider.value = 20;

}

function getValue(){
    const number = document.getElementById("numberPage");
    number.textContent = this.value; 
}