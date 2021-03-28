import { json } from 'body-parser';
import mysql from 'mysql'

// const connection = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:"13087797767Qq",
//     database:'h5_my_like'
// })

const pool  = mysql.createPool({
    host:'localhost',
    user:'root',
    password:"13087797767Qq",
    database:'h5_my_like'
});
/**
 * 插入用户
 * @param {*} obj 
 * @param {*} connection 
 */
const insertUser = (obj) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connection) => {
            if (poolErr) {
                reject({
                    msg:'新增用户失败！'
                })
                return
            }
            const sql = `
                INSERT into users
                (
                    userId,
                    userAccount,
                    password,
                    userName,
                    phone,
                    email,
                    invitation,
                    userImg,
                    registerTime,
                    gradePoint
                ) VALUES (
                    '${obj.userId || ''}',
                    '${obj.userAccount || ''}',
                    '${obj.password || ''}',
                    '${obj.userName || ''}',
                    '${obj.phone || ''}',
                    '${obj.email || ''}',
                    '${obj.invitation || ''}',
                    '${obj.userImg || ''}',
                    '${obj.registerTime || ''}',
                    '${obj.gradePoint || ''}'
                )
            `
            connection && connection.query(sql,(err, result) => {
                console.log('err',JSON.stringify(err))
                console.log('result',result)
                connection.release();
                if (err) {
                    switch (err.code) {
                        case 'ER_DUP_ENTRY':
                            reject({
                                msg:'账号重复，请重新输入！'
                            })
                            return
                        default:
                            reject({
                                msg:'新增用户失败！'
                            })
                            return
                    }
                }
                resolve({
                    msg:'新增用户成功！'
                })
            })
        })
    })
}

export default {
    insertUser
}