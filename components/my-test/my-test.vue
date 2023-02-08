<template>
	<view class="wrapper">
		<uni-search-bar placeholder="请输入你要查找的比赛名称" bgColor="#EEEEEE" @confirm="search" @input="input" @cancel="cancel" @clear="clear"/>
		<view class="search-list" v-show="!istrue">
			<view class="item" v-for="(item,index) in newlist" :key="index">
				<view class="">{{item.title}}</view>
			</view>
		</view>
		<view  class="list-item" v-show="istrue"  v-for="(item,index) in testList1" :key="item.id">
			<view class="t" @click="go(item.address)">
				{{item.title}}
			</view>
		</view>
		<web-view v-if="isClick" :src="path"></web-view>
	</view>
</template>

<script>
	export default {
		name:"my-test",
		props:['testid','testList'],
		data() {
			return {
				testList1:[],
				timer:null,
				istrue: true,
				newlist:[],
				isClick:false,
				path:''
			};
		},
		onBackPress(e){
			console.log(e);
		},
		methods:{
			go(e){
				this.isClick = true
				this.path = e
				// uni.navigateTo({
				// 	url:'/pages/webview/webview?webview=' +e
				// })
			},
			handleMessage(e){
				console.log(e);
			},
			search(res){
				if(res.value==''){
					uni.showToast({
						title:"搜索不能为空",
						icon:"none"
					})
				}
			},
			clear(e){
				this.cancel()
			},
			cancel(e){
				this.newlist = []
				this.istrue = true
			},
		input(e) {
			if (e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					uni.showLoading({
						title: "正在加载"
					})
					const db = uniCloud.database()
					db.collection('test').where({
						title: new RegExp(e, "ig")
					}).get().then(res => {
						uni.hideLoading()
						if (res.result.data.length !== 0) {
							console.log("模糊查询的", res.result.data);
							this.istrue = false
							this.newlist = res.result.data
						}
					}).catch(err => {
						console.log(err);
					})
				}, 500)
				return
			}
			},
		},
		created() {
			setTimeout(()=>{
				this.testList1 = this.testList
			},500)
		},
	}
</script>

<style lang="scss">
.wrapper{
	height: 100%;
	background-color: #fff9e5;
}
.list-item{
	background-color: #fff;
	width: 85%;
	margin: 0 auto;
	height: 100rpx;
	font-size: 16px;
	padding-left: 20px;
	border-radius: 30rpx;
	box-shadow: 5px 5px 3px #d2cfcc;
	.t{
		margin-top: 20px;
		line-height: 100rpx;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.search-list{
	height: 100vh;
	.item{
		width: 90%;
		margin: 0 auto;
		border: 1px solid #e7e7e7;
		background-color: #fff;
		padding: 8px 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>