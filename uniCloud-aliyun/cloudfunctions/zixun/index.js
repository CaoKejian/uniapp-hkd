'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	return db.collection('news').get()
};
