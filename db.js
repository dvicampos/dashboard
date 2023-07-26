const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'publicaciones_facebook',
});

// Conectarse a la base de datos
db.connect((err) => {
  if (err) throw err;
  console.log('¡Conectado a la base de datos!');
});

module.exports = db;
