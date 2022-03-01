import { Pool } from 'pg';

import config from '../../config'

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  database: config.db.name,
  password: config.db.password
});

const query = async (text: string, params?: Array<any>): Promise<{rows: any[], count: number}> => {
  const start = Date.now();
  const results = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Query executed', { text: text.replace(/ +(?= )/g,'').trim(), duration, rows: results.rowCount })
  return { rows: results.rows, count: results.rowCount };
}

export { query }