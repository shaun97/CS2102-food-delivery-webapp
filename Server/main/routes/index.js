var express = require('express')
var router = express.Router()
var pool = require('../db')

//imports routes for manager
let manager = require('./manager');
router.use('/manager', manager);
//imports routes for rider
let rider = require('./rider');
router.use('/rider', rider);
//imports routes for restaurant
let restaurant = require('./restaurant');
router.use('/restaurant', restaurant);
//imports routes for customer
let customer = require('./customer');
router.use('/customer', customer);

/*specify api path*/
router.get('/hello', (req, res) => {
  res.status(200).send({ message: 'Connected!' });
});


/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', (req, res, next) => {
  const values = [req.body.password,
    req.body.email,
    req.body.name
  ]
  pool.query(`INSERT INTO Users(password, email, name)
                VALUES($1, $2, $3)
                ON CONFLICT DO NOTHING`, values,
    (q_err, q_res) => {
      res.json("200")
    })
})


router.get('/api/get/userprofilefromdb', (req, res, next) => {
  let queryText = "";
  switch(req.query.userType) {
    case 'customer':
      queryText = `SELECT id, name, email 
      FROM users
      WHERE email=$1 AND password=$2
      AND exists(
        SELECT 1
        FROM customers
        WHERE cid = id
      );`
      break;
    case 'staff':
      queryText = `SELECT id, name, email 
      FROM users
      WHERE email=$1 AND password=$2
      AND exists(
        SELECT 1
        FROM staffs
        WHERE stid = id
      );`
      break;
    case 'rider':
      queryText = `SELECT id, name, email 
      FROM users
      WHERE email=$1 AND password=$2
      AND exists(
        SELECT 1
        FROM riders
        WHERE rid = id
      );`
      break;
    case 'manager':
      queryText = `SELECT id, name, email 
      FROM users
      WHERE email=$1 AND password=$2
      AND exists(
        SELECT 1
        FROM managers
        WHERE mid = id
      );`
      break;
  }
  const email = req.query.email;
  const password = req.query.password;
  if(queryText !== null) {
    pool.query(queryText, [email, password],
      (q_err, q_res) => {
        if (q_res.rowCount !== 0) {
        res.json(q_res.rows);
        } //Is there a better way to show if not found? currently if rows empty then means no account
        else {
          res.json();
        }
      })
  } else {
    res.json();
  }
})

module.exports = router