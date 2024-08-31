const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/cart', (req, res) => {
    console.log('Datos del carrito recibidos:', req.body);
    res.status(200).send('Compra recibida');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});