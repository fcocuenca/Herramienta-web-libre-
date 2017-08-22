/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de los requisitos funcionales
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

/*####Ubicacion del servicios####*/
var rfService = require('services/functionalrequeriment.service');

/*####Definicion de las rutas####*/
router.post('/createRf', createReqFun);
router.get('/current', getCurrentRf);
router.post('/deleteRf', deleteRf);
router.post('/updateRf', updateRf);

module.exports = router;

/*####Creacion de los controladores####*/

/**
 * createReqFun: hacemos referencia al servicio de la creacion de requisitos funcionales
 */

function createReqFun(req, res){
	rfService.create(req.body)
	.then(function(){
		res.sendStatus(200);
	})
	.catch(function(err){
		res.status(400).send(err);
	});
}

/**
 * getCurrentRf: hacemos referencia al servicio getById
 */
 
function getCurrentRf(req, res){
   rfService.getById()
    .then(function(rf){
        if(rf){
            res.send(rf);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/**
 * deleteRf: hacemos referencia al servicio delete para eliminar los requisitos
 */
 
function deleteRf(req, res) {
    rfService.delete(req.body)
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
function updateRf(req, res) {
    rfService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}
 

 