<template>
	<view class="wrapper">
		<view class="wrapper-info" >
			<image class="ceshi" src="../../static/morenBg.jpg" mode=""></image>
			<view class="info" v-if="forceRefresh">
				<image :src="headerUrl" mode="aspectFill"></image>
				<text>Hi，<text>{{trueName||nickName||morenname}}</text></text>
				<!-- 注册 -->
				<button class="tosign" @click="tosign" v-show="nickName==''">登录/注册</button>
				<button class="tosign" @click="tuichu" v-show="!nickName==''">退出登录</button>
			</view>
		</view>
		<view class="select">
			<view class="info" v-show="!nickName==''">
				<view class="item"><text class="num">{{totalObj.likeNum}}</text>获赞</view>
				<!-- <view class="item"><text>11</text>评论</view> -->
				<view class="item"><text class="num">{{totalObj.artNum}}</text>发文</view>
			</view>
			<!-- 上传头像 -->
			<view class="xiugaitouxiang">
				<view class="item" @click="editInfoPage">
					<image src="../../static/myinfo.png" mode=""></image>
					<text class="text">个人信息</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="item" @click="myFabuPage">
					<image src="../../static/myfabu.png" mode=""></image>
					<text>我的发布</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="item" @click="myLikePage">
					<image src="../../static/mylike.png" mode=""></image>
					<text>我的点赞</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
				<view class="item" @click="myMessagePage">
					<image src="../../static/mytongzhi.png" mode="">
					</image>
					<view  v-show="isHaveMessage" class="liwai"></view>
					<text :class="isHaveMessage?'active':'unactive'">我的通知</text>
					<uni-icons type="forward" size="20"></uni-icons>
				</view>
			</view>
		</view>
		<view class="dashang">
			<text>赞助一下作者吧~</text>
			<image src="../../static/打赏.png" @click="open" mode=""></image>
			<uni-popup ref="popup" type="center">
				<image class="payment" src="../../static/payment.jpg" mode=""></image>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				nickName: "",
				trueName: "",
				isID: false,
				headerUrl: "../../static/morentouxiang.jpg",
				isdrop: false,
				morenname: "黄科青年",
				totalObj: {
					artNum: 0,
					likeNum: 0
				},
				forceRefresh: true,
				isHaveMessage:true
			};
		},
		methods: {
			open() {
				this.$refs.popup.open('center')
			},
			tosign() {
				uni.navigateTo({
					url: '/subpkg/signin/signin'
				})
			},
			tuichu() {
				uni.showModal({
					title: "确认退出吗",
					success: res => {
						if (res.confirm) {
							uni.removeStorageSync('name')
							uni.showLoading({
								title: "正在退出"
							})
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/my/my',
								})
								uni.hideLoading()
							}, 500)
						} else if (res.cancel) {
							console.log("取消");
						}
					}
				})
			},
			editInfoPage() {
				uni.$showLogin()
				uni.navigateTo({
					url: '/subpkg/editInfoPage/editInfoPage'
				})
			},
			myFabuPage() {
				uni.$showLogin()
				uni.navigateTo({
					url: '/subpkg/myFabuPage/myFabuPage'
				})
			},
			myLikePage() {
				uni.$showLogin()
				uni.navigateTo({
					url: '/subpkg/myLikePage/myLikePage'
				})
			},
			myMessagePage(){
				this.isHaveMessage = false
				uni.$showLogin()
				uni.navigateTo({
					url: '/subpkg/myMessagePage/myMessagePage'
				})
			},
			async getTotal() {
				uni.showLoading({
					title: "资源正在加载"
				})
				let artCount = await db.collection('article').where(`user_id=="${this.nickName}"`).count()
				this.totalObj.artNum = artCount.result.total
				const totalScore = []
				let likeCount = await db.collection('article').where(`user_id=="${this.nickName}"`).groupBy('user_id').groupField('sum(like_count) as totalScore').get()
				if(likeCount.result.data.length==0){
					this.totalObj.likeNum = 0
				}else if(likeCount.result.data.length!==0){
					this.totalObj.likeNum = likeCount.result.data[0].totalScore
				}
				console.log(likeCount.result.data.length);
				uni.hideLoading()
			},
			select(e) {
				console.log('选择文件：', e)
			},
			changeisshowdrop() {
				this.isdrop = true
			},
			closeisdrop() {
				this.isdrop = false
			},
			
		},
		
		onShow() {
			setTimeout(()=>{
				this.nickName = uni.getStorageSync('name').name
				this.trueName = uni.getStorageSync('name').nicheng
				this.headerUrl = uni.getStorageSync('name').headerUrl
				if(this.headerUrl==undefined){
					this.headerUrl ="../../static/morentouxiang.jpg"
				}
			},500)
			
		},
		onPullDownRefresh() {
			uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).get().then(res=>{
				this.trueName = res.result.data[0].nickName
				this.headerUrl = res.result.data[0].touxiang
			})
			this.nickName = uni.getStorageSync('name').name
			this.trueName = uni.getStorageSync('name').nicheng
			this.getTotal()
			uni.stopPullDownRefresh()
		},
		onLoad(options) {
			uni.setStorage({
				key: "name",
				data: {
					name: options.name || "",
					nicheng: ""
				}
			})
			this.nickName = uni.getStorageSync('name').name
			this.trueName = uni.getStorageSync('name').nicheng
		
			if (this.nickName) {
				this.getTotal()
				uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).get().then(res => {
					console.log(res);
					this.trueName = res.result.data[0].nickName
					this.headerUrl = res.result.data[0].touxiang
					uni.setStorage({
						key: "name",
						data: {
							name: options.name || "",
							nicheng: this.trueName,
							headerUrl:this.headerUrl
						}
					})
				})
			}
			uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).get().then(res=>{
				this.trueName = res.result.data[0].nickName
				this.headerUrl = res.result.data[0].touxiang
			})
		},

	}
