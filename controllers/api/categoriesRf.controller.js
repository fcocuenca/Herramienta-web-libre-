/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de las categorias 
*/

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/*####Ubicacion del servicios####*/
var categoryService = require('services/categoryRf.service');

/*####Definicion de las rutas####*/
router.post('/createCatRf', createCat);
router.get('/currentCatRf', getCurrentCat);
router.post('/deleteCatRf', deleteCat);
router.post('/updateCatRf', updateCat);

module.exports = router;

/*####Creacion de los controladores####*/

/**
 * createCat: hacemos referencia al servicio de la creacion de categorias
 */
function createCat(req, res){
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
 * getCurrentCat: hacemos referencia al servicio getById
 */
function getCurrentCat(req, res){
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
 * deleteCat: hacemos referencia al servicio delete para eliminar las categorias
 */
function deleteCat(req, res){
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
 * updateCat: hacemos referencia al servicio delete para modificar las categorias
 */
function updateCat(req, res){
	console.log("updateCat");
	categoryService.update(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}
