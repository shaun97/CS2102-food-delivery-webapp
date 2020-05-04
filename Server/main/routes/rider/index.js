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
  const month = req.query.monthSelected;
  //name to be replaced by actual login name
  pool.query(`SELECT orid
              FROM deliver JOIN deliverytime USING (orid) 
              JOIN users ON (rid = id)
              WHERE name = 'Hollyanne Shelton'
              GROUP BY name, date_part('month', deliveredtime), orid
              HAVING date_part('month', deliveredtime) = $1;`, [month],
  (q_err, q_res) => {
    if (q_err) {
      return res.status(404).send({ message: "Rider's total orders delivered could not be found."});
    }
    res.json(q_res.rows);
  })
})
  
rider.get('/api/get/getHoursWorked', (req, res, next) => {
  const month = req.query.monthSelected;
    pool.query(`SELECT (count(*) * 40 * 4) AS hours
                FROM FTRiders
                WHERE exists (
                  SELECT 1 
                  FROM MWS M
                  WHERE rid = M.rid
                  AND rid = '3'
                  AND whichMonth = $1
                );`, [month],
    (q_err, q_res) => {
      res.json(q_res.rows); 
    })
})

rider.get('/api/get/getSalary', (req, res, next) => {
  pool.query(`SELECT count(*) FROM Orders`,
  (q_err, q_res) => {
    res.json(q_res.rows); 
  })
})

  /*
  rider.get('/api/get/getHoursWorked', async (req, res) => {
      const client = await pool.connect();
      const month = req.query.monthSelected;
      let data = [];
      try {
          const queryFirst3Days = `WITH shifthour AS (
              SELECT shift, DATE_PART('hour', (end1-start1) + (end2-start2)) AS hour
              FROM templateshift
              )
              SELECT S.hour + S2.hour + S3.hour AS totalHours
              FROM mws JOIN users ON (rid = id) 
              JOIN shifthour S ON (day1shift = S.shift) 
              JOIN shifthour S2 ON (day2shift = S2.shift) 
              JOIN shifthour S3 ON (day3shift = S3.shift)
              WHERE whichMonth = $1;
              AND name = 'Hollyanne Shelton'`;
  
          const queryLast2Days = `WITH shifthour AS (
              SELECT shift, DATE_PART('hour', (end1-start1) + (end2-start2)) AS hour
              FROM templateshift
              )
              SELECT name, S4.hour + S5.hour AS totalHours
              FROM mws JOIN users ON (rid = id) 
              JOIN shifthour S4 ON (day2shift = S4.shift) 
              JOIN shifthour S5 ON (day5shift = S5.shift)
              WHERE whichMonth = $1;
              AND name = 'Hollyanne Shelton'`;
          const resp1 = await client.query(queryFirst3Days, [month]);
          const resp2 = await client.query(queryLast2Days, [month]);
          data.push(resp1.rows);
          data.push(resp2.rows);
          res.json(data);
          console.log(data);
      } catch(err) {
          res.status(404).send({ message: "Rider's total working hours could not be found."});
          console.log(err.stack);
          done();
      }
  })
  */

module.exports = rider;