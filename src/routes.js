const express = require('express');

const  routes = express.Router();
const GenerateController = require('./controller/GenerateController');
const DataClienteController = require('./controller/DataClienteController');
const { authenticate } = require('./middlewares/auth');

routes.get('/cliente', DataClienteController.index);

routes.post('/pedido', authenticate, GenerateController.index);

module.exports = routes;