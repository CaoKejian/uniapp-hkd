<template>
	<view class="wrapper">
		<view class="item">
			<image src="../../static/body/身体指数-关爱身体.jpg" mode="widthFix"></image>
			<view class="item-list">
				<text></text>
				<image @click="gotoWeight" src="../../static/body/first.png" mode="aspectFill"></image>
				<image @click="gotoBmi" src="../../static/body/second.png" mode="aspectFill"></image>
				<image @click="gotolv" src="../../static/body/third.png" mode="aspectFill"></image>
			</view>
			<image src="../../static/body/身体指数下方渐变..jpg" mode=""></image>
		</view>
		<!-- <my-course ></my-course> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gotoBmi(){
				uni.navigateTo({
					url:'/subpkg/computedBMI/computedBMI'
				})
			},
			gotoWeight(){
				uni.navigateTo({
					url:'/subpkg/computedWeight/computedWeight'
				})
			},
			gotolv(){
				uni.navigateTo({
					url:'/subpkg/computedLv/computedLv'
				})
			},
		},
	}
</script>

<style lang="scss">
.wrapper{
	width: 100%;
	height: 100vh;
	background-color: #fdfee4;
	.item{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		image{
			width: 100%;
		}
		.item-list{
			padding-top: 50rpx;
			width: 100%;
			height: auto;
			background-color: #fff;
			flex: 1;
			text-align: center;
			image{
				width: 80%;
				height: 100rpx;
				margin-top: 50rpx;
			}
		}
	}
}
</style>
