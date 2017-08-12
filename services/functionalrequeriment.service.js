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

//inserccion de la collection rf en mongoDB
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('funcionalrequeriments');

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
function create(RfParam){

	var deferred = Q.defer();
	console.log(RfParam.number);
	console.log(RfParam.content);

	
    if(detectarCont(RfParam.content) == true && detectarReq(RfParam.number) == true){
    	db.funcionalrequeriments.insert(
							RfParam,
							function(err, doc){
									if(err) deferred.reject(err);

									deferred.resolve();
							});

    }else{
    		deferred.reject('El requisito no ha sido insertado correctamente');
    }
 
	return deferred.promise;
}

function detectarCont(contenido){
	if(contenido != null){
		return true;
	}else{
		return false;
	}	
}

function detectarReq(requisito){
	var re = /(?:\d*)?\d+/;

	if(re.test(requisito)){
		return true;
	}else{
		return false;
	}
}
	


 /**
 * getById: obtencio de los requisitos funcionales de la bd
 * @return  {requisitos:_id, content}
 */
function getById(){
	console.log("ha entrado en showAll1");
	var deferred = Q.defer();

	var mysort = {number: 1};

	db.funcionalrequeriments.find().sort(mysort).toArray(function(err, rf){
			if(err) deferred.reject(err);

			if(rf){
					deferred.resolve(rf);
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
function _delete(RfParam){
	console.log("has entrado en _deete");
	console.log(RfParam._id);
    
    var deferred = Q.defer();
    var id= RfParam._id;

    db.funcionalrequeriments.remove(
    {_id: mongo.helper.toObjectID(RfParam._id)},
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
function update(RfParam){
	console.log("has entrado en update");
	

    var deferred = Q.defer();
    
    var id= RfParam._id;
    var content = RfParam.content;

    var set = {	
    			content: content,
    };

    db.funcionalrequeriments.update(
    {_id: mongo.helper.toObjectID(RfParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salido update");
    return deferred.promise;
}




