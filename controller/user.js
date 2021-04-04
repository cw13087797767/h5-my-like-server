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
                    msg:'服务器异常，请稍后再试！'
                })
                return
            }
            const sql = `
                INSERT into users
                (
                    userId,
                    userAccount,
                    password,
                    password_un,
                    userName,
                    phone,
                    email,
                    invitation,
                    userImg,
                    registerTime,
                    gradePoint,
                    isDel
                ) VALUES (
                    '${obj.userId || ''}',
                    '${obj.userAccount || ''}',
                    '${obj.password || ''}',
                    '${obj.password_un || ''}',
                    '${obj.userName || ''}',
                    '${obj.phone || ''}',
                    '${obj.email || ''}',
                    '${obj.invitation || ''}',
                    '${obj.userImg || ''}',
                    '${obj.registerTime || ''}',
                    '${obj.gradePoint || ''}',
                    '${obj.isDel}'
                )
            `
            connection && connection.query(sql,(err, result) => {
                connection.release();
                if (err) {
                    console.log(err)
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

// 查询用户
const queryUserAccount = (obj) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connection) => {
            if (poolErr) {
                reject({
                    msg:'服务器异常，请稍后再试！'
                })
                return
            }
            const sql = `
                SELECT 
                    userId, userAccount
                FROM 
                    users 
                WHERE 
                    userAccount = '${obj.userAccount ||　''}'
                AND
                    isDel = 0
                AND
                    password = '${obj.password ||　''}'
                
            `
            connection && connection.query(sql, (err, result) => {
                connection.release()
                if (err) {
                    // switch (err.code) {
                    //     case value:
                            
                    //         break;
                    
                    //     default:
                    //         break;
                    // }
                }
                if (result) {
                    return resolve(result)
                }
                reject(err)
            })
        })
    })
}

/**
 * 更新用户头像
 * @param {*} userId 
 * @param {*} imgUrl 
 * @returns 
 */
const updateUserImg = (userId, imgUrl) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connection) => {
            if (poolErr) {
                return resolve({
                    code:'999',
                    msg:'服务器异常，请稍后再试！'
                })
            }
            const sql = `UPDATE users SET userImg = '${imgUrl}' WHERE userId = '${userId}'`
            connection && connection.query(sql, (err, result) => {
                connection.release()
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                if (result) {
                    return resolve(result)
                }
            })
        })
    })
}

/**
 * 获取用户详情
 * @param {*} userId 
 * @returns 
 */
const getUserDetail = userId => {
    return new Promise((resolve, reject) => {
        pool.getConnection((poolErr, connection) => {
            if (poolErr) {
                return resolve({
                    code:'999',
                    msg:'服务器异常，请稍后再试！'
                })
            }
            const sql = `
                SELECT 
                    userId,
                    userAccount,
                    userName,
                    phone,
                    email,
                    userImg,
                    registerTime,
                    gradePoint
                FROM 
                    users 
                WHERE 
                    userId = '${userId}'
                AND 
                    isDel != 1
            `
            connection && connection.query(sql, (err, result) => {
                connection.release()
                if (err) {
                    return reject(err)
                }
                if (result) {
                    return resolve(result)
                }
            })
        })
    })
    
}

export default {
    insertUser,
    queryUserAccount,
    updateUserImg,
    getUserDetail
}