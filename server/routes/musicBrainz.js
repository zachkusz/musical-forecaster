var express = require('express');
var router = express.Router();
var passport = require('passport'); //may not need
var path = require('path');
var request = require('request');

router.get('/today', function (req, res) {
  var today = new Date().toISOString().slice(0,10);
  var req = {
    url: 'http://musicbrainz.org/ws/2/release/?query=date:' + today,
    headers: {
      'User-Agent': 'MusicalForecaster/version-inDevelopment (zskusz@gmail.com)'
    }
  };
  request(req, function(err, response, body) { //changed games to body
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(body);
  });
});

router.get('/search/:query', function (req, res) {
  var query = req.params.query;
  var req = {
    url: 'http://musicbrainz.org/ws/2/artist/?query=artist:' + query,
    headers: {
      'User-Agent': 'MusicalForecaster/version-inDevelopment (zskusz@gmail.com)'
    }
  };
  request(req, function(err, response, body) { //changed games to body
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(body);
  });
});

module.exports = router;
