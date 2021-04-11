const express = require('express')
import formidable from 'formidable'
import { 
    spaceInsert,
    spaceList
} from '../servers/space'

const api = express()

/**
 * 新增日记
 */
api.post(`/mylike/api/baseApp/space/insert`,(req, res) => {
    const userid = req.headers.userid
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send({
                code:'999',
                msg:err || '新增日志失败'
            })
        }
        spaceInsert(userid, fields, files).then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err || {
                code:'999',
                msg:'新增日志失败'
            })
        })

    })
})

/**
 * 日记分页查询
 */
api.get(`/mylike/api/baseApp/space/list`,(req, res) => {
    spaceList(req.headers.userid, req.query).then(data => {
        res.send(data)
    }).catch(err => {
        res.send({
            code:'999',
            msg:err || '查询失败'
        })
    })
})

export default api