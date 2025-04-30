import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'myauth',
  password: process.env.POSTGRES_PASSWORD || 'mysecretpassword',
  port: Number(process.env.POSTGRES_PORT) || 5432,
});

export default pool;