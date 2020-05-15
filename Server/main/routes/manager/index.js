const manager = require('express').Router();
const pool = require('../../db');

manager.get('/api/get/getMonthTotalOrders', (req, res, next) => {
const monthSelected = req.query.monthSelected;
pool.query(`SELECT orid, cartCost, deliveredtime
            FROM Orders join DeliveryTime USING (orid)
            WHERE date_part('month', deliveredtime) = $1`, [monthSelected],
    (q_err, q_res) => {
    res.json(q_res.rows); 
    })
})
  
manager.get('/api/get/getNewCustomers', (req, res, next) => {
const monthSelected = req.query.monthSelected;
pool.query(`SELECT *
            FROM Users
            WHERE date_part('month', date_signup) = $1`, [monthSelected],
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

manager.get('/api/get/getDeliveryInfo', (req, res, next) => {
pool.query(`SELECT orid, location, rid, dstatus, coalesce(deliveredtime, departfromr, arriveforr, departforr) AS time
            FROM Orders JOIN Deliver using (orid) JOIN DeliveryTime USING (orid)
            WHERE date_part('hour', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_part('hour', now())
            AND date_trunc('day', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_trunc('day', now())`,
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

manager.get('/api/get/getDeliveryCountByArea', (req, res, next) => {
pool.query(`SELECT location, count(*) AS numOrders
            FROM Orders join Deliver using(orid) JOIN DeliveryTime USING (orid)
            GROUP BY location, date_part('hour',coalesce(deliveredtime, departfromr, arriveforr, departforr)),
            date_trunc('day', coalesce(deliveredtime, departfromr, arriveforr, departforr))
            HAVING date_part('hour', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_part('hour', now())
            AND date_trunc('day', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = date_trunc('day', now())`,
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
            FROM Orders join DeliveryTime using (orid) JOIN Users ON (cid = id)
            GROUP BY name, date_part('month', coalesce(deliveredTime, departfromr, arriveforr, departforr)), date_part('year', coalesce(deliveredTime, departfromr, arriveforr, departforr))
            HAVING date_part('month', coalesce(deliveredtime, departfromr, arriveforr, departforr)) = $1
            AND date_part('year', coalesce(deliveredtime,departfromr, arriveforr, departforr)) = date_part('year', now());`, [monthSelected],
    (q_err, q_res) => {
    res.json(q_res.rows);
    })
})

manager.get('/api/get/RiderOrdersDelivered', (req, res, next) => {
const month = req.query.monthSelected;
let queryText = "";
if (req.query.riderType === "FT") {
    queryText = `SELECT name, count(*) AS numOrders from deliver JOIN deliverytime USING (orid) 
    JOIN users ON (rid = id) JOIN FTRiders F ON (F.rid=id)
    GROUP BY name, date_part('month', deliveredtime)
    HAVING date_part('month', deliveredtime) = $1
    ORDER BY name`
} else {
    queryText = `SELECT name, count(*) AS numOrders from deliver JOIN deliverytime USING (orid) 
    JOIN users ON (rid = id) JOIN PTRiders P ON (P.rid=id)
    GROUP BY name, date_part('month', deliveredtime)
    HAVING date_part('month', deliveredtime) = $1
    ORDER BY name`
}
pool.query(queryText, [month],
    (q_err, q_res) => {
        if (q_err) {
            return res.status(404).send({ message: "Rider's total orders delivered could not be found."});
        }
        console.log(q_res.rows)
        res.json(q_res.rows);
    })
})

manager.get('/api/get/getHoursWorked', (req, res, next) => {
    const month = req.query.monthSelected;
    let queryText = "";
    if (req.query.riderType === "FT") {
        queryText = `SELECT name, (count(*) * 40 * 4) AS Hour
        FROM mws JOIN users ON (rid=id)
        GROUP BY rid, name, whichMonth
        HAVING whichMonth = $1
        ORDER BY name `
    } else {
        queryText = `SELECT name, CASE
        WHEN (sum(DATE_PART('hour',(endT-startT)))) > 0 THEN (sum(DATE_PART('hour',(endT-startT))))
        ELSE 0
        END AS Hour
        FROM wws JOIN users ON (rid=id)
        GROUP BY rid, name, date_part('month', wDate)
        HAVING date_part('month', wDate) = $1
        ORDER BY name`
    }
      pool.query(queryText, [month],
                  
      (q_err, q_res) => {
        console.log("Hours Worked\n", q_res.rows);
        res.json(q_res.rows);  
      })
  })

manager.get('/api/get/getDeliveryFees', (req, res, next) => {
    const month = req.query.monthSelected;
    let queryText = "";
    if(req.query.riderType === "FT") {
        queryText = `SELECT name, CASE
        WHEN sum(fee) > 0 THEN sum(fee)
        ELSE 0
        END AS fee
        FROM Deliver JOIN DeliveryTime USING (orid) JOIN FTRiders F USING (rid) JOIN users ON (rid = id)
        GROUP BY rid, name, date_part('month', deliveredTime)
        HAVING date_part('month',deliveredTime) = $1
        ORDER BY name`
    } else {
        queryText = `SELECT name, CASE
        WHEN sum(d.fee) > 0 THEN sum(d.fee)
        ELSE 0
        END AS fee
        FROM Deliver d JOIN DeliveryTime dt USING (orid) JOIN PTRiders P ON (P.rid = d.rid) JOIN users ON (d.rid = id)
        GROUP BY d.rid, name, date_part('month', deliveredTime)
        HAVING date_part('month',deliveredTime) = $1
        ORDER BY name`
    }
    pool.query(queryText, [month],
    (q_err, q_res) => {
        console.log("Delivery Fees\n", q_res.rows);
        res.json(q_res.rows); 
    })
})  
module.exports = manager;