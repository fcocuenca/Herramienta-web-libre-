/**
 * @fileoverview norequerimentsfuncional.service.js: se exponen los metodos que utilizaran los requisitos no funcionales
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion nofunctionalrequeriments
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('nofuncionalrequeriments');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;
service.detectarReq = detectarReq;
service.detectarCont = detectarCont;

module.exports = service;

//####Creacion de los servicios####

 /**
 * create: insercion de los requisitos no funcionales en la bd
 */
function create(NRfParam){

	var deferred = Q.defer();
		var re = /(?:\d*)?\d+/;
		
		 if(detectarCont(NRfParam.content) == true && detectarReq(NRfParam.number) == true){
    	db.nofuncionalrequeriments.insert(
							NRfParam,
							function(err, doc){
									if(err) deferred.reject(err);

									deferred.resolve();
							});

    }else{
    		deferred.reject('El requisito no ha sido insertado correctamente');
    }	
	
	return deferred.promise;
}

/*
*detectarCont: detetectar contenido no nulo
*/
function detectarCont(contenido){
	if(contenido != null){
		return true;
	}else{
		return false;
	}	
}

/*detectarReq: detetectar requisito no nulo
	@param:{contenido}
	@return  {boolean}
*/
function detectarReq(requisito){
	var re = /(?:\d*)?\d+/;

	if(re.test(requisito)){
		return true;
	}else{
		return false;
	}
}


/**
 * getById: obtencio de los requisitos no funcionales de la bd
 */
function getById(){
	var deferred = Q.defer();

	var mysort = {number: 1};

	db.nofuncionalrequeriments.find().sort(mysort).toArray(function(err, nrf){
			if(err) deferred.reject(err);

			if(nrf){
					deferred.resolve(nrf);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}

 /**
 * _delete: Borrado de los requisitos no funcionales en la bd
 */
function _delete(NRfParam){
    var deferred = Q.defer();
    var id= NRfParam._id;

    db.nofuncionalrequeriments.remove(
    {_id: mongo.helper.toObjectID(NRfParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * update: modificacion de los no requisitos funcionales
 */
function update(NRfParam){
    var deferred = Q.defer();
    
    var id= NRfParam._id;
    var content = NRfParam.content;

    var set = {	
    			content: content,
    };

    db.nofuncionalrequeriments.update(
    {_id: mongo.helper.toObjectID(NRfParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}




