const { Console } = require('console');
const routes = require('../../system/Router/routes');
const { route } = require('../../system/Router/routes');
const TodoModel  = require ('../models/todoModel');
const { connectToMongodb, disconnectToMongodb} = require('./../../src/database/mongodb')
const { MongoClient, ObjectId } = require('mongodb');

  // Obtener una lista de elementos TODO
exports.getTodoList = async (req, res) => {
        try {
        // Conecta a MongoDB
        const client = await connectToMongodb();
        if (!client) {
            res.status(500).send('Error al conectarse a la base de datos');
            return;
        }
            // Accede a la base de datos y la colección
        const db = client.db('Todo');
        const collection = db.collection('Todo');
            // Realiza la consulta para obtener la lista de elementos TODO
        const todos = await collection.find().toArray();
            // Desconéctate de MongoDB
        await disconnectToMongodb();
            // Devuelve la lista de elementos TODO
        res.json(todos);
        } catch (error) {
        res.status(500).json({ error: 'Error al obtener la lista de elementos TODO' });
        }
  };


 
// Endpoint POST para agregar un nuevo elemento TODO 
exports.createTodo = async (req, res) => {
    const nuevoTodo = req.body;
    if (!nuevoTodo || Object.keys(nuevoTodo).length === 0) {
      return res.status(400).send('Error en el formato de los datos ingresados');
    }
  
    // Elimina el campo _id si está presente
    if (nuevoTodo._id) {
      delete nuevoTodo._id;
    }
      // Validación de datos
    if (
      typeof nuevoTodo.title !== 'string' ||
      typeof nuevoTodo.description !== 'string' ||
      typeof nuevoTodo.category !== 'string'
    ) {
      return res.status(400).send('Error en el formato de los datos ingresados, recuerde que el código es numérico, el nombre es una cadena de caracteres, el precio es numérico  y la categoría es una cadena de caracteres');
    }
  
    const client = await connectToMongodb();
        if (!client) {
            res.status(500).send('Error al conectarse a la base de datos');
            return;
        }

   
        const db = client.db('Todo');
        const collection = db.collection('Todo');
  
    try {
        const result = await collection.insertOne(nuevoTodo);
        console.log('Se creó el registro TODO');
      const mensaje = 'Se creó el registro TODO';
      res.status(200).json({ descripcion: mensaje, objeto: nuevoTodo });
    } catch (err) {
      console.error(err);
      res.status(500).json({ descripcion: 'Error al insertar el elemento', error: err });
    } finally {
      client.close();
    }
//   });
  };

// Metodo update para editar elemento TODO por un id

  exports.updateTodo = async (req, res) => {
    const id = req.params.id;
    const todoModificado = req.body;
    if (!todoModificado || Object.keys(todoModificado).length === 0) {
      return res.status(400).send('Error en el formato de los datos ingresados');
    }

     // Elimina el campo _id si está presente
    if (todoModificado._id) {
        delete todoModificado._id;
    }
    // Validación de datos
    if (
      typeof todoModificado.title !== 'string' ||
      typeof todoModificado.description !== 'string' ||
      typeof todoModificado.category !== 'string'
    ) {
      return res.status(400).send('Error en el formato de los datos ingresados, recuerde que la descripcion, el titulo y la categoria es una cadena de caracteres');
    }
  
    const client = await connectToMongodb();
        if (!client) {
            res.status(500).send('Error al conectarse a la base de datos');
            return;
        }

        const db = client.db('Todo');
        const collection = db.collection('Todo');
  
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Crear una instancia de ObjectId
            { $set: todoModificado }
          );
          if (result.matchedCount === 0) {
            return res.status(404).send('Todo con el ID : ' + id + ' no encontrado');
          }
        const mensaje = 'Se modificó el registro TODO';
         res.status(200).json({ descripcion: mensaje, objeto: todoModificado });
    } catch (err) {
      console.error(err);
      res.status(500).json({ descripcion: 'Error al modificar : ', error: err });
    } finally {
      client.close();
    }
  };


// Metodo update para editar el campo completed de un elemento pasandole el ID

  exports.toggleTodoComplete  = async (req, res) => {
    const id = req.params.id;
    const todoModificado = req.body;
    console.log(todoModificado);
    // verifico que me envie un boolean 
    const completed = {
        completed: req.body.completed, // Solo tomar el campo 'completed' del body
      };

      if (typeof todoModificado.completed !== 'boolean') {
        return res.status(400).send('Error en el formato de los datos ingresados, recuerde que completed debe ser un booleano');
      }
    
  
    const client = await connectToMongodb();
        if (!client) {
            res.status(500).send('Error al conectarse a la base de datos');
            return;
        }

        const db = client.db('Todo');
        const collection = db.collection('Todo');
  
    try {
        const result = await collection.updateOne(
            { _id: new ObjectId(id) }, // Crear una instancia de ObjectId
            { $set: completed }
          );
          if (result.matchedCount === 0) {
            return res.status(404).send('Todo con el ID : ' + id + ' no encontrado');
          }
        const mensaje = 'Se modificó el registro TODO con el ID: ';
         res.status(200).json({ descripcion: mensaje, objeto: id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ descripcion: 'Error al modificar : ', error: err });
    } finally {
      client.close();
    }
  };

  

//Metodo GET buscar por categorias

exports.getCategoriaList = async (req, res) => {
    const categoria = req.params.categoria
    const regex = new RegExp(categoria.toLowerCase(), 'i');
    if (categoria) {
        const client = await connectToMongodb();
        if (!client) {
          res.status(500).send('Error al conectarse a MongoDB')
          return;
        }
        // Accede a la base de datos y la colección
    const db = client.db('Todo');
    const collection = await db.collection('Todo').find({ category: regex }).toArray()
        // Desconéctate de MongoDB
    await disconnectToMongodb();
    if (collection == "") {
        res.send('No hay elementos que contenga esa categoria ')
      }
      else {
        res.json(collection)
      }
    }
    else {
      res.status(400).send('Error consulta vacia')
    }
};

//método Delete mediante el ID
exports.deleteElement = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const client = await connectToMongodb();
        if (!client) {
            res.status(500).send('Error al conectarse a la base de datos');
            return;
        }
        // Accede a la base de datos y la colección
        const db = client.db('Todo');
        try {
            const resultado = await db.collection('Todo').deleteOne({ _id: new ObjectId(id) });
              
                  if (resultado.deletedCount === 0) {
                    res.status(404).send('No se encontro ningun elemento con el _id: ' + id);
                  } else {
                    res.status(204).end();
                    console.info('Se eliminó correctamente')
                  }
                } catch (error) {
                  res.status(500).send('Error al eliminar el elemento , formato de id invalido');
                } finally {
                    client.close();
                }
 };


 
exports.obtenerElementoPorID = async (req, res) => {
  const elementoID = req.params.id || 0;

   //verificacion de la cadena hexadecimal
   const esObjValido = /^[0-9a-fA-F]{24}$/.test(elementoID);
   if (!esObjValido) {
     res.status(400).json('id no valido: ' + elementoID);
     return;
   }

   const client = await connectToMongodb();
   if (!client) {
     res.status(500).send('Error al conectarse a MongoDB');
   };
   const db = client.db('Todo');
   const elemento = await db.collection('Todo').findOne({ _id: new ObjectId(elementoID) });
   await disconnectToMongodb();
   elemento != null ? res.json(elemento) : res.status(404).json('No se encontro el id: ' + elementoID);
};

