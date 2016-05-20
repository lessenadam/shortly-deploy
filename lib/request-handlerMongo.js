var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
var Users = require('../app/collections/users');
var Links = require('../app/collections/links');
var user = require('../app/models/usersMongo');
var link = require('../app/models/linksMongo');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  link.find(function(err, found){
    res.status(200).send(found);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }

  link.find({url: uri}, function(err, record) {
    if (record.length > 0) {
      res.status(200).send(record[0]);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        var newLink = new link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin,
          visits: 0
        });
        newLink.createCode();
        newLink.save(function(err, saved) {
          if (err) {
            console.log(err);
            return;
          }

          res.status(200).send(saved);
        });

      });

    }

  });



  // new Link({ url: uri }).fetch().then(function(found) {
  //   if (found) {
  //     console.log(found.attributes);
  //     res.status(200).send(found.attributes);
  //   } else {
  //     util.getUrlTitle(uri, function(err, title) {
  //       if (err) {
  //         console.log('Error reading URL heading: ', err);
  //         return res.sendStatus(404);
  //       }
  //       var newLink = new Link({
  //         url: uri,
  //         title: title,
  //         baseUrl: req.headers.origin
  //       });
  //       newLink.save().then(function(newLink) {
  //         Links.add(newLink);
  //         res.status(200).send(newLink);
  //       });
  //     });
  //   }
  // });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;


  user.find({username: username}, function(err, record) {
    if (record.length === 0) {
      res.redirect('/login');
    } else {
      record[0].comparePassword(password, function(match) {
        if (match) {
          util.createSession(req, res, record[0]);
        } else {
          res.redirect('/login');
        } 
      });
    }
  });
};    

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  user.find({username: username}, function(err, person) {
    if (person.length > 0) {  
      res.redirect('/signup');
    } else {


      var insertUser = new user ({
        username: username,
        password: password,
      });

      insertUser.hashPassword();

      insertUser.save(function (err) {
        if (err) {
          return console.log(err);
        } 
        // db.db.close();
      });
      
    }
  });
};

exports.navToLink = function(req, res) {
  console.log('Param 0 is: ', req.params[0]);  
  link.find({code: req.params[0]}, function (err, record) {
    console.log('link is:  ', record);
    if (record.length === 0) {
      res.redirect('/');
    } else {
      record[0].visits = record[0].visits + 1;
      record[0].save(function(err) {
        if (err) {
          console.log(err);
          return;
        }
        res.redirect(record[0].url);
      });
    }
  });
};

ce7ac63e0c8c72498c4b55a6c5344676d71389bf6104af75ec2b7da0d729d4fb
