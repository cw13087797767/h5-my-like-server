import request from 'request'

/**
 * 获取音乐列表
 * @param {*} keywords 
 * @returns 
 */
export const getMusicList = keywords => {
    return new Promise((resolve, reject) => {        
        request(`http://localhost:3001/search?keywords=${encodeURIComponent(keywords)}`, (err, res, body) => {
            if (!err && res.statusCode === 200 && JSON.parse(body).code === 200) {
                resolve({
                    code:'0',
                    data: JSON.parse(body).result || {}
                })
            } else {
                resolve({
                    code:'999',
                    data: body ? body : {msg:'服务异常'}
                })
            }
        })
    })
}

/**
 * 获取音乐url
 * @param {*} id 
 * @returns 
 */
export const getMusicUrl = id => {
    return new Promise((resolve, reject) => {
        request(`http://localhost:3001/song/url?id=${id}`, (err, res, body) => {
            if (!err && res.statusCode === 200 && JSON.parse(body).code === 200) {
                resolve({
                    code:"0",
                    data: JSON.parse(body).data || {}
                })
            } else {
                resolve({
                    code:'999',
                    data: body ? body : {msg:'服务异常'}
                })
            }
        })
    })
    
}