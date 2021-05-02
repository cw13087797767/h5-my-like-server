import {
    getMusicList,
    getMusicUrl
} from '../servers/music'
const express = require("express")

const api = express()

/**
 * 歌曲列表查询
 */
api.get(`/mylike/api/music/list`, (req, res) => {
    getMusicList(req.query.keywords).then(data => {
        res.send(data)
    }).catch(()=> {
        res.send({
            code:'999',
            msg:'服务异常'
        })
    })
})

/**
 * 歌曲url地址
 */
api.get(`/mylike/api/music/url`,(req, res) => {
    getMusicUrl(req.query.id).then(data => {
        res.send(data)
    }).catch(()=> {
        res.send({
            code:'999',
            msg:'服务异常'
        })
    })
})

export default api