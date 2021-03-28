
import md5 from 'md5-js'
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'

/**
 * 用户类
 * 
    userId,         用户id
    userAccount,    登录账号
    password,       登录密码
    userName,       昵称
    phone,          手机号码
    email,          邮箱
    invitation,     邀请码
    userImg,        头像
    registerTime,   注册时间
    gradePoint      等级积分
 */
export default class userModal {
    constructor(obj){
        this.userId = uuidv4().replace(/-/g,'') || null
        this.userAccount = obj.userAccount ||　null
        this.password = md5(obj.password) || null
        this.userName = obj.userName || null
        this.phone = obj.phone || null
        this.email = obj.email || null
        this.invitation = obj.invitation || null
        this.userImg = obj.userImg || null
        this.registerTime = dayjs().valueOf() + ''
        this.gradePoint = '0'
    }
}
