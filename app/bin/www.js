"use strict";

const app = require("../app");
const logger = require("../db/logger");
const PORT = process.env.PORT;

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다. `);
});
