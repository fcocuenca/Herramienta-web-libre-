var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('categoryRf');

var service = {};

service.create = create;
service.getById = getById;

module.exports = service;

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

function getById(){
	console.log("ha llegado al getById");
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