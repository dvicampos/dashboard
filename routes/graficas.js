const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/graficas', (req, res) => {
    const mesSeleccionado = 5;

    const queryGrafica1 = `SELECT * FROM publicaciones WHERE mes_publicacion = ${mesSeleccionado}`;
    const queryGrafica2 = `SELECT likes.Id, likes.numero_gusta FROM likes INNER JOIN publicaciones ON likes.Id_publicacion = publicaciones.Id WHERE publicaciones.mes_publicacion = ${mesSeleccionado}`;
    const queryGrafica3 = `SELECT comentarios.Id, comentarios.numero_comentarios FROM comentarios INNER JOIN publicaciones ON comentarios.Id_publicacion = publicaciones.Id WHERE publicaciones.mes_publicacion = ${mesSeleccionado}`;
    const queryGrafica4 = `SELECT compartir.Id, compartir.numero_compartir FROM compartir INNER JOIN publicaciones ON compartir.Id_publicacion = publicaciones.Id WHERE publicaciones.mes_publicacion = ${mesSeleccionado}`;

  
    // Ejecuta las consultas SQL
    db.query(queryGrafica1, (err, grafica1Data) => {
      if (err) throw err;
  
      db.query(queryGrafica2, (err, grafica2Data) => {
        if (err) throw err;
  
        db.query(queryGrafica3, (err, grafica3Data) => {
          if (err) throw err;

          db.query(queryGrafica4, (err, grafica4Data) => {
            if (err) throw err;

            // Renderiza la vista 'graficas' y pasa los resultados de las consultas como datos
            res.render('graficas', {
                grafica1: grafica1Data,
                grafica2: grafica2Data,
                grafica3: grafica3Data,
                grafica4: grafica4Data
            });

          })
        });
      });
    });
  });
  

module.exports = router;