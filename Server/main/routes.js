var express = require('express')
var router = express.Router()
var pool = require('./db')

/*specify api path*/
router.get('/hello', (req, res) => {
	res.json('hello world')
})


/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', (req, res, next) => {
  console.log(req.body.password);
    const values = [req.body.password, 
                    req.body.email, 
                    req.body.name]
    pool.query(`INSERT INTO Users(password, email, name)
                VALUES($1, $2, $3)
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                  res.json("200")
    })
} )
  
router.get('/api/get/userprofilefromdb', (req, res, next) => {
    const email = req.query.email
    console.log(email)
    pool.query(`SELECT * FROM users
                WHERE email=$1`, [ email ],
                (q_err, q_res) => {
                    res.json(q_res.rows)
        })
} )

module.exports = router