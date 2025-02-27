const { createClient } = require("redis");
const { RedisStore } = require("connect-redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({ client: redisClient, prefix: "sess:" });

module.exports = {
  development: {
    store: redisStore,
    name: "mySession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      httpOnly: true,
      // sameSite: "none",
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  },
  production: {
    store: redisStore,
    name: "mySession",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 30, // 30 minutes
    },
  },
};
