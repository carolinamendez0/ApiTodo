
// Iniciamos dependencias   
const express = require('express');
const routes = express.Router();
routes.use(express.json());

let todoController = require('../../app/controllers/todoController')

routes.get('/ListTodos', todoController.getTodoList);
routes.get('/Categorias/:categoria', todoController.getCategoriaList);
routes.post('/CreateTodos', todoController.createTodo);
routes.put('/UpdateTodos/:id', todoController.updateTodo); 
routes.put('/toggleTodoComplete/:id', todoController.toggleTodoComplete);
routes.delete('/deleteElement/:id', todoController.deleteElement);
routes.get('/elementoId/:id', todoController.obtenerElementoPorID);




// Si se ingresa una ruta no valida
routes.get("*", (req, res) => {
    res.json({
      error: "404",
      message: "No se encuentra la ruta solicitada",
    });
  });


module.exports = routes;
