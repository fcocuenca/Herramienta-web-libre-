/**
 * @fileoverview requerimentsfuncional.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de requisitos funcionales.
 * @version 0.1
 * @author FcoCuenca 
 * History
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');
var nodemailer = require('nodemailer');

//inserccion de la collection proyectos en mongoDB
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('project');

var db1 = mongo.db(config.connectionString, { native_parser: true });
db1.bind('usuariosInvitados');

var db2 = mongo.db(config.connectionString, { native_parser: true });
db2.bind('projectShare');


/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.getByIdInvitados = getByIdInvitados;
service.delete = _delete;
service.compartir = compartir;
service.deleteUserInvitado = deleteUserInvitado;
service.compartidoCon = compartidoCon;
service.getByIdProjectShare = getByIdProjectShare;
service.deleteShareProject = deleteShareProject;

module.exports = service;

/*
	####Creacion de los servicios####
*/


/*
	####CONTENIDO DEL REQ FUNC.####
	{Campos que consta un requisito funcioanl: _id: proporcionado por mongoDB, content: contenido del requisito no funcional}
*/

 /**
 * create: insercion de los requisitos funcionales en la bd
 * @param  {_id}
 * @param  {content}
 * @return  {promesa ok or fail}
 */
function create(ProjParam){

	var deferred = Q.defer();

	db.project.insert(
		ProjParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
	    return deferred.promise;
}

function compartidoCon(ProjParam){
	var deferred = Q.defer();

	db2.projectShare.insert(
		ProjParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
	return deferred.promise;
}

 /**
 * getById: obtencio de los requisitos funcionales de la bd
 * @return  {requisitos:_id, content}
 */
function getById(){
	console.log("ha projectGetByID");
	var deferred = Q.defer();

	db.project.find().toArray(function(err, proj){
			if(err) deferred.reject(err);

			if(proj){
					deferred.resolve(proj);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha entrado en showAll");
	return deferred.promise;
}


function getByIdProjectShare(){
	var deferred = Q.defer();

	db2.projectShare.find().toArray(function(err, proj){
			if(err) deferred.reject(err);

			if(proj){
					deferred.resolve(proj);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha entrado en projesctShare");
	return deferred.promise;
}

function _delete(ProjParam){
	console.log("has entrado en _deete");
	console.log(ProjParam._id);
    
    var deferred = Q.defer();
    var id= ProjParam._id;

    db.project.remove(
    {_id: mongo.helper.toObjectID(ProjParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod _delete");
    return deferred.promise;
}

function compartir(ProjParam){

	db1.usuariosInvitados.insert(
		ProjParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
			});
   
	console.log("dentro de compartir");
	console.log(ProjParam.emailDestino);
	var deferred = Q.defer();

	var smtpTransport = nodemailer.createTransport({
		service: "Gmail",
		auth:{
			user: "especificaciondereq@gmail.com",
			pass: "herramientaweb"
		}
	});

	var mailOptions = {
		from: "Especificacionderequisitos <especificaciondereq@gmail.com>",
		to: ProjParam.emailDestino,
		subject: "Invitación a proyecto",
		//text: "Saludos, El usuario: XXX te invita a participar en el siguiente proyecto: PPP."
		html: 'Saludos, <br> El usuario <b>'+ProjParam.usuarioOrigen+'</b> te invita a participar en el siguiente proyecto: <b>'+ProjParam.nameProyecto+''
	}

	smtpTransport.sendMail(mailOptions, function(error, response){
		if(error) deferred.reject(error);

		deferred.resolve();
	});

	return deferred.promise;
		
}

function getByIdInvitados(){
	console.log("invitados");
	var deferred = Q.defer();

	db1.usuariosInvitados.find().toArray(function(err, proj){
			if(err) deferred.reject(err);

			if(proj){
					deferred.resolve(proj);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha entrado en invitados");
	return deferred.promise;
}

function deleteUserInvitado(ProjParam){
	var deferred = Q.defer();
    var id= ProjParam._id;

    db1.usuariosInvitados.remove(
    {_id: mongo.helper.toObjectID(ProjParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod _deleteInviado");
    return deferred.promise;

}

function deleteShareProject(ProjParam){
	var deferred = Q.defer();
    var id= ProjParam._id;
    console.log("id que se enviar a borrar a deleteShareProject"+ProjParam._id);
    db2.projectShare.remove(
    {_id: mongo.helper.toObjectID(ProjParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod deleteShareProject");
    return deferred.promise;
}








