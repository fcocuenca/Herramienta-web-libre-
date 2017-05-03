/**
 * @fileoverview norequerimentsfuncional.service.js: se exponen los metodos que utilizaran los requisitos no funcionales
 * @version 0.1
 * @author FcoCuenca 
 * History
 */

var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//inserccion de la collection nrf en mongoDB
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('nofuncionalrequeriments');

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
	####CONTENIDO DEL REQ NO FUNC.####
	{Campos que consta un requisito no funcional: _id: proporcionado por mongoDB, content: contenido del requisito no funcional}
*/

 /**
 * create: insercion de los requisitos no funcionales en la bd
 * @param  {_id}
 * @param  {content}
 * @return  {promesa ok or fail}
 */
function create(NRfParam){

	var deferred = Q.defer();

	db.nofuncionalrequeriments.insert(
		NRfParam,
		function(err, doc){
				if(err) deferred.reject(err);

				deferred.resolve();
		});
		
		return deferred.promise;
}


 /**
 * getById: obtencio de los requisitos no funcionales de la bd
 * @return  {requisitos:_id, content}
 */
function getById(){
	console.log("has entrado en getById nrf");
	var deferred = Q.defer();

	db.nofuncionalrequeriments.find().toArray(function(err, nrf){
			if(err) deferred.reject(err);

			if(nrf){
					deferred.resolve(nrf);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha salido nrf");
	return deferred.promise;
}

 /**
 * _delete: Borrado de los requisitos no funcionales en la bd
 * @param  {_id}
 * @param  {content}
 * @return  {usuario autenticado}
 */
function _delete(NRfParam){
	console.log("has entrado en _deete");
	 console.log(NRfParam._id);
    var deferred = Q.defer();
    var id= NRfParam._id;

    db.nofuncionalrequeriments.remove(
    {_id: mongo.helper.toObjectID(NRfParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod _delete");
    return deferred.promise;
}

 /**
 * update: modificacion de los no requisitos funcionales
 * @param  {_id}
 * @param  {content}
 * @return  {usuario modificado}
 */
function update(NRfParam){
	console.log("has entrado en update");

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
    	console.log("has salido update");
    return deferred.promise;
}




