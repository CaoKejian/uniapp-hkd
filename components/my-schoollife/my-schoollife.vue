<template>
	<view class="wrapper">

		<view class="map-instruction">
			<uni-section class="mb-10" title="地图展示" titleFontSize="18px" titleColor='#9E6D38' sub-title="民办博物馆 | 智慧楼 | 体育场···" type="line"></uni-section>
			<map @click="" style="width: 100%; height: 250px;" :latitude="latitude" :longitude="longitude"
				:markers="covers" show-compass=true enable-3D=true>
			</map>
		</view>

		<view class="video-instrusction">
			<uni-section class="mb-10" title="视频介绍" titleFontSize="18px" titleColor='#9E6D38' sub-title="学校 | 餐厅 | 快递···" type="line"></uni-section>
		<!-- 	<view class="example-body">
				<uni-file-picker limit="9" file-mediatype="video" title="最多选择9个视频"></uni-file-picker>
			</view> -->
			<!-- <view class="">
				<text>图片上传</text>
				<uni-file-picker v-model="imageValue" fileMediatype="image" mode="grid" />
			</view> -->
			<view class="video">
				<view class="video-item" @click="toVideoDetail(item._id)" v-for="item,index in videoClass" :key="index">
					<view class="container">
						<view class="video-item-left">
							<image :src="item.img" mode=""></image>
						</view>
						<view class="video-item-right">
							<text class="title">{{item.title}}</text>
							<text class="from">来源：{{item.from}}</text>
							<text class="mount">播放量：{{item.view_coun}}</text>
							<text class="mount">上传时间：
								<uni-dateformat :date=item.publishData format="MM月dd hh:mm"
									:threshold="[60000,3600000*24*30]">
								</uni-dateformat>
							</text>

						</view>
					</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		name: "my-schoollife",
		props: ['videoClass'],
		data() {
			return {
				videoArr: [
					'https://mp-eaea5aba-f234-4a78-9bab-fac0fbaedf79.cdn.bspapp.com/cloudstorage/a590d36a-9bc5-40ea-9629-b187f23b8410.mp4',
					'https://mp-eaea5aba-f234-4a78-9bab-fac0fbaedf79.cdn.bspapp.com/cloudstorage/f607aa70-7fd9-4489-9247-8ce629e4cbc0.mp4'
				],
				imageValue: [],

				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 34.687145645198406,
				longitude: 113.67708206176758,
				covers: [{
					latitude: 34.687145645198406,
					longitude: 113.67708206176758,
					iconPath :'../../static/location.png'
				}, {
					latitude: 34.687145645198406,
					longitude: 113.67708206176758,
					iconPath :'../../static/location.png'
				}]

			};
		},
		methods: {
			//跳转video
			toVideoDetail(id) {
				uni.navigateTo({
					url: '/subpkg/toVideoDetail/toVideoDetail?id=' + id
				})
			},


		},
		created() {
			
		}

	}
</script>

<style lang="scss">
	.uni-section {
		background-color: #fffae5;
	}
	.video {
		width: 100%;
		background-color: #fffae5;
		height: 100vh;

		.video-item {
			width: 100%;
			height: auto;
			padding: 30rpx 40rpx;
			background-color: #fff;

			.container {
				width: 90%;
				height: 100%;
				display: flex;
				justify-content: space-around;

				.video-item-right {
					width: 70%;
					margin-left: 30rpx;
					display: flex;
					flex-direction: column;

					text {
						width: 100%;
					}
					.from{
						color:#ebc00f;
					}
					.mount{
						color: #cbcbcb;
					}
					.title {
						font-size: 18px;
					
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}

				.video-item-left {
					width: 30%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
