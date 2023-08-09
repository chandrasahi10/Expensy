const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./server/router/routes');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const port = 3000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
    secret: '0542@cool',
    resave: false,
    saveUninitialized: true


}));

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "0542@Cool",
    database: "Expensy"

});

app.use('/',routes);

app.get('/getkey',(req,res)=>{
    res.status(200).json({key: process.env.RAZORPAY_ID_KEY});
});

app.listen(port);


