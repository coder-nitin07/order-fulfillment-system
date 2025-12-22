import pkg from 'pg';
import config from './config.js';

const { Pool } = pkg;

const pool = new Pool({
    host: config.db.host,
    post: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.on('connect', ()=>{
    console.log(`PostgreSQL connected`);
});

pool.on('error', (err) => {
  console.error('Unexpected PG error ', err);
  process.exit(1);
});

export default pool;