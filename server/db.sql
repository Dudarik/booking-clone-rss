create table users (
	uid serial primary key,
	email text unique not null,
	password text not null,
	username text,
  phonenumber text,
	role text default 'user' not null,
  isactive boolean default true
);

create table tokens (
  id serial primary key,
  uid int references users(uid),
  refreshtoken text not null
);

create table restaurants (
  rid serial primary key,
  title text not null,
  address text not null,
  isactive boolean default true
);

create table comments (
  id serial primary key,
  rid int references restaurants(rid),
  uid int references users(uid), -- ON DELETE SET NULL ON UPDATE CASCADE
  title text,
  body text
);

create table tables (
  tid serial primary key,
  rid int references restaurants(rid),
  tableName text
);

create table busyTables (
  id serial primary key,
  tid int references tables(tid),
  rid int references restaurants(rid),
  uid int references users(uid),
  timeStart timestamp,
  timeEnd timestamp
);

INSERT INTO restaurants (title, address) VALUES ('First restaurant', '1Test address 1');
INSERT INTO restaurants (title, address) VALUES ('Second restaurant', '2Test address 2');
INSERT INTO restaurants (title, address) VALUES ('Third restaurant', '3Test address 3');

INSERT INTO tables (rid,tablename) VALUES (1, '1');
INSERT INTO tables (rid,tablename) VALUES (1, '2');
INSERT INTO tables (rid,tablename) VALUES (1, '3');
INSERT INTO tables (rid,tablename) VALUES (1, '4');
INSERT INTO tables (rid,tablename) VALUES (1, '5');
INSERT INTO tables (rid,tablename) VALUES (1, '6');

INSERT INTO tables (rid,tablename) VALUES (2, '1');
INSERT INTO tables (rid,tablename) VALUES (2, '2');
INSERT INTO tables (rid,tablename) VALUES (2, '3');
INSERT INTO tables (rid,tablename) VALUES (2, '4');
INSERT INTO tables (rid,tablename) VALUES (2, '5');
INSERT INTO tables (rid,tablename) VALUES (2, '6');
INSERT INTO tables (rid,tablename) VALUES (2, '7');
INSERT INTO tables (rid,tablename) VALUES (2, '8');

INSERT INTO tables (rid,tablename) VALUES (3, '1');
INSERT INTO tables (rid,tablename) VALUES (3, '2');
INSERT INTO tables (rid,tablename) VALUES (3, '3');
INSERT INTO tables (rid,tablename) VALUES (3, '4');
INSERT INTO tables (rid,tablename) VALUES (3, '5');







