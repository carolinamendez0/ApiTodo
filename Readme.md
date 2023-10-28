# API


## Tabla de contenidos
- [API](#api)
  - [Tabla de contenidos](#tabla-de-contenidos)
    - [Información General](#información-general)
    - [Instrucciones de Configuración y Ejecución](#instrucciones-de-configuración-y-ejecución)
  - [Instalación](#instalación)
    - [Paso 1: Clonar el Repositorio](#paso-1-clonar-el-repositorio)
    - [Paso 2: Instalar Dependencias](#paso-2-instalar-dependencias)
    - [Paso 3: Iniciar la Aplicación](#paso-3-iniciar-la-aplicación)
    - [Objeto Todo](#objeto-todo)
    - [Peticiones](#peticiones)
- [Estructura del Frontend](#estructura-del-frontend)
    - [Colaboradores](#colaboradores)

### Información General
***
<div class="warning" style='padding:0.1em; background-color:#E9D8FD; color:#69337A'>
<span>
<p style='margin-left:1em;'>
La Api Todo, tiene las diferentes funcionalidad para <b>Visualizar,Crear, Actualizar y Eliminar</b> fácilmente elementos de una base de datos proporcionada.
</p>
</p></span>
</div>
 

### Instrucciones de Configuración y Ejecución
***
Asegúrate de tener instalados los siguientes requisitos antes de continuar:

- [Node.js](https://nodejs.org/): Asegúrate de tener Node.js instalado en tu sistema.

## Instalación

### Paso 1: Clonar el Repositorio
Para comenzar, clona el repositorio de la aplicación desde GitHub:

```bash
git clone https://github.com/carolinamendez0/ApiTodo.git
```
### Paso 2: Instalar Dependencias
Navega hasta el directorio de la aplicación:

```bash
cd ApiTodo
```
Instala las dependencias del proyecto utilizando npm:

```bash
npm install
```
### Paso 3: Iniciar la Aplicación
Navega hasta el directorio de la aplicación:
```bash
npm start
```
La aplicación se ejecutará en http://localhost:3050 de forma predeterminada.



### Objeto Todo
***
```javascript
// ejemplo de la estructura
{
    "_id": ObjetId,
    "Title":"Estudiar programación",
    "description":"Dedicar tiempo a aprender nuevos lenguajes de programación"
    "Category":"Educación",
    "completed":true
}
```

###  Peticiones 
***
| PETICION | URL                                     | DESCRIPCION                        |
| :------- | :-------------------------------------- | :--------------------------------- |
| GET      | [/Api/ListTodos](http://localhost:3050/Api/ListTodos) | Obtener todos los elementos     |
| GET      | [/Api/Categorias/:categoria](http://localhost:3050/Api/Categorias/:categoria) | Obtener los elementos de una categoria      |
| GET      | [/Api/elementoId/:id](http://localhost:3050/Api/elementoId/:id) | Obtener un elemento dado el Id    
| POST     | [/Api/CreateTodos](http://localhost:3050/Api/CreateTodos) | Agregar un elemento                 |
| PUT      | [/Api/UpdateTodos/:id](http://localhost:3050/Api/UpdateTodos/:id) | Actualizar un elemento dado el Id
| PUT      | [/Api/toggleTodoComplete/:id](http://localhost:3050/Api/toggleTodoComplete/:id) | Modificar si el elemento esta completo o no pasandole el ID                 |
| DELETE   | [/Api/deleteElement/:id](http://localhost:3050/Api/deleteElement/:id) | Eliminar un elemento pasandole el ID |

# Estructura del Frontend

La aplicación frontend sigue una estructura sencilla, con las siguientes secciones:

1. **Barra de Navegación:** Esta barra se encuentra en la parte superior de la página e incluye el enlace para ir al inicio, pensando en un futuro se podria agregar un menu. 

2. **Contenedor Principal:** El contenido principal se muestra en el área principal de la página. En esta área, se muestra la tabla de elementos y los botones de acciones .

3. **Tabla de Elementos:** La tabla muestra los elementos en filas y columnas. Cada fila representa un elemento con sus detalles, incluyendo título, descripción, categoría y estado (completado o no). Además, incluye acciones para editar, eliminar o marcar como completado cada elemento.

4. **Botones de Acción:** Justo encima de la tabla de elementos, se encuentran los botones para realizar acciones en los elementos, como "Crear", "Listar Todos" y "Filtrar por Categoría".

5. **Modales:** Al hacer clic en un botón de acción, se abren modales para crear, editar o completar elementos. Los modales contienen formularios o información relacionada con la acción.

6. **Modal de Carga:** Se muestra un modal de carga con un spinner cuando se realizan operaciones que requieren tiempo, como la carga de detalles de elementos o la creación de un nuevo elemento.

7. **Notificaciones:** Puedes implementar notificaciones para mostrar mensajes de éxito o error después de realizar acciones, como crear o editar elementos.

### Colaboradores 
***
<a href="https://github.com/carolinamendez0/ApiTodo/graphs/contributors" target="_blank">
<img alt="Carolina Mendez" title="Carolina Mendez" style=" width: 60px; /* Tamaño de los avatares */
  height: 60px;
  border-radius: 50%;" src="https://avatars.githubusercontent.com/u/49485102?s=60&v=4?width=890"></a>
<!-- <img src=""> -->