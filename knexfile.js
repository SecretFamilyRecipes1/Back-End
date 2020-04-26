module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/cookbook.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: { directory: "./data/seeds" },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
