import mysql from 'mysql'

const pool  = mysql.createPool({
    host:'localhost',
    user:'root',
    password:"13087797767Qq",
    database:'h5_my_like',
    connectionLimit:0,
    multipleStatements: true
});

// 插入日志
const spaceInsert = obj => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connetion) => {
            if (poolErr) {
                return reject({
                    msg:'服务器异常，请稍后再试！'
                })
            }
            const sql = `
                INSERT INTO diarys 
                    ( 
                        userId, 
                        content, 
                        imgUrl, 
                        address, 
                        lng, 
                        lat, 
                        createTime 
                    )
                VALUES
                    (
                        '${obj.userId}',
                        '${obj.content}',
                        '${obj.imgUrl}',
                        '${obj.address}',
                        '${obj.lng}',
                        '${obj.lat}',
                        '${obj.createTime}'
                    )
            `
            connetion && connetion.query(sql,(err, result) => {
                if (err) {
                    console.log('新增日记异常：',err)
                    return reject({
                        msg:err
                    })
                }
                console.log('新增日记执行结果：',result)
                result && resolve(result)
            })
        })
    })
    
}

/**
 * 日记分页查询
 * @param {*} obj 
 * @returns 
 */
const spaceList = obj => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connetion) => {
            if (poolErr) {
                console.log(poolErr)
                return reject({
                    msg:'服务器异常，请稍后再试！'
                })
            }
            const sql = `
                SELECT SQL_CALC_FOUND_ROWS
                    a.id,
                    a.userId,
                    a.content,
                    a.imgUrl,
                    a.createTime,
                    a.address,
                    a.lng,
                    a.lat,
                    a.readCount,
                    a.likeCount,
                    a.collectCount,
                    a.commentCount,
                    a.transportCount
                FROM
                    diarys as a
                WHERE
                    userId = '${obj.userId}' 
                    AND isDelete = 0 
                ORDER BY
                    createTime DESC
                    LIMIT ${(obj.pageNum -1) * obj.pageSize},
                    ${obj.pageSize};
                SELECT
                    FOUND_ROWS() AS total;
            `
            connetion && connetion.query(sql, (err, result) => {
                if (err) {
                    console.log('查询日记异常：', err)
                    return reject({
                        msg:err
                    })
                }
                return resolve(result)
            })
        })
    })
}

/**
 * 日记详情
 * @param {*} obj 
 * @returns 
 */
const spaceDetail = obj => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connetion) => {
            if (poolErr) {
                console.log(poolErr)
                return reject({
                    msg:'服务器异常，请稍后再试！'
                })
            }
            const sql = `
                SELECT
                    id,
                    userId,
                    content,
                    imgUrl,
                    createTime,
                    address,
                    lng,
                    lat,
                    readCount,
                    likeCount,
                    collectCount,
                    commentCount,
                    transportCount
                FROM
                    diarys 
                WHERE
                    id = ${+obj.id} 
                    AND userId = '${obj.userId}' 
                    AND isDelete = 0
            `
            connetion && connetion.query(sql, (err, result) => {
                if (err) {
                    console.log('查询日记详情异常：', err)
                    return reject({
                        msg:err
                    })
                }
                return resolve(result)
            })
        })
    })
    
}


export default {
    spaceInsert,
    spaceList,
    spaceDetail
}