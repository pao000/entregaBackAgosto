// Este es el index.js de routes
const router = require("express").Router();
const computacionRouter = require("./computacion"); // importamos el enrutador especifico para las rutas relacionadas con computacion

router.use("/computacion", computacionRouter);// usamos el enrutador que definimos en la linea 3, le decimos que use /computacion en la url. Por eso lo sacamos en las url del archivo computacion.js. Con aclararlo en esta linea sabemos que vamos a usar /computacion en cada ruta de ese archivo.

module.exports = router;