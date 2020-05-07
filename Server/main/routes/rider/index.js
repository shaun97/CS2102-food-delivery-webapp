const rider = require('express').Router();
const pool = require('../../db');

/* 
  RIDER SECTION
*/

rider.get('/api/get/ordersfromdb', (req, res, next) => {
    pool.query(`SELECT * FROM Orders
                WHERE ostatus = 'Ongoing';`,
    (q_err, q_res) => {
      console.log(q_res.rows);
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
                  AND CAST(to_char(wDate, 'MM') as int) = $2)
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
                      WHEN EXISTS (SELECT 
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

rider.get('/api/get/getPastWeekSchedule', (req, res, next) => {
  const cid = req.query.cid;
  pool.query(`SELECT to_char(wDate,'Month') AS month, to_char(wDate, 'W') as week, to_char(wDate,'Day') as day, string_agg(to_char(startT, 'FMHH12pm'), ' / ') startT, string_agg(to_char(endT, 'FMHH12pm'),' / ') endT
              FROM WWS
              WHERE rid = $1
              GROUP BY (wDate)
              ORDER BY (wDATE) `, [cid],
    (q_err, q_res) => {
      res.json(q_res.rows);
    })
})



rider.get('/api/get/orderItems', (req, res, next) => {
  const orid = req.query.orid;
  pool.query(`SELECT fname, quantity
  FROM orderItems 
  WHERE orid=$1`, [orid],
  (q_err, q_res) => {
    res.json(q_res.rows);
  })
})

rider.get('/api/get/activeOrders', (req, res, next) => {
  const rid = req.query.rid;
  pool.query(`SELECT O.orid, rname, location, dstatus
  FROM orders O JOIN deliver USING (orid)
  WHERE dstatus <> 'Rider has delivered your order.'
  AND rid = $1`, [rid],
  (q_err, q_res) => {
    res.json(q_res.rows);
  })
})
rider.post('/api/posts/acceptOrder', (req, res, next) => {
  const rid = req.body.rid;
  const orid = req.body.orid;
  console.log(orid);
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN')
      // await client.query('SET CONSTRAINTS UNIQUE DEFERRED')
      await client.query(`UPDATE orders
      SET ostatus = 'Completed'
      WHERE orid = $1`, [orid])
      const deliverValues = [rid, orid];
      await client.query(`UPDATE deliver
      SET rid = $1
      WHERE orid = $2`, deliverValues)
      await client.query(`UPDATE deliveryTime
      SET departforr = date_trunc('second', NOW())
      WHERE orid = $1`, [orid])
      await client.query('COMMIT').then(res.send({ message: "Order Accepted!" }))
    } catch (e) {
      await client.query('ROLLBACK').then(res.send({ message: "Order has been taken by another rider"}))
      throw e
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
})

rider.post('/api/posts/deliveryStatus', (req, res, next) => {
  const status = req.body.status;
  console.log(status);
  let dstatus = '';
  let message = "";
  switch (status)  {
    case 0:
      dstatus = 'Rider has arrived at restaurant.'
      message = "Not completed"
      break;
    case 1:
      dstatus = 'Rider is departing from restaurant.'
      message = "Not completed"
      break;
    case 2:
      dstatus = 'Rider has delivered your order.'
      message = "Completed"
      break;
  }
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN')
      await client.query(`UPDATE deliver
      SET dstatus = $1
      WHERE orid = $2`, [ dstatus, req.body.orid])
      await client.query('COMMIT').then(res.send({ message: message}))
    } catch (e) {
      await client.query('ROLLBACK').then(res.send({ message: "Failure"}))
      throw e
    } finally {
      client.release();
    }
  })().catch(e => console.error(e.stack));
})

rider.post('/api/posts/insertWWSSchedule', (req, res, next) => {
  const rid = req.body.cid;
  const day = req.body.date;
  const shiftStart = req.body.shiftstart;
  const shiftEnd = req.body.shiftend;
  const temp = day.toString().concat(" days");
  console.log(temp);
  if (shiftStart > 0 && shiftEnd > 0) {
    pool.query(`INSERT INTO WWS(rid, wDate, startT, endT)
    VALUES($1,(CURRENT_DATE + INTERVAL '$2'),(TIME ’10:00:00’ + ($3-1) * INTERVAL ‘1 hour’),(TIME ’10:00:00’ + ($4-1) * INTERVAL ‘1 hour’))`,
      [rid, temp, shiftStart, shiftEnd],
      (q_err, q_res) => {
        console.log(q_err)
      })
  }

})


module.exports = rider;