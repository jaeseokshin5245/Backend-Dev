"use strict";

const fs = require("fs")

const accessLogStream = fs.createWriteStream(
    `./log/access.log`,
    {flag : "a"}
);


module.exports = accessLogStream;