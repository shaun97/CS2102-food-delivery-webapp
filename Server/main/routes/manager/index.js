const manager = require('express').Router();
const pool = require('../../db');

manager.get('/api/get/getMonthTotalOrders', (req, res, next) => {
const monthSelected = req.query.monthSelected;
pool.query(`SELECT orid, cartCost, deliveredtime
            FROM Orders join DeliveryTime using (orid)
            where date_part('month', deliveredtime) = $1`, [monthSelected],
    (q_err, q_res) => {
    res.json(q_res.rows); 
    })
})
  
manager.get('/api/get/getNewCustomers', (req, res, next) => {
const monthSelected = req.query.monthSelected;
pool.query(`SELECT *
            FROM Users
            where date_part('month', date_signup) = $1`, [monthSelected],
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

manager.get('/api/get/getDeliveryInfo', (req, res, next) => {
pool.query(`SELECT orid, location, rid, dstatus, coalesce(deliveredtime, departfromr, arriveforr, departforr) as time
            FROM Orders join Deliver using (orid) join DeliveryTime using (orid)
            WHERE date_part('hour', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_part('hour', now())
            and date_trunc('day', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_trunc('day', now())`,
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

manager.get('/api/get/getDeliveryCountByArea', (req, res, next) => {
pool.query(`SELECT location, count(*) as numOrders
            FROM Orders join Deliver using(orid) join DeliveryTime using (orid)
            GROUP BY location, coalesce(deliveredtime, departfromr, arriveforr, departforr)
            HAVING date_part('hour', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_part('hour', now())
            and date_trunc('day', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_trunc('day', now())`,
    (q_err, q_res) => {
    let rows = [];
    for (let i = 0; i < q_res.rowCount; i++) {
        rows.push({"location": q_res.rows[i].location, "count": q_res.rows[i].numorders})
    }
    console.log(q_res.rows);
    res.json(rows);
    })
})

manager.get('/api/get/getCustomerMonthOrderInfo', (req, res, next) => {
const monthSelected = req.query.monthSelected;
pool.query(`SELECT name, sum(cartcost) as totalCost, count(*) as totalOrders
            FROM Orders join DeliveryTime using (orid) join Users on (cid = id)
            GROUP BY name, date_part('month', coalesce(deliveredTime, departfromr, arriveforr, departforr)), date_part('year', coalesce(deliveredTime, departfromr, arriveforr, departforr))
            HAVING date_part('month', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = $1
            and date_part('year', coalesce(deliveredtime,departfromr, arriveforr, departforr)) = date_part('year', now());`, [monthSelected],
    (q_err, q_res) => {
    console.log(q_res);
    res.json(q_res.rows);
    })
})

manager.get('/api/get/getRiderOrdersDelivered', (req, res, next) => {
pool.query(`SELECT name, count(*) from deliver join deliverytime using (orid) join users on (rid = id)
            GROUP BY name, date_trunc('month', deliveredtime)
            HAVING date_trunc('month', deliveredtime) = date_trunc('month', now());`,
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

module.exports = manager;