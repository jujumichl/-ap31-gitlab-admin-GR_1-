# User accounts
## CF
Liens pour la documentation API des utilisateurs :  
https://docs.gitlab.com/18.4/api/users/

Ficher JSON à importer dans Talend : 
[UserGitlab.json](./JSON_Talend/UserGitlab.json)
## Requête GET
### Liste des utilisateurs
Il suffit d'ajouter ce préfixe a la fin de l'URL :  `/users`

### Pour trier les utilisateurs de A à Z
Il suffit d'ajouter ce préfixe a la fin de l'URL :  `/users?order_by=username&sort=asc`

`order_by` peux prendre comme valeur : 
- `id` : Trie les utilisateurs par leur identifiants
- `name` : Trie les utilisateurs par leur noms
- `username` : Trie les utilisateurs par leur pseudo
- `created_at` : Trie les utilisateurs par la date de création
- `updated_at` : Trie les utilisateurs par la dernière modification effectuée sur leur profil

`sort` peux prendre comme valeur : 
- `asc` : Trie du plus petit au plus grand
- `desc` : Trie du plus grand au plus petit

### Nom des attributs des colonnes
ID User: `id`  
Nom User: `name`  
Pseudo User : `username`  
Date de création User: `created_at`  
Dernière date de connexion: `last_sign_in_at`  
État: `state`  
Nombre limite de projets: `projects_limit`

## Requête POST

### Desactivé/ activé les utilisateurs
Pour activer les utilisateurs:  `/users/:id/activate`

Pour désactiver les utilisateurs: `/users/:id/deactivate`

## Requête PUT
### Changer le nombre de la limite des utilisateurs
Pour augmenter la limite du nombre de projet pouvant être créer par une personne : 
`/users/:id`  
Ensuite mettre dans le body de la requête mettre ce json:  
```json
{
    "projects_limit": int //Remplacer le int par le nombre de projets que l'on souhaite associé 
}
```


