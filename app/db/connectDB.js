const mysql = require("mysql");

const signupinfo = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.info,
})

const signupinfodb = mysql.createConnection({
    host: process.env.DHOST,
    user: process.env.DUSER,
    password: process.env.DPASSWORD,
    database: process.env.DATABASE,
})

signupinfodb.connect();

module.exports = signupinfodb;