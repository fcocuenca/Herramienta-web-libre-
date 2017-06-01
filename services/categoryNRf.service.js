var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Q = require('q');
var mongo = require('mongoskin');

var db = mongo.db(config.connectionString, {native_parser: true});
db.bind('categoryNRf');

var service = {};

service.create = create;
service.getById = getById;
service.delete = _delete;
service.update = update;

module.exports = service;

function create(CatParam){
	var deferred = Q.defer();

	db.categoryNRf.insert(
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

	db.categoryNRf.find().toArray(function(err, cat){
			if(err) deferred.reject(err);

			if(cat){
				deferred.resolve(cat);
			}else{
				deferred.resolve();
			}
	});
	return deferred.promise;

}

function _delete(CatParam){
	console.log("has entrado en _deeleteCat");

    
    var deferred = Q.defer();
    var id= CatParam._id;

    db.categoryNRf.remove(
    {_id: mongo.helper.toObjectID(CatParam._id)},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salidod _deletecat");
    return deferred.promise;
}

function update(CatParam){
	console.log("has entrado en update");
	
    var deferred = Q.defer();
    
    var id= CatParam._id;
    var category = CatParam.category;

    var set = {	
    			category: category,
    };

    db.categoryNRf.update(
    {_id: mongo.helper.toObjectID(CatParam._id)},
    {$set: set},
    function(err){
    	if(err) deferred.reject(err);
    	
    	deferred.resolve();
    });
    	console.log("has salido updateCat");
    return deferred.promise;
}