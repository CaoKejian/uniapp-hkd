<template>
	<view class="wrapper">
		<view class="body" v-for="(item,index) in arr" :key="index">
			<view class="title">
				{{item.major}}
			</view>
			<view class="fenlei">
				<text v-for="(item,index) in tedian" :key="index">{{item}}</text>
			</view>
			<view class="about">
				<text>学科门类：{{item.menllei}}</text>
				<text>一级学科：{{item.about}}</text>
			</view>
			<view class="jieshao">
				<text class="jieshao-title">专业介绍</text>
				<hr>
				<view class="jieshao-content">
					{{item.jieshao}}
				</view>
			</view>
			<view class="jieshao">
				<text class="jieshao-title">发展前景</text>
				<hr>
				<view class="kaoyan a">
					考研方向：{{item.kaoyan}}
				</view>
				<view class="jiuye a">
					就业方向：{{item.jiuye}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr: [],
				index: "",
				tedian: []
			};
		},
		onLoad(e) {
			uniCloud.database().collection('major').where({
				id: Number(e.id)
			}).get().then(res => {
				this.arr = res.result.data
				this.tedian = res.result.data[0].tedian
				console.log(this.tedian);
			})

		}
	}
</script>

<style lang="scss">
	.dian{
		font-size: 30px;
		text-align: center;
	}
	.wrapper {
		width: 100%;
		background-color: #fffae5;
		height: 100vh;

		.body {
			padding-top: 20px;
			padding-left: 15px;

			.title {
				font-size: 30px;
				letter-spacing: 1px;
			}

			.fenlei {
				margin-top: 40px;

				text {
					padding: 3px 10px;
					border: 2px solid #eec82a;
					border-radius: 30rpx;
					margin-right: 10px;
					color: #eec82a;
					background-color: #fff;
				}
			}

			.about {
				margin-top: 40px;
				display: flex;
				font-size: 16px;
				flex-direction: column;
			}

			.jieshao {
				width: 95%;
				margin-top: 60px;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				border-radius: 15px;
				.jieshao-title{
					text-align: center;
					color: #706E6B;
					font-size: 16px;
					height: 80rpx;
					line-height: 80rpx;
				}
				hr{
					background-color: #D8D8D8;
				}
				.jieshao-content{
					padding: 20px;
					text-indent:30px;
				}
				.a{
					padding: 20px 20px 0 20px;
					display: flex;
					align-items: flex-start;
				}
				.jiuye{
					padding-bottom: 20px;
				}
			}
		}
	}
</style>
