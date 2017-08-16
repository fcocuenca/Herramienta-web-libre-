/**
 * @fileoverview glosary.service.js: se exponen los servicios que va a utilizar 
 * en el manejo del glosario
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion glosary
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('glosary');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;

module.exports = service;

//####Creacion de los servicios####

 /**
 * create: insercion de los terminos en la bd
 */
function create(word){
	console.log("createGlosary");

	//orden de los elementos antes d einsertarlos en a BD
		var deferred = Q.defer();

		db.glosary.insert(
		word,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
		
		return deferred.promise;
}


 /**
 * getById: obtencio de los términos de la bd
 */
function getById(){

	var deferred = Q.defer();
	var mysort = {content: 1};

	db.glosary.find().sort(mysort).toArray(function(err, word){
			if(err) deferred.reject(err);

			if(word){
					deferred.resolve(word);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}


 /**
 * _delete: Borrado de los terminos en la bd
 */
function _delete(word){
	console.log(word._id);
    
    var deferred = Q.defer();
    var id= word._id;

    db.glosary.remove(
    {_id: mongo.helper.toObjectID(word._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * update: modificacion de los terminos
 */
function update(word){
	console.log(word._id);
	
    var deferred = Q.defer();
    
    var id= word._id;
    var content = word.content;

    var set = {	
    			content: content,
    };

    db.glosary.update(
    {_id: mongo.helper.toObjectID(word._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}




