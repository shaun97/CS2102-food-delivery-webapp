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

rider.get('/api/get/getOrdersDelivered', (req, res, next) => {
  const cid = req.query.cid;
  const month = req.query.monthSelected;
  pool.query(`SELECT orid
              FROM deliver JOIN deliverytime USING (orid) 
              JOIN users ON (rid = id)
              WHERE rid = $1
              GROUP BY name, date_part('month', deliveredtime), orid
              HAVING date_part('month', deliveredtime) = $2;`, [cid, month],
  (q_err, q_res) => {
    console.log(q_res.rows);
    if (q_err) {
      return res.status(404).send({ message: "Rider's total orders delivered could not be found."});
    }
    res.json(q_res.rows);
  })
})
  
rider.get('/api/get/getHoursWorked', (req, res, next) => {
  const month = req.query.monthSelected;
  const cid = req.query.cid;

    pool.query(`WITH FTHour(hour) as
                  (SELECT (count(*) * 40 * 4) AS Hour
                  FROM MWS
                  WHERE rid = $1
                  AND whichMonth = $2),
                  PTHour(hour) as
                  (SELECT CASE
                    WHEN (sum(DATE_PART('hour',(endT-startT)))) > 0 THEN (sum(DATE_PART('hour',(endT-startT))))
                    ELSE 0
                    END AS Hour
                  from WWS
                  WHERE rid = $1
                  AND whichMonth = $2)
                SELECT CASE
                  WHEN f.hour > p.hour THEN f.hour
                  ELSE p.hour
                  END AS hours
                FROM FTHour f ,PTHour p`, [cid, month],
                
    (q_err, q_res) => {
      console.log(q_res.rows);
      res.json(q_res.rows);
      
    })
})

rider.get('/api/get/getDeliveryFees', (req, res, next) => {
  const month = req.query.monthSelected;
  const cid = req.query.cid;
  pool.query(`SELECT CASE
                      WHEN sum(d.fee) > 0 THEN sum(d.fee)
                      ELSE 0
                      END AS fee,
                      CASE 
                      WHEN EXISTS (SELECT 1
                                    FROM FTRiders m
                                    WHERE m.rid = $1) THEN 1
                      ELSE 0
                      END AS ft
              FROM Deliver d join DeliveryTime dt using (orid)
              WHERE d.rid = $1
              AND date_part('month',deliveredTime) = $2`, [cid,month],
  (q_err, q_res) => {
    console.log(q_res.rows);
    res.json(q_res.rows); 
  })
})


module.exports = rider;