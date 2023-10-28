
const express = require('express');
const app = express();
const path = require("path");
// Inicializamos  el Motor de plantillas elegido 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'app', 'views'));
app.use('/public', express.static(__dirname + '/public'));



const PORT = process.env.PORT || 3050;

app.get("/", (req, res) => { 
    //RUTA DINAMICA 
    const data = {
        title: 'API TODO',
        name: 'Mendez Carolina',
    }
    res.render('index', data)
}); 



let apiRoutes = require ("./system/Router/routes.js")
//Endpoints

app.use('/Api', apiRoutes); // Monta el router en la ruta raíz

app.listen(PORT, () => console.log(`API TODO escuchando en http://localhost:${PORT}`) );


