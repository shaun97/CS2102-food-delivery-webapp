const staff = require("express").Router();
const pool = require("../../db");

/* 
  STAFF SECTION
*/

staff.get("/api/get/getRestaurant", (req, res, next) => {
  const stid = req.query.stid;
  pool.query(
    `SELECT rname 
              FROM Staffs
              WHERE stid = $1`,
    [stid],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

staff.get("/api/get/getRestaurantFood", (req, res, next) => {
  const rname = req.query.rname;
  pool.query(
    `SELECT *
        FROM Sells
        WHERE rname=$1`,
    [rname],
    (q_err, q_res) => {
      console.log(q_res.rows);
      res.json(q_res.rows);
    }
  );
});

staff.post("/api/posts/addNewFood", (req, res, next) => {
  const rname = req.body.rname;
  const fname = req.body.fname;
  const flimit = req.body.flimit;
  const category = req.body.category;
  const price = req.body.price;
  const fdescript = req.body.fdescript;
  pool.query(
    `INSERT INTO Sells(rname, fname, flimit, category, price, fdescript)
              VALUES($1, $2, $3, $4, $5, $6)
              ON CONFLICT (fname) DO UPDATE
              SET fname=$2, flimit=$3, category=$4, price=$5, fdescript=$6`,
    [rname, fname, flimit, category, price, fdescript],
    (q_err, q_res) => {
      if (q_res != undefined) {
        res.json(q_res.rows);
      } else {
        res.json('nok');
      }
    }
  );
});

staff.get("/api/get/getTotalOrders", (req, res, next) => {
  const monthSelected = req.query.monthSelected;
  const rname = req.query.rname;
  pool.query(
    `WITH ROrders as
      (SELECT orid, cartCost
        FROM Orders
        WHERE rname=$2),
      RDeliver as
      (SELECT orid, fee, deliveredtime
        FROM Deliver d JOIN DeliveryTime dt 
        USING (orid))

      SELECT COUNT(orid) 
      FROM ROrders RO JOIN RDeliver RD
      USING (orid)
      WHERE date_part('month', deliveredtime) = $1`,
    [monthSelected, rname],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

staff.get("/api/get/getTotalRevenue", (req, res, next) => {
  const monthSelected = req.query.monthSelected;
  const rname = req.query.rname;
  pool.query(
    `WITH ROrders as
      (SELECT orid, SUM(cartCost) as totalCost
        FROM Orders
        WHERE rname=$2
        GROUP BY orid),
      RDeliver as
      (SELECT orid, deliveredtime
        FROM Deliver d join DeliveryTime dt 
        USING (orid))

      SELECT 
      CASE 
        WHEN SUM(totalCost) IS NULL THEN 0
        ELSE SUM(totalCost) 
      END as totalCost
      FROM ROrders RO join RDeliver RD
      USING (orid)
      WHERE date_part('month', deliveredtime) = $1`,
    [monthSelected, rname],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});
staff.get("/api/get/getTop5Orders", (req, res, next) => {
  const monthSelected = req.query.monthSelected;
  const rname = req.query.rname;

  pool.query(
    `WITH 
    RLimit as
    (SELECT fname, flimit
      FROM Sells
      WHERE rname=$2),
    RDeliver as
    (SELECT orid, deliveredtime
      FROM Deliver join DeliveryTime
      USING (orid)),
    RSoldItems as
    (SELECT orid, fname, quantity, deliveredtime
      FROM OrderItems join RDeliver
      USING (orid))
      
    SELECT fname, SUM(quantity) as amount
    FROM RLimit join RSoldItems
    USING (fname)
    WHERE date_part('month', deliveredtime)=$1
    GROUP BY fname
    ORDER BY amount desc
    limit 5`,
    [monthSelected, rname],
    (q_err, q_res) => {
     res.json(q_res.rows);
    }
  );
});

module.exports = staff;
