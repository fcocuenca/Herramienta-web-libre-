/**
 * @fileoverview definimos las rutas con las enlazamos a las operaciones correspondientes al tratamiento de los requisitos funcionales
 * @version 1.0
 * @author Fco Cuenca
 * History
 */

var config = require('config.json');
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
 * createReqFun: hacemos referencia al servicio de la creacion de requisitos funcionales
 */

function createSpec(req, res){
	console.log("entrado en el contoller createRf1");
	specService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
        console.log("entrado en el contoller createRf12");
}

/**
 * getCurrentRf: hacemos referencia al servicio getById
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
 * deleteRf: hacemos referencia al servicio delete para eliminar los requisitos
 */
 
function deleteSpec(req, res) {
     console.log("deleteSpec")
     console.log("id api: "+req.body._id);

        specService.delete(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteRFfin")
    }

   /**
 * updateRf: hacemos referencia al servicio update para modificar los requisitos funcionales
 */
function updateSpec(req, res) {
     console.log("dentro de UpdateSpec")
 
        specService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("specServiceUpdate")
}