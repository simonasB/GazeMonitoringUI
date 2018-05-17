import { Pool } from 'pg';
import config from '../config'

const pool = new Pool({
    connectionString: config.postgresql,
});

module.exports = {
    query: (text, params, callback) => {
      return pool.query(text, params, callback)
    }
}