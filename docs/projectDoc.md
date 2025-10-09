
# Projects
## CF
[Fichier JSON a importer dans Talend](./JSON_Talend/projectGitlab.json)  
Liens direct vers la documentation :
[api/projects/](https://docs.gitlab.com/18.4/api/projects/)
## Requête GET
### Liste des projects
Il suffit d'ajouter ce préfixe a la fin de l'URL :  `/projects`

### Pour trier les projets du plus récent au plus ancien
Il suffit d'ajouter ce préfixe a la fin de l'URL :  `/projects?order_by=created_at&sort=desc`

`order_by` peux prendre comme valeur : 
- `id` : Trie les projets par leur identifiants
- `name` : Trie les projets par leur noms
- `username` : Trie les projets par leur pseudo
- `created_at` : Trie les projets par la date de création
- `updated_at` : Trie les projets par la dernière modification effectuée sur leur profil

`sort` peux prendre comme valeur : 
- `asc` : Trie du plus petit au plus grand
- `desc` : Trie du plus grand au plus petit

### Nom des attributs des colonnes
ID Projects: `id`  
Nom Complet Projects: `name`   
Nom de l'owner : `namespace.name`
Date de création Projects: `created_at`  
niveau de visibilité : `visibility`  
URL du projet: `web_url`

## Requête POST

### Desactivé/ activé les projets
Pour activer les projets:  `/projects/:id/activate`

Pour désactiver les projets: `/projects/:id/deactivate`

## Requête DELETE 

### Suppression des projets

Pour supprimer un projet:  `/projects/:id`


