import spaceController from '../controller/space'
import { saveImgToPublic } from '../util'
import {v4 as uuidv4} from 'uuid'

/**
 * 新增日志
 * @param {*} userId 
 * @param {*} obj 
 * @param {*} files 
 */
export const spaceInsert = (userId, obj, files) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            return resolve({
                code:'20000',
                msg:"请先登录"
            })            
        }
        const {
            content,
            address,
            lng,
            lat
        } = obj
        const filesKeys = Object.keys(files)
        if (!content && filesKeys.length === 0) {
            return resolve({
                code:'999',
                msg:"请输入内容后再保存"
            })   
        }
        const promiseList = []
        for (let i = 0; i < filesKeys.length; i++) {
            promiseList.push(saveImgToPublic(files[filesKeys[i]],filesKeys[i],`space-${uuidv4().replace(/-/g,'')}`))
        }
        let imgUrl = ''
        Promise.all(promiseList).then(res => {
            const arr = []
            res.map(item => {
                arr.push(item.imgUrl)
            })
            imgUrl = arr.join(',')
        }).finally(() => {
            const saveObj = {
                userId,
                content,
                imgUrl,
                address,
                lng,
                lat,
                createTime:new Date().valueOf().toString()
            }
            spaceController.spaceInsert(saveObj).then(res => {
                resolve({
                    code:'0',
                    msg:'成功'
                })
            }).catch(err => {
                reject(err)
            })
        })
    })
    
}