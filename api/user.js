import {
    registerUser,
    updateUser,
    userLogin,
    updateUserImg,
    getUserDetail
} from '../servers/user'
const express = require('express');
import formidable from 'formidable'

const api = express()

/**
 * 用户注册
 */
api.post('/mylike/api/user/register', (req, res) => {
    registerUser(req.body ||　{}).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err || {
            code:'999',
            msg:err.msg || '注册失败，请稍后再试！'
        })
    })
})

/**
 * 用户登录
 */
api.post('/mylike/api/user/login', (req, res) => {
    userLogin(req.body ||　{}).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err || {
            code:'999',
            msg:"账号或密码输入错误，请重新输入！"
        })
    })
})

/**
 * 修改头像
 */
api.post(`/mylike/api/user/updateUserImg`, (req, res) => {
    const userid = req.headers.userid
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err || !files) {
            res.send(err || {
                code:'999',
                msg:'更新头像失败'
            })
        }
        updateUserImg(userid, files).then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err || {
                code:'999',
                msg:'更新头像失败'
            })
        })
    })
})

/**
 * 获取用户信息
 */
api.post(`/mylike/api/user/userDetail`, (req, res) => {
    const userid = req.headers.userid
    getUserDetail(userid).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err || {
            code:'999',
            msg:"服务器异常"
        })
    })

})

export default api