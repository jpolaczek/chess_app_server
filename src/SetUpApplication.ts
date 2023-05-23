import { router } from './routes/index'
const sessions = require('express-session');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
import { Express } from "express";

const SetUpApplication = (app: Express): Express => {
    app.use(express.json())
    app.use(sessions({
        secret: "secretthatwillbeputinenv",
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false 
    }));
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors())
    app.use("/", router);
    return app
  }
  
  export default SetUpApplication