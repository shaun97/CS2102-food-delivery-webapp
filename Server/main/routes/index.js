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
  const email = req.query.email;
  const password = req.query.password;
  pool.query(`SELECT id, name, email FROM users
                WHERE email=$1 AND password=$2`, [email, password],
    (q_err, q_res) => {
      res.json(q_res.rows); //Is there a better way to show if not found? currently if rows empty then means no account
    })
})

module.exports = router