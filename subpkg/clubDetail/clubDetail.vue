<template>
	<view class="wrapper">
		<view class="center">
			<view class="pic">
				<image :src="obj.img" mode="aspectFill"></image>
			</view>
			<view class="bottom">
				<view class="fake">
					<view></view>
					<view></view>
					<view></view>
				</view>
				<view class="contents">
					<text class="title">{{obj.title}}</text>
					<text class="content">{{obj.content}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {}
			};
		},
		onLoad(e) {
			const item = e.item
			this.obj = JSON.parse(item);
			console.log(this.obj );
		}
	}
</script>

<style lang="scss">
	.wrapper {
		width: 100%;
		height: 100vh;
		background-color: #fffae5;
		.center{
			width: 90%;
			height: 80%;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			.pic{
				width: 150rpx;
				height: 150rpx;
				margin: 0 auto;
				margin-bottom: 50rpx;
				image{
					width: 100%;
					height: 100%;
			
				}
			}
			.bottom{
				width: 80%;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 30rpx;
				height: auto;
				.contents{
					display: flex;
					flex-direction: column;
					width: 80%;
					height: 70%;
					margin: 0 auto;
					padding-bottom: 20rpx;
					.title{
						text-align: center;
						color: #9E6D38;
						font-size: 18px;
						margin-bottom: 20rpx;
					}
					.content{
						margin-bottom: 20rpx;
					}
				}
				.fake {
					width: 100%;
					margin: 0 auto;
					height: 120rpx;
					display: flex;
					justify-content: space-around;
					padding-top: 20rpx;
				
					view {
						width: 50rpx;
						height: 50rpx;
						background-color: #fffae5;
						border-radius: 50%;
					}
				}
			}
		}
		
	}
</style>
