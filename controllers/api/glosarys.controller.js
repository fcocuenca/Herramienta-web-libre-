/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de los términos
 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

/*####Ubicacion del servicios####*/
var glosaryService = require('services/glosary.service');


/*####Definicion de las rutas####*/
router.post('/createW', createWord);
router.get('/current', getCurrentWord);
router.post('/deleteW', deleteWord);
router.post('/updateW', updateWord);


module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createWord: hacemos referencia al servicio de la creacion de términos
 */

function createWord(req, res){
	glosaryService.create(req.body)
		.then(function(){
			res.sendStatus(200);
		})
		.catch(function(err){
			res.status(400).send(err);
		});
}

/**
 * getCurrentWord: hacemos referencia al servicio getById
 */
 
function getCurrentWord(req, res){
   glosaryService.getById()
        .then(function(w){
            if(w){
                res.send(w);
            }else{
                res.sendStatus(404);
            }
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

/**
 * deleteWord: hacemos referencia al servicio delete para eliminar los términos
 */
 
function deleteWord(req, res) {

        glosaryService.delete(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });

    }

/**
 * updateWord: hacemos referencia al servicio update para modificar los términos
 */
function updateWord(req, res) {
        glosaryService.update(req.body)
            .then(function () {
                res.sendStatus(200);
            })
            .catch(function (err) {
                res.status(400).send(err);
            });
}
 

 