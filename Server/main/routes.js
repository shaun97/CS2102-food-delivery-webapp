var express = require('express')
var router = express.Router()
/*specify api path*/
router.get('/hello', (req, res) => {
	res.json('hello world')
})


/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', (req, res, next) => {
    const values = [req.body.profile.cpassword, 
                    req.body.profile.email, 
                    req.body.profile.cname]
    pool.query(`INSERT INTO customers(cpassword, email, cname)
                VALUES($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                  res.json(q_res.rows)
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