
const cors = require('cors');
const express = require('express');

const app = express();

module.exports = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    app.use(cors());
    next();

    //console.log("Middleware!");
}