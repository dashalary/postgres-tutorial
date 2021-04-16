/* from node-postgresql docs */

const { Pool } = require("pg"); // importing Pool to connect to db
require("dotenv").config();
const connectionString = process.env.PSQL_CONNECTION; //string has our connection url
const pool = new Pool({ //initializing pool instance and passing url to the constructor to connect to db
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params), // query method will run SQL commands
};