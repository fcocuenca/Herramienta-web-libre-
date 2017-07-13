/**
 * @fileoverview definimos las rutas con las enlazamos a las operaciones correspondientes al tratamiento de los requisitos funcionales
 * @version 1.0
 * @author Fco Cuenca
 * History
 */

var config = require('config.json');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

var specService = require('services/specification.service')

/*####Ubicacion del servicios####*/
var matService = require('services/matrix.service');



/*####Definicion de las rutas####*/
router.post('/createMat', createMatrix);
router.post('/delete', deleteMatrix);
router.get('/current', getCurrentMat);
router.post('/deleteCheck', deleteCheckMat);


module.exports = router;

function createMatrix(req, res){
	console.log("has entrado en createMatrix");
	matService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}

function deleteCheckMat(req, res) {

        console.log("api/matrix"+req.body);
    
        matService.deleteCheck(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("deleteCheck")
}

function deleteMatrix(req, res) {

        console.log("api/matrix"+req.body);
    
        matService.delete(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

            console.log("delete")
}


function getCurrentMat(req, res){
	console.log("has entrado en e getCurrentMat");
	matService.getById()
        .then(function(result){
            if(result){
                res.send(result);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

