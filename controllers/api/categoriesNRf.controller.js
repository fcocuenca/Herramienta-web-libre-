var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/*servicios de las categorias*/
var categoryService = require('services/categoryNRf.service');

router.post('/createCatNRf', createCatnrf);
router.get('/currentCatNRf', getCurrentCatnrf);
router.post('/deleteCatNRf', deleteCatnrf);
router.post('/updateCatNRf', updateCatnrf);

module.exports = router;

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
