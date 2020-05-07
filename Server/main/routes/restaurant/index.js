const restaurant = require('express').Router();
const pool = require('../../db');


/*
  RESTAURANT SECTION
*/

restaurant.get('/api/get/restaurantsfromdb', (req, res, next) => {
        pool.query(`
        WITH maincategory as (
                SELECT rname, category
                FROM Sells s
                GROUP BY (rname, category)
                HAVING COUNT(category) >= ANY (SELECT COUNT(category) 
                                                FROM Sells s1
                                                WHERE s1.rname = s.rname)
        )
        SELECT * FROM Restaurants NATURAL JOIN maincategory`,
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })
})

restaurant.get('/api/get/restaurantmenu', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(`SELECT fname, price, category, rname, avail, s.fdescript, flimit
                FROM Restaurants join Sells s using (rname)
                WHERE rname=$1`, [rname],
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })
})

restaurant.get('/api/get/gettherestaurantfromdb', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(` SELECT descript, minorder
                FROM Restaurants 
                WHERE rname=$1`, [rname],
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })

})

restaurant.get('/api/get/getrestreviews', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(`SELECT name, foodreview, deliveryrating 
        FROM restaurants NATURAL JOIN orders NATURAL JOIN reviews INNER JOIN users on users.id=orders.cid
        WHERE rname=$1
        ORDER BY orid DESC`, [rname],
                (q_err, q_res) => {
                        if (q_res != undefined) {
                                res.json(q_res.rows);
                        }
                })
})


module.exports = restaurant;