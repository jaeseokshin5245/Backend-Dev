"use strict";

const app = require("../app");
const PORT = process.env.PORT;
// https적용을 위함
const fs=require("fs");
const https=require("https");
const path=require("path");

// app.listen(PORT, () => {
//     console.log(`${PORT} 포트에서 서버가 가동되었습니다.`);
// });

// SSL 인증서 경로 설정 (인증서 파일 경로로 수정하세요)
const privateKey = fs.readFileSync(path.join(__dirname, "../ssl/private.key"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "../ssl/certificate.crt"), "utf8");
const ca = fs.readFileSync(path.join(__dirname, "../ssl/ca_bundle.crt"), "utf8");

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// HTTPS 서버 생성 및 시작
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
    console.log(`${PORT} 포트에서 HTTPS 서버가 가동되었습니다.`);
});