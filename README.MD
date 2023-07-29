# API REST de Productos de Computación

Esta es una API REST que proporciona rutas para interactuar con una base de datos de productos de computación. La API permite realizar operaciones como obtener todos los productos, buscar productos por ID, nombre y precio, así como crear nuevos productos y modificar o eliminar productos existentes.

## Requisitos

Antes de ejecutar la aplicación, instalá Node.js y MongoDB en tu sistema. Creá un archivo `.env` para configurar las variables de entorno necesarias. y agregá lo siguiente:

```env
MONGODB_URLSTRING=mongodb://usuario:contrasena@localhost:27017/nombre-base-datos
PORT=3000

```

Asegurate de reemplazar usuario, contraseña, nombre-base-datos con la información para tu base de datos MongoDB. El valor PORT establece el puerto en el que se ejecutará que es el 3000.

## Instalación

Cloná este repositorio en tu máquina local.
Ejecutá npm install para instalar las dependencias necesarias.

## Configuración de la Base de Datos

Asegurate de tener una instancia de MongoDB en ejecución y configurá la conexión a la base de datos en el archivo src/mongodb.js.

// src/mongodb.js

const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const URI = process.env.MONGODB_URLSTRING;
const client = new MongoClient(URI);

// ... (el resto del código del archivo mongodb.js)

## Uso

Para iniciar la aplicación, ejecutá el siguiente comando:

npm start

La API estará disponible en http://localhost:3000. Podés utilizar herramientas como Postman o cURL para interactuar con la API y realizar solicitudes HTTP a las rutas disponibles.

## Endpoints

La API ofrece los siguientes endpoints para interactuar con los productos de computación:

GET /: Obtener todos los productos.
GET /id/:id: Obtener un producto por su ID.
GET /nombre/:nombre: Buscar productos por nombre.
GET /precio/:precio: Buscar productos por precio.
POST /: Crear un nuevo producto.
PUT /id/:id: Modificar un producto existente por su ID.
DELETE /id/:id: Eliminar un producto por su ID.
Para obtener más detalles sobre cómo usar cada endpoint, consulta el archivo routes/computacion.js.

## Rutas de la API

A continuación se muestra una tabla con las rutas utilizadas en la API junto con una breve descripción de cada una:

| Método | Ruta                        | Descripción                                         |
| ------ | --------------------------- | --------------------------------------------------- |
| GET    | /                           | Página de inicio. Muestra un mensaje de bienvenida. |
| GET    | /computacion                | Obtiene todos los productos de computación.         |
| GET    | /computacion/id/:id         | Obtiene un producto por su ID.                      |
| GET    | /computacion/nombre/:nombre | Busca productos por nombre.                         |
| GET    | /computacion/precio/:precio | Busca productos por precio.                         |
| POST   | /computacion                | Crea un nuevo producto.                             |
| PUT    | /computacion/id/:id         | Modifica un producto existente por su ID.           |
| DELETE | /computacion/id/:id         | Elimina un producto por su ID.                      |

## Productos de Computación

A continuación se muestra una tabla con ejemplos de productos de computación:

| ID  | Código | Nombre                   | Precio   | Categoría              |
| --- | ------ | ------------------------ | -------- | ---------------------- |
| 1   | 1      | Desktop Gaming           | $999.99  | Desktop                |
| 2   | 2      | Laptop Ultrabook         | $1299.99 | Portátiles             |
| 3   | 3      | Teclado Mecánico         | $89.99   | Accesorios             |
| 4   | 4      | Impresora Multifuncional | $199.99  | Impresoras             |
| 5   | 5      | Memoria RAM              | $79.99   | Partes de computadoras |
| 6   | 6      | Monitor Curvo            | $299.99  | Monitores              |
| 7   | 7      | Mouse Inalámbrico        | $29.99   | Accesorios             |
| 8   | 8      | Disco Duro Externo       | $99.99   | Accesorios             |
| 9   | 9      | Tarjeta de Video         | $249.99  | Partes de computadoras |
| 10  | 10     | Tableta Gráfica          | $199.99  | Accesorios             |
| 11  | 11     | All-in-One PC            | $899.99  | Desktop                |
| 12  | 12     | Laptop Convertible       | $799.99  | Portátiles             |
| 13  | 13     | Mouse Ergonómico         | $39.99   | Accesorios             |
| 14  | 14     | Impresora de Etiquetas   | $149.99  | Impresoras             |
| 15  | 15     | Disco SSD                | $129.99  | Partes de computadoras |
| 16  | 16     | Monitor 4K               | $499.99  | Monitores              |
| 17  | 17     | Webcam Full HD           | $69.99   | Accesorios             |
| 18  | 18     | Router Gigabit           | $79.99   | Accesorios             |
| 19  | 19     | Tarjeta de Red Ethernet  | $19.99   | Partes de computadoras |
| 20  | 20     | Teclado Retroiluminado   | $59.99   | Accesorios             |
| 21  | 21     | Desktop Todo en Uno      | $699.99  | Desktop                |
| 22  | 22     | Laptop Gamer             | $1499.99 | Portátiles             |
| 23  | 23     | Altavoces 2.1            | $89.99   | Accesorios             |
| 24  | 24     | Impresora Láser          | $299.99  | Impresoras             |
| 25  | 25     | Fuente de Alimentación   | $129.99  | Partes de computadoras |
| 26  | 26     | Monitor Ultrawide        | $599.99  | Monitores              |
| 27  | 27     | Cámara Web               | $49.99   | Accesorios             |
| 28  | 28     | Router Mesh              | $129.99  | Accesorios             |
| 29  | 29     | Tarjeta de Sonido        | $49.99   | Partes de computadoras |
| 30  | 30     | Teclado Inalámbrico      | $39.99   | Accesorios             |

```

```
