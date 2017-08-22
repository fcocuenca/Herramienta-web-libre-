/**
 * @fileoverview define las rutas para mostrar la vista del login y los credenciales de aunteticacion
 * del usuario. Utiliza la api y no el servicio. Auth correcta devuelve el token y lo almacena en la 
 * sesion para ponerlo a disposucion de angular.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.js');
 
// elimina o carga el estado del token en la session.
router.get('/', function (req, res) {
    // logout usuario
    delete req.session.token;
 
    // mueve el mensaje a una variable local para que solamente aparezca en la lectura
    var viewData = { success: req.session.success };
    delete req.session.success;
 
    res.render('login', viewData);
});
 
router.post('/', function (req, res) {
    // autenticacion usando la api para mantener limpia la separacion entre las capas
    request.post({
        url: config.apiUrl + '/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('login', { error: 'Ha ocurrido un error' });
        }
 
        if (!body.token) {
            return res.render('login', { error: 'Usuario o Contraseña incorrecta', email: req.body.email});
        }
 
        // almacena el toke en la sesion para que este disponible en angular app 
        req.session.token = body.token;
 
        // redirect to returnUrl
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
});
 
module.exports = router;