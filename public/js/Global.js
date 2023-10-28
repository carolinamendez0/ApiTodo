
            function actualizarTabla(data) {
            const tablaElementos = document.getElementById('tablaElementos');
            tablaElementos.innerHTML = '';

            // Itera sobre los elementos recibidos en los datos y crea filas para la tabla
            data.forEach(function(elemento) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${elemento._id}</td>
                    <td>${elemento.title}</td>
                    <td>${elemento.description}</td>
                    <td>${elemento.category}</td>
                    <td>${elemento.completed ? 'Sí' : 'No'}</td>
                    <td>
                        <button style="background-color: transparent; color: #ff0015; border: none; border-radius: 50%; padding: 8px;" 
                        onclick="borrarElemento('${elemento._id}')">
                        <i class="fas fa-trash-alt" data-toggle="tooltip" data-placement="top" title="Borrar Elemento"></i>
                        </button>

                        <button style="background-color: transparent; color: #007bff; border: none; border-radius: 50%; padding: 8px;"  onclick="abrirModalEditar('${elemento._id}')">
                            <i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Editar Elemento"></i> 
                        </button>

                        <button style="background-color: transparent; color: #04d647;  border: none; border-radius: 50%; padding: 8px;"  onclick="abrirModalComplete('${elemento._id}')">
                            <i class="fas fa-check-square"  data-toggle="tooltip" data-placement="top" title="Complete Elemento"></i> 
                        </button>
                    </td>
                `;
                tablaElementos.appendChild(row);
            });
        }

    
  function listarTodos() {

    $('#loadingModal').modal('show');
   

    $.ajax({
                url: '/Api/ListTodos',
                type: 'GET',
                success: function(response) {
                             // Cerrar el modal de carga
                     $('#loadingModal').modal('hide');
                    // Actualiza la tabla con los datos de la respuesta
                    actualizarTabla(response);
                },
                error: function(error) {
                                // Cerrar el modal de carga
                                $('#loadingModal').modal('hide');
                    console.error('Error al listar los elementos: ' + error);
                }
            });
        }

  $(document).ready(function () {
    $('#guardarEdicion').on('click', function () {
        const elementoID = $('#editarTodoModal #elementoID').val();
        const boolValue = $('#editarTodoModal #completado').prop('checked'); // Obtener el valor del checkbox
        const title = $('#editarTodoModal #titulo').val();
        const description =  $('#editarTodoModal #descripcion').val();
        const category = $('#editarTodoModal #categoria').val();
        // setTimeout(function() {
        //     $('#loadingModal').modal('show');
        // }, 300);
        $('#loadingModal').modal('show');

      // Envía los datos al servidor
      $.ajax({
        url: '/Api/UpdateTodos/' + elementoID, // Debes ajustar la URL a tu endpoint de creación
        method: 'PUT',
        contentType: 'application/json', // Establece el tipo de contenido a JSON
        data: JSON.stringify({ title: title, description: description , category: category , completed: boolValue}), // Objeto JSON que deseas enviar,
        success: function (response) {
                alert("Modificación exitosa");
                // Cierra el modal
                $('#editarTodoModal').modal('hide');
                    listarTodos();
            },
            error: function (error) {
                console.error('Error al actualizar el elemento: ' + error);
            }
        });
  });

    $('#guardarTodo').on('click', function () {
     const boolValue = $('#completo').prop('checked');
      const title = $('#title').val();
      const description = $('#description').val();
      const category = $('#category').val();

      $('#loadingModal').modal('show');

      // Envía los datos al servidor
      $.ajax({
        url: '/Api/CreateTodos', // Debes ajustar la URL a tu endpoint de creación
        method: 'POST',
        contentType: 'application/json', // Establece el tipo de contenido a JSON
        data: JSON.stringify({ title: title, description: description , category: category , completed: boolValue}), // Objeto JSON que deseas enviar,
        success: function (response) {
            // Cerrar el modal de carga
             $('#loadingModal').modal('hide');
            alert("Creación exitosa");
          // Cierra el modal
          $('#crearTodoModal').modal('hide');
          // Limpia el formulario
          $('#crearTodoForm')[0].reset();
          listarTodos();

        },
        error: function (error) {
            // Cerrar el modal de carga
            $('#loadingModal').modal('hide');
            alert("Error: " + response.message);
          console.error(error);
        },
      });
    });

  $('#guardarComplete').on('click', function () {
        const elementoID = $('#editarCompletModal #elementoID').val();
        const boolValue = $('#editarCompletModal #completado').prop('checked'); // Obtener el valor del checkbox
        $('#loadingModal').modal('show');
                 
      // Envía los datos al servidor
      $.ajax({
        url: '/Api/toggleTodoComplete/' + elementoID, // Debes ajustar la URL a tu endpoint de creación
        method: 'PUT',
        contentType: 'application/json', // Establece el tipo de contenido a JSON
        data: JSON.stringify({ completed: boolValue}), // Objeto JSON que deseas enviar,
        success: function (response) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                alert("Modificación exitosa");
                // Cierra el modal
                $('#editarCompletModal').modal('hide');
                    listarTodos();
            },
            error: function (error) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                console.error('Error al actualizar el elemento: ' + error);
            }
        });
  });

});

   // Función para filtrar elementos por categoría
   function filtrarPorCategoria() {
            const categoria = prompt('Ingrese la categoría a buscar:');
            if (categoria) {
                $('#loadingModal').modal('show');
                
                            
                $.ajax({
                    url: '/Api/Categorias/' + categoria,
                    type: 'GET',
                    success: function(response) {
                    // Cerrar el modal de carga
                     $('#loadingModal').modal('hide');
                        // Actualiza la tabla con los datos de la respuesta
                        actualizarTabla(response);
                    },
                    error: function(error) {
                        console.error('Error al filtrar elementos por categoría: ' + error);
                    }
                });
            }
        }
        

        function abrirModalEditar(id) {
        // Obtener los datos del elemento con el ID 'id' usando AJAX
        $('#loadingModal').modal('show');
                
        $.ajax({
            url: '/Api/elementoId/' + id, // 
            type: 'GET',
            success: function (elemento) {
                  
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide'); 
                 
                 
                // Rellenar el modal con los datos del elemento
                $('#editarTodoModal #elementoID').val(elemento._id);
                $('#editarTodoModal #titulo').val(elemento.title);
                $('#editarTodoModal #descripcion').val(elemento.description);
                $('#editarTodoModal #categoria').val(elemento.category);
                $('#editarTodoModal #completado').prop('checked', elemento.completed);
                // Abrir el modal de edición
                $('#editarTodoModal').modal('show');
            },
            error: function (error) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                console.error('Error al obtener los detalles del elemento: ' + error);
            }
        });
    }
        
    function abrirModalComplete(id) {
        $('#loadingModal').modal('show');
                
        // Obtener los datos del elemento con el ID 'id' usando AJAX
        $.ajax({
            url: '/Api/elementoId/' + id, // Debes definir la ruta en tu servidor para obtener los detalles del elemento
            type: 'GET',
            success: function (elemento) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                // Rellenar el modal con los datos del elemento
                $('#editarCompletModal #elementoID').val(elemento._id);
                $('#editarCompletModal #completado').prop('checked', elemento.completed);
                // Abrir el modal de edición
                $('#editarCompletModal').modal('show');
            },
            error: function (error) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                console.error('Error al obtener los detalles del elemento: ' + error);
            }
        });
    }
    


    


        // Función para borrar un elemento
        function borrarElemento(id) {
            if (confirm('¿Estás seguro de que deseas borrar este elemento?')) {
                $('#loadingModal').modal('show');
                $.ajax({
                    url: '/Api/deleteElement/' + id,
                    type: 'DELETE',
                    success: function(response) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                    // Vuelve a listar los elementos actualizados después de borrar uno
                     listarTodos();
                    },
                    error: function(error) {
                 // Cerrar el modal de carga
                 $('#loadingModal').modal('hide');
                        console.error('Error al borrar el elemento: ' + error);
                    }
                });
            }
        }
