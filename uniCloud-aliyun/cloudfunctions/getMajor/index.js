'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {skip=0} = event
	let res = await db.collection("major").where({
		main:"普通本科专业"
	}).get()
	return res
};
