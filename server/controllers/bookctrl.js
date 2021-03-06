var Book = require('../models/book');

var create = function(req, res) {
  var image;
  if(!req.body.image) {
    image = 'http://placehold.it/200x240'
  } else {
    image = req.body.image
  }
  let newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    price: req.body.price,
    stock: req.body.stock,
    image: image
  })
  newBook.save((err, createdBook) => {
    res.send(err ? err : createdBook);
  })
}

var get = function(req, res) {
  Book.find({}, function (err, books) {
    res.send(err ? err : books)
  });
}

var getOne = function(req, res) {
  Book.find({_id: req.params.id}, (err, book) => {
    res.send(err ? err: book)
  })
}

var getByGenre = function(req, res) {
  Book.find({genre: req.params.genre}, (err, book) => {
    res.send(err ? err: book)
  })
}

var update = function(req, res) {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { runValidators: true }, (err, book) => {
    if(err) res.send(err.errors)
    res.send(book)
  })
}

var purchased = function(req, res, next) {
  var books = req.body.rawBook;
  books.forEach(book => {
    Book.findOne({_id: book._id}, (err, found) => {
      if(err) res.send(err)
      found.stock -= book.count;
      found.save(function(err, updated) {
        if(err) res.send(err)
      })
    })
  })
  next()
}

var remove = function(req, res) {
  Book.findOneAndRemove({_id: req.params.id}, (err, book) => {
    if(err) res.send(err)
    res.send(book)
  })
}

module.exports = {
  create, get, getOne,getByGenre, update, purchased, remove
};