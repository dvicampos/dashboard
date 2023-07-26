const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/compartir', (req, res) => {
  const query = 'SELECT * FROM Compartir';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('compartir', { compartir: results });
  });
});

router.post('/compartir', (req, res) => {
  const { Id, Id_publicacion, numero_compartir } = req.body;
  const query = 'INSERT INTO compartir (Id, Id_publicacion, numero_compartir) VALUES (?, ?, ?)';
  db.query(query, [Id, Id_publicacion, numero_compartir], (err, result) => {
    if (err) throw err;
    res.redirect('/compartir');
  });
});

router.post('/compartir/:id', (req, res) => {
  const { Id_publicacion, numero_compartir } = req.body;
  const query = 'UPDATE Compartir SET Id_publicacion = ?, numero_compartir = ? WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [Id_publicacion, numero_compartir, id], (err, result) => {
    if (err) throw err;
    res.redirect('/compartir');
  });
});

router.post('/compartir/:id/delete', (req, res) => {
  const query = 'DELETE FROM Compartir WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/compartir');
  });
});

module.exports = router;
