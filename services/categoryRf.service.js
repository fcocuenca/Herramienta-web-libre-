/**
 * @fileoverview categoryNRf.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de categorias 
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion categoryRf
var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('categoryRf');


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
 * create: insercion de las categorias en la bd
 */
function create(CatParam){
	var deferred = Q.defer();

	db.categoryRf.insert(
		CatParam,
		function(err, doc){
			if(err) deferred.reject(err);

			deferred.resolve();
		});
	return deferred.promise;
}

 /**
 * getById: obtencion de las categorias de la bd
 */
function getById(){
	var deferred = Q.defer();

	db.categoryRf.find().toArray(function(err, cat){
			if(err) deferred.reject(err);

			if(cat){
				deferred.resolve(cat);
			}else{
				deferred.resolve();
			}
	});
	return deferred.promise;

}

 /**
 * _delete: Borrado de las categorias en la bd
 */
function _delete(CatParam){

    var deferred = Q.defer();
    var id= CatParam._id;

    db.categoryRf.remove(
    {_id: mongo.helper.toObjectID(CatParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * update: modificacion de las categorias
  */
function update(CatParam){
    var deferred = Q.defer();
    
    var id= CatParam._id;
    var category = CatParam.category;

    var set = {	
    			category: category,
    };

    db.categoryRf.update(
    {_id: mongo.helper.toObjectID(CatParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}