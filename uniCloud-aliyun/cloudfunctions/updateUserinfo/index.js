'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {refreshName,refreshData} = event
	let res = await db.collection('userinfo').where({
		name:refreshName
	}).update({
		data:refreshData
	})
	return res
};
