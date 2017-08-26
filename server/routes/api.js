const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {

      connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});
    router.get('/usersSearch', (req, res) => {



      connection((db) => {
          db.collection('users')
              .find({'$text': {"$search": req.query.name}})
              .toArray()
              .then((users) => {
                  response.data = users;
                  res.json(response);
              })
              .catch((err) => {
                  sendError(err, res);
              });
      });
});

router.get('/users/:id', (req, res) => {



  connection((db) => {
      db.collection('users')
          .findOne({'_id': new ObjectID(''+req.params.id)})
          .then((user) => {
              response.data = user;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});

router.post('/users', (req, res) => {
  connection((db) => {
      db.collection('users')
          .insert({'name': req.body.name})
        .then((user) => {
          var id = user.insertedIds[0];
          response.data = id;

              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});
router.put('/users/:id', (req, res) => {
  connection((db) => {
      db.collection('users')
          .update({'_id':  new ObjectID(''+req.params.id)},
          {$set:{'name': req.body.name}})
          .then((users) => {
          response.data = users;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});
router.delete('/users/:id', (req, res) => {

  connection((db) => {
      db.collection('users')
          .deleteOne({'_id': new ObjectID(''+req.params.id)})
        .then((users) => {
          response.data = users;
              res.json(response);
          })
          .catch((err) => {
              sendError(err, res);
          });
  });
});


module.exports = router;
