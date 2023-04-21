import { router } from './routes/index'

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/", router);

app.listen('3001', () => { })
