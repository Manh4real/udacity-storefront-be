# Storefront Backend Project

- **Environment variables**:

  - **POSTGRES_HOST**=127.0.0.1
  - **POSTGRES_PORT**=4000
  - **POSTGRES_DB**=storefront
  - **POSTGRES_USER**=storefront_user
  - **POSTGRES_PASSWORD**=storefront_db
  - **JWT_SECRET**=722e356fd4e51a265044b27803ec8bfc095f9fdf13abc68605f23eec9d172b26817c5488b151034123be15f79f287f9b

- To init project run: **npm i**
- To start project run: **npm run watch**
- Run migration: **npx db-migrate up**

- Pull Postgres image and run container with these env variables:
  **POSTGRES_HOST**=127.0.0.1
  **POSTGRES_PORT**=4000
  **POSTGRES_DB**=storefront
  **POSTGRES_USER**=storefront_user
  **POSTGRES_PASSWORD**=storefront_db

- The BE run on port 3000 and 4000 for the database

- **SCHEMAS**:

  - **products** (
    product_id serial primary key,
    name varchar(150),
    price float,
    category varchar(200)
    );

  - **users** (
    user_id serial primary key,
    firstName varchar(50),
    lastName varchar(50),
    password varchar(100)
    );

  - **orders** (
    order_id serial primary key,
    status varchar(20) DEFAULT 'active' CHECK(status = 'active' OR status = 'complete'),
    user_id serial references users(user_id)
    );

  - **order_products** (
    order_product_id serial primary key,
    order_id serial references orders(order_id),
    product_id serial references products(product_id),
    quantity int
    );

**!IMPORTANT**: Use /login with request body {firstName: 'admin', lastName: 'admin', password: '123456'} to authenticate

- **ROUTES**

  - **POST** /auth/login - Authenticate user - must use this request body first to authenticate: **{firstName: 'admin', lastName: 'admin', password: '123456'}**

  - **GET** /products - get all products
  - **GET** /products/:id - get product by id
  - **POST** /products - create new product

  - **GET** /users - get all users
  - **GET** /users/:id - get user by id
  - **POST** /users - create new user

  - **GET** /orders - get all orders of current user
  - **GET** /orders/:userId - get all orders of specified user
  - **GET** /orders/completed - get completed orders of current user
  - **GET** /orders/completed/:userId - get completed orders of specified user
  - **POST** /orders - create current user's order
  - **POST** /orders/:userId - create specified user's order
