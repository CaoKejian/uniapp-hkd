<template>
	<view class="wrapper" >
		<view class="public" v-for="(item,index) in publicArr" :key="index">
			<view class="top">
				<image :src="item.img" mode=""></image>
				<text>{{item.name}}</text>
			</view>
			<view class="bottom">
				<text class="bottom-item">{{item.content}}</text>
				<text class="erweima" @click="erweima(item)">二维码</text>
			</view>
		</view>
		<view class="drop" v-show="isDrop" @click="close">
			<image class="erweima" :src="picerweima" @click.stop="cancel" mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['publicArr'],
		name: "my-public",
		data() {
			return {
				isDrop:false,
				picerweima:""
			};

		},
		methods: {
			erweima(i) {
				console.log(i);
				this.picerweima = i.ewm
				// uniCloud.database().collection('public').where(``)
				this.isDrop = true
			},
			close(){
					this.isDrop = false
			}
		},

	}
</script>

<style lang="scss">
	.wrapper {
		width: 100%;
		background-color: #fffae5;
		padding-top: 40px;
	}
	.drop{
		width: 100%;
		height: 100vh;
		background: rgba(0,0,0,0.3);
		position: fixed;
		top: 0;
		z-index:120;
		.erweima{
			width: 300rpx;
			height: 300rpx;
			border-radius: 30rpx;
			position: relative;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.public {
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		&:nth-child(1) {
			// margin-top: 20rpx;
		}

		.top {
			display: flex;
			align-items: center;

			image {
				width: 65px;
				height: 65px;
				border-radius: 50%;
				position: relative;
				z-index: 91;
			}

			text {
				border-radius: 30rpx;
				height: 60rpx;
				z-index: 90;
				background-color: #e7b203;
				text-align: left;
				padding: 5rpx 30rpx 5rpx 60rpx;
				transform: translateX(-20px);
				line-height: 60rpx;
				color: #fff;
				letter-spacing: 1px;
			}
		}

		.bottom {
			background-color: #ffeb99;
			width: 80%;
			position: relative;
			top: -70rpx;
			margin: 0 auto;
			padding: 70rpx 20rpx 30rpx 50rpx;
			border-radius: 25rpx;
			.bottom-item{
				display: block;
				width: 90%;
				margin: 0 auto;
			}
			.erweima {
				float: right;
				margin-right: 18px;
				color: #9e6d38;
			}

			.erweimaPic {
				width: 300rpx;
				height: 300rpx;
			}
		}
	}
	
	.prop{
		position: relative;
		.text{
			position: absolute;
			top: -10rpx;
			right: 0;
			font-size: 24px;
		}
	}
</style>
