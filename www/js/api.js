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

