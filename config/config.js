require("dotenv").config();
module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "naufal_personalweb_db",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres",
    dialect: "postgres",
    dialectModule: "pg",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {},
};
