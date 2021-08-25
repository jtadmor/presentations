'use strict';
import express from 'express';

const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Up and running');
});
