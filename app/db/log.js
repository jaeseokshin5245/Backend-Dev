"use strict";

const fs = require("fs")

const accessLogStream = fs.createWriteStream(
    `./logs/access.log`,
    {flag : "a"}
);


module.exports = accessLogStream;