CREATE TABLE orders (
    order_id serial primary key,
    status varchar(20) DEFAULT 'active' CHECK(status = 'active' OR status = 'complete'),
    user_id serial references users(user_id)
);