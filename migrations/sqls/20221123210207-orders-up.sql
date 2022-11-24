CREATE TABLE orders(
    id serial PRIMARY KEY,
        status boolean,
    user_id bigint REFERENCES users(id)


)