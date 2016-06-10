var express = require('express');
var router = express.Router();
var passport = require('passport'); //may not need
var path = require('path'); //also may not need?
var request = require('request'); //may not need
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/musical-forecast';

//adds artist to artsists before adding them to bridge table
router.post('/', function(req, res) {
  var follow = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO artists (artist_id, artist_name) ' +
                    'VALUES ($1, $2)', [follow.id, follow.name],
                  function(err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(201);
                  }
    );
  });
});

module.exports = router;
