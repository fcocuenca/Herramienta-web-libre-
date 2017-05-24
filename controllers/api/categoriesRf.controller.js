var config = require('config.json');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

/*servicios de las categorias*/
var categoryService = require('services/categoryRf.service');

router.post('/createCatRf', createCat);
router.get('/currentCatRf', getCurrentCat);

module.exports = router;

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
