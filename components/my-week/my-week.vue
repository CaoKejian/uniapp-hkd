<template>
	<view class="wrapper">
		<view class="edit-button">
			<uni-icons type="plusempty" color="#fff" size="25" @click="edit" v-show="isEditJia"></uni-icons>
<uni-icons type="checkmarkempty" color="#fff" size="25" @click="success"  v-show="!isEditJia"></uni-icons>
		</view>
		<view class="courese" v-show="!isShow">
			<view class="top">
				<view class="top-week" v-for="item in weekDay" :key="item.id">
					{{item.title}}
				</view>
			</view>
			<view class="bottom">
				<view class="bottom-left">
					<view class="left-bar" v-for="(item,index) in list" :key="index">
						{{item}}
					</view>
				</view>
				<view class="bottom-right">
					<view :class="item==''?'allcourse':'active'" v-for="(item,index) in newslist" :key="index"
						@click="write(index)">
						<span>{{item}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-show="isShow">
			<my-navbar>
				<template v-slot:title>
					<text>暂无课程表信息</text>
				</template>
			</my-navbar>
		</view>
		<!-- 弹出层 -->
		<view class="drop" v-show="isWrite">
			<view class="input">
				<text>周{{week}} 第{{day}}节</text>
				<input type="text" placeholder="请输入课程名称" @input="classname">
				<input type="text" placeholder="请输入老师名字" @input="teach1">
				<input type="text" placeholder="请输入教室地址" @input="classroom1">
				<view class="button">
					<button @click="Err">删除</button>
					<button @click="right">确定</button>
				</view>
			</view>
		</view>
		<view class="tips">
			<text>tips：今天也要加油呀！</text>
		</view>


	</view>
</template>

<script>
	var classname = ''
	export default {
		name: "my-week",
		props: ['newslist','nickName'],
		data() {
			return {
				isShow: false,
				isEdit: false,
				isWrite: false,
				isEditJia: true,
				list: ["上午1", "上午2", "下午1", "下午2", "晚上"],
				newlist: [],
				linshiIndex: null,
				content: '',
				teach: '',
				classroom: '',
				weekDay: [{
						"id": 0,
						"title": "周",
					}, {
						"id": 1,
						"title": "一",
					},
					{
						"id": 2,
						"title": "二"
					},
					{
						"id": 3,
						"title": "三"
					},
					{
						"id": 4,
						"title": "四"
					},
					{
						"id": 5,
						"title": "五"
					},
					{
						"id": 6,
						"title": "六"
					},
					{
						"id": 7,
						"title": "日"
					},
				],
				week:0,
				day:0
			};
		},
		methods: {

			success() {
				this.isEdit = false
				this.isEditJia = true
				uni.showLoading({
					title: "正在上传"
				})
				uniCloud.callFunction({
					name: "updateUserinfo",
					data: {
						refreshName: this.nickName,
						refreshData: this.newslist
					}
				}).then(res => {
				})
				setTimeout(() => {
					uni.redirectTo({
						url: '/pages/course/course' //写你的路径
					});
				}, 500)
				uni.hideLoading()
			},
			edit() {
				uni.showModal({
					title: "提示",
					content: "进入编辑模式，结束请保存！",
					success: res => {
						if (res.confirm) {
							this.isEdit = true
							this.isEditJia = false
						} else if (res.cancel) {

						}
					}
				})
			},
			write(index) {
				// 点击编辑按钮
				// 点击 跳出弹出框 输入课程名称 老师名 上课地址
				// 保存这些内容 展示在页面上
				if(index>=0&&index<5){
					this.week = '一'
					this.day = index+1
				}else if(index<10){
					this.week = '二'
					this.day = index-4
				}else if(index<15){
					this.week = '三'
					this.day = index-9
				}else if(index<20){
					this.week = '四'
					this.day = index-14
				}else if(index<25){
					this.week = '五'
					this.day = index-19
				}else if(index<30){
					this.week = '六'
					this.day = index-24
				}else if(index<35){
					this.week = '日'
					this.day = index-29
				}
				if (this.isEdit == true) {
					this.isWrite = true
					this.linshiIndex = index
				}
			},
			// 监听
			classname(e) {
				classname = e.detail.value
			},
			teach1(e) {
				this.teacher = e.detail.value
				console.log("this.teacher:", e.detail.value);
			},
			classroom1(e) {
				this.classrooms = e.detail.value
			},
			right() {
				this.content = classname
				if (this.content == '' && this.teacher == undefined && this.classrooms == undefined) {
					this.newslist.splice(this.linshiIndex, 1, '')
					this.isWrite = false
					return
				}
				if (this.content == '') {
					uni.showToast({
						title: '您还没有填写课程名！',
						icon: "none"
					})
					return
				}
				if (this.teacher == undefined) {
					this.teacher = '未知'
				}
				if (this.classrooms == undefined) {
					this.classrooms = '未知'
				}
				this.newslist.splice(this.linshiIndex, 1,`${this.content}   @${this.teacher}   by${this.classrooms}`)
				this.isWrite = false
			},
			Err() {
					this.newslist.splice(this.linshiIndex, 1, '')
					this.isWrite = false
			},
			onNavigationBarButtonTap: function(e) {
			}
		},
		created() {
		}
	}
</script>

<style lang="scss">
	.uni-navbar--border[data-v-6bda1a90]{
		border: none;
	}
	.wrapper {
		max-width: 100%;

		.add {
			width: 100%;
			height: 60rpx;

			.add-item {
				letter-spacing: 5px;
				text-align: center;
				font-size: 18px;
				height: 60rpx;
				background-color: #fdea99;
			}
		}
	}

	.courese {
		width: 100%;
		display: flex;
		flex-direction: column;

		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50px;
			border-bottom: 1px solid #9E6D38;
			font-weight: bold;
			border-top: 1px solid #9E6D38;

			.top-week {
				width: 100%;
				height: 100%;
				justify-content: center;
				display: flex;
				align-items: center;
				background-color: #fdea99;

				&:nth-last-child(1) {
					border: none;
				}

				&:nth-child(1) {
					border-right: 1px solid #9E6D38;
				}
			}
		}

		.bottom {
			height: 1300rpx;
			width: 100%;
			display: flex;
			justify-content: space-between;

			.bottom-left {
				width: calc(100% / 8);
				// height: 100%;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				background-color: #ffeb9a;
				border-right: 1px solid #9E6D38;

				.left-bar {
					width: 100%;
					height: calc(260rpx + 1px);
					border-top: 1px solid transparent;
					display: flex;
					align-items: center;
					justify-content: center;
					writing-mode: vertical-lr;
					text-orientation: upright;

					&:nth-child(2) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(4) {
						border-bottom: 1px solid #9E6D38;
					}
				}
			}

			.bottom-right {
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				flex-wrap: wrap;
				// align-items: center;
				height: 100%;
				font-size: 12px;
				padding: 1rpx 0;

				.allcourse {
					background-color: #fff;
					height: calc(260rpx - 1px);
					width: calc((100% / 7) - 1px);
					display: flex;
					align-items: center;
					text-align: center;
					justify-content: center;
					border-right: 1px solid #e7e7e7;
					border-bottom: 1px solid #e7e7e7;
					color: red;
					&:nth-child(2) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(7) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(12) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(17) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(22) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(27) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(32) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(4) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(9) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(14) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(19) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(24) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(29) {
						border-bottom: 1px solid #9E6D38;
					}

					&:nth-child(34) {
						border-bottom: 1px solid #9E6D38;
					}
				}

				.active {
					color: #fff;
					background-color: #ebc00f;
					height: calc(260rpx - 1rpx);
					width: calc((100% / 7) - 1px);
					display: flex;
					align-items: center;
					text-align: center;
					justify-content: flex-start;
					border-right: 1px solid #e7e7e7;
					border-bottom: 1px solid #e7e7e7;
					span{
						max-width: 100%; word-wrap:break-word;
					}
				
				&:nth-child(2) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(7) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(12) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(17) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(22) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(27) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(32) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(4) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(9) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(14) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(19) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(24) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(29) {
					border-bottom: 1px solid #9E6D38;
				}
				
				&:nth-child(34) {
					border-bottom: 1px solid #9E6D38;
				}
					
				}
			}
		}
	}

	.drop {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .4);
		position: absolute;
		top: 0;

		.input {
			border-radius: 30rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			width: 450rpx;
			height: 360rpx;
			transform: translate(-50%, -50%);
			background-color: #fff;
			display: flex;
			justify-content: space-around;
			flex-direction: column;

			.button {
				display: flex;
				justify-content: space-around;
			}

			text {
				margin: 0 auto;
				letter-spacing: 1px;
				font-size: 18px;
			}

			input {
				width: 80%;
				margin: 0 auto;
				border: 1px solid #b6b6b6;
				font-size: 14px;
			}

			button {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 16px;
			}
		}
	}

	.edit-button {
		width: 100%;
		background-color: #fdea99;
		display: flex;
		justify-content: flex-end;
		height: 40rpx;
		padding: 5px 0;

		button {
			width: 100px;
			height: 20px;
		}

		.uni-icons {
			margin-right: 10px;
		}
	}

	.tips {
		width: 100%;
		height: 60px;
		background-color: #ffeb9a;
		text-align: center;
		margin-top: 1px;
		border-top: 1px solid #9E6D38;
		text {
			line-height: 60px;
			font-size: 18px;
			color: #cba867;
		}
	}
</style>
