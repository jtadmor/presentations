import express from 'express';
import { Pool } from 'pg';

const app = express();

const PORT = 4000;

const pool = new Pool({
  user: 'tsdbadmin',
  host: 'w1dt7nu2a0.xeuns2kznv.tsdb.forge.timescale.com',
  database: 'tsdb',
  port: 35665,
  password: 'datatwopointo'
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Up and running');
});

app.get('/variables', async (req, res) => {
  const { rows } = await pool.query(`
    SELECT * from variables
  `);

  res.status(200).send(JSON.stringify(rows))
});
