const mysql = require("mysql");

const signupinfo = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.info,
})

const signupinfodb = mysql.createConnection({
    host: process.env.dhost,
    user: process.env.duser,
    password: process.env.dpassword,
    database: process.env.database,
})

signupinfodb.connect();

module.exports = signupinfodb;