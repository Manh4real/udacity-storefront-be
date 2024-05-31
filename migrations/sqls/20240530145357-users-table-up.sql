CREATE TABLE users (
    user_id serial primary key,
    firstName varchar(50),
    lastName varchar(50),
    password varchar(100)
);

INSERT INTO users (firstName, lastName, password) VALUES ('admin', 'admin', '123456');