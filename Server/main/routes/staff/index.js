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

staff.get('/api/get/getpromo', (req, res, next) => {
  const rname = req.query.rname;
  pool.query(`SELECT promoname, ap.pid, discount, promotiondescript, promotiontype, TO_CHAR(startd, 'DD-MM-YYYY') as startd, TO_CHAR(endd, 'DD-MM-YYYY') as endd
  FROM allPromotions ap LEFT OUTER JOIN RPromotions rp ON ap.pid = rp.pid
  WHERE rname=$1`, [rname],
    (q_err, q_res) => {
      if (q_res == undefined) {
        res.json('');
      } else {
        res.json(q_res.rows);
      }
    })
});


staff.post("/api/posts/addNewPromo", (req, res, next) => {
  const pid = req.body.pid;
  const rname = req.body.rname;
  const promoname = req.body.promoname;
  const promotiontype = req.body.promotiontype;
  const discount = req.body.discount;
  const promotiondescript = req.body.promotiondescript;
  const startd = req.body.startd;
  const endd = req.body.endd;
  console.log(req.body);
  pool.query(
    `SELECT insertpromo($1, $2, $3, $4, $5, $6, $7, $8)`,
    [pid, rname, promoname, promotiontype, discount, promotiondescript, startd, endd],
    (q_err, q_res) => {
      if (q_res != undefined) {
        res.json(q_res.rows);
      } else {
        res.json('nok');
      }
    }
  );
});

staff.get("/api/get/getPromoSummary", (req, res, next) => {
  const rname = req.query.rname;
  pool.query(
    `WITH nooforders as (
      SELECT orid, rname, deliveredtime
      FROM orders NATURAL JOIN deliverytime
  )
  SELECT (now() BETWEEN startd AND endd) as status, promoname, promotiondescript, DIV(COALESCE((SELECT count(orid) 
                                                                                  FROM nooforders n
                                                                                  WHERE (n.deliveredtime BETWEEN ap.startd AND ap.endd) 
                                                                                  GROUP BY n.rname
                                                                                  HAVING $1 = n.rname),0),(endd - startd)) as totalorders,
  TO_CHAR(startd, 'DD-MM-YYYY') || ' - ' || TO_CHAR(endd, 'DD-MM-YYYY') as duration
  FROM allpromotions ap NATURAL JOIN rpromotions
  WHERE $1 = rpromotions.rname`,
    [rname],
    (q_err, q_res) => {
      console.log(q_err);
      if (q_res != undefined) {
        res.json(q_res.rows);
      } else {
        res.json('nok');
      }
    }
  );
});



module.exports = staff;
