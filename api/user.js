import {
    registerUser,
    updateUser,
    userLogin
} from '../servers/user'
const express = require('express');

const api = express()

/**
 * 用户注册
 */
api.post('/mylike/api/user/register', (req, res) => {
    registerUser(req.body ||　{}).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err || {
            code:'1',
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
            code:'4',
            msg:"账号或密码输入错误，请重新输入！"
        })
    })
})

export default api