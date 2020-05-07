--Function to get delivery cost based on the time
CREATE OR REPLACE FUNCTION getDeliveryCost
(OUT deliveryCost INTEGER) RETURNS INTEGER
    AS $$
SELECT CASE
        WHEN extract(hour from current_time) >= 17 THEN 7
        ELSE 5
    END
$$ LANGUAGE sql;


--Insert an order and return the orid to react to run insert order items
--Insert into deliver and deliver will have a trigger function to find a matching rider

CREATE OR REPLACE FUNCTION insertandscheduleorder
(id int, rname varchar
(255), cartcost integer, location varchar
(50), deliveryFee int, newPoints int) 
RETURNS INTEGER AS $$
--schedule here
DECLARE
    newOrid INT;
BEGIN
    INSERT INTO Orders
        (cid, rname, cartCost, location)
    VALUES
        (id, rname, cartcost, location)
    RETURNING orid INTO newOrid;

INSERT INTO Deliver(orid, fee) VALUES (newOrid, deliveryFee);

RETURN newOrid;
END
$$ language plpgsql;

