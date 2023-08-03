const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/graficas', (req, res) => {
    let mesSeleccionado = req.query.mes;
    let dia = req.query.dia;
    let hora = req.query.hora;

    let queryGrafica1 = `SELECT * FROM publicaciones`;
    let queryGrafica2 = `SELECT likes.Id, likes.numero_gusta FROM likes INNER JOIN publicaciones ON likes.Id_publicacion = publicaciones.Id`;
    let queryGrafica3 = `SELECT comentarios.Id, comentarios.numero_comentarios FROM comentarios INNER JOIN publicaciones ON comentarios.Id_publicacion = publicaciones.Id`;
    let queryGrafica4 = `SELECT compartir.Id, compartir.numero_compartir FROM compartir INNER JOIN publicaciones ON compartir.Id_publicacion = publicaciones.Id`;

    let whereClause = [];
    if (mesSeleccionado) {
        whereClause.push(`mes_publicacion = ${mesSeleccionado}`);
    }
    if (dia) {
        whereClause.push(`dia_publicacion = ${dia}`);
    }
    if (hora) {
        whereClause.push(`hora_publicacion = ${hora}`);
    }

    if (whereClause.length > 0) {
        queryGrafica1 += ` WHERE ${whereClause.join(' AND ')}`;
        queryGrafica2 += ` WHERE ${whereClause.join(' AND ')}`;
        queryGrafica3 += ` WHERE ${whereClause.join(' AND ')}`;
        queryGrafica4 += ` WHERE ${whereClause.join(' AND ')}`;
    }

    db.query(queryGrafica1, (err, grafica1Data) => {
        if (err) throw err;
        cantidadDatos1 = grafica1Data.length
        db.query(queryGrafica2, (err, grafica2Data) => {
            if (err) throw err;
            cantidadDatos2 = grafica2Data.length
            db.query(queryGrafica3, (err, grafica3Data) => {
                if (err) throw err;
                cantidadDatos3 = grafica3Data.length
                db.query(queryGrafica4, (err, grafica4Data) => {
                    if (err) throw err;
                    cantidadDatos4 = grafica4Data.length
                    res.render('graficas', {
                        grafica1: grafica1Data,
                        grafica2: grafica2Data,
                        grafica3: grafica3Data,
                        grafica4: grafica4Data,
                        mesSeleccionado: mesSeleccionado,
                        dia: dia,
                        hora: hora,
                        cantidadDatos1: cantidadDatos1,
                        cantidadDatos2: cantidadDatos2,
                        cantidadDatos3: cantidadDatos3,
                        cantidadDatos4: cantidadDatos4,
                        
                    });
                });
            });
        });
    });
});

module.exports = router;
