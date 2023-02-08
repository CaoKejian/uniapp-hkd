<template>
	<view class="wrapper">
		<view class="item">
			<view class="dateName">
				<text>输入节日名称：</text>
				<input type="text" @input="datename">
			</view>
			<view class="datetime-picker">
				<text>节日开始时间：</text>
				<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick"
					@change="change" />
			</view>
		</view>
		<button @click="baocun">保 存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				single:'',
				// 选择的日期
				selectDate: "",
				// 倒计时
				iDays: "",
				// 节日名称
				dateName:"",
				infoObj:{
					name:"",
					publishDate:""
				},
				name:''
			};
		},
		methods:{
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			datename(e){
					this.dateName = e.detail.value
			},
			change(e) {
				this.selectDate= e
				// this.timeProcessing(this.selectDate)
				// this.jisuan(this.selectDate)
			},
			//转换时间戳写法
			timeProcessing(selectDate){
			    let Time = new Date(selectDate);
			    console.log(Time)//Mon Jun 24 2019 11:08:48 GMT+0800 (中国标准时间)
			    this.publishDate = Time.getTime();
			    console.log("转换好的时间戳",this.infoObj.publishDate)//1561345728000
			},
			jisuan(sDate1) {
				let date2 = new Date(); //当前时间
				let date1 = new Date(Date.parse(sDate1.replace(/-/g, "/")));
				let iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);
				this.iDays = iDays;
			},
		baocun(){
			if(this.dateName!==''&&this.selectDate!==''){
				this.infoObj.name = this.dateName
				this.infoObj.publishDate =this.selectDate
				console.log(this.infoObj);
				uni.showLoading({
					title:"正在保存"
				})
				uniCloud.database().collection('userinfo').where(`name=='${this.name}'`).get().then(res=>{
					if(res.result.data.length==0){
						uni.showToast({
							title:'还未登陆',
							icon:"none"
						})
					}else{
						uniCloud.database().collection('userinfo').where(`name=='${this.name}'`).update({
							dateobj:this.infoObj
						}).then(res=>{
							console.log("山川成功",res);
							uni.hideLoading()
							uni.showToast({
								title:'保存成功'
							})
						})
					}
				})
			}else{
				uni.showToast({
					title:'信息未填写完整',
					icon:"none"
				})
			}
		}
		},
		onLoad() {
			this.name = uni.getStorageSync('name').name
		},
		onShow() {
			const name = uni.getStorageSync('name').name
			if(!name){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.wrapper{
	width: 100%;
	background-color: #fffae5;
	height: 100vh;
	.item{
		width: 100%;
		padding-left: 70rpx;
		color: #9E6D38;
		font-size: 16px;
		text-align: center;
		.dateName{
			padding-top: 80rpx;
			display: flex;
			justify-content: flex-start;
			input{
				margin-left: 30rpx;
				border-bottom: 1px solid #f3d163;
				padding-left: 10rpx;
			}
		}
		.datetime-picker{
			width: 80%;
			margin-top: 100rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.uni-date{
				margin-left: 30rpx;
				width: 300rpx;
				flex: 1;
			}
		}
	}
}
button{
	margin-top: 100rpx;
	background-color: #e7b203;
	width: 70%;
	color: #fff;
}
</style>
