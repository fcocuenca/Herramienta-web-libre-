/**
 * @fileoverview definimos las rutas con las enlazamos a las operaciones correspondientes al tratamiento de los no requisitos funcionales
 * @version 1.0
 * @author Fco Cuenca
 * History
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

/*####Ubicacion del servicios####*/
var nrfService = require('services/nofunctionalrequeriment.service');


/*####Definicion de las rutas####*/
router.post('/createNRf', createNReqFun);
router.get('/current', getCurrentNRf);
router.post('/deleteNRf', deleteNRf);
router.post('/updateNRf', updateNRf);


module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createNReqFun: hacemos referencia al servicio de la creacion de requisitos no funcionales
 */

function createNReqFun(req, res){
    console.log("entrado en el contoller createNRf1");
    nrfService.create(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
        console.log("entrado en el contoller createNRf12");
}

/**
 * getCurrentRf: hacemos referencia al servicio getById
 */
 
function getCurrentNRf(req, res){
	console.log("getCurrentNRf");
    nrfService.getById()
        .then(function(nrf){
            if(nrf){
                res.send(nrf);
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
 
function deleteNRf(req, res) {
     console.log("deleteRf")
     console.log("id api: "+req.body._id);

        nrfService.delete(req.body)
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
function updateNRf(req, res) {
     console.log("dentro de UpdateRf")
     console.log("id UpdateRf: "+req.body._id);
     console.log("content: "+req.body.content);

        nrfService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteRFfin")
}
 

 