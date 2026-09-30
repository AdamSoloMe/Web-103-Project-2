const pg = require("pg");
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

// Render requires SSL for external connections; local Postgres usually doesn't support it.
const useSSL = process.env.PGSSL !== "false";

const config = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
    };

if (useSSL) {
  config.ssl = { rejectUnauthorized: false };
}

const pool = new pg.Pool(config);

module.exports = { pool };
