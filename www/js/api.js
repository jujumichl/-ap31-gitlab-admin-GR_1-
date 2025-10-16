function getAPIBaseUrl(){
    return `${config.protocol}://${config.host}/${config.path}`;
}

function getAccessToken(){
    return config.token;
}