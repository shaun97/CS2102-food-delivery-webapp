const restaurant = require('express').Router();
const pool = require('../../db');


/*
  RESTAURANT SECTION
*/

restaurant.get('/api/get/restaurantsfromdb', (req, res, next) => {
        pool.query(`SELECT * FROM Restaurants`,
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })
})

restaurant.get('/api/get/restaurantmenu', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(`SELECT fname, price, category, rname 
                FROM Restaurants join Sells using (rname)
                WHERE rname=$1`, [rname],
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })
})

restaurant.get('/api/get/gettherestaurantfromdb', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(`SELECT descript, minorder
                FROM Restaurants
                WHERE rname=$1`, [rname],
                (q_err, q_res) => {
                        res.json(q_res.rows);
                })

})



restaurant.get('/api/get/getrestreviews', (req, res, next) => {
        const rname = req.query.rname;
        pool.query(`SELECT foodreview, deliveryrating 
        FROM restaurants NATURAL JOIN orders NATURAL JOIN reviews
        WHERE rname=$1`, [rname],
                (q_err, q_res) => {
                        if (q_res != undefined) {
                                res.json(q_res.rows);
                        }
                })
})


module.exports = restaurant;