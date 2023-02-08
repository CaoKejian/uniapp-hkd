'use strict';
const db =  uniCloud.database()
exports.main = async (event, context) => {
	// const {name,password,course} = event
	// let res = await db.collection('userinfo').add({
	// 	name,
	// 	password,
	// 	course,
	// })
	const {name,password,course,touxiang} = event
	console.log(event);
	let res = await db.collection('userinfo').add({
		name,password,course,touxiang
	})
	return res
};
