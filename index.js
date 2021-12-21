const express = require("express");
const app = express();

require('dotenv').config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST','PUT','DELETE','PATCH');
    next();
});

app.use('/auth', require('./routes/auth'));

app.listen(process.env.APP_PORT);
