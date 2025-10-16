window.addEventListener("load", initApp);
/**
* Définit tous les écouteurs d'événement
*/
function initApp() {
    //const slider = document.getElementById("slider");
    //slider.addEventListener("change", getValue);
    //slider.value = 20;
    let btnGetUsers = document.getElementById('btnGetUsers');
    btnGetUsers.addEventListener('click', getUsers);
    let activeDesactive = document.getElementById('activeDesactive');
    activeDesactive.addEventListener('click', sort)
}

function getValue(){
    const number = document.getElementById("numberPage");
    number.textContent = this.value; 
}

/**
 * 
 * @param {Array} tab contient au moins un tbody
 *  
 */
function eraseHTMLTab(tab) {
    let ligneTab = tab.getElementsByTagName("tr");
    for (let i = ligneTab.length-1; i >= 0; i--) {
        let rowToDelete = ligneTab[i];
        rowToDelete.remove();
    }
}

/**
 * Récupère les userss de la source de données, pour l'instant "en dur"
 * @returns Array
 */
async function retrieveUsers() {    
    // construction de l'URL complète
    const URL = getAPIBaseURL();
    let URLFinal = URL + '/users?order_by=username&sort=asc'
    // envoi asynchrone de la requête http avec GET comme méthode par défaut
    // avec attente d'obtention du résultat
    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("PRIVATE-TOKEN", getAccessToken())
    let setting = {method: "GET", headers: myHeaders};
    let response = await fetch(URLFinal, setting);
    // récupération du corps de la réponse dans un objet JSON
    let resultArray = await response.json();
    // récupération du code statut de la réponse
    let statusCode = response.status;
    console.log(`Code statut : ${statusCode} - Corps de réponse : ${JSON.stringify(resultArray)}`);
    return resultArray;
}


/**
 * Crée une ligne de tableau HTML à partir d'un objet JSON décrivant un users
 * @param {Object} oneUsers 
 * @returns {HTMLTableRow}
 */
function createTableRow (oneUsers) {
    let row = document.createElement("tr"); // Permet la création d'une ligne dans le html 

    let cell = document.createElement("td"); // Ajoute un élément dans le tableau
    let box = document.createElement("input"); // Créer un input dans le HTML 
    box.type = "checkbox"; // Donne un type à l'input ajouté de type checkbox
    box.id = `chk${oneUsers.id}`; // Donne un identifiant à la box créer en partant de l'identifiant du fichier oneUsers
    box.value = oneUsers.id;
    cell.appendChild(box); // Ajoute les informations du nouveau users 
    row.appendChild(cell); // Ajoute les informations dans la nouvelle ligne du tableau 

    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    cell.textContent = oneUsers.id; // Récupère le nom du users 
    row.appendChild(cell); // Ajoute dans la ligne le contenue de l'objet cell
    
    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    cell.textContent = oneUsers.name; // Récupère le nom du users 
    row.appendChild(cell); // Ajoute dans la ligne le contenue de l'objet cell

    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    cell.textContent = oneUsers.created_at.substring(0, 10);
    row.appendChild(cell); // Ajoute les informations dans la nouvelle ligne du tableau 

    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    if (oneUsers.last_sign_in_at == null){
        cell.textContent = "Jamais connecté(e)";
    }else {
    cell.textContent = oneUsers.last_sign_in_at.substring(0, 10);
    }
    row.appendChild(cell);

    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    cell.textContent = oneUsers.state;
    row.appendChild(cell);

    cell = document.createElement("td");  // Ajoute un élément dans le tableau
    cell.textContent = oneUsers.projects_limit;
    row.appendChild(cell);

    return row; // Renvoie les informations de la nouvelle ligne du tableau
}

/**
 * Construit les lignes du corps du tableau HTML htmlTable
 * à partir du tableau des users usersArray
 * Chaque users du tableau usersArray présente les propriétés provenant 
 * de la récupération des données au format JSON.
 * @param {array} usersArray JSON
 * @param {HTMLTableBodyElement} HTMLTableBody 
 */
function buildTableRows (usersArray, HTMLTableBody){
    for(i=0; i<usersArray.length; i++){
        let myNewRow = createTableRow(usersArray[i]);
        HTMLTableBody.appendChild(myNewRow);
    }
}
/**
 * Fonction générale permettant la récupération de tous les users 
 * en passant par l'API Gitlab
 */
async function getUsers() {
    let tableau = document.getElementById("bodyUsers");
    eraseHTMLTab(tableau); // Efface les informations du tableau existant de la page 
    let users = await retrieveUsers();
    buildTableRows(users, tableau); 
}

