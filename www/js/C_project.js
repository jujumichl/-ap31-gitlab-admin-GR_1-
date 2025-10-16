window.addEventListener("load", initApp);
/**
* Définit tous les écouteurs d'événement
*/
function initApp() {
    const slider = document.getElementById("slider");
    slider.addEventListener('change', getValue);
    slider.value = 20;
    const buttonAllChk = document.getElementById("btnCocher");
    buttonAllChk.addEventListener('change', check);
    const btnSupprimer = document.getElementById("btnDeleteProjects");
    btnSupprimer.addEventListener('click', demandeConfirmation);
    const btnCharger = document.getElementById("btnGetProjects");
    btnCharger.addEventListener('click', getProjects);
    const btnFiltrer = document.getElementById("btnFiltrer");
    btnFiltrer.addEventListener('change', filtrer);
    const btnAscDesc = document.getElementById("btnAscDesc");
    btnAscDesc.addEventListener('change', sort);

    /////////////////////////////////////////////////////////////////////////3 écouteurs
    const btnvisibility = document.getElementById("valider");
    btnvisibility.addEventListener('click', visibilityAll);

}

function getValue(){
    const number = document.getElementById("numberPage");
    number.textContent = this.value; 
}

/**
 * permet de cocher/décocher les cases
 * @param {*} evt 
 */
function check(evt) {
    let inputs = document.querySelectorAll("table#tabProjects tbody#bodyProjects input[type=checkbox]");
    if (evt.currentTarget.checked) {
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].checked) {
                inputs[i].checked = true;
            }
        }
    }
    else {
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked) {
                inputs[i].checked = false;
            }
        }
    }
}

/**
 * Permet de récupérer les cases cochers
 * @returns retourne les identifiants des projets séléctionner sous la forme de string
 */
function ischecked() {
    let all = [];
    const checkbox = document.querySelectorAll("table#tabProjects input[type=checkbox]");
    for (let element of checkbox) {
        if (element.checked == true) {
            all.push(Number(element.value));
        }
    }
    return all;
}

/**
 * Demande a l'utilisateur de confirmer s'il souhaite bien tout effacer
 * @param {Event} evt 
 */
function demandeConfirmation(evt) {
    let ok;
    let all = ischecked();
    let list = "";
    all.forEach((element) => list += element + "\n")
    if (all != "") {
        ok = confirm("Souhaitez-vous supprimer les identifiants ci dessous ? \n" + list);
        if (!ok) {
            evt.preventDefault();
        }
        else {
            eraseHTMLTab(document.getElementById("tbProjects"));
            alert("Les projets ont bien été supprimer.");
        }
    }
    else {
        alert("Vous n'avez selectionner aucun(s) projet(s)");
    }
}

/**
 * Supprime toutes les lignes d'un tableau HTML en partant de la denière
 * @param {Array} tab est un tableau contenant au moins un tbody 
 */
function eraseHTMLTab(tab) {
    const lineTabs = tab.querySelector("tbody#bodyProjects");
    for (let i = lineTabs.childElementCount - 1; i >= 0; i--) {
        lineTabs.deleteRow(i);
    }
}

/**
 * Crée une ligne de tableau HTML à partir d'un objet JSON décrivant un projet
 * @param {Object} oneProject 
 * @returns {HTMLTableRow}
 */
function createTableRow(oneProject) {
    let row = document.createElement("tr");
    //création d'un td dans lequel il y a une checkbox
    let cell = document.createElement("td");
    let box = document.createElement("input");
    box.type = "checkbox";
    box.id = `chk${oneProject.id}`;
    box.value = oneProject.id;
    box.classList = "form-check-input";
    cell.appendChild(box);
    row.appendChild(cell);

    //création d'un td, ajout d'une cellule id contenant l'id du projet 
    cell = document.createElement("td");
    cell.textContent = oneProject.id;
    row.appendChild(cell);

    //création d'un td contenant le nom de l'owner du projet et l'ajoute au tableau
    cell = document.createElement("td");
    cell.textContent = oneProject.namespace.name;
    row.appendChild(cell);

    //création d'un td contenant le nom du projet et l'ajoute au tableau
    cell = document.createElement("td");
    cell.textContent = oneProject.name;
    row.appendChild(cell);
    
    //Création d'un td contenant la date de création du projet
    cell = document.createElement("td");
    cell.textContent = oneProject.created_at.substring(0, 10);
    row.appendChild(cell);

    //Création d'un td contenant le niveau de visibilité du projet
    cell = document.createElement("td");
    cell.textContent = oneProject.visibility;
    row.appendChild(cell);

    //Création d'un td contenant l'url d'accès au projet
    cell = document.createElement("td");
    cell.textContent = oneProject.web_url;
    row.appendChild(cell);

    return row;
}

