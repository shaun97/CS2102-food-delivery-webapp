-- fake data for schema.sql for everyone to have a commmon database

INSERT INTO Users
    (name, email, password, date_signup)
VALUES
    ('Athene Stuffins', 'astuffins0@microsoft.com', 'iCtuba', '2020-02-01'),
    ('Darbee Hadwick', 'dhadwick1@amazon.de', 'T3BAJF8', '2020-02-01'),
    ('Hollyanne Shelton', 'hshelton2@behance.net', '2PrXOPzOClr', '2020-02-01'),
    ('Angele Oxborough', 'aoxborough3@netlog.com', '66EsfeREPmJk', '2020-02-01'),
    ('Franciskus Moffatt', 'fmoffatt4@sfgate.com', 'kBasfn', '2020-01-01'),
    ('Ruthie Nears', 'rnears5@fc2.com', 'ea7YdlIzyr', '2020-01-01'),
    ('Cart Esp', 'cesp6@wordpress.org', '7eZfcPkBu3T', '2020-01-01'),
    ('Mar Fincher', 'mfincher7@noaa.gov', '2VSS1NA', '2020-01-01'),
    ('Devondra Haresnape', 'dharesnape0@google.it', 'gPA8KFHY0zzC', '2020-01-01'),
    ('Wash Fish', 'wfish1@freewebs.com', 'P5Nt5P', '2020-04-01'),
    ('Bucky Maple', 'bmaple2@hhs.gov', 'duKrn9NB', '2020-04-01'),
    ('Nerea Rosa','magna@fringillaestMauris.edu','NXN89PWN5IY', '2020-04-01'),
    ('Dahlia Dodson','In.ornare.sagittis@semper.co.uk','DTC15WZS8SM', '2020-04-01'),
    ('Ulric Casey','Nam@temporestac.com','UHY04ZIA0BL', '2020-03-01'),
    ('Julie Ballard','fringilla@eumetus.org','BKJ77ION4WC', '2020-03-01'),
    ('Fiona Cooley','hendrerit.Donec@metuseuerat.co.uk','TDM29COZ8CX', '2020-03-01'),
    ('Ashton Carter','mollis.vitae@ac.net','LAS40RWN5UJ', '2020-04-01'),
    ('Levi Barber','massa.non@Curabiturdictum.edu','ATO66CZL6EN', '2020-04-01'),
    ('Caleb Brooks','iaculis@Donecfelisorci.com','JLT05ILN4MB', '2020-05-01'),
    ('Mark Perez','nibh.enim.gravida@velarcu.ca','NQR04WUD1HJ', '2020-05-01'),
    ('Jade Myers','velit@mollis.edu','HNQ80CSD7GZ', '2020-05-01'),
    ('Jin Wen', 'jinwenntay@gmail.com', 'abcde', '2020-01-01');

INSERT INTO Managers
    (mid)
VALUES
    (22);
-- 4 customers: 1,4,6,7,12,13,14,15
INSERT INTO Customers
    (cid, points, creditcard)
VALUES
    (1, 2, 303179),
    (4, 3, 401795),
    (6, 2, 354067),
    (7, 3, 355605),
    (12, 1, 352205),
    (13, 1, 310605),
    (14, 2, 489005),
    (15, 3, 235601);

-- 2 riders: 2,3,16,17,18
INSERT INTO Riders
    (rid, totalOrders)
VALUES
    (2, 2),
    (3, 3),
    (16, 4),
    (17, 3),
    (18, 5);

INSERT INTO Restaurants
    (minOrder, rname, descript)
VALUES
    (20, 'Chinese Kitchen', 'Huangyingguangling'),
    (7, 'Song Feng Chicken', 'Lai Girl what you want'),
    (15, 'Naknoh Thai', 'sawaddekap'),
    (5, 'Nippi Place', 'ONE PLAIN PRATAAAA'),
    (3, 'King Fried Chicken', 'Finger Licking Great');

--as of 21 March
INSERT INTO Sells
    (rname, fname, sold, flimit, avail, category, price)
VALUES
    ('Chinese Kitchen', 'Beef Horfun', 2, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Seafood Horfun', 2, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Tomato Noodle Soup', 0, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Fried Rice', 0, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Sweet and Sour Pork Rice', 0, 10, true, 'Chinese', 6),
    ('Song Feng Chicken', 'Set A Chicken Wing', 0, 20, true, 'Malay', 3),
    ('Song Feng Chicken', 'Set B Fish', 0, 20, true, 'Malay', 3),
    ('Song Feng Chicken', 'Set C Vege', 0, 20, true, 'Malay', 3),
    ('Nippi Place', 'Plain Prata', 0, 5, true, 'Indian', 2),
    ('Nippi Place', 'Egg Prata', 0, 5, true, 'Indian', 2),
    ('Nippi Place', 'Banana Prata', 0, 5, true, 'Indian', 2),
    ('Naknoh Thai', 'Pad Thai', 3, 7, true, 'Thai', 5),
    ('Naknoh Thai', 'Thai Milk Tea', 3, 3, false, 'Thai', 3),
    ('Naknoh Thai', 'Basil Pork Rice', 3, 3, false, 'Thai', 5);

