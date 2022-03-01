import express, { Application } from 'express';
import router from './core/routes';
import cors from 'cors';

const app: Application = express();

app.use(express.json());

// CORS
app.use(cors({
  origin: '*' // change in production
}));

app.use('', router);

export default app;
