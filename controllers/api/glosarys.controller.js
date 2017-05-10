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
var glosaryService = require('services/glosary.service');


/*####Definicion de las rutas####*/
router.post('/createW', createWord);
router.get('/current', getCurrentWord);
router.post('/deleteW', deleteWord);
router.post('/updateW', updateWord);


module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createReqFun: hacemos referencia al servicio de la creacion de requisitos funcionales
 */

function createWord(req, res){
	console.log("entrado en el contoller glosary");
	glosaryService.create(req.body)
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
 
function getCurrentWord(req, res){
   glosaryService.getById()
        .then(function(w){
            if(w){
                res.send(w);
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
 
function deleteWord(req, res) {
     console.log("deleteRf")
     console.log("id api: "+req.body._id);

        glosaryService.delete(req.body)
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
function updateWord(req, res) {
     console.log("dentro de UpdateRf")
     console.log("id UpdateRf: "+req.body._id);
     console.log("content: "+req.body.content);

        glosaryService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteRFfin")
}
 

 