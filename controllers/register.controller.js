/**
 * @fileoverview define las rutas para mostrar la vista y el registro de un nuevo usuario.
 */

var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.js');
 
router.get('/', function (req, res) {
    res.render('register');
});
 
router.post('/', function (req, res) {
    // registro usando la api para mantener limpia la separacion entre las capas
    request.post({
        url: config.apiUrl + '/users/register',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'Ha ocurrido un error' });
        }
 
        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            });
        }
 
        // return to login page with success message
        req.session.success = 'Registro realizado correctamente';
        return res.redirect('/login');
    });
});
 
module.exports = router;