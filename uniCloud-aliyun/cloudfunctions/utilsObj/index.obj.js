// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database()
const dbCmd = db.command
module.exports = {
	_before: function () { // 通用预处理器

	},
	// 自定义增减
	async operation(table,attr,id,num){
		let obj ={}
		obj[attr] = dbCmd.inc(num)
		return await db.collection(table).doc(id).update(obj)
	}
	
}
