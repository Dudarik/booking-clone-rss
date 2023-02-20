create table users (
	uid serial primary key,
	email text unique not null,
	password text not null,
	username text,
	role text default 'user' not null
);

create table restaurants (
  rid serial primary key,
  title text not null,
  address text not null
);

create table comments (
  id serial primary key,
  restaurantId int references restaurants(rid),
  userId int references users(uid), -- ON DELETE SET NULL ON UPDATE CASCADE
  commentTitle text,
  commentBody text
);

create table tables (
  tid serial primary key,
  restaurantId int references restaurants(rid),
  tableName text,
);

create table busyTables (
  id serial primary key,
  tableId int references tables(tid),
  restaurantId int references restaurants(rid),
  userId int references users(uid),
  timeStart timestamp,
  timeEnd timestamp
);


INSERT INTO users (email, password, username, role) VALUES ('alex@mail.ru', '111', 'Александр', 'admin');


