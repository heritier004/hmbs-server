const mysql = require("mysql");
const db = mysql.createConnection({
    user : "b413d774c98bf6",
    host : "us-cdbr-east-06.cleardb.net",
    password : "913f9dbc",
    database : "heroku_da3b104ef7988b2"
});

module.exports = db;
