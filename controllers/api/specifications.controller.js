/**
 * @fileoverview definimos las rutas con las enlazamos a las operaciones correspondientes al tratamiento de las especificaciones
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var specService = require('services/specification.service');

/*####Definicion de las rutas####*/
router.post('/createSpec', createSpec);
router.get('/current', getCurrentSpec);
router.post('/deleteSpec', deleteSpec);
router.post('/updateSpec', updateSpec);

module.exports = router;

/**
 * createSpec: hacemos referencia al servicio de la creacion de especificaciones
 */
function createSpec(req, res){

	specService.create(req.body)
	.then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

/**
 * getCurrentSpec: hacemos referencia al servicio getById
 */

function getCurrentSpec(req, res){
	
   specService.getById()
    .then(function(spec){
        if(spec){
            res.send(spec);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}


/**
 * deleteSpec: hacemos referencia al servicio delete para eliminar las especificaciones
 */
 
function deleteSpec(req, res) {

    specService.delete(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
    }

 /**
 * updateRf: hacemos referencia al servicio update para modificar los requisitos funcionales
 */
function updateSpec(req, res) { 

    specService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}