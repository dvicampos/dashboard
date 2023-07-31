const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/publicaciones', (req, res) => {
  let mes = req.query.mes || -1;
    let dia = req.query.dia || -1;
    let hora = req.query.hora || -1;
    
    let query;
    if (mes === -1 && dia === -1 && hora === -1) {
      query = 'SELECT * FROM `publicaciones`';
    } else if (mes !== -1 && dia !== -1 && hora !== -1) {
      query = `SELECT * FROM publicaciones WHERE mes_publicacion = ${mes} AND dia_publicacion = ${dia} AND hora_publicacion = ${hora}`;
    } else if (mes !== -1 && dia !== -1) {
      query = `SELECT * FROM publicaciones WHERE mes_publicacion = ${mes} AND dia_publicacion = ${dia}`;
    } else {
      query = `SELECT * FROM publicaciones WHERE mes_publicacion = ${mes}`;
    }
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('publicaciones', { publicaciones: results });
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
