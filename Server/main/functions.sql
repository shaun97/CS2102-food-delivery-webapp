-- create or replace function GetCost
-- (promoCode text, totalFoodCost integer, out deliveryCost integer, out subtotal integer) 
-- returns record as $$

--     select (deliverFoodCost * discount) as subtotal, case
--         when extract(hour from current_time) >= 20 then 5
--         else 3
--     end as deliveryCost
--     from 


--Function to get delivery cost based on the time
CREATE OR REPLACE FUNCTION getDeliveryCost
(OUT deliveryCost INTEGER) RETURNS INTEGER
    AS $$
SELECT CASE
        WHEN extract(hour from current_time) >= 18 THEN 7
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

--Insert into all promotion and rpromotion
CREATE OR REPLACE FUNCTION insertpromo
(pid1 int, rname1 varchar
(255), promoname1 varchar(30), promotiontype1 p_type , discount1 integer, promotiondescript1 varchar(255), startd2 varchar(255), endd2 varchar(255)) 
RETURNS VOID AS $$

DECLARE 
startd1 DATE;
endd1 DATE;
temp_pid INT;

BEGIN 
SELECT TO_DATE(startd2, 'DD/MM/YYYY') INTO startd1;
SELECT TO_DATE(endd2, 'DD/MM/YYYY') INTO endd1;

IF pid1 = 0 THEN
    INSERT INTO allPromotions(promotiondescript, promoname, promotiontype, discount, startd, endd)
              VALUES(promotiondescript1, promoname1, promotiontype1, discount1, startd1, endd1) 
                RETURNING pid INTO temp_pid;

    INSERT INTO rpromotions(rname, pid) VALUES (rname1, temp_pid);          
END IF;
IF pid1 <> 0 THEN
    INSERT INTO allpromotions(pid, promotiondescript, promoname, promotiontype, discount, startd, endd)
              VALUES(pid1, promotiondescript1, promoname1, promotiontype1, discount1, startd1, endd1)
              ON CONFLICT (pid) DO UPDATE
              SET promotiondescript=promotiondescript1, promoname=promoname1, promotiontype=promotiontype1, discount=discount1, startd=startd1, endd=endd1;
END IF;
END 
$$ language plpgsql;