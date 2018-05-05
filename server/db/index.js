import { Pool } from 'pg';

const connectionString = 'postgresql://gazemonitoring2:Password1@localhost:5432/gazemonitoring2';

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
}