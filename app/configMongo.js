

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var url = 'mongodb://localhost:27017/test';

mongoose.connect(url);


var db = mongoose.connection;

db.once('open', function(){
  console.log('made it to mongoose--------');
});