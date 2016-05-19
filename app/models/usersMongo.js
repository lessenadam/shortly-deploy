var db = require('../configMongo');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// get around this ?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


db.userSchema.methods.hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

db.userSchema.methods.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

var user = mongoose.model('user', db.userSchema);

module.exports = user;


// var insertUser = new user ({
//   username: 'tony',
//   password: 'mypaswword',
// });


// insertUser.save(function (err) {
//   if (err) {
//     return console.log(err);
//   } 
//   console.log('Url saved!--------------'); 
//   db.db.close();
// });

// // new user({username: 'tony'}).comparePasswordfind({ type: this.type }
// var username = 'tony';
// var password1 = 'mypaswword';
// var password2 = 'paswword';


// user.find({username: username}, function(err, record) {
//   record[0].comparePassword(password2, function(val) {
//     console.log(val);
//   });
// });         

