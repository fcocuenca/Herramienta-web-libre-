/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de los proyectos
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
 * createProject: hacemos referencia al servicio de la creacion de proyectos
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
 * getCurrentProject: hacemos referencia al servicio getById para obtener los proyectos
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

/*
*getCurrentProjectShare: hacemos referencia al servicio getByIdProjectShare para obtener los proyectos compartidos
*/
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

/*
*deleteProject: hacemos referencia al servicio deleteProject para eliminar el proyecto
*/
function deleteProject(req, res){
    projService.delete(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/*
*compartirProject: hacemos referencia al servicio compartir para compartir un proyecto
*/
function compartirProject(req, res){
    projService.compartir(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/*
*compartirConOtroUsuario: hacemos referencia al servicio compartidoCon para compartir el proyecto con un usuario
*/
function compartidoConOtroUsuario(req, res){
    projService.compartidoCon(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/*
*getCurrentInvitados: hacemos referencia al servicio getIdInvitados para obtener el ide del usuario invitado
*/
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

/*
*delteInvitadoUser: hacemos referencia al servicio deleteUserInvitado para eliminar el usuario invitado 
*/
function deleteInvitadoUser(req, res){

    projService.deleteUserInvitado(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/*
*deleteProjShare: hacemos referencia al servicio deleteShareProject  para eliminar el proyecto compartido
*/
function deleteProjShare(req, res){
    projService.deleteShareProject(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
        
}

 