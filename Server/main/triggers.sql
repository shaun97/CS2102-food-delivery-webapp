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