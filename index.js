const express = require('express');

const Contenedor = require('./class');
const contenedor = new Contenedor('./productos.json');

const server = express();
const PORT = 8080;


// endpoint inicial
const PATH = '/';
const callback = (request, response, next) => {
  response.send({ mensaje: 'HOLA MUNDO'});
};
server.get(PATH, callback);

// endpoint /products
server.get('/productos', async (req, res) => {
  const productos = await contenedor.getAll();
  res.json(productos);
});

// endpoint /productsRandom
server.get('/productosRandom', async (req, res) => {
  const producto = await contenedor.getRandom();
  res.json(producto);
});


// enciendo el server
const callbackInit = () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT, callbackInit);

// manejo de errores
server.on('error', (error) => console.log('Error: ', error));