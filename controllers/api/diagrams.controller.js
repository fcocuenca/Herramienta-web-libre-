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
var diagramService = require('services/diagram.service');


/*####Definicion de las rutas####*/
router.post('/createD', createDiagram);
router.get('/current', getCurrentDiagram);
router.post('/deleteD', deleteDiagram);
router.post('/updateD', updateDiagram);


module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createReqFun: hacemos referencia al servicio de la creacion de requisitos funcionales
 */

function createDiagram(req, res){
	console.log("entrado en el contoller glosary");
	diagramService.create(req.body)
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
 
function getCurrentDiagram(req, res){
   diagramService.getById()
        .then(function(d){
            if(d){
                res.send(d);
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
 
function deleteDiagram(req, res) {
     console.log("deleteRf")
     console.log("id api: "+req.body._id);

        diagramService.delete(req.body)
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
function updateDiagram(req, res) {
     console.log("dentro de UpdateRf")
     console.log("id UpdateRf: "+req.body._id);
     console.log("content: "+req.body.content);

        diagramService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteRFfin")
}
 

 