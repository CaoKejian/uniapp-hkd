'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {skip=0} = event
	let res =await db.collection('test').get()
	return res
};
