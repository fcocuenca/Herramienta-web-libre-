require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

//Almacenamiento de imagenes
app.use( express.static( "public" )); 


// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));
 
// rutas
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/functionalrequeriments', require('./controllers/rf.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));
app.use('/api/functionalrequeriments', require('./controllers/api/functionalrequeriments.controller'));
app.use('/api/nofunctionalrequeriments', require('./controllers/api/nofunctionalrequeriments.controller'));
app.use('/api/glosary', require('./controllers/api/glosarys.controller'));
app.use('/api/diagram', require('./controllers/api/diagrams.controller'));
app.use('/api/functionalrequeriments', require('./controllers/api/categoriesRf.controller'));
app.use('/api/nofunctionalrequeriments', require('./controllers/api/categoriesNRf.controller'));
app.use('/api/specifications', require('./controllers/api/specifications.controller'));
app.use('/api/matrixTrazability', require('./controllers/api/matrix.controller'));
app.use('/api/project', require('./controllers/api/projects.controller'));
//app.use('/api/matrixTrazability', require('./controllers/api/functionalrequeriments.controller'));
//app.use('/api/matrixTrazability', require('./controllers/api/specifications.controller'));


// pagina por defecto de inicio
app.get('/', function (req, res) {
    return res.redirect('/app');
});
 
// iniciacion del servidor
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});