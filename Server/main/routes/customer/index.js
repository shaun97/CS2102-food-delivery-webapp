const customer = require('express').Router();
const pool = require('../../db');

customer.get('/api/get/getdeliverycost', (req, res, next) => {
    pool.query(`SELECT getDeliveryCost()`,
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})

customer.get('/api/get/getorderhistory', (req, res, next) => {
    console.log(req.query);
    const cid = req.query.cid;
    pool.query(`SELECT orid, cartCost, fee as deliveryCost, deliveredTime, location 
    FROM Deliver NATURAL JOIN Orders NATURAL JOIN DeliveryTime
    WHERE cid=$1`, [cid],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})


module.exports = customer;

