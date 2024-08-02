const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, colorize} = format;

const printFormat = printf(({timestamp, label, level, message}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
    file : combine(
        label({
            label : "띵동 개발 로그",
        }),
        timestamp({
            format : "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat
    ),
    console : combine(
        label({
            label : "띵동 개발 로그",
        }),
        colorize(),
        timestamp({
            format : "HH:mm:dd"
        }),
        printFormat
    )
};
const opts = {
    file : new transports.File({
        filename : "access.log",
        dirname: "./logs",
        level : "info",
        format : printLogFormat.file,
    }),
    console : new transports.Console({
        filename : "access.log",
        dirname: "./logs",
        level : "info",
        format : printLogFormat.console,
    })
}

const logger = createLogger({
    transports : [opts.file],
})

if (process.env.NODE_ENV !== "Product") {
    logger.add(opts.console)
}

module.exports = logger;