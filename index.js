var express = require('express');

var app = express();
app.use(express.static('client'));

app.get('/', function(req, res, next){
	res.status(200).sendFile(__dirname + '/client/index.html');
});

app.get('/apis/fruits', function(req, res, next){
	var fruit_collection = _db.collection('fruits');
	
	fruit_collection.find().toArray(function(err, result){
		if(err) next(err)
		res.status(200).type('json').send(JSON.stringify(result));
	})	
	
});


var MongoClient = require('mongodb').MongoClient;
var _db = null;

// Connect to the db
MongoClient.connect("mongodb://localhost/test", function(err, db) {
  if(!err) {
		_db = db;
    console.log("We are connected to mongod");

		var fruits = [
			{name: 'mango', price: 350}, 
			{name: 'banana', price: 150}, 
			{name: 'apple', price: 650},
			{name: 'grape', price: 450}, 
			{name: 'strawberry', price: 550}, 
			{name: 'lime', price: 250}, 
			{name: 'pineapple', price: 750}, 
			{name: 'papaya', price: 850}, 
		]

		db.createCollection('fruits', {strict:true}, function(err, collection) {
			if(!err){
					console.log("fruits collection is created")

					collection.insert(fruits, function(err, result){
						if(err) throw err;
						console.log("data inserted to fruits collection")
					})
				}else{
					console.log('fruits collection already created!')
				}
		});		

		var server = app.listen(3000, 'localhost', function(){
			var address = server.address();
			console.log('server is running at '+ address.address + ' on port '+ address.port)
		});

  }
});


			
