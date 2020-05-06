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

rider.get('/api/get/getRiderStatus', (req, res, next) => {
  const cid = req.query.cid;
  pool.query(`SELECT CASE
                      WHEN EXISTS (SELECT 1
                                    FROM FTRiders m
                                    WHERE m.rid = $1) THEN 1
                      ELSE 0
                      END AS ft
              FROM FTRiders`, [cid],
  (q_err, q_res) => {
    console.log(q_res.rows);
    res.json(q_res.rows); 
  })
})

rider.get('/api/get/getPastMonthSchedule', (req, res, next) => {
  const cid = req.query.cid;
  pool.query(`SELECT to_char(to_timestamp (whichMonth::text, 'MM'), 'Month') AS month, startDay, Day1Shift, Day2Shift, Day3Shift, Day4Shift, Day5Shift
              FROM MWS
              WHERE rid = $1
              ORDER BY whichMonth`, [cid],
    (q_err, q_res) => {
      res.json(q_res.rows);
    })
})

rider.post('/api/posts/insertMWSSchedule', (req,res,next) => {
  const rid = req.body.cid;
  const whichMonth = req.body.month;
  const startDay = req.body.startDay;
  const Day1Shift = req.body.day1shift;
  const Day2Shift = req.body.day2shift;
  const Day3Shift = req.body.day3shift;
  const Day4Shift = req.body.day4shift;
  const Day5Shift = req.body.day5shift;
  pool.query(`INSERT INTO MWS(rid, whichMonth, startDay, Day1Shift, Day2Shift, Day3Shift, Day4Shift, Day5Shift)
              VALUES($1,$2,$3,$4,$5,$6,$7,$8)
              ON CONFLICT (rid, whichMonth) DO UPDATE
              SET startDay=$3, Day1Shift=$4, Day2Shift=$5, Day3Shift=$6, Day4Shift=$7, Day5Shift=$8`,
              [rid, whichMonth, startDay, Day1Shift, Day2Shift, Day3Shift, Day4Shift, Day5Shift],
      (q_err, q_res) => {
        console.log(q_res.rows)
  })
})


module.exports = rider;