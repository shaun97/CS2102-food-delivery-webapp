-- fake data for schema.sql for everyone to have a commmon database

INSERT INTO Users
    (name, email, password)
VALUES
    ('Athene Stuffins', 'astuffins0@microsoft.com', 'iCtuba'),
    ('Darbee Hadwick', 'dhadwick1@amazon.de', 'T3BAJF8'),
    ('Hollyanne Shelton', 'hshelton2@behance.net', '2PrXOPzOClr'),
    ('Angele Oxborough', 'aoxborough3@netlog.com', '66EsfeREPmJk'),
    ('Franciskus Moffatt', 'fmoffatt4@sfgate.com', 'kBasfn'),
    ('Ruthie Nears', 'rnears5@fc2.com', 'ea7YdlIzyr'),
    ('Cart Esp', 'cesp6@wordpress.org', '7eZfcPkBu3T'),
    ('Mar Fincher', 'mfincher7@noaa.gov', '2VSS1NA'),
    ('Devondra Haresnape', 'dharesnape0@google.it', 'gPA8KFHY0zzC'),
    ('Wash Fish', 'wfish1@freewebs.com', 'P5Nt5P'),
    ('Bucky Maple', 'bmaple2@hhs.gov', 'duKrn9NB');

-- 4 customers: 1,4,6,7
INSERT INTO Customers
    (points, creditcard)
VALUES
    (4, 303179),
    (8, 401795),
    (4, 354067),
    (4, 355605);

-- 2 riders: 2,3
INSERT INTO Riders
    (totalOrders)
VALUES
    (2),
    (3);

INSERT INTO Restaurants
    (minOrder, rname, descript)
VALUES
    (20, 'Chinese Kitchen', 'Huangyingguangling'),
    (7, 'Song Feng Chicken', 'Lai Girl what you want'),
    (15, 'Naknoh Thai', 'sawaddekap'),
    (5, 'Nippi Place', 'ONE PLAIN PRATAAAA');

INSERT INTO Orders
    (cid, rname, cartCost, location, status)
VALUES
    (4, 'Chinese Kitchen', 24, 'Bukit Panjang', 'Completed'),
    (1, 'Song Feng Chicken', 9, 'Clementi', 'Completed'),
    (7, 'Nippi Place', 12, 'Chua Chu Kang', 'Completed'),
    (4, 'Chinese Kitchen', 24, 'Pasir Panjang', 'Completed'),
    (6, 'Naknoh Thai', 26, 'Kallang', 'Completed');

INSERT INTO Deliver
    (rid, fee, dstatus)
VALUES
    (2, 5, 'Rider has delivered your order.'),
    (3, 5, 'Rider has delivered your order.'),
    (2, 5, 'Rider has delivered your order.'),
    (3, 5, 'Rider has delivered your order.'),
    (3, 5, 'Rider has delivered your order.');

INSERT INTO DeliveryTime
    (departForR, arriveForR, departFromR, deliveredTime)
VALUES
    ('2020-03-20 10:23:54', '2020-03-20 10:30:03', '2020-03-20 10:32:50', '2020-03-20 10:40:24'),
    ('2020-03-20 13:13:54', '2020-03-20 13:20:03', '2020-03-20 13:22:50', '2020-03-20 13:30:24'),
    ('2020-03-20 18:23:54', '2020-03-20 18:30:03', '2020-03-20 18:32:50', '2020-03-20 18:40:24'),
    ('2020-03-21 12:24:54', '2020-03-21 12:32:03', '2020-03-21 12:34:50', '2020-03-21 12:43:24'),
    ('2020-03-21 19:25:54', '2020-03-21 19:31:03', '2020-03-21 19:36:50', '2020-03-21 19:46:24');

INSERT INTO OrderItems
    (fname, quantity)
VALUES
    ('Beef Horfun', 1),
    ('Tomato Noodle Soup', 2),
    ('Fried Rice', 1),
    ('Set A Chicken Wing', 1),
    ('Set B Fish', 2),
    ('Plain Prata', 4),
    ('Egg Prata', 2),
    ('Seafood Horfun', 2),
    ('Beef Horfun', 2),
    ('Pad Thai', 3),
    ('Thai Milk Tea', 3);

--INSERT INTO OrdersDeliveredBy (orid, rid, deliveredTime) VALUES
--(1, 2, '2020-03-20 10:40:24'),
--(2, 3, '2020-03-20 13:30:24'),
--(3, 2, '2020-03-20 18:40:24'),
--(4, 3, '2020-03-21 12:43:24'),
--(5, 3, '2020-03-21 19:46:24');

-- 5 Staffs: 5,8,9,10,11
INSERT INTO Staffs
    (rname)
VALUES
    ('Chinese Kitchen'),
    ('Song Feng Chicken'),
    ('Nippi Place'),
    ('Chinese Kitchen'),
    ('Naknoh Thai');

--as of 21 March
INSERT INTO Sells
    (rname, fname, sold, flimit, avail, category, price)
VALUES
    ('Chinese Kitchen', 'Beef Horfun', 2, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Seafood Horfun', 2, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Tomato Noodle Soup', 0, 10, true, 'Chinese', 6),
    ('Chinese Kitchen', 'Fried Rice', 0, 10, true, 'Chinese', 6),
    ('Song Feng Chicken', 'Set A Chicken Wing', 0, 20, true, 'Malay', 3),
    ('Song Feng Chicken', 'Set B Fish', 0, 20, true, 'Malay', 3),
    ('Nippi Place', 'Plain Prata', 0, 5, true, 'Indian', 2),
    ('Nippi Place', 'Egg Prata', 0, 5, true, 'Indian', 2),
    ('Naknoh Thai', 'Pad Thai', 3, 7, true, 'Thai', 5),
    ('Naknoh Thai', 'Thai Milk Tea', 3, 3, false, 'Thai', 3);

INSERT INTO Reviews
    (foodReview, deliveryRating)
VALUES
    ('Nice food!', 4),
    ('Not bad', 5),
    ('Horrible, I found a strand of hair', 4),
    ('Food reminds me of home', 5),
    ('Food was too bland', 3);

INSERT INTO FTRiders
    (rid)
VALUES
    (default);

INSERT INTO PTRiders
    (rid)
VALUES
    (default);

INSERT INTO WWS
    (wDay, whichMonth, Week, startT, endT)
VALUES
    ('Fri', 3, 3, '10:00:00', '13:00:00'),
    ('Fri', 3, 3, '16:00:00', '19:00:00');

INSERT INTO templateShift
    (Shift, Start1, End1, Start2, End2)
VALUES
    (1, 10, 2, 3, 7),
    (2, 11, 3, 4, 8),
    (3, 12, 4, 5, 9),
    (4, 1, 5, 6, 10);

INSERT INTO MWS
    (rid, whichMonth, startDay, Day1Shift, Day2Shift, Day3Shift, Day4Shift, Day5Shift)
VALUES
    (3, 3, 'Thursday', 1, 1, 2, 3 , 1);

INSERT INTO Salary
    (rid, deliveryFees, basePay)
VALUES
    (2, 6, 60),
    (3, 9, 300);

INSERT INTO allPromotions
    (startD, endD)
VALUES
    ('2020-03-23', '2020-03-26'),
    ('2020-03-23', '2020-03-24');

INSERT INTO RPromotions
    (pid, discount, rname, fname, startD, endD)
VALUES
    (1, 10, 'Chinese Kitchen', 'Beef Horfun', '2020-03-23', '2020-03-26');

INSERT INTO FDPromotions
    (pid, discount, startD, endD)
VALUES
    (2, 5, '2020-03-23', '2020-03-24');