/**
 * Retrouve tous les projets
 * @returns retourne une liste de projet
 */
async function retrieveProjects (baseUrl, filtre, asc) {
    const finalUrl = baseUrl + "/projects?order_by=" + filtre + "&sort=" + asc;
    // ajout du ou des champs d'entête dans la collection de type Headers
    let myHeaders = new Headers();

    console.log(finalUrl);

    myHeaders.append("Accept", "application/json");
    myHeaders.append("PRIVATE-TOKEN", getAccessToken());
    // construction de l'objet settings précisant méthode et champs d'entête
    let settings = { method: "GET", headers: myHeaders };
    // envoi asynchrone de la requête http avec GET comme méthode par défaut
    // avec attente d'obtention du résultat
    let response = await fetch(finalUrl, settings);

    // récupération du corps de la réponse dans un objet JSON
    let resultArray = await response.json();
    let headers = await response.headers;
    // récupération du code statut de la réponse
    let statusCode = response.status;
    console.log(
        `Code statut : ${statusCode} 
        nb page : ${JSON.stringify(headers.get("x-total-pages"))} 
        nb elem : ${JSON.stringify(headers.get("x-total-pages"))}
        nb d'élément afficher par page : ${JSON.stringify(headers.get("x-per-page"))}
        page prev : ${JSON.stringify(headers.get("x-prev-page"))} 
        next page : ${JSON.stringify(headers.get("x-next-page"))} 
        page actuel : ${JSON.stringify(headers.get("x-page"))}
        nb elem total : ${JSON.stringify(headers.get("x-total"))}`
    );
    return resultArray;
}


async function filtrer(evt){
    if (this.value == "created_at"){
        await getProjects(evt);
    }
    else if (this.value == "id"){
        await getProjects(evt, "id");
    }
    else {
        await getProjects(evt, "name");

    }
}

async function sort(evt){
    if (this.checked){
        await getProjects(evt, undefined, "asc");
    }
    else{
        await getProjects(evt, undefined, "desc");
    }
}

/**
 * Permet de changer la visibilité d'un projet
 */
async function visibility(evt, baseUrl, id, value){
    const finalUrl = baseUrl + "/projects/" + id;
    let visib;
    // ajout du ou des champs d'entête dans la collection de type Headers
    let myHeaders = new Headers();

    console.log(finalUrl);

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("PRIVATE-TOKEN", getAccessToken());
    if (value == "1"){
        visib = "public";
    }
    else if (value == "2"){
        visib = "internal";
    }
    else{
        visib = "private";
    }
    console.log(visib);
    let data =  {visibility : visib};
    // construction de l'objet settings précisant méthode et champs d'entête
    let settings = { method: "PUT", headers: myHeaders, body: JSON.stringify(data)};
    // envoi asynchrone de la requête http avec GET comme méthode par défaut
    // avec attente d'obtention du résultat
    let response = await fetch(finalUrl, settings);

    // récupération du corps de la réponse dans un objet JSON
    let resultArray = await response.json();
    let headers = await response.headers;
    // récupération du code statut de la réponse
    let statusCode = response.status;
    console.log(
        `Code statut : ${statusCode} 
        Content-Type : ${headers.get("Content-Type")}
        result : ${JSON.stringify(resultArray)}`
    );
    return resultArray;
}

async function visibilityAll(evt){
    evt.preventDefault();
    let all = ischecked();
    let visib = document.forms[0].elements["visibility"].value;
    for (element of all){
        await visibility(evt, getAPIBaseURL(), String(element), String(visib));
    }
    getProjects(evt)
}

/**
 * Construit les lignes du corps du tableau HTML htmlTable 
 * à partir du tableau des projets projectsArray 
 * Chaque projet du tableau projectsArray présente 
 * les propriétés provenant de la récupération des 
 * données au format JSON.
 * @param {array} projectsArray Le JSON
 * @param {HTMLTable} htmlTable Un tableau contenant un body
 */
function buildTableRows(projectsArray, htmlTable){
    let myBodyTab = htmlTable.querySelector("tbody#bodyProjects");
    for (const element of projectsArray){
        let myNewRow = createTableRow(element);
        myBodyTab.appendChild(myNewRow);
    }
}

async function getProjects(evt, filtre = document.getElementById("btnFiltrer").value, asc = "desc"){
    const htmlTable = document.getElementById("tabProjects");
    eraseHTMLTab(htmlTable);
    console.log(filtre);
    if (filtre == "Filtrer"){
        filtre = "created_at";
        buildTableRows( await retrieveProjects(getAPIBaseURL(), filtre, asc), htmlTable);
    }
    else{
        buildTableRows( await retrieveProjects(getAPIBaseURL(), filtre, asc), htmlTable);
    }
}



