const express = require('express');

const Contenedor = require('./class');
const contenedor = new Contenedor('./productos.json');

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/agregar', express.static('public'));


// ENDPOINTS

// GET '/' -> endpoint Inicial
const PATH = '/';
const callback = (request, response, next) => {
  response.send({ mensaje: 'HOLA MUNDO' });
};
server.get(PATH, callback);

// GET '/api/productos' -> devuelve todos los productos.
server.get('/api/productos', async (req, res) => {
  const productos = await contenedor.getAll();
  res.json(productos);
});

// GET '/api/productosRandom' -> Devuelve un producto al azar
server.get('/api/productosRandom', async (req, res) => {
  const producto = await contenedor.getRandom();
  res.json(producto);
});

// GET '/api/productos/?clave=valor&clave=valor' -> devuelve un producto según su id.
server.get('/api/consulta', (req, res) => {
  console.log(req.query)
  res.send(req.query)
});

// GET '/api/productos/:id' -> devuelve un producto según su id.
server.get('/api/productos/:id', async (req, res) => {
  const id = Number(req.params.id)
  const producto = await contenedor.getById(id);
  if (!producto) {
    res.send({
      error: 'producto no encontrado'
    });
  } else {
    res.json(producto);
  }
});

// POST '/api/producto' -> recibe y agrega un producto, y lo devuelve con su id asignado.
server.post('/api/producto', async (req, res) => {
  // const newProducto = {...req.body};
  // const productoNuevo = new Producto(newProducto)
  await contenedor.save(req.body)
  res.send(req.body);
});

// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
server.put('/api/productos/:id', async (req, res) => {
  const productoUpadate = await contenedor.updateById(req.body, Number(req.params.id));
  if (!productoUpadate) {
    res.send({
      error: 'producto no encontrado'
    });
  } else {
    res.send({
      message: 'success',
      data: productoUpadate
    });
  }
});

// DELETE '/api/productos/:id' -> elimina un producto según su id.
server.delete('/api/productos/:id', async (req, res) => {
  const productoDelete = await contenedor.deleteById(Number(req.params.id))
  if (!productoDelete) {
    res.send({
      error: 'producto no encontrado'
    });
  } else {
    res.send({
      message: 'Producto eliminado'
    });
  }
});


// enciendo el server
const callbackInit = () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
};
server.listen(PORT, callbackInit);

// manejo de errores
server.on('error', (error) => console.log('Error: ', error));