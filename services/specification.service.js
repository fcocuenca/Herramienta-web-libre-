/**
 * @fileoverview requerimentsfuncional.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de requisitos funcionales.
 * @version 0.1
 * @author FcoCuenca 
 * History
 */

var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//inserccion de la collection rf en mongoDB
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('specification');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;

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
function create(SpecParam){

	var deferred = Q.defer();

	db.specification.insert(
		SpecParam,
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
	console.log("ha entrado Spec");
	var deferred = Q.defer();

	db.specification.find().toArray(function(err, spec){
			if(err) deferred.reject(err);

			if(spec){
					deferred.resolve(spec);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha entrado en showAll");
	return deferred.promise;
}

 /**
 * _delete: Borrado de los requisitos funcionales en la bd
 * @param  {_id}
 * @param  {content}
 * @return  {usuario autenticado}
 */
function _delete(SpecParam){
	console.log("has entrado en _deete");
	console.log(SpecParam._id);
    
    var deferred = Q.defer();
    var id= SpecParam._id;

    db.specification.remove(
    {_id: mongo.helper.toObjectID(SpecParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod _delete");
    return deferred.promise;
}

 /**
 * update: modificacion de los requisitos funcionales
 * @param  {_id}
 * @param  {content}
 * @return  {usuario modificado}
 */
function update(SpecParam){
	console.log("has entrado en update");
	
    var deferred = Q.defer();
    
    var id= SpecParam._id;
    var content = SpecParam.content;

    var set = {	
    			content: content,
    };

    db.specification.update(
    {_id: mongo.helper.toObjectID(SpecParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salido update");
    return deferred.promise;
}