const express = require('express');

const  routes = express.Router();
const GenerateController = require('./controller/GenerateController');
const DataClienteController = require('./controller/DataClienteController');

routes.get('/cliente', DataClienteController.index);

routes.post('/pedido', GenerateController.index);

module.exports = routes;