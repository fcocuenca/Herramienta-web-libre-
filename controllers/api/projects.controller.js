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
var projService = require('services/project.service');


/*####Definicion de las rutas####*/
router.post('/createProj', createProject);
router.get('/current', getCurrentProject);

module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createReqFun: hacemos referencia al servicio de la creacion de requisitos funcionales
 */

function createProject(req, res){
	console.log("entrado en el contoller project");
	projService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
        console.log("entrado en el contoller proekc");
}

/**
 * getCurrentRf: hacemos referencia al servicio getById
 */
 
function getCurrentProject(req, res){
   projService.getById()
        .then(function(proj){
            if(proj){
                res.send(proj);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

 

 