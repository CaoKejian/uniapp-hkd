export function getImgSrc(richText, num = 3) {
	let imgList = []
	richText.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
		imgList.push(capture)
	})
	imgList = imgList.splice(0, num)
	return imgList
}
export function getProvince() {
	return new Promise((resolve, reject) => {
		let historyProvince = uni.getStorageSync('historyProvince')
		if (historyProvince) {
			resolve(historyProvince.province)
		} else {
			uni.request({
				url: "https://restapi.amap.com/v3/ip?key=7ef462c39299f921a8a2557ad84c2cb2",
				success: res => {
					let str = ""
					if (typeof(res.data.province) == 'string') {
						str = res.data.province;
					} else {
						str = "未知"
					}
					resolve(str)
					let obj = {
						province: str,
						time: Date.now()
					}
					uni.setStorageSync('historyProvince', obj)
				},
				fail: err => {
					reject(err);
				}
			})
		}
	})

}


