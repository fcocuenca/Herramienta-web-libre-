/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de los diagramas
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

/*####Ubicacion del servicios####*/
var diagramService = require('services/diagram.service');


/*####Definicion de las rutas####*/
router.post('/createDiagram', createDiag);
router.get('/current', getCurrentDiagram);
router.post('/deleteDiagram', deleteDiag);
router.post('/updateDiagram', updateDiag);

module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createDiag: hacemos referencia al servicio de la creacion de diagramas
 */

function createDiag(req, res){
	diagramService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}

/**
 * getCurrentDiag: hacemos referencia al servicio getById 
 */
 
function getCurrentDiagram(req, res){
   diagramService.getById()
        .then(function(diagram){
            if(diagram){
                res.send(diagram);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

/**
 * deleteDiagram: hacemos referencia al servicio delete para eliminar un diagrama
 */
 
function deleteDiag(req, res) {
    
   diagramService.delete(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

/**
 * updateDiag: hacemos referencia al servicio update para modificar los diagramas
 */

function updateDiag(req, res) {
     diagramService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}
 

 