const axios = require('axios');

const api = axios.create({
    baseURL: 'https://lojasgrafitte.commercesuite.com.br/web_api',
    Headers: {
        "Content-type": "application/json"
    }
})

module.exports = { api };