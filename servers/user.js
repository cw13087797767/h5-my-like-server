import userModal from '../modals/user'
import userController from '../controller/user'
import md5 from 'md5-js'

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
        userController.queryUserAccount(userObj).then(res => {
            if (
                res 
                && res.length === 1
                && res[0].userAccount === userObj.userAccount
                && res[0].password === md5(userObj.password)
            ) {
                return resolve({
                    code:'0',
                    data:{
                        userName:res[0].userName,
                        userAccount:res[0].userAccount,
                    },
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

