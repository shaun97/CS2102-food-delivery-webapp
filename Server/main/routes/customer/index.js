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
    FROM orderitems where orid=$1`, [orid],
        (q_err, q_res) => {
            res.json(q_res.rows); 
        })

})



module.exports = customer;

