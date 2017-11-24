var mongoose = require("mongoose");

//Genre schema
var genreSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Genre = module.exports = mongoose.model('Genre', genreSchema);

//Get Genres
module.exports.getGenres = function(callback, limit){
	Genre.find(callback).limit(limit);
}

//Get a genre

//Add a genre
module.exports.addGenre = function(genre, callback){
	Genre.create(genre, callback);
}

//update a genre
module.exports.updateGenre = function(_id, genre, options, callback){
	var query = {_id: _id};
	var update = {
		name: genre.name
	};
	Genre.findOneAndUpdate(query, update, options, callback);
}
//delete genre
module.exports.deleteGenre = function(_id, callback){
	var query = {_id: _id};
	Genre.remove(query, callback);
}