const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/publicaciones', (req, res) => {
  let pago = req.query.pago || -1;
  let estado = req.query.estado || -1;
  let query;

  if (pago !== -1 && estado !== -1) {
      query = `SELECT * FROM publicaciones WHERE Tipo_publicacion = '${estado}' AND pagado = ${pago}`;
  } else if (pago !== -1) {
      query = `SELECT * FROM publicaciones WHERE pagado = ${pago}`;
  } else if (estado !== -1) {
      query = `SELECT * FROM publicaciones WHERE Tipo_publicacion = '${estado}'`;
  } else {
      query = 'SELECT * FROM publicaciones';
  }

  db.query(query, (err, results) => {
      if (err) throw err;
      cantidadDatos = results.length;
      res.render('publicaciones', {
          publicaciones: results,
          cantidadDatos: cantidadDatos
      });
  });
});





router.post('/publicaciones', (req, res) => {
  const { Id, Tipo_publicacion, mes_publicacion, dia_publicacion, hora_publicacion, pagado } = req.body;
  const query = 'INSERT INTO Publicaciones (Id, Tipo_publicacion, mes_publicacion, dia_publicacion, hora_publicacion, pagado) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [Id, Tipo_publicacion, mes_publicacion, dia_publicacion, hora_publicacion, pagado], (err, result) => {
    if (err) throw err;
    res.redirect('/publicaciones');
  });
});

router.post('/publicaciones/:id', (req, res) => {
  const { Tipo_publicacion, mes_publicacion, dia_publicacion, hora_publicacion, pagado } = req.body;
  const query = 'UPDATE Publicaciones SET Tipo_publicacion = ?, mes_publicacion = ?, dia_publicacion = ?, hora_publicacion = ?, pagado = ? WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [Tipo_publicacion, mes_publicacion, dia_publicacion, hora_publicacion, pagado, id], (err, result) => {
    if (err) throw err;
    res.redirect('/publicaciones');
  });
});

router.post('/publicaciones/:id/delete', (req, res) => {
  const query = 'DELETE FROM Publicaciones WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/publicaciones');
  });
});

module.exports = router;
