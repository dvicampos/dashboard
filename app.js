const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const { render, renderFile } = require('ejs');
const app = express();
const PORT = 3000;
const db = require('./db');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index'); 
});

const graficasRoutes = require('./routes/graficas')
app.use('/', graficasRoutes)

const publicacionesRoutes = require('./routes/publicaciones');
app.use('/', publicacionesRoutes);

const likesRoutes = require('./routes/likes');
app.use('/', likesRoutes);

const comentariosRoutes = require('./routes/comentarios');
app.use('/', comentariosRoutes);

const compartirRoutes = require('./routes/compartir');
app.use('/', compartirRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto http://localhost:${PORT}`);
});
