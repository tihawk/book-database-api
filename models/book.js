var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	img_url: {
		type: String
	}
});

var Book = module.exports = mongoose.model("Book", bookSchema);

//Get books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
}

//Get a book by id
module.exports.getBookById = function(_id, callback){
	Book.findById(_id, callback);
}
//Add a book
module.exports.addBook = function(book, callback){
	Book.create(book, callback);
}
//update a book
//NOTE: has to submit all keys paired with the old/new value, otherwise writes null.
//Potentially could use $set
module.exports.updateBook = function(_id, book, options, callback){
	var query = {_id: _id};
	var update = {
		title: book.title,
		author: book.author,
		genre: book.genre,
		description: book.description,
		img_url: book.img_url
	};
	Book.findOneAndUpdate(query, update, options, callback);
}
//delete a book
module.exports.deleteBook = function(_id, callback){
	var query = {_id: _id};
	Book.remove(query, callback);
}