require('dotenv').config();
const jwt = require('jsonwebtoken');

// Require config file
const connect = require('./config/db/db');

const express = require('express');
const app = express();

app.use(express.json());

// connect DB
connect();

// call routers
app.use('/', require('./routers/user'));

app.listen(3000, ()=>console.log('Server is running on Port 3000'))