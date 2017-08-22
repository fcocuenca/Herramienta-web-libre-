/**
 * @fileoverview Se definen las rutas para las operaciones relacionadas con los usuarios 
 * tales como: authenticateUser(), registerUser(), getCurrentUser(), updateUser(), deleteUser()
 */

var config = require('config.js');
var express = require('express');
var router = express.Router();
var userService = require('services/user.service');
 
// rutas
router.post('/authenticate', authenticateUser);
router.post('/register', registerUser);
router.get('/current', getCurrentUser);
router.get('/currentAllUsers', getCurrentUserAll)
router.put('/:_id', updateUser);
router.delete('/:_id', deleteUser);
 
module.exports = router;

/**
 * authenticateUser: llama al servicio authenticate(username, password) y devuelve token en caso afirmativo.
 */
function authenticateUser(req, res) {
    userService.authenticate(req.body.email, req.body.password)
        .then(function (token) {
            if (token) {
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * registerUser: llama al servicio create y realiza una respuesta.
 */
function registerUser(req, res) {
    userService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/**
 * getCurrentUser: llama al servicio getById y verifica que corresponde 
 * con el id del usuario actual.
 */ 
function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
/**
 * updateUser: compara los id's para ver si corresponden al mismo y despues 
 * llama al servicio update para modificar el usuario.
 */ 
function updateUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }
 
    userService.update(userId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
        console.log("has entrado en el controlador de modificar usuario");
}
 
/**
 * deleteUser: compara los id's para ver si corresponden al mismo y despues 
 * llama al servicio delete para eliminar el usuario.
 */ 
function deleteUser(req, res) {
    var userId = req.user.sub;
    if (req.params._id !== userId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }
 
    userService.delete(userId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
*getCurrentUserAll: hacemos referencia al servicio getCurrentAllUsers para obtener todos usuarios
*/
function getCurrentUserAll(req, res){   

    userService.getCurrentAllUsers()
    .then(function(user){
        if(user){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}