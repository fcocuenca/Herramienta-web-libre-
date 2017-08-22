/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de la matriz
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

var specService = require('services/specification.service')

/*####Ubicacion del servicios####*/
var matService = require('services/matrix.service');



/*####Definicion de las rutas####*/
router.post('/createMat', createMatrix);
router.post('/delete', deleteMatrix);
router.get('/current', getCurrentMat);
router.post('/deleteCheck', deleteCheckMat);


module.exports = router;

/*####Creacion de los controladores####*/

/**
 * createMatrix: hacemos referencia al servicio de la creacion de la matriz
 */
function createMatrix(req, res){
	matService.create(req.body)
	.then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

/**
*deleteCheckMat: hacemos referencia al servicio deleteCheck
*/

function deleteCheckMat(req, res) {
    
    matService.deleteCheck(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

/*
*deleteMatriz: hacemos referencia al servicio delete
*/
function deleteMatrix(req, res) {
    
    matService.delete(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

/*
*getCurrentMat: hacemos referencia al servicio getById()
*/
function getCurrentMat(req, res){

	matService.getById()
    .then(function(result){
        if(result){
            res.send(result);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

