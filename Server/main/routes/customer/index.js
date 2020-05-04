const customer = require('express').Router();
const pool = require('../../db');

customer.get('/api/get/getdeliverycost', (req, res, next) => {
    pool.query(`SELECT getDeliveryCost()`,
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})

customer.get('/api/get/getorderhistory', (req, res, next) => {
    const cid = req.query.cid;
    pool.query(`SELECT rname, orid, cartCost, fee as deliveryCost, TO_CHAR(deliveredTime, 'dd/mm/yy hh:mm') as deliveredtime, location 
    FROM Deliver NATURAL JOIN Orders NATURAL JOIN DeliveryTime
    WHERE cid=$1`, [cid],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })

})

customer.get('/api/get/getorderitems', (req, res, next) => {
    const orid = req.query.orid;
    pool.query(`SELECT fname, quantity 
    FROM orderitems WHERE orid=$1`, [orid],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})

customer.post('/api/posts/postreview', (req, res, next) => {
    console.log(req.body);
    const foodReview = req.body.foodReview;
    const deliveryRating = req.body.deliveryRating;
    const orid = req.body.orid;
    pool.query(`INSERT INTO Reviews(orid, foodreview, deliveryrating)
                VALUES($1, $2, $3)
                ON CONFLICT (orid) DO UPDATE
                SET foodreview=$2, deliveryrating=$3`, [orid, foodReview, deliveryRating],
        (q_err, q_res) => {
        })
})

customer.get('/api/get/getrestreviews'), (req, res, next) => {
    const rname = req.query.rname;
    pool.query(`SELECT foodreview, deliveryrating 
    FROM restaurants natural join orders natural join reviews 
    WHERE rname=$1`, [rname],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
}


module.exports = customer;

