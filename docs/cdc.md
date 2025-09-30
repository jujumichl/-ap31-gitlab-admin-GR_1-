# Cahier des charges
L'application web **gitlab-admin** proposera pour tout utilisateur ayant le rôle administrateur un panneau d'administration où cet administrateur peut intervenir sur l'état des projets, des utilisateurs et des groupes de la plateforme. 

Dans le contexte de la section STS-SIO du lycée VHB, certaines opérations sont en effet à mener sur plusieurs projets ou plusieurs utilisateurs, en particulier en fin d'année scolaire. Seules des opérations unitaires sont proposées par l'application web gitlab : elles se révèlent donc très fastidieuses dans ce contexte.

Une solution consiste à s'appuyer sur l'API-Rest proposée par gitlab pour développer une application web spécifique permettant de sélectionner rapidement les ressources et d'appliquer la même action sur ces ressources.

Le présent document présente les fonctionnalités souhaitées pour cette application web spécifique articulée sur les 3 ressources que sont les projets, les utilisateurs et les groupes. Le paramétrage lié au serveur Gitlab visé est également souhaité.

## Exigences fonctionnelles
### Projets
L'application devra fournir la liste de tous les projets hébergés. 

Le tri par défaut se fera sur la date de création, du plus récent au plus ancien.

La liste fera apparaître, pour chaque projet, les données suivantes : id, nom complet, date de création, niveau de visibilité et URL d'accès.

On envisagera ou non la consultation des projets page par page ou dans leur totalité sur une seule page.

Seront proposées les actions suivantes pour chaque projet ou plusieurs projets sélectionnés :

- Supprimer
- Changer la visibilité

### Utilisateurs
L'application devra fournir la liste de tous les utilisateurs de la plateforme Gitlab. 

Le tri par défaut se fera sur le nom d'utilisateur par ordre alphabétique croissant.

La liste fera apparaître, pour chaque utilisateur, les données suivantes : id, nom, date de création, dernière date de connexion, état, nombre limite de projets.

On envisagera ou non la consultation des utilisateurs page par page ou dans leur totalité sur une seule page.

Seront proposées les actions suivantes pour chaque utilisateur ou plusieurs utilisateurs sélectionnés :

- Désactiver / activer
- Changer la limite du nombre de projets

### Groupes
L'application devra fournir la liste de tous les groupes.

Le tri par défaut se fera sur le nom de groupe par ordre alphabétique croissant.

La liste fera apparaître, pour chaque groupe, les données suivantes :  id, nom, date de création, description et visibilité, rôle nécessaire pour y créer un projet.

On envisagera ou non la consultation des groupes page par page ou dans leur totalité sur une seule page.

Seront proposées les actions suivantes pour chaque groupe ou plusieurs groupes sélectionnés :

- Supprimer
- Changer le rôle nécessaire pour créer un projet dans le groupe

### Données de configuration
L'utilisateur pourra paramétrer les données suivantes :

- URL d'accès à l'API : URL précédant le nom des ressources demandées, par exemple [https://gitlab.siovhb.lycee-basch.fr](https://gitlab.siovhb.lycee-basch.fr) On pourra décomposer la saisie en plusieurs parties : protocole, hôte, chemin d'accès et port.
- Jeton d'accès : l'authentification de l'administrateur se fera via la saisie d'un jeton d'accès, à générer par l'administrateur sur la plateforme gitlab via la rubrique Access token liée au profil de l'utilisateur.

## Exigences non fonctionnelles
- Homogénéité du design et de la cinématique de l'application sur l'ensemble des fonctionnalités
- Pages HTML conformes et valides en regard de la norme HTML5
- Informations fournies à l'utilisateur sur les erreurs survenant au niveau de l'API

## Ressources à disposition
- Documentation API Rest de Gitlab - [https://docs.gitlab.com/ee/api/rest](https://docs.gitlab.com/ee/api/README.html)
- Une VM Gitlab bac à sable
- Fiche technique sur des éléments de configuration de la VM Gitlab
- Guide de bonnes pratiques pour la réalisation de l'application