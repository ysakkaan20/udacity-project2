CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NULL,
    order_id bigint REFERENCES orders(id),
    product_id bigint NULL REFERENCES products(id)
);

