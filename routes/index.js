const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM publicaciones';
  db.query(query, (err, results) => {
    if (err) throw err;
    cantidadDatos = results.length
    res.render('', { publicaciones: results, cantidadDatos: cantidadDatos});
  });
});

module.exports = router;