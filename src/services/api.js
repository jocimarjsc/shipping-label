const axios = require('axios');

const api = axios.create({
    baseURL: 'https://api.plataformarocky.com.br/',
    headers: {
        Authorization: `Bearer ${process.env.TOKEN}`,
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
})

module.exports = api;