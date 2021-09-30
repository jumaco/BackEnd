const Contenedor = require('./class');


class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

const nuevoContenedor = new Contenedor('productos.json')

const nuevoProducto = new Producto('Fuente de PC', 9999, 'https://http2.mlstatic.com/D_NQ_NP_601558-MLA43358416469_092020-O.webp')

const ejecutar = async () => {

    const id = await nuevoContenedor.save(nuevoProducto);
    console.log(id);

    // const all = await nuevoContenedor.getAll();
    // console.log(all);

    // await nuevoContenedor.deleteAll()

    // const getId = await nuevoContenedor.getById(8)
    // console.log(getId)

    // const deleteById = await nuevoContenedor.deleteById(2)
    
}

ejecutar()


