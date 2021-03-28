import userClass from '../modals/user'
import userModal from '../modals/user'
import userController from '../controller/user'

/**
 * 登录
 * @param {*} userAccount 
 * @param {*} password 
 */
export const userLogin = (userAccount, password) => {

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
            reject({
                msg:'账号不能为空！'
            })
            return
        }
        if (!userObj.password) {
            reject({
                msg:'密码不能为空！'
            })
            return
        }
        if (!userObj.userName) {
            reject({
                msg:'昵称不能为空！'
            })
            return
        }
        if (!userObj.userName) {
            reject({
                msg:'昵称不能为空！'
            })
            return
        }
        if (!userObj.phone) {
            reject({
                msg:'手机号码不能为空！'
            })
            return
        }
        if (!userObj.email) {
            reject({
                msg:'邮箱不能为空！'
            })
            return
        }
        const user = new userModal(userObj)
        console.log('user',user)
        userController.insertUser(user).then(res => {
            resolve({
                msg:'新增用户成功！'
            })
        }).catch(err => {
            reject({
                msg: err.msg || '新增用户失败，请重试',
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

