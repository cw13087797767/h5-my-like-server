import userModal from '../modals/user'
import userController from '../controller/user'
import md5 from 'md5-js'
import fs from 'fs'
import { ipAntPort } from '../config'

/**
 * 登录
 * @param {*} userAccount 
 * @param {*} password 
 */
export const userLogin = (userObj) => {
    return new Promise((resolve, reject) => {
        if (!userObj.userAccount || !userObj.password) {
            return reject({
                msg:'账号或密码不能为空！'
            })
        }
        userObj.password = md5(userObj.password).replace(/-/g,'')
        userController.queryUserAccount(userObj).then(res => {
            if (res && res.length === 1) {
                let userDetail = new Object(res[0])
                return resolve({
                    code:'0',
                    data: userDetail,
                    msg:'登陆成功！'
                })
            }
            if (res && res.length === 0) {
                return resolve({
                    code:'1',
                    data:null,
                    msg:'该账号不存在！'
                })
            }
            return resolve({
                code:'3',
                data:null,
                msg:'账号或密码输入错误，请重新输入！'
            })
        }).catch(err => {
            return reject({
                msg: err.msg || '账号或密码输入错误，请重新输入！',
                code:'4',
                data:null
            })
        })
    })
}


/**
 * 注册
 * @param {*} userAccount 
 * @param {*} password 
 * @param {*} userName 
 * @param {*} phone 
 * @param {*} email 
 * @param {*} invitation 
 * @param {*} userImg 
 */
 export const registerUser = (userObj) => {
    return new Promise((resolve, reject) => {
        if (!userObj.userAccount) {
            return reject({
                code:'4',
                msg:'账号不能为空！'
            })
        }
        if (!userObj.password) {
            return reject({
                code:'4',
                msg:'密码不能为空！'
            })
        }
        if (!userObj.userName) {
            return reject({
                code:'4',
                msg:'昵称不能为空！'
            })
        }
        if (!userObj.userName) {
            return reject({
                code:'4',
                msg:'昵称不能为空！'
            })
        }
        if (!userObj.phone) {
            return reject({
                code:'4',
                msg:'手机号码不能为空！'
            })
        }
        if (!userObj.email) {
            return reject({
                code:'4',
                msg:'邮箱不能为空！'
            })
        }
        const user = new userModal(userObj)
        userController.insertUser(user).then(res => {
            resolve({
                code:'0',
                msg:'注册成功！'
            })
        }).catch(err => {
            reject({
                code:'4',
                msg: err.msg || '注册失败，请重试',
                err
            })
        })
    })
}

/**
 * 修改信息
 * @param {*} obj 
 */
export const updateUser = (
    password,
    userName,
    phone,
    email,
    userImg,
) => {

}

/**
 * 修改头像
 * @param {*} userId 
 * @param {*} file 
 */
export const updateUserImg = (
    userId,
    file,
) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return resolve({
                code:'20000',
                msg:'请先登录'
            })
        }
        fs.readFile(file.file.path,(err, data) => {
            if (err) {
                return resolve({
                    code:"999",
                    msg:'读取文件异常'
                })
            } else {
                const timeStr = new Date().valueOf()
                fs.writeFile(`./public/images/${timeStr}.png`, data, err => {
                    if (err) {
                        return resolve({
                            code:"999",
                            msg:'写入文件异常'
                        })
                    } else {
                        userController.updateUserImg(userId, `/static/images/${timeStr}.png`).then(res => {
                            if (res.changedRows === 1) {
                                return resolve({
                                    code:"0",
                                    msg:'保存文件成功'
                                })
                            }
                            return resolve({
                                code:"999",
                                msg:res.message || '数据库存储失败'
                            })
                        }).catch(err => {
                            return resolve({
                                code:"999",
                                msg:'数据库存储失败'
                            })
                        })
                    }
                })
            }  
        })
    })
}

/**
 * 获取用户信息
 * @param {*} userId 
 */
export const getUserDetail = userId => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return resolve({
                code:'20000',
                msg:"请先登录"
            })            
        }
        userController.getUserDetail(userId).then(res => {
            if (res && res.length === 1) {
                let userDetail = new Object(res[0])
                if (userDetail.userImg) {
                    userDetail.userImg = ipAntPort + userDetail.userImg
                }
                return resolve({
                    code:'0',
                    data:res[0],
                    msg:'成功'
                })
            } else if(res && res.length === 0) {
                return resolve({
                    code:'1',
                    data:null,
                    msg:'该账号不存在！'
                })
            } else {
                return resolve({
                    code:'999',
                    data:null,
                    msg:'服务器异常'
                })
            }
        }).catch(err => {
            return reject({
                msg: err.msg || '服务器异常',
                code:'999',
                data:null
            })
        })
    })
}



