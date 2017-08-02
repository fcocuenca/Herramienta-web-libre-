/**
 * @fileoverview definimos las rutas con las enlazamos a las operaciones correspondientes al tratamiento de los requisitos funcionales
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
var projService = require('services/project.service');


/*####Definicion de las rutas####*/
router.post('/createProj', createProject);
router.get('/current', getCurrentProject);
router.post('/deleteProj', deleteProject);
router.post('/compartirProj', compartirProject);
router.get('/currentInvitados', getCurrentInvitados);
router.post('/deleteInvitado', deleteInvitadoUser);
router.post('/compartidoCon', compartidoConOtroUsuario);
router.get('/currentShare', getCurrentProjectShare);
router.post('/deleteProjectShare', deleteProjShare);

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
function getCurrentProjectShare(req, res){
    projService.getByIdProjectShare()
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

function deleteProject(req, res){
    console.log("entrado en el delete project");
    projService.delete(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
        console.log("entrado en el delete proekc");
}

function compartirProject(req, res){
    console.log("entrado en el compartirProject project");
    projService.compartir(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
        console.log("entrado en el compartir proejct");
}

function compartidoConOtroUsuario(req, res){
    projService.compartidoCon(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

function getCurrentInvitados(req, res){
    projService.getByIdInvitados()
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

function deleteInvitadoUser(req, res){

    projService.deleteUserInvitado(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
        console.log("usuario invitado");
}

function deleteProjShare(req, res){
    console.log("proyecto compartido de otro usuario eliminar");
         projService.deleteShareProject(req.body)
        .then(function(){
            res.sendStatus(200);
        })
        .catch(function(err){
            res.status(400).send(err);
        });
        
}

 