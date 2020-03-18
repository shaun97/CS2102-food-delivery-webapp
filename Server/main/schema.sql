CREATE TABLE customers (
    cid SERIAL PRIMARY KEY,
    cpassword VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    cname VARCHAR(255)
);

CREATE TABLE riders (
    rid SERIAL PRIMARY KEY,
    rpassword VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    rname VARCHAR(255),
    totalHours INTEGER DEFAULT 0,
    numOrder INTEGER DEFAULT 0,
    totalSalary INTEGER DEFAULT 0
);