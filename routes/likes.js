const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/likes', (req, res) => {
  const query = 'SELECT * FROM Likes';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render('likes', { likes: results });
  });
});

router.post('/likes', (req, res) => {
  const { Id_publicacion, numero_gusta } = req.body;
  const query = 'INSERT INTO Likes (Id_publicacion, numero_gusta) VALUES (?, ?)';
  db.query(query, [Id_publicacion, numero_gusta], (err, result) => {
    if (err) throw err;
    res.redirect('/likes');
  });
});

router.post('/likes/:id', (req, res) => {
  const { Id_publicacion, numero_gusta } = req.body;
  const query = 'UPDATE Likes SET Id_publicacion = ?, numero_gusta = ? WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [Id_publicacion, numero_gusta, id], (err, result) => {
    if (err) throw err;
    res.redirect('/likes');
  });
});

router.post('/likes/:id/delete', (req, res) => {
  const query = 'DELETE FROM Likes WHERE Id = ?';
  const { id } = req.params;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect('/likes');
  });
});

module.exports = router;
