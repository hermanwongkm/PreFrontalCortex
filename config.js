//Loads the dotenv library and call the config method which loads the keys into process.env
require("dotenv").config();

const { Pool } = require("pg");
const isProduction = process.env.NODE_ENV === "production";

//you connect to postgres using:
//postgresql://username:password@hostname:port/database.
//This is equalvient just that you are using .env to do it.
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

//For those unfamiliar, a connection pool is a group of database connections sitting around that are waiting to be handed out and used.
//This means when a request comes in a connection is already there whether in your framework or some other pooling process, and then given to your application for that specific request or transaction.
//In contrast, without any connection pooling your application will have to reach out to your database to establish a connection. While in the most basic sense you may thinking connecting to a database is quick,
//often theres some overhead here. An example is SSL negotiation that may have to occur which means you’re looking at not 1-2 ms but often closer to 30-50.For those unfamiliar, a connection pool is a group of database connections sitting around that are waiting to be handed out and used. This means when a request comes in a connection is already there whether in your framework or some other pooling process, and then given to your application for that specific request or transaction. In contrast, without any connection pooling your application will have to reach out to your database to establish a connection. While in the most basic sense you may thinking connecting to a database is quick, often theres some overhead here. An example is SSL negotiation that may have to occur which means you’re looking at not 1-2 ms but often closer to 30-50.
//A pool is just an object that allows you to make a connection to the database server.
const pool = new Pool({
  //This is one of the many ways of initializaing a pool object.
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
});

module.exports = { pool };
