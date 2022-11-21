CREATE TABLE users (
                       id serial PRIMARY KEY ,
                       name VARCHAR(100),
                       email VARCHAR(150),
                       create_at date,password CHAR(32)
);