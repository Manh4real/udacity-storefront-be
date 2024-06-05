CREATE TABLE users (
    user_id serial primary key,
    firstName varchar(50),
    lastName varchar(50),
    password varchar(100)
);

INSERT INTO users (firstName, lastName, password) VALUES ('admin', 'admin', '$2a$10$Ny3LYwliSb/znlB/R/3Q7ejWcf/7F0aSbNj3Z1674yYDpaCcyDb3a');