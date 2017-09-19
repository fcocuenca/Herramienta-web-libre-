/**
 * @fileoverview matrix.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de la matriz.
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion matrixTrazability
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('matrixTrazability');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.deleteCheck = deleteCheck;
service.delete = _delete;

module.exports = service;

//####Creacion de los servicios####

 /**
 * create: insercion de los CU/RF en la bd
 */
function create(MatParam){
	var deferred = Q.defer();
	db.matrixTrazability.insert(
		MatParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
	    return deferred.promise;
}

 /**
 * deleteCheck: Borrado de los checks de la matriz
 */
function deleteCheck(MatParam){
    var deferred = Q.defer();
    var id= MatParam._id;

    db.matrixTrazability.remove(
    {_id: mongo.helper.toObjectID(MatParam._id)},
    function(err){
        if(err) deferred.reject(err);
        
        deferred.resolve();
    });
    return deferred.promise;

}

 /**
 * _delete: Borrado de la matriz en la bd
 */
function _delete(MatParam){
    
    var id= MatParam._id;
    var deferred = Q.defer();

    db.matrixTrazability.remove(
    {_id: mongo.helper.toObjectID(MatParam._id)},
    function(err){
        if(err) deferred.reject(err);
        
        deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * getById: obtencion de los checks de la bd
 */
function getById(){
	var deferred = Q.defer();
    var mysort = {idCU: 1};
	db.matrixTrazability.find().sort(mysort).toArray(function(err, result){
			if(err) deferred.reject(err);

			if(result){
					deferred.resolve(result);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}



