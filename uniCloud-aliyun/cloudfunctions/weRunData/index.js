'use strict';
// 云函数入口文件
const db = uniCloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // 根据用户提交的cloudid 获取对应的运动数据
  let weRunData = event.weRunData
	console.log(weRunData);
	return weRunData
}
