require("dotenv").config();
const pg = require("pg");
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "naufal_personalweb_db",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres",
    dialectModule: pg,
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    port: process.env.POSTGRES_PORT,
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
