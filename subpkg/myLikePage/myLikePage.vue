<template>
	<view class="wrapper">
		<view class="content">
			<view class="blogItem" v-for="(item,index) in myLikeList" :key="index">
				<view class="head">
					<view class="userinfo">
						<view class="avatar">
							<image
								:src="item.article_id[0].user_touxiang?item.article_id[0].user_touxiang:'../../static/morentouxiang.jpg'"
								mode="aspectFill"></image>
						</view>
						<view class="name">{{item.article_id[0].user_nicheng||item.article_id[0].user_id}}</view>
					</view>
				</view>
				<view class="body">
					<view class="title" @click="gotoDetail(item)">
						{{item.article_id[0].title}}
					</view>
					<view class="text" @click="gotoDetail(item)" v-if="item.article_id[0].description">
						<view class="t">
							{{item.article_id[0].description}}
						</view>
					</view>
				</view>

				<view class="info">
					<view class="box"><text class="iconfont icon-a-27-liulan"></text>
						<text>{{item.article_id[0].view_count}}</text>
					</view>
					<view class="box" @click="gotoDetail(item)"><text class="iconfont icon-a-5-xinxi"></text>
						<text>{{item.article_id[0].comment_count&&item.article_id[0].comment_count>0?item.article_id[0].comment_count:"评论"}}</text>
					</view>
					<view class="box" :class="item.isLike?' active':'active'" @click="clicklike(item.user_nicheng,item,index)">
						<text class="iconfont icon-a-106-xihuan"></text>
						<text>{{item.article_id[0].like_count?item.article_id[0].like_count:"点赞"}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	const utilsObj = uniCloud.importObject('utilsObj', {
		customUI: true
	})
	export default {
		data() {
			return {
				myLikeList: []
			};
		},
		methods: {
			getData() {
				uni.showLoading({
					title:'正在加载'
				})
				const name = uni.getStorageSync('name').name
				const liketemp = db.collection('articlelike').where(`user_id=='${name}'`).getTemp()
				const artileTemp = db.collection('article').field(
					"_id,title,description,like_count,user_nicheng,user_touxiang,user_id,view_count,comment_count").getTemp()
				db.collection(liketemp, artileTemp).orderBy('publish_date desc').get().then(res => {
					console.log(res);
					this.myLikeList = res.result.data
					uni.hideLoading()
				})
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/blogDetail/blogDetail?id=' + item.article_id[0]._id
				})
			},
			//取消高亮
			async clicklike(user_nicheng,item,index) {
				uni.showModal({
					title:"确认取消点赞吗",
					success(res) {
						if(res.confirm){
							const user_id = item.user_id
							const id = item.article_id[0]._id
							// 取消操作
							db.collection('articlelike').where(`article_id=='${id}' &&user_id =='${user_id}'`)
								.remove()
							utilsObj.operation('article', "like_count", id, -1)
							// 前端删除数组
							this.myLikeList.splice(index,1)
						}else if(res.cancel){
							uni.showToast({
								title:'用户取消操作',
								icon:"none"
							})
						}
					}
				})
			}
		},
		onLoad() {
			const name = uni.getStorageSync('name').name
			const db = uniCloud.database()
			this.getData()
		},
		onShow() {
			const name = uni.getStorageSync('name').name
			if(!name){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrapper {
		.content {
			background-color: #fffae5;
			height: 100vh;
			padding: 25rpx;

			.blogItem {
				border-radius: 10rpx;
				padding: 30rpx;
				background-color: #fff;
				border-radius: 30rpx;
				margin-bottom: 35rpx;

				.head {
					display: flex;
					font-size: 32rpx;
					align-items: center;
					justify-content: space-between;

					.userinfo {
						display: flex;
						align-items: center;
						justify-content: space-between;
						width: 100%;

						.avatar {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
								display: block;
							}
						}

						.name {
							color: #9e6d38;
							letter-spacing: 1px;
							padding-left: 25rpx;
							flex: 1;
						}

						.time {
							color: #888;
							font-size: 22rpx;
							padding-left: 20rpx;
						}
					}

					.more {
						padding: 5rpx;

						.iconfont {
							font-size: 50rpx;
							color: #888;
						}
					}
				}

				.body {
					padding: 50rpx 0 30rpx;

					.title {
						font-size: 44rpx;
						color: #000;
						font-weight: 500;
						letter-spacing: 1px;
						text-align: justify;
						margin-bottom: 15rpx;
						display: flex;
						justify-content: space-between;

						.time {}
					}

					.text {
						padding-top: 10rpx;
						padding-bottom: 10rpx;
						font-size: 30rpx;
						text-align: justify;
						color: #888;

						.t {
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}

					.piclist {
						display: flex;
						padding-top: 20rpx;

						.pic {
							width: 225rpx;
							height: 225rpx;
							margin-right: 6rpx;
							overflow: hidden;

							image {
								width: 100%;
								height: 100%;
							}

							&:first-child {
								border-radius: 20rpx 0 0 20rpx;
							}

							&:last-child {
								border-radius: 0 20rpx 20rpx 0;
							}

							&.only {
								border-radius: 20rpx;
							}
						}
					}
				}

				.info {
					display: flex;
					align-items: center;
					justify-content: space-around;
					font-size: 26rpx;
					color: #333;

					.box {
						display: flex;
						align-items: center;
						padding: 15rpx 0 5rpx;
						flex: 1;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: 40rpx;
							padding-right: 10rpx;
						}
					}

					.active {
						color: #9e6d38;
					}
				}
			}
		}
	}
</style>
