const Contenedor = require('./class');


class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const nuevoContenedor = new Contenedor('productos.json')

// const nuevoProducto = new Producto('Notebook HP 240 G7', 49999, 'https://http2.mlstatic.com/D_NQ_NP_954041-MLA46302470460_062021-O.webp')

const ejecutar = async () => {

    // const id = await nuevoContenedor.save(nuevoProducto);
    // console.log(id);

    // const all = await nuevoContenedor.getAll();
    // console.log(all);

    // await nuevoContenedor.deleteAll()

    // const getId = await nuevoContenedor.getById(8)
    // console.log(getId)

    // const deleteById = await nuevoContenedor.deleteById(2)
    
    // const random = await nuevoContenedor.getRandom();
    // console.log(random);
}

ejecutar()