INSERT INTO Orders
    (cid, rname, cartCost, location, ostatus)
VALUES
    (4, 'Chinese Kitchen', 24, 'Bukit Panjang', 'Completed'),
    (1, 'Song Feng Chicken', 9, 'Clementi', 'Completed'),
    (7, 'Nippi Place', 12, 'Chua Chu Kang', 'Completed'),
    (4, 'Chinese Kitchen', 24, 'Pasir Panjang', 'Completed'),
    (6, 'Naknoh Thai', 26, 'Kallang', 'Completed'),
    (1, 'Naknoh Thai', 15, 'Kallang', 'Completed'),
    (12, 'Naknoh Thai', 20, 'Toa Payoh', 'Completed'),
    (13, 'Chinese Kitchen', 24, 'Clementi', 'Completed'),
    (14, 'Song Feng Chicken', 15, 'Chua Chu Kang', 'Completed'),
    (15, 'Nippi Place', 8, 'Ang Mo Kio', 'Completed'),
    (12, 'Chinese Kitchen', 30, 'Toa Payoh', 'Completed'),
    (15, 'Nippi Place', 6, 'Ang Mo Kio', 'Completed')
    ;

INSERT INTO Deliver
    (orid, rid, fee, dstatus)
VALUES
    (1, 2, 5, 'Rider has delivered your order.'),
    (2, 3, 5, 'Rider has delivered your order.'),
    (3, 2, 5, 'Rider has delivered your order.'),
    (4, 3, 5, 'Rider has delivered your order.'),
    (5, 3, 5, 'Rider has delivered your order.'),
    (6, 2, 5, 'Rider has delivered your order.'),
    (7, 16, 5, 'Rider has delivered your order.'),
    (8, 17, 5, 'Rider has delivered your order.'),
    (9, 18, 5, 'Rider has delivered your order.'),
    (10, 18, 5, 'Rider has delivered your order.'),
    (11, 16, 5, 'Rider has delivered your order.'),
    (12, 16, 5, 'Rider has delivered your order.')
    ;

INSERT INTO DeliveryTime
    (orid, departForR, arriveForR, departFromR, deliveredTime)
VALUES
    (1, '2020-03-20 10:23:54', '2020-03-20 10:30:03', '2020-03-20 10:32:50', '2020-03-20 10:40:24'),
    (2, '2020-03-20 13:13:54', '2020-03-20 13:20:03', '2020-03-20 13:22:50', '2020-03-20 13:30:24'),
    (3, '2020-03-20 18:23:54', '2020-03-20 18:30:03', '2020-03-20 18:32:50', '2020-03-20 18:40:24'),
    (4, '2020-03-21 12:24:54', '2020-03-21 12:32:03', '2020-03-21 12:34:50', '2020-03-21 12:43:24'),
    (5, '2020-03-21 19:25:54', '2020-03-21 19:31:03', '2020-03-21 19:36:50', '2020-03-21 19:46:24'),
    (6, '2020-04-01 19:20:54', '2020-04-01 19:31:03', '2020-04-01 19:36:50', '2020-04-01 19:46:24'),
    (7, '2020-04-15 10:23:54', '2020-04-20 10:30:03', '2020-04-20 10:32:50', '2020-04-20 10:40:24'),
    (8, '2020-04-20 13:13:54', '2020-04-20 13:20:03', '2020-04-20 13:22:50', '2020-04-20 13:30:24'),
    (9, '2020-04-20 18:23:54', '2020-04-20 18:30:03', '2020-04-20 18:32:50', '2020-04-20 18:40:24'),
    (10, '2020-04-21 12:24:54', '2020-04-21 12:32:03', '2020-04-21 12:34:50', '2020-04-21 12:43:24'),
    (11, '2020-04-25 19:25:54', '2020-04-21 19:31:03', '2020-04-21 19:36:50', '2020-04-21 19:46:24'),
    (12, '2020-04-28 19:20:54', '2020-04-01 19:31:03', '2020-04-01 19:36:50', '2020-04-01 19:46:24');

INSERT INTO OrderItems
    (orid, fname, quantity)
