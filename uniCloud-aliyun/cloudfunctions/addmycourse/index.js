'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {data} = event
	console.log(event);
	let res = await db.collection('course').add({
		data
	})
	return res
};
