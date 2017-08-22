/**
 * @fileoverview project.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de proyectos.
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');
var nodemailer = require('nodemailer');

//Creación de la coleccion project
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('project');

//Creación de la coleccion usuariosInvitados
var db1 = mongo.db(config.connectionString, { native_parser: true });
db1.bind('usuariosInvitados');

//Creación de la coleccion projectShare
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


//####Creacion de los servicios####

 /**
 * create: insercion de los proyectos en la bd
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

 /**
 * compartidoCon: insercion de los proyectos Compartidos en la bd
 */
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
 * getById: obtencion de los proyectos la bd
 */
function getById(){
	var deferred = Q.defer();

	db.project.find().toArray(function(err, proj){
			if(err) deferred.reject(err);

			if(proj){
					deferred.resolve(proj);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}

 /**
 * getByIdProjectShare: obtencion de los proyectos Compartidos de la bd
 */
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
	return deferred.promise;
}

 /**
 * _delete: Borrado de los proyectos en la bd
 */
function _delete(ProjParam){
	console.log(ProjParam._id);
    
    var deferred = Q.defer();
    var id= ProjParam._id;

    db.project.remove(
    {_id: mongo.helper.toObjectID(ProjParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * _delete: Envio de email a usuario destino
 */
function compartir(ProjParam){

	db1.usuariosInvitados.insert(
		ProjParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
			});
   
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

/*
*getbyIdInvitados: obtención de los usuarios invitados a un proyecto
*/
function getByIdInvitados(){
	var deferred = Q.defer();

	db1.usuariosInvitados.find().toArray(function(err, proj){
			if(err) deferred.reject(err);

			if(proj){
					deferred.resolve(proj);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}

/*
deleteUserInvitado: eliminar usuarios invitados
*/
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

/*
*deleteShareProject: eliminar proyectos compartidos
*/
function deleteShareProject(ProjParam){
	var deferred = Q.defer();
    var id= ProjParam._id;
    db2.projectShare.remove(
    {_id: mongo.helper.toObjectID(ProjParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}








