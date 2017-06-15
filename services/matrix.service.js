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
db.bind('matrixTrazability');

var service = {};

service.create = create;
service.getById = getById;

module.exports = service;

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

function getById(){
	console.log("ha entrado en showAllMat");
	var deferred = Q.defer();

	db.matrixTrazability.find().toArray(function(err, result){
			if(err) deferred.reject(err);

			if(result){
					deferred.resolve(result);
			}else{
				deferred.resolve();
			}		
	});

	console.log("ha entrado en showAllMatrix");
	return deferred.promise;
}


