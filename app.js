var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

Genre = require("./models/genre");
Book = require('./models/book');

//specify the static files folder
app.use(express.static(__dirname + '/client'));
//use the body parser middleware
app.use(bodyParser.json());

//Connect to mongoose
mongoose.connect("mongodb://localhost/bookstore", {useMongoClient:true});
var db = mongoose.connection;
//home page
app.get('/', function(req, res){
	res.send("Please use /api/books or /api/genres");
});

//GENRES
//get genres
app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}

		res.json(genres);
	});
});
//add genre
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre, function(err, posted){
		if(err){throw err;}
		res.json(posted);
	});
});
//update genres
app.put('/api/genres/:_id', function(req, res){
	var _id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(_id, genre, {}, function(err, putt){
		if(err){throw err;}
		res.json(putt);
	});
});
//delete genre
app.delete('/api/genres/:_id', function(req, res){
	var _id = req.params._id;
	Genre.deleteGenre(_id, function(err, deleted){
		if(err){throw err;}
		res.json(deleted);
	})
});

//BOOKS
//get books
//TODO: integrate limit via optional query
app.get('/api/books', function(req, res){
	//var limit = parseInt(req.params.limit);
	Book.getBooks(function(err, books){
		if(err){throw err};
		res.json(books);
	});
});
//get book by id
app.get('/api/books/:_id', function(req, res){
	var _id = req.params._id;
	Book.getBookById(_id, function(err, book){
		if(err){return err;}
		res.json(book);
	});
});
//add a book
app.post('/api/books', function(req, res){
	var book = req.body;
	Book.addBook(book, function(err, posted){
		if(err){throw err;}
		res.json(posted);
	});
});
//update a book
app.put('/api/books/:_id', function(req, res){
	var _id = req.params._id;
	var book = req.body;
	Book.updateBook(_id, book, {}, function(err, putt){
		if(err){throw err;}
		res.json(putt);
	})
});
//delete a book
app.delete('/api/books/:_id', function(req, res){
	var _id = req.params._id;
	Book.deleteBook(_id, function(err, deleted){
		if(err){throw err;}
		res.json(deleted);
	});
});

app.listen(1335);
console.log('listening...');