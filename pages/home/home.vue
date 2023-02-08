<template>
	<view class="wrapper" v-if="navlist.length">
		<view class="">
			<uni-notice-bar scrollable showIcon showClose single text=" 唯你小黄科小程序上新啦!,有任何问题加作者微信:YYik021,欢迎反馈!">
			</uni-notice-bar>
		</view>
		<swiper class="swiper" :indicator-dots="true" indicator-active-color="white" circular="true" :autoplay="true"
			:interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in piclist" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/detail/detail?img_id='+item.img_id">
					<image style="width: 100%;" :src="item.img" mode="aspectFill"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<view class="nav" v-show="navlist.length">
			<navigator :url="'/subpkg/tobar/tobar?id='+item.id" class="navitem" v-for="(item,index) in navlist"
				:key="index">
				<image :src="item.img" mode=""></image>
				<text>{{item.name}}</text>
			</navigator>
		</view>

		<view class="wrapper2" v-show="navlist.length">
			<view class="body-right">
				<view class="box box1 box1-3">
					<view class="box1-item" @click="gotoDetail1">
						<text class="text-one">不知道吃什么？</text>
						<view class="text-pro">
							<text class="text-three">雁鸣/学苑/大学......</text>
						</view>
					</view>
				</view>
				<view class="box box3 box1-3">
					<view class="box1-item" @click="gotoDetail2(even)">
						<text class="text-one a">快递号记不住？</text>
						<view class="text-pro">
							<text class="text-three">中通/圆通/顺丰......</text>
						</view>
					</view>
				</view>
			</view>

			<view class="body">
				<view class="box box2">
					<text @click="gotoDate" class="chushi" v-if="!isHaveDate">值得纪念的重要日子</text>
					<view class="dateItem" v-if="isHaveDate">
						<text class="dateName" @click="gotoDate">{{dateobj.name}}</text>
						<text class="dateTime">{{iDays}}<text class="tian">天</text></text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				piclist: [],
				navlist: [],
				single: '',
				dateobj: {

				},
				iDays: '',
				isHaveDate: false,
				name: '',
				even: "1",
			};
		},

		methods: {
			gotoDate() {
				uni.$showLogin()
				uni.navigateTo({
					url: '/subpkg/computedDate/computedDate'
				})
			},
			gotoBMI() {
				uni.navigateTo({
					url: '/subpkg/computedBMI/computedBMI'
				})
			},
			gotoDetail1() {
				uni.navigateTo({
					url: '/subpkg/toVideoDetail/toVideoDetail?id=' + '63c4e51b909ffe0641c3959b'
				})
			},
			gotoDetail2(even) {
				uni.navigateTo({
					url: '/subpkg/toVideoDetail/toVideoDetail?id=' + '63c4e51b909ffe0641c39599' + '&even=' + even
				})
			},
			//计算纪念日
			jisuan(sDate1) {
				let date2 = new Date(); //当前时间
				let date1 = new Date(Date.parse(sDate1.replace(/-/g, "/")));
				let iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);
				this.iDays = iDays;
			},
		},
		onLoad() {
			this.name = uni.getStorageSync('name').name
			uniCloud.callFunction({
				name: "mylunbo",
				data: {
					name: "王五",
					age: 20
				}
			}).then(res => {
				this.piclist = res.result.data
			})
			uniCloud.callFunction({
				name: "navlist",
			}).then(res => {
				this.navlist = res.result.data
			})

		},
		onShow() {
			uniCloud.database().collection('userinfo').where(`name=='${this.name}'`).get().then(res => {
				console.log(res);
				if (res.result.data[0].dateobj == undefined) {
					this.isHaveDate = false
				} else {
					this.dateobj = res.result.data[0].dateobj
					const publishDate = this.dateobj.publishDate
					this.jisuan(publishDate)
					this.isHaveDate = true
				}
			})
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 500rpx;
		margin-bottom: 20px;
	}

	.uni-noticebar {
		position: absolute;
		top: 0;
		z-index: 999;
	}

	.wrapper {
		height: 100vh;
		background-color: #fffae7;
	}

	.nav {
		width: 100%;
		height: 360rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		text-align: center;
		background-color: #fff;

		.navitem {
			padding: 30rpx 0;
			display: flex;
			flex-direction: column;
			text-align: center;
			width: 25%;
			font-size: 12px;

			image {
				margin: 0 auto;
				width: 30px;
				height: 30px;
			}

			text {
				margin-top: 5px;
			}
		}
	}

	.image {
		width: 100%;
		margin-top: 10rpx;
	}

	.wrapper2 {
		width: 90%;
		height: 420rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		margin: auto;
		margin-top: 50rpx;
		position: relative;

		.body {
			width: 98%;
			height: 240rpx;
			letter-spacing: 2px;

			.box2 {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
				background-color: #fff;
				border-radius: 15rpx;
				box-shadow: 8px 8px 10px #8e8fe0;

				.chushi {
					color: #9b9b9b;
					font-weight: bold;
					font-size: 20px;
					position: relative;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					text-align: center;
				}

				.dateItem {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					position: relative;
					top: 50%;
					transform: translateY(-50%);

					.dateName {
						color: #B0ADAB;
						font-weight: bold;
						font-size: 20px;
						margin-bottom: 20rpx;
					}

					.dateTime {
						margin-top: 20rpx;
						font-weight: bold;
						font-size: 36px;
						color: #AEABF4;

						.tian {
							font-weight: 500;
							font-size: 20px;
							color: #B0ADAB;
							font-weight: bold;
						}
					}
				}
			}
		}

		.body-right {
			height: 180rpx;
			margin-bottom: 50rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.box {
				width: 48%;
				height: 100%;
				background-color: #fff;
				border-radius: 15rpx;

				.box1-item {
					height: 120rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: flex-end;
					margin-left: 30rpx;

					.text-one {
						font-size: 17px;
						font-weight: bold;
						color: #9A97F1;
						letter-spacing: 1px;
						margin-bottom: 5rpx;
					}

					.a {
						color: #5EACF4;
					}

					.text-pro {
						font-size: 14px;
						margin-top: 5rpx;
						color: #a1a1a1;
					}

				}
			}

			.box1 {
				background: linear-gradient(to right, #ebf1fc, #EDECFF);
			}

			.box3 {
				background: linear-gradient(to right, #def2eb, #E2F1FF);
			}
		}
	}
</style>
