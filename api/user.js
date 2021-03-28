import {
    registerUser,
    updateUser,
    userLogin
} from '../servers/user'
const express = require('express');

const api = express()

api.post('/mylike/api/user/register', (req, res) => {
    const requestBody = req.body ||　{}
    console.log(requestBody)
    registerUser(requestBody).then(data => {
        res.send({
            code:'0',
            msg:data.msg || '注册成功！'
        })
    }).catch(err => {
        res.send({
            code:'1',
            msg:err.msg || '注册失败，请稍后再试！'
        })
    })
})

api.get(`/mylike/api/user/test`, (req, res) => {
    res.send({
        msg:'hello world'
    })
})

export default api