const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/comentarios', (req, res) => {
  const query = 'SELECT * FROM Comentarios';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('comentarios', { comentarios: results });
  });
});

router.post('/comentarios', (req, res) => {
  const {Id, Id_publicacion, numero_comentarios } = req.body;
  const query = 'INSERT INTO Comentarios (Id, Id_publicacion, numero_comentarios) VALUES (?, ?, ?)';
  db.query(query, [Id, Id_publicacion, numero_comentarios], (err, result) => {
    if (err) throw err;
    res.redirect('/comentarios');
  });
});

router.post('/comentarios/:id', (req, res) => {
  const { Id_publicacion, numero_comentarios } = req.body;
  const query = 'UPDATE Comentarios SET Id_publicacion = ?, numero_comentarios = ? WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [Id_publicacion, numero_comentarios, id], (err, result) => {
    if (err) throw err;
    res.redirect('/comentarios');
  });
});

router.post('/comentarios/:id/delete', (req, res) => {
  const query = 'DELETE FROM Comentarios WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/comentarios');
  });
});

module.exports = router;
