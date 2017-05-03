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
	console.log("entrado en el contoller createRf1");
	rfService.create(req.body)
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
     console.log("deleteRf")
     console.log("id api: "+req.body._id);

        rfService.delete(req.body)
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
function updateRf(req, res) {
     console.log("dentro de UpdateRf")
     console.log("id UpdateRf: "+req.body._id);
     console.log("content: "+req.body.content);

        rfService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteRFfin")
}
 

 