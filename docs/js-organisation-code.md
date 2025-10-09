# Organisation du code JavaScript
## Répartition du code sur plusieurs fichiers
Le code javascript sera réparti sur plusieurs fichiers :

1. Par ressource, un fichier `<nomRessource>Controller.js` regroupant :
	- la fonction `initApp` qui définit les écouteurs d’événements
	- les gestionnaires d’événements
	- les fonctions intervenant sur les éléments HTML pour les modifier, les créer, les supprimer
	- les fonctions d’accès et de modification à la source de données

2. Un fichier `api.js` offrant des fonctions de lecture de la base URL, voire de modification, des éléments d'accès à l'API : protocole, hôte (avec ou sans port), chemin d'accès, jeton d'accès. Ci-dessous un exemple de fonctions de lecture.
```javascript
/**
 * Fournit la base de l'URL pour accéder à l'API-REST Gitlab
 * @returns String
 */
function getAPIBaseURL() {
    return `${config.protocol}://${config.host}/${config.path}`;
}
/**
 * Fournit le token d'accès pour l'API-REST Gitlab
 * @returns String
 */
function getAccessToken() {
    return config.token;
}
```	
3. un fichier `.config.js` regroupant uniquement des données de configuration sous forme d’objets. Ce fichier va permettre d'isoler les paramètres d'accès à l'API : protocole, nom d’hôte, chemin d’accès, et jeton d’accès.
```javascript
const config = {
    protocol : "https",
    host : "gitlab.siovhb.lycee-basch.fr:8443",
    path : "api/v4",
    token : "hereismykey"
}
```
## Gestion du fichier config.js
Tel quel, le fichier `config.js` va contenir des informations différentes dans l’environnement local de chaque développeur, puis dans l’environnement d’exécution final. Dès qu’un développeur va le modifier pour correspondre à son environnement, le fichier sera proposé pour être versionné. D’où le risque de le voir sur le dépôt avec des valeurs confidentielles telles que le jeton d’accès.

**Principe à mettre en place** : on va versionner un fichier `config.exemple.js` qui va servir d’exemple pour savoir de quelles données de configuration on dispose. Une fois le dépôt clôné, il faudra faire une copie de ce fichier dans un nouveau fichier `config.js` et ajuster les valeurs des données de configuration. 
On préfixera ces 2 fichiers par un point pour qu’ils ne soient pas listés par défaut. 

Afin de ne jamais versionner le fichier `.config.js`, on créera à la racine du dépôt un fichier `.gitignore` qui contiendra ce fichier `.config.js`.

## Modification des données de configuration API
Afin de modifier les paramètres d’accès API pour l’ensemble de l’application, il faudra faire appel à l’espace de stockage local au navigateur. En effet, à chaque changement de page, projets, utilisateurs, groupes, paramètres, la variable config est réinitialisée.

2 espaces de stockages sont proposés via 2 objets de stockage : `localStorage` ou `sessionStorage`.

Les objets de stockage Web `localStorage` et `sessionStorage` permettent d’enregistrer les paires clé/valeur dans le navigateur.

Pour les 2 objets, le stockage est lié à l’origine (triplet domaine/protocole/port). Autrement dit, différents protocoles ou sous-domaines impliquent différents objets de stockage, ils ne peuvent pas accéder aux données les uns des autres.

Ce qui est intéressant à leur sujet, c’est que les données survivent à une actualisation de la page (pour `sessionStorage`) et même à un redémarrage complet du navigateur (pour `localStorage`).
Les deux objets de stockage fournissent les mêmes méthodes et propriétés :
- `setItem(key, value)` – stocke la paire clé/valeur.
- `getItem(key)` – récupère la valeur par clé.
- `removeItem(key)` – supprime la clé avec sa valeur.
- `clear()` – supprime tout.
- `key(index)` – récupère la clé sur une position donnée.
- `length` – le nombre d’éléments stockés.

A noter que ce stockage n’est pas recommandé car le token est vulnérable côté client, en particulier en cas de faille XSS dans le code JavaScript.
Nous opterons toutefois pour cette solution par simplification et ne disposant pas dans cette application d’autre moyen d’authentification.