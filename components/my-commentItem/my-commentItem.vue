<template>
	<view class="comment-item" @click="gotoreply">
		<view class="avator">
			<image :src="item.user_touxiang" mode="aspectFill"></image>
		</view>
		<view class="wrap">
			<view class="username">
				{{item.user_nicheng||item.user_id}}
			</view>
			<view class="comment_content">
				{{item.comment_content}}
			</view>
			<view class="info">
				<view class="reply-btn" v-if="!childState">
					{{item.totalReply||0}}回复
				</view>
				<view class="date">
					<uni-dateformat :date="item.comment_date" :threshold="[60000,3600000*24*30]"></uni-dateformat>
				</view>
				<view class="city">
					{{item.province}}
				</view>
			</view>
		</view>

		<view class="icon">
			<text @click.stop="caidan(item)" v-if="!closeBtn" class="iconfont icon-a-2-caidan"></text>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject("utilsObj", {
		customUI: true
	})
	export default {
		name: "my-commentItem",
		props: {
			item: {
				type: Object,
				default () {
					return {

					}
				}
			},
			childState:{
				type:Boolean,
				default:false
			},
			closeBtn:{
				type:Boolean,
				default:false
			},
			commentinfo: {
				type: Array,
				default () {
					return []
				}
			},
			commentObj: {
				type: Object,
				default: () => {
					return {

					}
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			caidan(item) {
				const name = uni.getStorageSync('name').name
				const nickname = uni.getStorageSync('name').nicheng
				if (item.user_id == name || item.user_id == nickname) {
					uni.showModal({
						title: "是否确认删除",
						success: res => {
							if (res.confirm) {
								uniCloud.database().collection('articleComment').doc(item._id).remove()
								uni.showToast({
									title: "删除成功",
									icon:'none'
								})
								this.$emit("removeEnv", {
									id: this.item._id
								})
								utilsObj.operation('article', "comment_count", this.commentObj.article_id, -1)
							}
						}
					})
				} else {
					uni.showToast({
						title: '你不能删除别人的评论哦',
						icon: 'none'
					})
				}
			},
			gotoreply(){
				uni.setStorageSync('replyItem',this.item)
				uni.navigateTo({
					url:'/subpkg/reply/reply?id='+this.item._id
				})
			}
		},
		created() {
			console.log("??",this.item);
		}
	}
</script>

<style lang="scss">
	.comment-item {
		margin-top: 40rpx;
		width: 100%;
		display: flex;
		justify-content: flex-start;

		.avator {
			margin-right: 30rpx;
			width: 40px;
			height: 40px;

			image {
				width: 40px;
				height: 40px;
				border-radius: 50%;
			}
		}

		.wrap {
			flex: 1;
			display: flex;
			flex-direction: column;

			.username {
				margin-top: 20rpx;
			}

			.comment_content {
				margin: 20rpx 0;
				font-size: 16px;
			}

			.info {
				display: flex;
				justify-content: space-between;
				width: 400rpx;

				.reply-btn {
					background-color: #e4e4e4;
					border-radius: 30rpx;
					padding: 0px 10px;
					font-size: 12px;
				}
			}
		}

		.icon {
			margin-right: 20rpx;
			margin-top: 10rpx;
		}
	}
</style>
