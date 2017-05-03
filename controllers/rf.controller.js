/*
	CONTROLADOR PARA LA VISTA DE LOS REQUISITOS FUNCIONALES
*/


var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');

router.get('/', function (req, res) {
    res.render('functionalrequeriments');
});

router.post('/', function (req, res) {
	console.log("controller de la vista");
	request.post({
		url: config.apiUrl + '/functionalrequeriments/createRf',
		form: req.body,
		json: true
	}, function(error, response, body){
		if(error){
			return res.render('functionalrequeriments',{error: 'Ha ocurrido un error'});
		}
		if(response.statusCode !==200){
			return res.render('functionalrequeriments',{
				error: response.body,
				tittle: req.body.tittle,
				content: req.body.content
			});
		}
		req.session.succes = 'Se ha almacenado el reqfuncional';
		return res.redirect('/login');
	});
});





module.exports = router;