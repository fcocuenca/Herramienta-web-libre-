/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de las categorias 
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/*####Ubicacion del servicios####*/
var categoryService = require('services/categoryNRf.service');

/*####Definicion de las rutas####*/
router.post('/createCatNRf', createCatnrf);
router.get('/currentCatNRf', getCurrentCatnrf);
router.post('/deleteCatNRf', deleteCatnrf);
router.post('/updateCatNRf', updateCatnrf);

module.exports = router;


/*####Creacion de los controladores####*/

/**
 * createCatnrf: hacemos referencia al servicio de la creacion de categorias
 */
function createCatnrf(req, res){
	console.log("createCat");
	categoryService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}

/**
 * getCurrentCarnrf: hacemos referencia al servicio getById
 */
function getCurrentCatnrf(req, res){
	categoryService.getById()
        .then(function(cat){
            if(cat){
                res.send(cat);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

/**
 * deleteCatnrf: hacemos referencia al servicio delete para eliminar las categorias
 */
function deleteCatnrf(req, res){
	console.log("deleteCat");
	categoryService.delete(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}

/**
 * updateCatnrf: hacemos referencia al servicio delete para modificar las categorias
 */
function updateCatnrf(req, res){
	console.log("updateCat");
	categoryService.update(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}
