import mysql from 'mysql'

const pool  = mysql.createPool({
    host:'localhost',
    user:'root',
    password:"13087797767Qq",
    database:'h5_my_like'
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
                        user_id, 
                        content, 
                        img_url, 
                        address, 
                        lng, 
                        lat, 
                        create_time 
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

export default {
    spaceInsert
}