VALUES
    (1, 'Beef Horfun', 1),
    (1, 'Tomato Noodle Soup', 2),
    (2, 'Fried Rice', 1),
    (2, 'Set A Chicken Wing', 1),
    (3, 'Set B Fish', 2),
    (3, 'Plain Prata', 4),
    (4, 'Egg Prata', 2),
    (4, 'Seafood Horfun', 2),
    (5, 'Beef Horfun', 2),
    (5, 'Pad Thai', 3),
    (5, 'Thai Milk Tea', 3),
    (6, 'Pad Thai', 2),
    (7, 'Basil Pork Rice', 2),
    (7, 'Pad Thai', 2),
    (8, 'Sweet and Sour Pork Rice', 1),
    (8, 'Tomato Noodle Soup', 1),
    (8, 'Seafood Horfun', 1),
    (8, 'Beef Horfun', 1),
    (9, 'Set A Chicken Wing', 2),
    (9, 'Set C Vege', 3),
    (10, 'Banana Prata', 2),
    (10, 'Egg Prata', 2),
    (11, 'Tomato Noodle Soup', 5),
    (12, 'Banana Prata', 1),
    (12, 'Plain Prata', 1),
    (12, 'Egg Prata', 1)
    ;

--INSERT INTO OrdersDeliveredBy (orid, rid, deliveredTime) VALUES
--(1, 2, '2020-03-20 10:40:24'),
--(2, 3, '2020-03-20 13:30:24'),
--(3, 2, '2020-03-20 18:40:24'),
--(4, 3, '2020-03-21 12:43:24'),
--(5, 3, '2020-03-21 19:46:24');

-- 5 Staffs: 5,8,9,10,11
INSERT INTO Staffs
    (rname, stid)
VALUES
    ('Chinese Kitchen', 5),
    ('Song Feng Chicken', 8),
    ('Nippi Place', 9),
    ('Chinese Kitchen', 10),
    ('Naknoh Thai', 11);

INSERT INTO Reviews
    (orid, foodReview, deliveryRating)
VALUES
    (1, 'Nice food!', 4),
    (2, 'Not bad', 5),
    (3, 'Horrible, I found a strand of hair', 4),
    (4, 'Food reminds me of home', 5),
    (5, 'Food was too bland', 3);

INSERT INTO FTRiders
    (rid)
VALUES
    (default);

INSERT INTO PTRiders
    (rid)
VALUES
    (default);

INSERT INTO WWS
    (rid, wDay, whichMonth, Week, startT, endT)
VALUES
    (2, 'Fri', 3, 3, '10:00:00', '13:00:00'),
    (17, 'Fri', 3, 3, '16:00:00', '19:00:00');

INSERT INTO templateShift
    (Shift, Start1, End1, Start2, End2)
VALUES
    (1, '10:00:00', '14:00:00', '15:00:00', '19:00:00'),
    (2, '11:00:00', '15:00:00', '16:00:00', '20:00:00'),
    (3, '12:00:00', '16:00:00', '17:00:00', '21:00:00'),
    (4, '13:00:00', '17:00:00', '18:00:00', '22:00:00');

INSERT INTO MWS
    (rid, whichMonth, startDay, startDate, Day1Shift, Day2Shift, Day3Shift, Day4Shift, Day5Shift)
VALUES
    (3, 3, 'Thursday', '2020-03-05', 1, 1, 2, 3, 1),
    (16, 3, 'Monday', '2020-03-02', 1, 1, 1, 1, 1 ),
    (17, 4, 'Wednesday', '2020-04-01', 1, 1, 1, 1, 1),
    (18, 4, 'Wednesday', '2020-04-01', 2, 2, 2, 2, 2),
    (3, 4, 'Thursday', '2020-04-02', 3, 3, 3, 3, 3),
    (16, 4, 'Friday', '2020-04-03', 4, 4, 4, 4, 4)
    ;

INSERT INTO Salary
    (rid, deliveryFees, basePay)
VALUES
    (2, 9, 60),
    (3, 9, 300),
    (16, 9, 300),
    (17, 3, 100),
    (18, 6, 100);

INSERT INTO allPromotions
    (promotiondescript, promoname, promotiontype, discount,startD, endD)
VALUES
    ('Stay home and stay safe, enjoy all these food at a discounted price! Enjoy an additional $10 off your cart items courtesy of MoodPanda!', 'Stay Home Promo', 'fixed', 10 ,'2020-03-23', '2020-05-26'),
    ('May the discounts be with you! Enjoy 50% off your cart items on MoodPanda! #StayHomeStaySafe', 'May the fourth', 'percentage', 50, '2020-03-23', '2020-05-24'),
    ('Chinese Kitchen onboarding promotion, feast on! Enjoy $2 off your food items', 'CK Promo', 'fixed', 2, '2020-05-01', '2020-05-24');

INSERT INTO RPromotions
    (pid, rname)
VALUES
    (3, 'Chinese Kitchen');

INSERT INTO FDPromotions
    (pid)
VALUES
    (1),
    (2);