<template>
	<view class="wrapper">
		<view class="icon" v-show="clubList.length">
			<!-- <uni-icons type="folder-add" color="white" size="30" ></uni-icons> -->
			<view class="add">
				<view class="fake"></view>
				<view class="add-left" @click="upload">
					<image src="../../static/club/play-list-add-fill.png" ></image>
					<text>加入社团</text>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="container">
					<view class="neibu">
						<view class="mokuai">
							<text>姓名：</text>
							<input type="text" @input="Name">
						</view>
						<view class="mokuai">
							<text>性别：</text>
							<uni-data-checkbox v-model="value" :localdata="range" @change="change"></uni-data-checkbox>
						</view>
						<view class="mokuai">
							<text>申请社团：</text>
							<input type="text" @input="toclubName">
						</view>
						<view class="mokuai">
							<text>申请日期：</text>
							<uni-datetime-picker type="date" :clear-icon="false" v-model="single" @maskClick="maskClick"
								@change="changeDate" />
						</view>
						<view class="mokuai">
							<text>所属专业：</text>
							<input type="text" @input="fromsuggest">
						</view>
						<view class="mokuai">
							<text>联系电话：</text>
							<input type="text" @input="telephone">
						</view>
						<view class="mokuai">
							<text>自我简介：</text>
							<textarea class="shuru" @input="myinfo" name="" id="" cols="30" rows="10"></textarea>
						</view>
						<view class="mokuai">
							<text>入社理由：</text>
							<textarea  class="shuru" @input="reason"  name="" id="" cols="30" rows="10"></textarea>
						</view>
						<view class="button">
							<button type="warn" @click="cancelbtn">取消</button>
							<button type="primary" @click="tijiaobtn">提交</button>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view @click="toclub(item)" class="club" v-for="(item,index) in clubList" :key="item.id">
			<view class="clubinfo">
				<image :src="item.img" mode=""></image>
				<view class="info">
					<view class="title">{{item.title}}</view>
					<view class="content">{{item.content}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['clubList', 'nickName'],
		name: "my-club",
		data() {
			return {
				arr: [],
				address: [],
				value: 0,
				range: [{
					"value": 0,
					"text": "男"
				}, {
					"value": 1,
					"text": "女"
				}],
				single: '',
				onloadObj:{
					Name:'',
					gender:"男",
					toClubName:'',
					toTime:'',
					fromSuggest:'',
					telephone:'',
					myinfo:'',
					reason:''
				}
			};
		},
		methods: {
			toclub(item){
				uni.navigateTo({
					url:'/subpkg/clubDetail/clubDetail?item='+JSON.stringify(item)
				})
			},
			upload() {
				this.$refs.popup.open('center')
			},
			maskClick(e) {
				console.log('maskClick事件:', e);
			},
			cancelbtn(){
				this.$refs.popup.close('center')
				uni.showToast({
					title:"提交已取消",
					icon:"none"
				})
			},
			// 确认提交
			tijiaobtn(){
				if(this.onloadObj.Name==''||this.onloadObj.toClubName==''||this.onloadObj.toTime==''||this.onloadObj.fromSuggest==''||this.onloadObj.telephone==''||this.onloadObj.myinfo==''||this.onloadObj.reason==''){
					uni.showToast({
						title:"信息未填写完整",
						icon:"none"
					})
				}else{
					this.$refs.popup.close('center')
					uni.showLoading({
						title:"正在提交"
					})
					uniCloud.database().collection('clubInfo').add({
						toClub:this.onloadObj
					}).then(res=>{
						console.log(res);
					})
					uni.hideLoading()
				}
			},
			// 申请名字
			Name(e){
				this.onloadObj.Name = e.detail.value
			},
			// 申请性别
			change(e) {
				this.onloadObj.gender = e.detail.data.text
			},
			// 申请社团的名字
			toclubName(e){
				this.onloadObj.toClubName = e.detail.value
			},
			// 申请日期
			changeDate(e){
				this.onloadObj.toTime = e
			},
			// 所属专业
			fromsuggest(e){
				this.onloadObj.fromSuggest = e.detail.value
			},
			// 申请电话
			telephone(e){
				this.onloadObj.telephone = e.detail.value
			},
			// 自我简介
			myinfo(e){
				this.onloadObj.myinfo = e.detail.value
			},
			// 入社理由
			reason(e){
				this.onloadObj.reason = e.detail.value
			}
		},
		
	}
</script>

<style lang="scss">
	.wrapper {
		width: 100%;
		background-color: #fffae5;
		padding:0 0 20rpx 0;
	}

	.prop {
		width: 500rpx;
		height: 300rpx;
		background-color: #fff;
	}

	.container {
		width: 600rpx;
		margin: 0 auto;
		margin-top: 30px;
		background-color: #fff;
		padding: 20px;
		border-radius: 30rpx;

		.neibu {
			width: 100%;
			height: 100%;

			.mokuai {
				display: flex;
				justify-content: flex-start;
				margin-bottom: 30px;
				
				input {
					border-bottom: 1px solid #485cd0;
					padding-left: 5px;
					font-size: 13px;
					width: 60%;
				}
				.shuru{
					width: 70%;
					height: 160rpx;
					border: 1px solid #485cd0;
					padding: 5px;
				}
			}
			.button{
				display: flex;
				justify-content: space-around;
				button{
					width: 30%;
				}
			}
		}
	}


	.icon {
		width: 100%;
		height: 60rpx;
		background-color: #fffae5;
		.add{
			height: auto;
			padding: 40rpx 0;
			float: right;
			.add-left{
				margin-right: 30rpx;
				display: flex;
				align-items: center;
				padding: 13rpx 55rpx;
				border-radius: 30rpx;
				background-color: #fcf0c3;
				font-size: 12px;
				image{
					width: 18px;
					height: 18px;
					margin-right: 20rpx;
				}
			}
		}

		.uni-icons {
			float: right;
			padding-right: 10px;
		}
	}

	.club {
		width: 100%;
		margin-top: 40rpx;

		.clubinfo {
			height: auto;
			width: 90%;
			margin: 0 auto;
			margin-bottom: 40px;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			
			image {
				width: 80px;
				height: 80px;
				min-width: 80px;
				border-radius: 50%;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;
				margin-left: 20rpx;

				.title {
					text-align: center;
					color: #9E6D38;
					font-size: 16px;
				}

				.content {
					padding-top: 12rpx;
					border-top: 1px solid #D8D8D8;
					overflow: hidden; //多出的隐藏
					text-overflow: ellipsis; //多出部分用...代替
					display: -webkit-box; //定义为盒子模型显示
					-webkit-line-clamp: 2; //用来限制在一个块元素显示的文本的行数
					-webkit-box-orient: vertical; //从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式）
				}
			}
		}
	}
</style>
