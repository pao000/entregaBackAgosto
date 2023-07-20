const express = require('express');
const dotenv = require('dotenv');
const { connectToMongoDB, disconnectFromMongoDB } = require('./src/mongodb');
const path = require('path');
const computacionRouter = require('./routes/computacion');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/admin')));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get('/', (req, res) => {
    res.status(200).send(`Welcome to the Computacion home!`);
});

app.use('/computacion', computacionRouter);

app.listen(PORT, async () => {
    await connectToMongoDB();
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
