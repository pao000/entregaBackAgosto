const dotenv= require ('dotenv');
dotenv.config();
const {MongoClient}= require('mongodb');

const URI= process.env.MONGODB_URLSTRING;
const client= new MongoClient(URI);

async function connectToMongoDB() {
try {
    await client.connect();
    console.log('conectado a mongo');
    return client;
} catch (error) {
    console.error('error al conectar', error);
    return null;
}
}

async function disconnectFromMongoDB() {
  try {
    await client.close();
    console.log("desconectado de mongo");
  } catch (error) {
    console.error("error al desconectar", error);
  }
}


module.exports={connectToMongoDB,disconnectFromMongoDB};