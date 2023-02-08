<template>
	<view class="wrapper">
		<view class="bmi">
			<text class="bmi-text">BMI (体质指数) 计算</text>
		</view>
		<view class="input">
			<view class="box">
				<text>请输入你的体重(/kg)：</text>
				<input type="text" @input="kgc">
			</view>
			<view class="box">
				<text>请输入你的身高(/cm)：</text>
				<input type="text" @input="mic">
			</view>
		</view>
		<button @click="comput">计 算</button>

		<view class="first"  v-if="!isShowResult">
			<text class="one">
				<text class="a">BMI值是一个中立而可靠的指标。</text><br>
				<text class="a">男性理想BMI指数是22，女性理想BMI指数是19。</text><br>
				<text class="a">BMI不是所有的人群都适合，如下人群不适合:</text><br>
			</text>
			<text class="two">
				·未满18岁；
				·运动员；
				·正在做重量训练；
				·怀孕或哺乳中；
				·做过手术，身上有其他材料的患者；
				·身体虚弱或久坐不动的老人。</text>
		</view>

		<view class="result-body" v-if="isShowResult">
			<text class="result">你的计算结果为：<br>
				<view class="result-f">
					<text class="result-item">{{result}}</text>　(千克/米^2)
				</view>
			</text>
		</view>
		<view class="bijiao result-body" v-if="isShowResult">
			<view class="bijiao-item">
				<text>你的体质类型为：
					<text class="type">{{bodytype}}</text>
				</text>
			</view>
			<view class="bijiao-suggest">
				<text>你的建议是：
					<text class="type">{{bodysuggest}}</text>
				</text>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "my-BMI",
		data() {
			return {
				kg: "",
				mi: "",
				result: "",
				isShowResult: false,
				bodytype: "",
				bodysuggest: ''
			};
		},
		methods: {
			kgc(e) {
				this.kg = e.detail.value
			},
			mic(e) {
				this.mi = e.detail.value/100
			},
			comput() {
				this.bodytype = ''
				this.result = parseFloat(this.kg / (this.mi * this.mi)).toFixed(2)
				if (this.result < 18.5) {
					this.bodytype = '偏瘦'
					this.bodysuggest ='你的身体比较瘦弱，平时需注意补充蛋白质及丰富碳水化合物的来源，常吃早餐以免低血糖；多锻炼身体，增强体魄，增加免疫力；除了正常一日三餐外，最好在两餐间加一顿，一方面能多吃点东西，另一方面避免给胃肠带来压力。'
				} else if (this.result < 24.9) {
					this.bodytype = '正常'
					this.bodysuggest ='你的身体发展非常均衡，将会远离病毒；平时注意多吃蔬菜和蛋白质，要多多注意保持身材，将会持续健康！'
				} else if (this.result < 29.9) {
					this.bodytype = '偏胖'
					this.bodysuggest ='你的身体属于偏胖，首先要尽量少喝饮料、零食、坚果不能吃多，要吃合适的、对身体有益的，一旦吃的量过大，反而给身体增加一些脂肪。其次就是碳水化合物，也就是主食，要控制好摄入量。改掉传统的习惯，并非吃了米饭才算是吃饭了，吃一些蔬菜、水果、肉类和优质蛋白，同样会饱腹。'
				} else if (this.result < 34.9) {
					this.bodytype = '肥胖'
					this.bodysuggest ='你的身体属于肥胖状态，身体各部分压力较大。要注意按时吃饭，不挑食，不暴饮暴食，减少肥肉、等高能量的来源；多健身，塑造身材才能更加健康！'
				} else if (this.result < 39.9) {
					this.bodytype = '重度肥胖'
					this.bodysuggest ='你的身体属于非常肥胖的状态了，这将给你的身体带来极大压力，同时会增加病毒感染的风险。需要科学的体重管理，建议每日记录体重、饮食及运动情况；避免久坐，规律作息，控制进食速度，足量饮水，避免暴饮暴食，减少在外就餐，减少高糖、高脂肪、高盐食物；积极寻求家庭成员及社交圈的鼓励和支持，必要时接受专业减重教育和指导。'
				} else if (this.result >= 40) {
					this.bodytype = '极重度肥胖'
					this.bodysuggest ='你的身体属于非常肥胖的状态了，这将给你的身体带来极大压力，同时会增加病毒感染的风险。需要科学的体重管理，建议每日记录体重、饮食及运动情况；避免久坐，规律作息，控制进食速度，足量饮水，避免暴饮暴食，减少在外就餐，减少高糖、高脂肪、高盐食物；积极寻求家庭成员及社交圈的鼓励和支持，必要时接受专业减重教育和指导。'
				}
				this.isShowResult = true
			}
		},
		onShow() {
			if (this.result == '') {
				this.isShowResult = false
			}
		}
	}
</script>

<style lang="scss">
	button {
		width: 70%;
		background-color: #f3d163;
		margin-top: 100rpx;
		color: white;
		text-align: center;
	}

	.result-body {
		width: 85%;
		margin: 60rpx auto;
		height: 10vh;
		border-radius: 30rpx;
		background-color: #fff;
		padding: 30rpx;

		.result {
			width: 100%;
			position: absolute;

			.result-f {
				display: flex;
				justify-content: flex-start;
				position: absolute;
				left: 50%;
				top: 100rpx;
				transform: translateX(-50%);

				.result-item {
					font-size: 24px;
					margin-right: 20rpx;
				}
			}
		}

	}

	.bijiao {
		height: auto;
		.bijiao-item {
			.type {
				font-size: 20px;
				font-weight: bold;
			}
		}
		.bijiao-suggest{
		}
	}

	.wrapper {
		width: 100%;
		height: 100vh;
		background-color: #fffae5;
		.first{
			padding: 10rpx;
			display: flex;
			flex-direction: column;
			.one{
				color: #B0ADAB;
				padding: 20rpx;
				.a{
					display: block;
					font-size:15px;
				}
			}
			.two{
				color: #B0ADAB;
				padding-left: 30rpx;
				font-size:15px;
				padding-left: 120rpx;
			}
		}
		.bmi {
			width: 100%;
			height: 100rpx;
			padding-top: 50rpx;

			.bmi-text {
				font-size: 26px;
				color: #9E6D38;
				letter-spacing: 3px;
				margin-left: 40rpx;
			}
		}

		.input {
			width: 85%;
			margin: 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			background-color: #fff;
			padding: 0 10rpx;
			border-radius: 25rpx;
			margin-top: 50rpx;
			.box {
				// padding: 0 10rpx;
				height: 140rpx;
				display: flex;
				align-items: center;
				input {
					border-bottom: 2px solid #ffca2a;
					text-align: center;
				}
			}
		}
	}
</style>