</script>

<style lang="scss">
	.active{
		position: relative;
		left: -16rpx;
	}
	.liwai{
		position: relative;
		left: -6px;
		top: -6px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: red;
	}
	.info {
		display: flex;

		.item {
			margin-top: 15rpx;
			margin-left: 20rpx;
			&:nth-child(2){
				margin-left: 40rpx;
			}
			.num{
				margin-right: 10rpx;
			}
			text {
				font-weight: bold;
			}
			
		}
	}

	.wrapper {
		// height: 100vh;
		background-color: #fffae5;
		width: 100%;

		.wrapper-info {
			width: 100%;
			height: 30vh;
			// background: url(../../static/morenBg.jpg) no-repeat;
			background-size: cover;
			opacity: .8;
			.ceshi{
				width: 100%;
				height: 30vh;
				position: absolute;
				top: 0;
			}

			.info {
				display: flex;
				flex-direction: column;

				image {
					border-radius: 50%;
					width: 160rpx;
					height: 160rpx;
					margin-top: 30vh;
					margin-left: 50%;
					transform: translate(-50%, -50%);
				}

				text {
					text-align: center;
					margin-top: -40rpx;
				}
			}
		}

		.tosign {
			width: 320rpx;
			border-radius: 20rpx;
			height: 70rpx;
			color: white;
			margin-top: 10px;
			letter-spacing: 1px;
			font-size: 16px;
			line-height: 70rpx;
			background-color: #ce5353;
		}

		.select {
			background-color: #fff;
			width: 82%;
			margin: auto;
			height: 600rpx;
			border-radius: 50rpx;
			box-shadow: 0px -5px 2px #d3cece;
			margin-top: 150px;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			padding: 0 20rpx 0 40rpx;

			.xiugaitouxiang {
				font-size: 14px;
				padding: 0 10px;

				.item {
					width: 100%;
					height: 6vh;
					display: flex;
					justify-content: center;
					align-items: center;

					image {
						width: 25px;
						height: 20px;
					}

					text {
						width: 100%;
						height: 30px;
						line-height: 30px;
						margin-left: 10px;
					}

					&:nth-child(1) image {
						// width: 20px;
						// height: 20px;
					}

					&:nth-child(1) {
						padding-bottom: 10px;
						border-bottom: 1px solid #b5b5b5;
						margin-bottom: 30px;
					}
					// &:nth-child(4) text{
					// 	position: relative;
					// 	left: -16rpx;
					// }
					
					.uni-icons {
						flex: 1;
						height: 30px;
						border-bottom: none;
					}
				}

				.drop {
					width: 80%;
					height: 20vh;
					z-index: 100;
					position: fixed;
					left: 50%;
					transform: translateX(-50%);
					background-color: #fff;
					border-radius: 10rpx;
					display: flex;
					justify-content: space-between;

					.uni-file-picker__header {
						padding-left: 10px;
						padding-right: 10px;
					}

					.file-picker__box {
						margin-left: 20px;
					}

					button {
						position: absolute;
						bottom: 5px;
						right: 20px;
						height: 40px;
						line-height: 40px;
					}
				}
			}
		}
	}

	.dashang {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;

		text {
			color: #ffaa00;
			font-size: 16px;
		}

		image {
			width: 50rpx;
			height: 50rpx;
			margin-right: 40rpx;
		}
		.payment{
			width: 420rpx;
			height: 520rpx;
			border-radius: 30rpx;
		}
	}
</style>
