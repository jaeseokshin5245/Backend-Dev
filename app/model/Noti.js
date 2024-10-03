"use strict"

const schNoti = require("./SchNoti");
const depNoti = require("./depNoti");


class Noti{
    // 생성자
    constructor(body) {
        this.body = body;
    }

    // 학교 공지 사항 리스트 가져오기
    async callSchNotilist() {
        const client = this.body;
        const result = await schNoti.inquireSchNotiList();
        if (result.success === true ) {
            return {success:true, }
        }
        return { success : false}
    }
    // 특정 학교 공지 사항 내용 가져오기
    async callSchNotilist() {
        const client = this.body;
        const result = await schNoti.inquireSchNotiList();
        if (result.success === true ) {
            return {success:true, }
        }
        return { success : false}
    }
    // 학과 공지 사항 리스트 가져오기
    async callSchNotilist() {
        const client = this.body;
        const result = await depNoti.inquireSchNotiList();
        if (result.success === true ) {
            return {success:true, }
        }
        return { success : false}
    }
    // 특정 학과 공지 사항 내용 가져오기
    async callSchNotilist() {
        const client = this.body;
        const result = await depNoti.inquireSchNotiList();
        if (result.success === true ) {
            return {success:true, }
        }
        return { success : false}
    }
}

module.exports = Noti;