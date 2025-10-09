# User accounts
Liens pour la documentation API des utilisateurs :  
https://docs.gitlab.com/18.4/api/users/

## Requête GET
### Liste des utilisateurs
Il suffit d'ajouter ce préfixe a la fin de l'URL :  `/users`

### Nom des attributs des colonnes
ID User: `id`  
Nom User: `username`  
date de création User: `created_at`  
dernière date de connexion: `last_sign_in_at`  
état: `state`  
nombre limite de projets: `projects_limit`

## Requête POST

### Desactivé/ activé les utilisateurs
Pour activer les utilisateurs:  `/users/:id/activate`

Pour désactiver les utilisateurs: `/users/:id/deactivate`

## Requête PUT
### Changer le nombre de la limite des utilisateur
Pour augmenter la limite du nombre de rpojet pouvant être créer par une personne : 
`/users/:id`  
Ensuite mettre dans le body de la requête mettre ce json:  
```json
{
    "projects_limit": int //Remplacer le int par le nombre de projets que l'on souhaite associé 
}
```


