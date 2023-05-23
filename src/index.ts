import SetUpApplication from "./SetUpApplication";
const express = require('express');

declare module 'express-session' {
  interface Session {
    userId: number | null;
  }
}

const app = SetUpApplication(express())
app.listen('3001', () => { })