import express, { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);