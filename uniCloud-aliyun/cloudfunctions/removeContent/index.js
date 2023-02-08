'use strict';
const dbCmd = db.command
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('userinfo').doc('63a3f5a7f5cf3ae96e7837a7').update({
		data:{
			
		}
		})
		return res
};
