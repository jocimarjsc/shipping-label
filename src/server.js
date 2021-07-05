require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const PORT = process.env.PORT || 3333

const app = express();

app.use('/download', express.static(path.resolve(__dirname, '..', 'public')));

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, ()=> console.log(`Servidor rodando: http://localhost:${PORT}`));