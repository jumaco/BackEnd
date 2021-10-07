const fs = require('fs')

class Producto {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}

class Contenedor {
    constructor(file) {
        this.file = file;
    }
    // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    async save(object) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8')
            let array = [];
            if (contenido === '') {
                object.id = 1;
                array.push(object);
            } else {
                const arrayObtenido = JSON.parse(contenido);
                object.id = arrayObtenido[arrayObtenido.length - 1].id + 1;
                arrayObtenido.push(object);
                array = arrayObtenido;
            }
            const objectsString = JSON.stringify(array, null, 2);
            await fs.promises.writeFile(`./${this.file}`, objectsString);
            return object.id;
        } catch (error) {
            console.log({ error })
        }
    }
    // Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(number) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8');
            const arrayObtenido = JSON.parse(contenido);
            let objectEncontrado = null
            arrayObtenido.map((object) => {
                if (object.id === number) {
                    objectEncontrado = object;
                }
            })
            return objectEncontrado;
        } catch (error) {
            console.log({ error })
        }
    }
    // Devuelve un array con los objetos presentes en el archivo.
    async getAll() {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8')
            const arrayObtenido = JSON.parse(contenido);
            return arrayObtenido;
        } catch (error) {
            console.log({ error })
        }
    }
    // const obtenerRandomInferior = (min, max) => Math.round(Math.random() * (max - min + 1)) + min;
    async getRandom() {
        const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8')
            const arrayObtenido = JSON.parse(contenido);
            const posicionRandom = random(0, arrayObtenido.length - 1);
            return (arrayObtenido[posicionRandom]);
        } catch (error) {
            console.log({ error })
        }
    }
    // Elimina del archivo el objeto con el id buscado.
    async deleteById(number) {
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`, 'utf8');
            const arrayObtenido = JSON.parse(contenido);
            arrayObtenido.map((object) => {
                if (object.id === number) {
                    let indice = arrayObtenido.indexOf(object);
                    console.log('INDICEEE', indice);
                    arrayObtenido.splice(indice, 1);
                };
            });
            const arrayString = JSON.stringify(arrayObtenido, null, 2);
            await fs.promises.writeFile(`./${this.file}`, arrayString);
        } catch (error) {
            console.log({ error });
        };
    };
    // Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.file}`, '')
        } catch (error) {
            console.log({ error })
        }
    }
    // Recibe y actualiza un producto según su id.
    updateById(prod, id) {
        
    }

};

module.exports = Contenedor;