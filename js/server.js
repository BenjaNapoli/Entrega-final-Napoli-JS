const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/api/cart', (req, res) => {
    console.log('Datos del carrito recibidos:', req.body);
    res.status(200).send('Compra recibida');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});