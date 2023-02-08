<template>
	<view class="blogItem">
		<view class="head">
			<view class="userinfo">
				<view class="avatar" >
					<image :src="item.user_touxiang?item.user_touxiang:'../../static/morentouxiang.jpg'" mode="aspectFill"></image>
				</view>
				<view class="name" >{{item.user_nicheng||item.user_id}}</view>
				<view class="time">
					<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
					</uni-dateformat>
				</view>
			</view>


		</view>
		<view class="body">
			<view class="title" @click="gotoDetail">
				{{item.title}}
			</view>
			<view class="text" @click="gotoDetail" v-if="item.description">
				<view class="t">
					{{item.description}}
				</view>
			</view>
			<view class="piclist" v-if="item.picurls.length">
				<view class="pic" :class="item.picurls.length==1?'only':''" v-for="pic,index in item.picurls"
					:key="pic">
					<image @click="clickPic(index)" :src="pic" mode="aspectFill"></image>
				</view>
			</view>

		</view>

		<view class="info">
			<view class="box"><text class="iconfont icon-a-27-liulan"></text>
				<text>{{item.view_count}}</text>
			</view>
			<view class="box" @click="gotoDetail"><text class="iconfont icon-a-5-xinxi"></text>
				<text>{{item.comment_count&&item.comment_count>0?item.comment_count:"评论"}}</text>
			</view>
			<view class="box" :class="item.isLike?' active':''" @click="clicklike(item.user_nicheng,item)"><text class="iconfont icon-a-106-xihuan"></text>
				<text>{{item.like_count?item.like_count:"点赞"}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject('utilsObj', {
		customUI: true
	})
	export default {
		name: "my-blogItem",
		props: {
			item:{
				type:Object,
				default(){
					return{
						
					}
				}
			},
			isLike:Boolean,
			like_count:Number,
		},
		data() {
			return {
				user_touxiang:''
			};
		},
		created() {
			this.user_nicheng = uni.getStorageSync('name').nicheng
			this.user_id = uni.getStorageSync('name').name
			this.user_touxiang = uni.getStorageSync('name').headerUrl
			console.log(this.item);
		},
		methods: {
			clickPic(index) {
				uni.previewImage({
					current: index,
					urls: this.item.picurls
				})
			},
			gotoDetail() {
				uni.navigateTo({
					url: '/subpkg/blogDetail/blogDetail?id=' + this.item._id
				})
			},
			async clicklike(user_nicheng,item){
				console.log(this.user_nicheng);
				if(!this.user_id){
					uni.showModal({
						title:"是否前往登录",
						success:res=>{
							if(res.confirm){
								uni.navigateTo({
									url:'/subpkg/signin/signin'
								})
							}
						}
					})
					return 
				}
				let time = Date.now()
									if (time - this.likeTime < 2000) {
										uni.showToast({
											title: "您的操作太频繁了",
											icon: "none"
										})
										return
									}
				this.likeTime = time
				// this.item.isLike ? this.item.like_count-- : this.item.like_count++
				// this.item.isLike =!this.item.isLike
				let like_count = this.item.like_count
				this.item.isLike?this.item.like_count-- :this.item.like_count++
				let isLike =!this.item.isLike
				this.item.isLike = isLike
				this.$emit("update:isLike",this.item.isLike)
				this.$emit("update:like_count",this.item.like_count)

				// 查询有没有点过赞
				let count = await db.collection('articlelike').where(
					`article_id=='${this.item._id}' &&user_id =='${this.user_id}'`).count()
				console.log("???",count);
				if (count.result.total) {
					db.collection('articlelike').where(`article_id=='${this.item._id}' &&user_id =='${this.user_id}'`)
						.remove()
					utilsObj.operation('article', "like_count", this.item._id, -1)
				} else {
					db.collection("articlelike").add({
						article_id: this.item._id,
						user_id: this.user_id,
						user_nicheng: this.user_nicheng,
						user_touxiang: this.user_touxiang,
						articleTitle:item.title,
						articlePic:item.picurls,
					})
					utilsObj.operation('article', "like_count", this.item._id, 1)
				}
				
			}
		},
	}
</script>

<style lang="scss">
	.blogItem {
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
				.time{
					
				}
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
			.active{
				color: #9e6d38;
			}
		}
	}
</style>
