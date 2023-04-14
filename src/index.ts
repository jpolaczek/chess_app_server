const express = require('express');
const cors = require('cors');
import { Request, Response } from 'express';

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

app.get('/', (req: Request, res: Response) => {
  res.send('Hi There')
});

app.listen('3001', () => { })
