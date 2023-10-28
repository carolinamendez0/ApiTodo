const dotenv = require('dotenv');
dotenv.config()
// configuro la BD
const { MongoClient } = require('mongodb')
const URL = process.env.MONGODB_URLSTRING || ""
const client = new MongoClient(URL,  {
    useNewUrlParser: true
})
// Conexion a la BD 
async function connectToMongodb() { 
    try {
        await client.connect()
        console.log('Conectado a mongoDB')
        return client
    } catch (error) {
        console.log('Error al conectarse a mongoDB: ' + error)
        return null
    }
}
// Desconexion a la BD 
const disconnectToMongodb = async () => { 
    try {
        await client.close()
        console.log('Desconectado de mongoDB')
    } catch (error) {
        console.log('Error al desconectarse de mongoDB: ' + error)
    }
}
module.exports ={ connectToMongodb, disconnectToMongodb}