'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {name} =event
	let res = await db.collection('course').where({
		name
	}).remove()
	return res
};
