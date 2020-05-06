--Trigger to check the min order and return and exception if not hit
CREATE OR REPLACE FUNCTION check_min_order
() RETURNS TRIGGER AS $$
DECLARE
    minorder INT;
BEGIN
    SELECT R.minOrder
    INTO minorder
    FROM RESTAURANTS R
    WHERE R.rname = NEW.rname;
    IF NEW.cartCost < minOrder THEN
            RAISE EXCEPTION 'Order did not hit min order';
--RETURN NULL;
END
IF;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_min_order_trigger
ON Orders;
CREATE TRIGGER check_min_order_trigger
    BEFORE
UPDATE OR INSERT
    ON ORDERS
    FOR EACH ROW
EXECUTE FUNCTION check_min_order
();

CREATE OR REPLACE FUNCTION insert_new_delivery_time
() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO DeliveryTime(orid)
    VALUES (NEW.orid);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS insert_new_delivery_time_trigger
ON deliver;
CREATE TRIGGER insert_new_delivery_time_trigger
    AFTER
    INSERT
    ON deliver
    FOR EACH ROW
EXECUTE FUNCTION insert_new_delivery_time
();
-- Trigger to update quantity in sells
CREATE OR REPLACE FUNCTION update_food_qty
() RETURNS TRIGGER AS $$
BEGIN
    UPDATE Sells s
    SET sold = sold + NEW.quantity
    WHERE s.fname = NEW.fname AND 
    s.rname = (SELECT rname FROM Orders o WHERE o.orid = NEW.orid);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_food_qty_trigger
ON orderItems;
CREATE TRIGGER update_food_qty_trigger
    BEFORE
UPDATE OR INSERT
    ON OrderItems
    FOR EACH ROW
EXECUTE FUNCTION update_food_qty
();

-- Trigger to check food quantity in sells
CREATE OR REPLACE FUNCTION check_food_qty
() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sold > NEW.flimit THEN
    -- Supposed to delete order that do not have any orderitems(when all sold out) .. shoul use transactions? to run all tog but i cant pass an array in, idk how
        -- IF !(SELECT 1 FROM Orders NATURAL JOIN orderitems WHERE NEW.orid = orid) THEN
        --     DELETE FROM Orders WHERE NEW.orid = orid;
        -- END IF;
        RAISE EXCEPTION 'Food limit hit';
    END IF;
    IF NEW.sold = NEW.flimit THEN 
        RAISE NOTICE USING MESSAGE = NEW;
        NEW.avail = FALSE;
    END IF;
    IF NEW.sold < NEW.flimit THEN 
        NEW.avail = TRUE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_food_qty_trigger
ON Sells;
CREATE TRIGGER check_food_qty_trigger
    BEFORE
UPDATE OR INSERT
    ON Sells
    FOR EACH ROW
EXECUTE FUNCTION check_food_qty
();


