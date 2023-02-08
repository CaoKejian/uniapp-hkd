<template>
	<view class="wrapper">
		<view class="wrapper-item">
			<view class="fake">
				<view></view>
				<view></view>
				<view></view>
			</view>
			<view @click="showDrawer(item.title)" class="wrapper-item-library" v-for="item in lbraryOne" :key="item.id">{{ item.title }}</view>
		</view>
		
		<uni-drawer ref="showRight" mode="left" :width="320" :mask-click="true">
			<scroll-view style="height: 100%;" scroll-y="true">
					<view class="son" v-for="i in son" :key="i.id">
						<view class="son-s" @click="goto(i.link)">
							{{i.title}}
						</view>
						<uni-icons type="right" color='#b1b1b1' size="20"></uni-icons>
				</view>
			</scroll-view>
		</uni-drawer>
		<web-view v-if="isClick" :src="path"></web-view>
	</view>
</template>
<script>
	export default {
		props:['lbraryOne'],
		data() {
			return {
				son: [],
				title:'',
				statusBarHeight:0,
				isClick:false,
				path:''
			}
		},
		methods: {
			goto(link){
				this.path = link
				this.isClick = true
				this.closeDrawer()
				// uni.navigateTo({
				// 	url:'/pages/webview/webview?webview=' + link
				// })
			},
			showDrawer(title) {
				uni.showLoading({
					title:'正在加载'
				})
				this.title = title
				this.getChildren()
				this.$refs.showRight.open();
			},
			closeDrawer() {
				
				this.$refs.showRight.close();
			},
			getChildren(){
				uniCloud.database().collection('libraryA').where(`title=='${this.title}'`).field('children').get().then(res => {
					this.son = res.result.data[0].children
					uni.hideLoading()
					console.log(this.son);
				})
			}
		},
		created() {
		}

	}
</script>

<style lang="scss" scoped>
	.wrapper {
		width: 100%;
		height: 100vh;
		// height: calc(100vh - 44px);
		background-color: #fffae5;
		&-item{
			width: 80%;
			margin: 0 auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			padding: 30rpx;
			background-color: #fff;
			border-radius: 30rpx;
			.fake{
				width: 80%;
				margin: 0 auto;
				height: 120rpx;
				display: flex;
				justify-content: space-around;
				padding-top:20rpx ;
				view{
					width: 50rpx;
					height: 50rpx;
					background-color: #fffae5;
					border-radius: 50%;
				}
			}
			&-library {
				width: 90%;
				margin: 0 auto;
				height: 100rpx;
				margin-bottom: 70rpx;
				text-align: center;
				line-height: 100rpx;
				border-radius: 30rpx;
				background-color: #ffeb99;
				color: #9E6D38;
				font-size: 16px;
				letter-spacing: 1px;
			}
		}
	}
	::v-deep .uni-drawer {
		position: absolute;
	}
	
	.son{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 6vh;
		width: 93%;
		line-height: 6vh;
		letter-spacing: 1px;
		padding-left:30rpx ;
		border-bottom: 1px solid #D8D8D8;
		&-s{
			width: 93%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>
