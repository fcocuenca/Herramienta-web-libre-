/**
 * @fileoverview definimos las rutas con las enlazamos a los servicios correspondientes al tratamiento de los no requisitos funcionales

 */

var config = require('config.js');
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var userService = require('services/user.service');

/*####Ubicacion del servicios####*/
var nrfService = require('services/nofunctionalrequeriment.service');


/*####Definicion de las rutas####*/
router.post('/createNRf', createNReqFun);
router.get('/current', getCurrentNRf);
router.post('/deleteNRf', deleteNRf);
router.post('/updateNRf', updateNRf);


module.exports = router;

/*####Creacion de los controladores####*/


/**
 * createNReqFun: hacemos referencia al servicio de la creacion de requisitos no funcionales
 */

function createNReqFun(req, res){
    nrfService.create(req.body)
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/**
 * getCurrentRf: hacemos referencia al servicio getById
 */
 
function getCurrentNRf(req, res){

    nrfService.getById()
    .then(function(nrf){
        if(nrf){
            res.send(nrf);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(function(err){
        res.status(400).send(err);
    });
}

/**
 * deleteRf: hacemos referencia al servicio delete para eliminar los requisitos
 */
 
function deleteNRf(req, res) {

    nrfService.delete(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}

/**
 * updateRf: hacemos referencia al servicio update para modificar los requisitos funcionales
 */
function updateNRf(req, res) {
     
    nrfService.update(req.body)
    .then(function () {
        res.sendStatus(200);
    })
    .catch(function (err) {
        res.status(400).send(err);
    });
}
 

 