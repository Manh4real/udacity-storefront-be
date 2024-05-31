CREATE TABLE order_products (
    order_product_id serial primary key,
    order_id serial references orders(order_id),
    product_id serial references products(product_id),
    quantity int
);