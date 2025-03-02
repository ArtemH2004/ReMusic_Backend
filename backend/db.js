import pg from 'pg';
const { Pool} = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  database: 'ReMusic',
  port: 5432,
});

export default pool;