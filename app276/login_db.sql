create database login_db;

use login_db;

create table users (
	id int auto_increment primary key,
    username varchar(50) not null,
    password varchar(200) not null
);

insert into users (username, password) values ('admin', '123456');
insert into users (username, password) values ('luane', '123456');
