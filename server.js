const express = require('express');
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb');
const dotenv = require('dotenv');
const path = require('path');
const { ObjectId } = require('mongodb');
const routes = require('./routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const databaseName = 'computacion';

app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get('/', (req, res) => {
    res.status(200).send(`Welcome to the Computacion home!`);
});

app.get('/computacion', async (req, res) => {
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send('Error al conectar a la base de datos');
        return;
    }
    const db = client.db(databaseName);
    const productos = await db.collection('computacion').find().toArray();
    await disconnectFromMongoDB();
    console.log(productos)
    res.send(productos);
});

app.get('/computacion/id/:id', async (req, res) => {
    const productoId = parseInt(req.params.id) || 0;
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("Error al conectar a la base de datos");
        return;
    }
    const db = client.db(databaseName);
    const producto = await db.collection('computacion').findOne({ codigo: productoId });
    await disconnectFromMongoDB();
    if (!producto) {
        res.status(404).send(`No se puede encontrar el producto con el ID: ${productoId}`);
    } else {
        res.send(producto);
    }
});

app.get('/computacion/nombre/:nombre', async (req, res) => {
    const productName = req.params.nombre;
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("Error al conectar a la base de datos");
        return;
    }

    const db = client.db(databaseName);
    const regex = new RegExp(productName, 'i');
    const productos = await db.collection('computacion').find({ nombre: regex }).toArray();

    await disconnectFromMongoDB();
    if (productos.length === 0) {
        res.status(404).send(`No se pueden encontrar productos con el nombre: ${productName}`);
    } else {
        res.send(productos);
    }
});



app.get('/computacion/precio/:precio', async (req, res) => {
    const productoPrecio = parseFloat(req.params.precio) || 0;
    const client = await connectToMongoDB();
    if (!client) {
        res.status(500).send("Error al conectar a la base de datos");
        return;
    }
    const db = client.db(databaseName);
    const producto = await db.collection('computacion').find({ precio: { $gte: productoPrecio } }).toArray();
    await disconnectFromMongoDB();
    if (producto.length === 0) {
        res.status(404).send(`No se pueden encontrar productos con un precio mayor o igual a $${productoPrecio}`);
    } else {
        res.send(producto);
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
