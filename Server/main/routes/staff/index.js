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
      console.log(q_res.rows);
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
  console.log(req.body);
  const rname = req.body.rname;
  const fname = req.body.fname;
  const sold = 0;
  const flimit = req.body.flimit;
  const avail = true;
  const category = req.body.category;
  const price = req.body.price;
  pool.query(
    `INSERT INTO Sells (rname, fname, sold, flimit, avail, category, price)
              VALUES($1, $2, $3, $4, $5, $6, $7)
              ON CONFLICT (fname) DO UPDATE
              SET fname=$2, sold=$3, flimit=$4, avail=$5, category=$6, price=$7
              WHERE Sells.rname=$1`,
    [rname, fname, sold, flimit, avail, category, price],
    (q_err, q_res) => {
      console.log(q_err);
    }
  );
});

staff.get("/api/get/getTotalOrders", (req, res, next) => {
  const monthSelected = req.query.monthSelected;
  const rname = req.query.rname;
  pool.query(
    `SELECT orid, cartCost, fee
              FROM Orders join Deliver USING (orid)
              WHERE date_part('month', deliveredtime) = $1, rname = $2`,
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
    `SELECT orid, cartCost, fee
              FROM Orders join Deliver USING (orid)
              WHERE date_part('month', deliveredtime) = $1, rname = $2`,
    [monthSelected, rname],
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

module.exports = staff;
