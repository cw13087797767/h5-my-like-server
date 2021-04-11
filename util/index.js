import fs from 'fs'

/**
 * 保存图片
 * @param {图片文件} file 
 * @param {唯一编码，用于返回接收} key 
 * @param {图片名称前缀} name 
 * @returns 
 */
export const saveImgToPublic = (file,key,name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file.path,(err, data) => {
            if (err) {
                return resolve({
                    code:"999",
                    msg:'读取文件异常'
                })
            } else {
                const timeStr = new Date().valueOf()
                fs.writeFile(`./public/images/${name || timeStr}.png`, data, err => {
                    if (err) {
                        return resolve({
                            code:"999",
                            msg:'写入文件异常'
                        })
                    } else {
                        resolve({
                            imgUrl:`/static/images/${name || timeStr}.png`,
                            key
                        })
                    }
                })
            }  
        })
    })
    
}