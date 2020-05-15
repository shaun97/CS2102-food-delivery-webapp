const customer = require('express').Router();
const pool = require('../../db');

customer.get('/api/get/getdeliverycost', (req, res, next) => {
    pool.query(`SELECT getDeliveryCost()`,
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})

customer.get('/api/get/getorderhistory', (req, res, next) => {
    const cid = req.query.cid;
    pool.query(`SELECT rname, orid, cartCost, fee as deliveryCost, TO_CHAR(deliveredTime, 'dd/mm/yy hh:mm') as deliveredtime, location, deliver.dstatus 
    FROM Deliver NATURAL JOIN Orders NATURAL JOIN DeliveryTime
    WHERE cid=$1
    ORDER BY orid DESC
    LIMIT 5`, [cid],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })

})

customer.get('/api/get/getaddresshistory', (req, res, next) => {
    const cid = req.query.cid;
    pool.query(`SELECT location
    FROM Deliver NATURAL JOIN Orders
    WHERE cid=$1
    ORDER BY orid DESC
    LIMIT 5`, [cid],
        (q_err, q_res) => {
            if (q_res == undefined) {
                res.json("")
            } else {
                res.json(q_res.rows);
            }
        })
})

customer.get('/api/get/getccnumberandpts', (req, res, next) => {
    const cid = req.query.cid;
    pool.query(`SELECT creditcard, points
    FROM customers
    WHERE cid=$1`, [cid],
        (q_err, q_res) => {
            if (q_res.rows == undefined) {
                console.log(q_err);
                res.json("")
            } else {
                res.json(q_res.rows);
            }
        })

})

customer.get('/api/get/getorderitems', (req, res, next) => {
    const orid = req.query.orid;
    pool.query(`SELECT fname, quantity 
    FROM orderitems WHERE orid=$1`, [orid],
        (q_err, q_res) => {
            res.json(q_res.rows);
        })
})

customer.get('/api/get/getpromo', (req, res, next) => {
    const rname = req.query.rname;
    pool.query(`SELECT promoname, rname, ap.pid, discount, promotiondescript, promotiontype
    FROM allPromotions ap LEFT OUTER JOIN RPromotions rp ON ap.pid = rp.pid 
    LEFT OUTER JOIN FDPromotions fp ON ap.pid = fp.pid
    WHERE (rname=$1 OR rname ISNULL) 
    AND now() between startD and endD`, [rname],
        (q_err, q_res) => {
            if (q_res == undefined) {
                res.json('');
            } else {
                res.json(q_res.rows);
            }
        })
})

customer.post('/api/posts/postreview', (req, res, next) => {
    const foodReview = req.body.foodReview;
    const deliveryRating = req.body.deliveryRating;
    const orid = req.body.orid;
    pool.query(`INSERT INTO Reviews(orid, foodreview, deliveryrating)
                VALUES($1, $2, $3)
                ON CONFLICT (orid) DO UPDATE
                SET foodreview=$2, deliveryrating=$3`, [orid, foodReview, deliveryRating],
        (q_err, q_res) => {
        })
})

customer.post('/api/posts/insertorder', (req, res, next) => {
    const cid = req.body.cid;
    const rname = req.body.rname;
    const cartcost = req.body.cartcost;
    const location = req.body.location;
    const deliverycost = req.body.deliverycost;
    const points = req.body.points;
    pool.query(`SELECT insertandscheduleorder($1, $2, $3, $4, $5, $6)`, [cid, rname, cartcost, location, deliverycost, points],
        (q_err, q_res) => {
            if (q_res == undefined) {
                console.log(q_err);
                res.json("MinOrder Failed")
            } else {
                res.json(q_res.rows);
            }
        })
})

customer.post('/api/posts/insertorderitem', (req, res, next) => {
    const orid = req.body.orid;
    const fname = req.body.fname;
    const quantity = req.body.quantity;

    pool.query(`INSERT INTO orderitems(orid, fname, quantity)
                VALUES($1, $2, $3)`, [orid, fname, quantity],
        (q_err, q_res) => {
            if(q_res == undefined) {
                res.json("soldout")
            } else {
                res.json("ok")
            }
        })
})

module.exports = customer;

