--need to copy paste to database or \i schema.sql

--resetting the tables
drop table if exists Users cascade;
drop table if exists Customers cascade;
drop table if exists Orders cascade;

drop table if exists Deliver cascade;
drop table if exists DeliveryTime cascade;

drop table if exists OrderItems cascade;
drop table if exists OrdersDeliveredBy cascade;

drop table if exists Riders cascade;
drop table if exists FTRiders cascade;
drop table if exists PTRiders cascade;
drop table if exists WWS cascade;
drop table if exists MWS cascade;
drop table if exists templateShift cascade;
drop table if exists Salary cascade;

drop table if exists Restaurants cascade;
drop table if exists Sells cascade;
drop table if exists Staffs cascade;
drop table if exists Reviews cascade;

drop table if exists RPromotions cascade;
drop table if exists FDPromotions cascade;

--reset the types
drop type o_status;
drop type d_status;
drop type e_category;

CREATE TABLE Users (
    id SERIAL UNIQUE PRIMARY KEY,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(30) not null
);

--INSERT into Users(Customer);

CREATE TABLE Customers (
	cid integer,
	points integer,
	creditCard integer,
	primary key (cid),
    foreign key (cid) references Users(id)
	on delete cascade
);

CREATE TABLE Riders (
	rid integer,
	available bool default true,
    totalOrders integer, -- do  we need? Maybe aggregate
	primary key (rid),
	foreign key (rid) references Users(id)
	on delete cascade
);

CREATE TYPE o_status AS ENUM (
    'Ongoing', 
    'Completed'
);

CREATE TABLE Restaurants (
	minOrder integer, -- use trigger to check in order??
	rname varchar(255) unique not null,
    primary key (rname)
);

CREATE TABLE Orders (
	oid serial unique primary key,
	cid integer,
	rname text,
	cartCost integer, --generate in query
	location varchar(50),
	status o_status,
	foreign key (rname) references Restaurants(rname)
	on delete cascade
); --check min order from restaurants

CREATE TYPE d_status AS ENUM (
    'Rider is departing for restaurant.',
    'Rider has arrived at restaurant.',
    'Rider is departing from restaurant.',
    'Rider has delivered your order.'
);

CREATE TABLE Deliver (
	oid integer unique,
	rid integer unique,
	clocation varchar(50),
	fee integer,
	rname text,
	status d_status, --use trigger function to update status based on deliveryTime
	primary key (oid),
	foreign key (oid) references Orders(oid) on delete cascade,
    foreign key (rid) references Riders(rid) on delete cascade
);

CREATE TABLE DeliveryTime (
	oid integer unique,
	departForR timestamp,
	arriveForR timestamp,
	departFromR timestamp,
	deliveredTime timestamp unique,
    primary key (oid),
	foreign key (oid) references Orders(oid) 
    on update cascade
	on delete cascade
);

CREATE TABLE OrderItems ( -- for restaurant staffs to refer to 
	oid integer,
	foodItem text,
	quantity integer,
	foreign key (oid) references Orders (oid)
	on delete cascade
);

CREATE TABLE OrdersDeliveredBy (
	oid integer,
    rid integer,
    deliveredTime timestamp,
    primary key (rid),
    foreign key (oid) references Deliver(oid),
    foreign key (rid) references Deliver(rid),
    foreign key (deliveredTime) references DeliveryTime(deliveredTime)
); --getting updates from deliver and deliverytime

CREATE TABLE Staffs (
	rname varchar(255),
	sid integer,
	foreign key (sid) references Users(id) on delete cascade,
	foreign key (rname) references Restaurants(rname) on delete cascade
);

CREATE TYPE e_category AS ENUM (
    'Western', 
    'Chinese',
    'Malay',
    'Japanese',
    'Korean'
);

CREATE TABLE Sells (
	rname varchar unique not null,
	fname varchar unique not null,
	sold integer default 0, --trigger based on time reset daily
	flimit integer,
	avail bool, --use trigger here based on limit-sold
	category e_category,  
	price integer,
    primary key (rname, fname)
);

CREATE TABLE Reviews (
	oid integer,
	foodReview text,
	deliveryRating integer,
	primary key (oid),
	foreign key (oid) references Orders
	on delete cascade
);

CREATE TABLE FTRiders (
	rid integer,
	foreign key (rid) references Riders(rid) on delete cascade
); --for monthly fees, count delivery + fixed monthly pay

CREATE TABLE PTRiders (
	rid integer,
	foreign key (rid) references Riders(rid) on delete cascade
);

--standardise the way we count the week and days?
--stores all working times of each rider
CREATE TABLE WWS (
	rid integer,
	day text, --mon/tues/wed/thur
	Week text,
	startT TIME,
	endT TIME,
	foreign key (rid) references Riders(rid)
	on delete cascade
);

--just to store the fixed shifts, must make sure shift duration dont exceed 4 hrs
CREATE TABLE templateShift (
	Shift integer, 
	Start1 integer, 
	End1 integer,
	Start2 integer,
	End2 integer,
    primary key (Shift)
);

CREATE TABLE MWS ( --Will update schedule based on the shift 
	rid integer,
	whichMonth text,
	startDay text, --mon
	Day1Shift integer references templateShift (shift), --which shift
	Day2Shift integer references templateShift (shift), 
	Day3Shift integer references templateShift (shift), 
	Day4Shift integer references templateShift (shift), 
	Day5Shift integer references templateShift (shift)
);

CREATE TABLE Salary (
	Rid integer,
	deliveryFees integer,
	basePay integer,
	foreign key (rid) references Riders on delete cascade
);


--CREATE TABLE Promotions (
--	pid integer primary key,
--	promoName varchar(30),
--	start DATE,
--	end DATE
--);

CREATE TABLE RPromotions ( --restaurants may offer promotional prices for menu items
	pid integer primary key,	
    discount integer,
	rname varchar(30),
	fname varchar(30),
	startD DATE,
	endD DATE,
--	foreign key (pid, startD, endD) references Promotions,
	foreign key (rname) references Restaurants
	on delete cascade,
	foreign key (fname) references Sells(fname)
	on delete cascade
);

CREATE TABLE FDPromotions (
	pid integer primary key,
	discount integer,
	startD DATE,
	endD DATE
--	foreign key (pid, startD, endD) references Promotions
);

-- insert test data into users

INSERT INTO Users 
VALUES (1,'Alice','ghost@gmail.com',1);

INSERT INTO Users 
VALUES (2,'Rob','sost@gmail.com',2);
