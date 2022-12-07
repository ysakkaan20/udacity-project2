connect to database :
port for the DB servers should be  : 5432
add those valuables to your .env file ->
POSTGRES_HOST=your_host
POSTGRES_DB=your_database_name
POSTGRES_TEST_DB=your_test_data
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password

create database :
after connect to your postgres server -> you should use this sql queries :
CREATE DATABASE you_database_name;
CREATE USER you_user_name;
GRANT ALL PRIVILEGES ON DATABASE you_database_name TO you_user_name;

and change the database.json file values too with same infos .

jwt conf :
add those variables to your .env file
SALT_ROUNDS=your_salt_rounds_as_number
PEPPER=your_pepper_string
TOKEN_SECRET=Your_token_secret

environment variable in your .env file
ENV=dev

you have to install those package globally:
npm install -g db-migrate 