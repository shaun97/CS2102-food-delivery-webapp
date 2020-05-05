-- create or replace function GetCost
-- (promoCode text, totalFoodCost integer, out deliveryCost integer, out subtotal integer) 
-- returns record as $$

--     select (deliverFoodCost * discount) as subtotal, case
--         when extract(hour from current_time) >= 20 then 5
--         else 3
--     end as deliveryCost
--     from 


--Function to get delivery cost based on the time
CREATE OR REPLACE FUNCTION getDeliveryCost (OUT deliveryCost INTEGER) RETURNS INTEGER
    AS $$
SELECT CASE
        WHEN extract(hour from current_time) >= 17 THEN 5
        ELSE 3
    END
$$ LANGUAGE sql;


--Insert an order and return the orid to react to run insert order items
--Insert into deliver and deliver will have a trigger function to find a matching rider

CREATE OR REPLACE FUNCTION insertandscheduleorder(cid int, rname varchar(255), cartcost integer, location varchar(50), deliveryFee int) 
RETURNS INTEGER AS $$
--schedule here
DECLARE
    newOrid INT;
BEGIN 
    INSERT INTO Orders(cid, rname, cartCost, location) VALUES (cid, rname, cartcost, location) 
    RETURNING orid INTO newOrid;
    INSERT INTO Deliver(orid, fee) VALUES (newOrid, deliveryFee);

    return newOrid;
END
$$ language plpgsql;

