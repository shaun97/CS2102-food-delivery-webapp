const rider = require('express').Router();
const pool = require('../../db');

/* 
  RIDER SECTION
*/

rider.get('/api/get/ordersfromdb', (req, res, next) => {
    pool.query(`SELECT * FROM Orders`,
    (q_err, q_res) => {
      res.json(q_res.rows); 
    })
})

module.exports = rider;