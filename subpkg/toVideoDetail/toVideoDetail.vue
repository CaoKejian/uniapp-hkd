<template>
	<view class="wrapper">
		<view class="item-f" v-for="item,index in videoItem" :key="index">
			<uni-section class="mb-10" :title="item.title" :sub-title="item.from" type="line"></uni-section>
			<video :src="item.address" :poster="item.img" show-mute-btn=true @loadeddata='loadeddata'
				custom-cache='false' class="video"></video>
			<view class="info">
				<text>发布时间：
					<uni-dateformat :date=item.publishData format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
					</uni-dateformat>
				</text>
				<text>观看量：{{item.view_coun}}</text>
			</view>
		</view>

		<view class="" v-show="videoItem.length" v-if="isshowInput">
			<my-issus :isshowMseeage='isshowMseeage' :isShowSu="isShowSu"></my-issus>
		</view>
	</view>
</template>

<script>
	const utilsObj = uniCloud.importObject('utilsObj', {
		customUI: true
	})
	export default {
		data() {
			return {
				videoId: "",
				videoItem: '',
				isshowMseeage: true,
				isShowSu: false,
				isshowInput:false
			};
		},
		methods: {
			// 加载时触发
			loadeddata() {
				uni.showLoading({
					title: '正在加载'
				})
			},
			getData() {
				uniCloud.database().collection('videoClass').where(`_id=='${this.videoId}'`).get().then(res => {
					console.log(res);
					this.videoItem = res.result.data
				})
			},
			readUpdata() {
				utilsObj.operation('videoClass', "view_coun", this.videoId, 2).then(res => {
					console.log("修改成功",res);
				})
			},
		},
		onLoad(e) {
			this.videoId = e.id
				this.readUpdata()
			this.getData()
			if(!this.videoItem){
				this.isshowInput = false
			}
			if (e.even) {
				console.log(123123);
				this.isshowInput = true
			}
		}
	}
</script>

<style lang="scss">
	.uni-section {
		// 组件
		background-color: #fffae5;
	}
	.uni-section .uni-section-header__decoration[data-v-f7ca1098] {
	    margin-right: 6px;
	    background-color: #f4ffbe;
	}
	.wrapper {
		width: 100%;
		height: 100vh;
		background-color: #fffae5;
	
	.item-f {
			width: 100%;

			.video {
				width: 100%;
			}

			.info {
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
