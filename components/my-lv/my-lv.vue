<template>
	<view class="wrapper">
		<view class="bmi">
			<text class="bmi-text">体脂率 计算</text>
		</view>
		<view class="input">
			<view class="gender box">
				<text>请选择你的性别(/cm)：</text>
				<uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
			</view>
			<view class="box">
				<text>请输入你的腰围(/cm)：</text>
				<input type="text" @input="yw1">
			</view>
			<view class="box">
				<text>请输入你的体重(/kg)：</text>
				<input type="text" @input="kg1">
			</view>
		</view>
		<button @click="comput">计算</button>
		<view class="result-item" v-show="result">
			<text>计算结果是：{{result}}</text>
			<image src="../../static/R-C.jpg" mode="widthFix"></image>
		</view>

	</view>
</template>

<script>
	export default {
		name: "my-lv",
		data() {
			return {
				value: 0,
				range: [{
					"value": 0,
					"text": "男"
				}, {
					"value": 1,
					"text": "女"
				}],
				kg: "",
				yw: "",
				gender:'',
				
				a:"",
				b:'',
				c:"",
				result:"",
				
			};
		},
		methods:{
			change(e){
				this.gender = e.detail.data.text
			},
			comput(){
				if(this.gender =='女'){
					this.a = this.yw*0.74
					this.b = this.kg*0.082+34.89
					this.c = this.a-this.b
					const resu = (this.c/this.kg)*100
					this.result = resu.toFixed(2)
					return
				}
					console.log(123);
					this.a = this.yw*0.74
					this.b = this.kg*0.082+44.74
					this.c = this.a-this.b
					const resu = (this.c/this.kg)*100
					this.result = resu.toFixed(2)
			},
			yw1(e){
				this.yw = e.detail.value
			},
			kg1(e){
				this.kg = e.detail.value				
			},
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

	.wrapper {
		width: 100%;
		height: 100vh;
		background-color: #fffae5;
		.result-item{
			padding: 20rpx 20rpx;
			image{
				width: 100%;
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
			// justify-content: space-around;
			// align-items: center;
			background-color: #fff;
			padding: 0 20rpx;
			border-radius: 25rpx;
			margin-top: 50rpx;
			.box {
				width: 90%;
				margin: 0 auto;
				height: 140rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				&:nth-child(1){
					margin-top: 20rpx;
				}
				&:nth-child(3){
					margin-bottom: 20rpx;
				}
				text{
					flex: 1;
				}
				input {
					width: 50%;
					border-bottom: 2px solid #ffca2a;
					text-align: center;
				}
			}
		}
	}
</style>
