

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var url = 'mongodb://localhost:27017/test';

mongoose.connect(url);


var db = mongoose.connection;

// db.once('open', function(){
//   console.log('made it to mongoose--------');
// });

var userSchema = new Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true},
},
  {
    timestamps: true
  }
);

var urlSchema = new Schema({
  url: {type: String, required: true}, 
  baseUrl: {type: String, required: true},
  code: {type: String, required: false},
  title: {type: String, required: true},
  visits: {type: Number, required: true}
},
  {
    timestamps: true
  }
);


exports.db = db;
exports.userSchema = userSchema;
exports.urlSchema = urlSchema;



// var url = mongoose.model('url', urlsSchema);

// var insertUser = new user ({username: 'adam', password: 'lessen'});

// var insertUrl = new url ({
//   url: 'google',
//   baseUrl: 'goog',
//   code: '202',
//   title: 'the googs', 
//   visits: '0'
// });

// insertUrl.save(function (err) {
//   if (err) {
//     return console.log(err);
//   } 
//   console.log('Url saved!--------------'); 
//   db.close();
// });

