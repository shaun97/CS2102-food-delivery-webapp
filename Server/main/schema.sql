CREATE TABLE Users
(
	id SERIAL UNIQUE PRIMARY KEY,
	name varchar(255) not null,
	email varchar(255) unique not null,
	password varchar(30) not null,
	date_signup DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Managers
(
	mid integer primary key,
	foreign key (mid) references Users(id)
	on delete cascade
);

CREATE TABLE Customers
(
	cid integer,
	points integer,
	creditCard integer,
	primary key (cid),
	foreign key (cid) references Users(id)
	on delete cascade
);

CREATE TABLE Riders
(
	rid integer,
	totalOrders integer,
	primary key (rid),
	foreign key (rid) references Users(id)
	on delete cascade
);

CREATE TABLE Restaurants
(
	minOrder integer,
	rname varchar(255) unique not null,
	descript varchar(255),
	address varchar(255),
	primary key (rname)
);

CREATE TABLE Orders
(
	orid SERIAL UNIQUE PRIMARY KEY,
	cid integer,
	rname varchar(255),
	cartCost integer,
	location varchar(50),
	ostatus o_status DEFAULT 'Ongoing',
	foreign key (rname) references Restaurants(rname)
	on delete cascade
);


CREATE TABLE Deliver
(
	orid integer unique,
	rid integer,
	fee integer DEFAULT 5,
	dstatus d_status DEFAULT 'Rider is departing for restaurant.',
	primary key (orid),
	foreign key (orid) references Orders(orid) on delete cascade,
	foreign key (rid) references Riders(rid) on delete cascade
);

CREATE TABLE DeliveryTime
(
	orid integer,
	departForR timestamp,
	arriveForR timestamp,
	departFromR timestamp,
	deliveredTime timestamp,
	primary key (orid),
	foreign key (orid) references Orders(orid) 
    on update cascade
	on delete cascade
);

CREATE TABLE Sells
(
	rname varchar not null,
	fname varchar unique not null,
	sold integer default 0,
	fdescript varchar(255),
	flimit integer,
	avail bool default true,
	category e_category not null,
	price integer,
	last_updated DATE DEFAULT CURRENT_DATE,
	primary key (rname, fname),
	foreign key (rname) references Restaurants (rname)
);

CREATE TABLE OrderItems
(
	orid integer,
	fname varchar,
	quantity integer not null,
	primary key(fname, orid),
	foreign key (orid) references Orders (orid)
	on delete cascade,
	foreign key (fname) references Sells (fname)
	on delete cascade
);

CREATE TABLE Staffs
(
	rname varchar(255),
	stid integer,
	foreign key (stid) references Users(id) on delete cascade,
	foreign key (rname) references Restaurants(rname) on delete cascade
);

CREATE TABLE Reviews
(
	orid integer,
	foodReview text,
	deliveryRating integer,
	primary key (orid),
	foreign key (orid) references Orders
	on delete cascade
);

CREATE TABLE FTRiders
(
	rid integer,
	foreign key (rid) references Riders(rid) on delete cascade
);

CREATE TABLE PTRiders
(
	rid integer,
	foreign key (rid) references Riders(rid) on delete cascade
);

CREATE TABLE WWS
(
	rid integer,
	wDate DATE,
	startT TIME,
	endT TIME,
	foreign key (rid) references Riders(rid)
	on delete cascade
);

--just to store the fixed shifts, must make sure shift duration dont exceed 4 hrs
CREATE TABLE templateShift
(
	Shift integer,
	Start1 TIME,
	End1 TIME,
	Start2 TIME,
	End2 TIME,
	primary key (Shift)
);

CREATE TABLE MWS
(
	rid integer,
	whichMonth integer,
	startDay DATE,
	Day1Shift integer references templateShift (shift) not null,
	Day2Shift integer references templateShift (shift) not null,
	Day3Shift integer references templateShift (shift) not null,
	Day4Shift integer references templateShift (shift) not null,
	Day5Shift integer references templateShift (shift) not null,
	foreign key (rid) references Riders on delete cascade,
	primary key (rid, whichMonth)
);

CREATE TABLE Salary
(
	rid integer,
	whichMonth integer,
	deliveryFees integer,--counted weekly for PT and monthly for FT
	basePay integer,
	primary key (rid, whichMonth),
	foreign key (rid) references Riders on delete cascade
);

CREATE TABLE allPromotions
(
	pid SERIAL UNIQUE PRIMARY KEY,
	promotiondescript varchar(255),
	promoname varchar(30),
	promotiontype p_type not null,
	discount integer,
	startD DATE,
	endD DATE
);

CREATE TABLE RPromotions
(
	pid integer primary key deferrable initially deferred,
	rname varchar(30),

	foreign key
	(pid) references allPromotions on
	delete cascade,
	foreign key (rname)
	references Restaurants on
	delete cascade
);

CREATE TABLE FDPromotions
(
	pid integer primary key,
	foreign key (pid) references allPromotions on delete cascade
);



