var express = require('express');
var router = express.Router();
var path = require('path');
var request = require('request');
  cachedRequest = require('cached-request')(request)
  cacheDirectory = path.join(__dirname, "../../tmp/cache");
  cachedRequest.setCacheDirectory(cacheDirectory);

router.get('/today', function (req, res) {
  var today = new Date().toISOString().slice(0,10);
  var options = {
    url: 'http://musicbrainz.org/ws/2/release/?query=date:' + today + '&limit=100',
    headers: {
      'User-Agent': 'MusicalForecaster/1.0.0 (zskusz@gmail.com)'
    },
    ttl: 60000
  };
  cachedRequest(options, function(err, response, body) {
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
      'User-Agent': 'MusicalForecaster/1.0.0 (zskusz@gmail.com)'
    }
  };
  request(req, function(err, response, body) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(body);
  });
});

router.get('/albums/:artist', function (req, res) {
  var artist = req.params.artist;
  var options = {
    url: 'http://musicbrainz.org/ws/2/release?artist=' + artist +
    '&status=official&type=album&limit=100&inc=artist-credits',
    headers: {
      'User-Agent': 'MusicalForecaster/1.0.0 (zskusz@gmail.com)'
    },
    ttl: 60000
  };
  cachedRequest(options, function(err, response, body) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(body);
  });
});

//!!!!!!!!!!!!!!!
router.get('/artwork/:id', function (req, res) {
  var art = req.params.id;
  var options = {
    url: "http://coverartarchive.org/release/" + art + "/",
    // headers: {
    //   'User-Agent': 'MusicalForecaster/1.0.0 (zskusz@gmail.com)'
    // },
    method: 'JSONP',
      url: "http://coverartarchive.org/release/" + mbid + "/",
      //responseType: "json",
      params: {
        format: 'json',
        callback: 'JSON_CALLBACK'
      },
    ttl: 120000
  };
  cachedRequest(options, function(err, response, body) {
    if (err) {
      res.send(err);
      return;
    }
    res.send(body);
  });
});

module.exports = router;
