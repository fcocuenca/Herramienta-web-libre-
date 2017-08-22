/**
 * @fileoverview user.service.js: Se exponen los metodos CRUD para el manejo de los usuarios
 */

var config = require('config.js');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');

//Creación de la coleccion users
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

/*especificacion de los servicios que vamos a implementar para posteriormente 
que el controlador haga uso de ellos.*/
var service = {};
 
service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getCurrentAllUsers = getCurrentAllUsers;
 
module.exports = service;

//####Creacion de los servicios####

 /**
 * authenticate: Verifica que la autenticacion del usuario es correcta.
 */
function authenticate(email, password) {
    //prepara los objetos para ser usados.
    var deferred = Q.defer();
 
    db.users.findOne({ email: email }, function (err, user
    	) {
        if (err) deferred.reject(err);
 
        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve(jwt.sign({ sub: user._id }, config.secret));
        } else {
            // authentication failed
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

 /**
 * getById: Obtiene el id del usuario.
 */
function getById(_id) {
    var deferred = Q.defer();
 
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);
 
        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}
 
 /**
 * create: Insercion de usuario en la bd(createUser()) y posteriormente se verifica la existencia.
 */
function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { email: userParam.email },
        function (err, user) {
            if (err) deferred.reject(err);
 
            if (user) {
                // username already exists
                deferred.reject('Usuario "' + userParam.email + '" ya existe en el base de datos');
            } else {
                //comprobacion del correo electronico
                /*var re = /^[i][0-9][0-9][a-z][a-z][a-z][a-z][a-z]*@[u][c][o][.][e][s]$/;
                if(re.test(userParam.email))
                {*/
                    createUser();
                    
                //}else{

                    //deferred.reject("Email incorrecto, introduce el correo de la UCO");
                }
        });
 
	    function createUser() {
	        // set user object to userParam without the cleartext password
	        var user = _.omit(userParam, 'password');
	 
	        // add hashed password to user object
	        user.hash = bcrypt.hashSync(userParam.password, 10);
	 
	        db.users.insert(
	            user,
	            function (err, doc) {
	                if (err) deferred.reject(err);
	 
	                deferred.resolve();
	            });

    }
 
    return deferred.promise;
}
 
/**
 * update: Actualiza los datos del usuario mediante updateUser y se verifica con update
 */
function update(_id, userParam) {
    var deferred = Q.defer();
 
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err);
 
        if (user.email !== userParam.email) {
            // username has changed so check if the new username is already taken
            db.users.findOne(
                { email: userParam.email },
                function (err, user) {
                    if (err) deferred.reject(err);
 
                    if (user) {
                        // username already exists
                        deferred.reject('Usuario: "' + req.body.email + '" ya existe en la base de datos')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });
 
function updateUser() {
    // fields to update
    var set = {
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        email: userParam.email,
    };

    // update password if it was entered
    if (userParam.password) {
        set.hash = bcrypt.hashSync(userParam.password, 10);
    }

    db.users.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err);

            deferred.resolve();
        });
}

    return deferred.promise;
}
 
 /**
 * _delete: Actualiza los datos del usuario mediante updateUser y se verifica con update
 */
//llamada _delete por que delete es una expresion de javascript
function _delete(_id) {
    var deferred = Q.defer();
 
    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}

function getCurrentAllUsers(){
    var deferred = Q.defer();

    db.users.find().toArray(function(err, user){
        if(err) deferred.reject(err);

        if(user){
            deferred.resolve(user);
        }else{
            deferred.resolve();
        }
    });
    return deferred.promise;
}