var db = require('../configMongo');
var Promise = require('bluebird');
var crypto = require('crypto');


// get around this ?
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


db.urlSchema.methods.createCode = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);  
};
  
var link = mongoose.model('link', db.urlSchema);

module.exports = link;