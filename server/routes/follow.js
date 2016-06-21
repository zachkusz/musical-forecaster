var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/musical-forecast';

router.get('/:id', function (req, res) {
  var id = req.params.id;
  console.log('user id: ', id);

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT artist_id FROM user_artist WHERE user_id = $1',
    [id],
    function(err, result) {
    done();

    res.send(result.rows);

    });
  });
});

// search all artists from all users
router.get('/artists/all', function (req, res) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT artist_id FROM artists',
    function(err, result) {
    done();

    res.send(result.rows);

    });
  });
});

//gets artist name
router.get('/name/:id', function (req, res) {
  var id = req.params.id;
  console.log('user id: ', id);

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('SELECT artist_name FROM artists WHERE artist_id = $1',
    [id],
    function(err, result) {
    done();

    res.send(result.rows);

    });
  });
});

//adds artist to artsists table then adds them to bridge table happy path
router.post('/', function(req, res) {
  var follow = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

  client.query('INSERT INTO artists (artist_id, artist_name) ' +
                'VALUES ($1, $2)', [follow.id, follow.name],
                function(err, result) {
                  if (err) {
                    res.sendStatus(500);
                    return;
                  }
                  //nested query function
                  client.query('INSERT INTO user_artist (user_id, artist_id) ' +
                  'VALUES ($1, $2)', [follow.user_id, follow.id],
                  function(err, result) {
                    done();
                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                    res.sendStatus(201);
                  });
                }
    );
  });
});


//other/weird path
router.post('/repeat/artist', function(req, res) {
  var follow = req.body;

  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO user_artist (user_id, artist_id) ' +
      'VALUES ($1, $2)', [follow.user_id, follow.id],
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
