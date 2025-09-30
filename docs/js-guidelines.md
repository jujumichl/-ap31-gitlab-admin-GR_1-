# Bonnes pratiques JS

## Règles d’IHM
1. Tout champ de saisie d’un formulaire disposera d’un libellé qui lui est associé, facilitant ainsi l’accès à ce champ de saisie.
2. Les boutons de commande seront tous de même taille.

## Règles de nommage
1.	Le nom (identificateur) des fonctions, attributs, paramètres et variables respectera la notation `Camel` : la première lettre du nom est en minuscules et la première lettre de chaque mot présent dans l'identificateur est en majuscules. Par exemple, `unTableau` respecte la notation `Camel`.
2.	Le nom des fonctions, attributs, paramètres et variables doit être le plus explicite possible et informer de leur rôle. Il ne faut pas hésiter à privilégier la lisibilité à la concision. 
3.	Le nom des fonctions, paramètres et variables ne contient que des lettres non accentuées ou des chiffres : le tiret bas, trait d'union ou tout autre caractère non alphanumérique sont interdits.
4.	Le nom des contrôles graphiques respectera la règle RN1. De plus, elle commencera par trois caractères précisant son type suivi d’un nom significatif (`txtNomCollaborateur`  par exemple pour la zone de texte du nom d’un collaborateur) :
```
	txt : zone de texte
	chk : case à cocher
	opt : bouton radio ou d’option
	lst : zone de liste déroulante
```
## Règles de style
1.	Chaque bloc logique doit être délimité par des accolades, même s’il ne se limite qu’à une seule instruction.
2.	Dans une instruction avec bloc, l’accolade ouvrante doit se trouver sur la fin de la ligne de l’instruction ; l’accolade fermante doit débuter une ligne, et être au même niveau d’indentation que l’instruction dont elle ferme le bloc.
3.	Les instructions contenues dans un bloc ont un niveau supérieur d'indentation.

## Règles de codage
1.	Utiliser l'opérateur de comparaison d'égalité stricte === et non ==.
2.	Le code javascript se trouvera uniquement dans des fichiers scripts .js et en aucune façon dans les balises HTML. En particulier, l’affectation des gestionnaires d’événements se fera uniquement via la méthode `addEventListener` appliquée à l’objet déclencheur de l’événement. 
3.	Le code javascript sera réparti sur au minimum 4 modules :

	1. Le module `projectsController` ayant en charge le traitement des demandes utilisateur, les gestionnaires d'événements étant maintenus dans le module contrôleur

	2. Le module `projectsViews` ayant en charge la modification des éléments de la page

	3. Le module `projectsData` ayant en charge l'accès à la source de données

	4. Le module `parameters` ayant en charge la consultation et/ou la mise à jour des données de configuration vis-à-vis de l'interrogation de l'API-REST Gitlab.

## Règles de documentation
1. Chaque fonction sera précédée de sa documentation au format `JSDoc`.
```javascript
/**
 * Rôle de la fonction 
 * @param {paramType} param1 
 * @returns {returnType} 
 */
```