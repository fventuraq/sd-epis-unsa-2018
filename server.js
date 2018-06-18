var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('gesdocument', ['gesdocument']);
var bodyParser = require ('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/gesdocument', function (req, res){
	console.log("Estoy recibiendo el requerimiento")

	db.gesdocument.find(function (err, docs){
    console.log()
		console.log(docs);
		res.json(docs);
	});
});

app.post('/gesdocument', function (req, res){
	console.log(req.body);
	db.gesdocument.insert(req.body, function(err, doc){
		res.json(doc);
		console.log("He añadido un nuevo contactos")
	});
});

app.delete('/gesdocument/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.gesdocument.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.get('/gesdocument/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.gesdocument.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/gesdocument/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.name);
	db.gesdocument.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {nombre: req.body.nombre, apellido1: req.body.apellido1, apellido2: req.body.apellido2,
    lugarn: req.body.lugarn, fecha: req.body.fecha, direccion: req.body.direccion, telefono: req.body.telefono,
    correo: req.body.correo, profesion: req.body.profesion, area: req.body.area}},
		new: true}, function (err, doc){
			res.json(doc);
		});
});

app.listen(3000);
console.log("Server running on port 3000");
console.log("Hola que hace?");
