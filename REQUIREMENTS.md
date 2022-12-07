# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be
able to browse an index of all products, see the specifics of a single product, and add products to an order that they
can view in a cart page. You have been tasked with building the API that will support this application, and your
coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as
well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index /get: 0.0.0.0:3000
- Show (args: product id) /get: 0.0.0.0:3000/products/id
- Create (args: Product)[token required] / post: 0.0.0.0:3000/product
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] /get: 0.0.0.0:3000/users
- Show (args: id)[token required] /get: 0.0.0.0:3000/users/id
- Create (args: User)[token required]/post: 0.0.0.0:3000/users

#### Orders

- Current Order by user (args: user id)[token required] /get : 0.0.0.0:3000/orders/id
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id serial
- name varchar
- price integer
- [OPTIONAL] category

#### User

- id serial
- firstName varchar
- lastName varchar
- password char

#### Orders

- id serial
- user_id integer
- status of order (active or complete) boolean

#### orders_products

- id serial
- user_id integer
- product_id integer
- quantity integer