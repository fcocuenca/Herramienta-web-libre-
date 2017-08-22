/**
 * @fileoverview diagram.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de la edicion de diagramas.
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion matrixTrazability
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('diagram');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.update = update;
service.delete = _delete;

module.exports = service;

//####Creacion de los servicios####

 /**
 * create: insercion del diagrama en la bd
 */
function create(diag){

	var deferred = Q.defer();
	
	db.diagram.insert(
		diag,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
	    return deferred.promise;
}

 /**
 * getById: obtencion de los elementos del diagrama de la bd
 */
function getById(){
	var deferred = Q.defer();

	db.diagram.find().toArray(function(err, diagram){
			if(err) deferred.reject(err);

			if(diagram){
					deferred.resolve(diagram);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}

 /**
 * _delete: Borrado de los elementos del diagrama en la bd
 */
function _delete(diag){
    
    var deferred = Q.defer();
    var id= diag._id;

    db.diagrama.remove(
    {_id: mongo.helper.toObjectID(diag._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * update: modificacion de los elementos del diagrama en la bd
 */
function update(diag){

    var deferred = Q.defer();
    var json= diag.json;
    var set = {	
    			json: json,
    };

    db.diagram.update(
    {_id: mongo.helper.toObjectID(diag._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}
/*
*_delete:funcion que elimina de forma completa todos los elementos del diagrama
*/
function _delete(diag){
    var deferred = Q.defer();
    var id= diag._id;
    db.diagram.remove(
    {_id: mongo.helper.toObjectID(diag._id)},
    function(err){
        if(err) deferred.reject(err);
        
        deferred.resolve();
    });
    return deferred.promise;
}




