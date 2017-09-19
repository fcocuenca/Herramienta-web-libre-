/**
 * @fileoverview specification.service.js: se exponen los servicios que va a utilizar 
 * en el manejo de las especificaciones.
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion specification
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('specification');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;
service.detectarId = detectarId;

module.exports = service;

//####Creacion de los servicios####

 /**
 * create: insercion de las especificaciones en la bd
 */
function create(SpecParam){

	var deferred = Q.defer();
    if(detectarId(SpecParam.id) == true){
       
        db.specification.insert(
        SpecParam,
        function(err, doc){
                if(err) deferred.reject(err);

                deferred.resolve();
        });
     }else{
            deferred.reject('Inserta el Id de la especificación');
     }   
    return deferred.promise;    
}

/*
*detectarId: verificar la insercion del id
*/
function detectarId(id){
    var re = /(?:\d*)?\d+/;

    if(re.test(id)){
        return true;
    }else{
        return false;
    }
}

 /**
 * getById: obtencion de las especificaciones de la bd
 */
function getById(){
	var deferred = Q.defer();

    var mysort = {id: 1};

	db.specification.find().sort(mysort).toArray(function(err, spec){
			if(err) deferred.reject(err);

			if(spec){
					deferred.resolve(spec);
			}else{
				deferred.resolve();
			}		
	});
	return deferred.promise;
}

 /**
 * _delete: Borrado de las especificaciones en la bd
 */
function _delete(SpecParam){
    var deferred = Q.defer();
    var id= SpecParam._id;

    db.specification.remove(
    {_id: mongo.helper.toObjectID(SpecParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}

 /**
 * update: modificacion de las especificaciones en la bd
 */
function update(SpecParam){

    var deferred = Q.defer();
    
    var id= SpecParam._id;
    var name = SpecParam.name;
    var idSpec = SpecParam.id;
    var desc = SpecParam.desc;
    var actorPrin = SpecParam.actorPrin;
    var actorSec = SpecParam.actorSec;
    var preCon = SpecParam.preCon;
    var flujoPrin = SpecParam.flujoPrin;
    var postCon = SpecParam.postCon;
    var flujoAlt = SpecParam.flujoAlt

    var set = {	
    			name: name,
    			id: idSpec,
    			desc: desc,
    			actorPrin: actorPrin, 
    			actorSec: actorSec, 
    			preCon: preCon,
    			flujoPrin: flujoPrin,
    			postCon: postCon,
    			flujoAlt: flujoAlt,
    };

    db.specification.update(
    {_id: mongo.helper.toObjectID(SpecParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    return deferred.promise;
}