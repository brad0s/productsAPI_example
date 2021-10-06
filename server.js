import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import moviesRouter from './routes/movies.route.js';

const app = express();

mongoose.connect(process.env.DATABASE_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(`Error: ${error}`));
db.once('open', () => console.log(`DB connected!`));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/movies', moviesRouter);

app.listen(process.env.PORT, () =>
  console.log(`listening on port ${process.env.PORT}...`)
);
