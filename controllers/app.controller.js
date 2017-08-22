/**
 * @fileoverview control de acceso a los ficheros angular, utilizando session/cookie
 * crea el JWT token usado para la aplicacion angular para realizar solicutdes auth
 */

var express = require('express');
var router = express.Router();
 
// usar sesion auth para proteger los archivhos de la app 
router.use('/', function (req, res, next) {
    if (req.path !== '/login' && !req.session.token) {
        return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
    }
 
    next();
});
 
// hacer el JWT token disponible para angular app
router.get('/token', function (req, res) {
    res.send(req.session.token);
});
 
// servidor de archivos angular desde la ruta /app 
router.use('/', express.static('app'));
 
module.exports = router;