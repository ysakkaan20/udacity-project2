CREATE TABLE orders(
    id serial PRIMARY KEY,
     status BOOLEAN DEFAULT FALSE,
    user_id bigint REFERENCES users(id)


)