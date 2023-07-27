const router = require("express").Router();
const { connectToMongoDB, disconnectFromMongoDB } = require("../src/mongodb");

const databaseName = 'computacion';

router.get('/', async (req, res) => {
    try {
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        const db = client.db(databaseName);
        const productos = await db.collection('computacion').find().toArray();
        await disconnectFromMongoDB();

        res.send(productos);
    } catch (error) {
        console.error('Error en la ruta /:', error);
        res.status(500).send('Error al obtener los productos');
    }
});


router.get('/id/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        const db = client.db(databaseName);
        const producto = await db.collection('computacion').findOne({ _id: ObjectId(productId) });
        await disconnectFromMongoDB();

        if (!producto) {
            res.status(404).send('Producto no encontrado');
            return;
        }

        res.send(producto);
    } catch (error) {
        console.error('Error en la ruta /id/:id:', error);
        res.status(500).send('Error al obtener el producto');
    }
});


router.get('/nombre/:nombre', async (req, res) => {
    try {
        const productName = req.params.nombre;
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send('Error al conectar a la base de datos');
            return;
        }

        const db = client.db(databaseName);
        const productos = await db
            .collection('computacion')
            .find({ nombre: { $regex: productName, $options: 'i' } })
            .toArray();

        await disconnectFromMongoDB();

        if (!productos || productos.length === 0) {
            res.status(404).send('Producto no encontrado');
            return;
        }

        res.send(productos);
    } catch (error) {
        console.error('Error en la ruta /nombre/:nombre:', error);
        res.status(500).send('Error al obtener los productos por nombre');
    }
});


router.get('/precio/:precio', async (req, res) => {
    try {
        const productoPrecio = parseInt(req.params.precio) || 0;
        console.log(req.params.precio);
        const client = await connectToMongoDB();
        if (!client) {
            res.status(500).send("Error al conectar a la base de datos");
            return;
        }

        const db = client.db(databaseName);
        const producto = await db.collection('computacion').find({ importe: { $gte: parseInt(productoPrecio) } }).toArray();

        await disconnectFromMongoDB();

        if (producto.length === 0) {
            res.status(404).send(`No es posible encontrar productos con un precio mayor o igual a $${productoPrecio}`);
        } else {
            res.send(producto);
        }
    } catch (error) {
        console.error('Error en la ruta /precio/:precio:', error);
        res.status(500).send('Error al obtener los productos por precio');
    }
});

router.post('/', async (req, res) => {
    const nuevoProducto = req.body;
    console.log(nuevoProducto);
    if (nuevoProducto === undefined) {
        res.status(400).send('Error de formato al crearlo');
    }
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse al servidor');
    }
    const collection = client.db('computacion').collection('computacion');
    collection.insertOne(nuevoProducto)
        .then(() => {
            console.log('Se ha creado una nuevo producto');
            res.status(200).send(nuevoProducto);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            client.close();
        });
});

router.put('/id/:id', async (req, res) => {
    const id = req.params.id;
    const nuevosDatos = req.body;

    if (!nuevosDatos) {
        res.status(400).send('Error en el formato de datos recibidos.');
    }

    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectarse a MongoDB');
    }

    const collection = client.db(databaseName).collection('computacion');
    collection.updateOne({ id: parseInt(id) }, { $set: nuevosDatos })
        .then(() => {
            console.log('Producto modificado:');
            res.status(200).send(nuevosDatos);
        })
        .catch((error) => {
            res.status(500).json({ descripcion: 'Error al modificar el producto' });
        })
        .finally(() => {
            client.close();
        });
});

router.delete('/id/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send('El formato de datos es incorrecto o inválido.');
    }

    const client = await connectToMongoDB();
    if (!client) {
        return res.status(500).send('Error al conectarse a MongoDB');
    }

    client.connect()
        .then(() => {
            const collection = client.db(databaseName).collection('computacion');
            return collection.deleteOne({ id: parseInt(id) });
        })
        .then((resultado) => {
            if (resultado.deletedCount === 0) {
                res.status(404).send(`No se encontró producto con ID proporcionado: ${id}`);
            } else {
                console.log('Producto eliminado.');
                res.status(204).send();
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Se produjo un error al intentar eliminar el producto.');
        })
        .finally(() => {
            client.close();
        });
});



module.exports = router;