<template>
	<view class="wrapper">
		<view class="dai">
			<text v-if="isShowSu" class="text">待完成：{{weiItemArr.length}}</text>
			<view class="wei-item" v-for="item,index in weiItemArr" :key="item.fabuDate">
				<uni-swipe-action-item :right-options="options" :auto-close="autoClose" @click="onClick"
					@change="swipeChange($event,item,index)">
					<view class="item" >
						<checkbox @click="check(item,index)"></checkbox>
						<uni-icons v-if="item.isImportant" color="#ffbe5b" type="star-filled" size="20"></uni-icons>
						<view class="itemName"><span>{{item.name}}</span></view>
						<uni-dateformat :date="item.fabuDate" :threshold="[60000,3600000*24*30]"></uni-dateformat>
					</view>
				</uni-swipe-action-item>
			</view>
		</view>
		<view class="yi">
			<text v-if="isShowSu" class="text">已完成：{{yiItemArr.length}}</text>
			<view class="wei-item" v-for="item,index in yiItemArr" :key="item.fabuDate">
				<uni-swipe-action-item :right-options="options" :auto-close="autoClose" @click="onClick1"
					@change="swipeChange($event,item,index)">
					<view class="item">
						<checkbox @click="check1(item,index)" checked="false"></checkbox>
						<uni-icons v-if="item.isImportant" color="#ffbe5b" type="star-filled" size="20"></uni-icons>
						<view class="itemName"><span>{{item.name}}</span></view>
						<uni-dateformat :date="item.fabuDate" :threshold="[60000,3600000*24*30]"></uni-dateformat>
					</view>
				</uni-swipe-action-item>

			</view>
		</view>
		<view class="wrapper1">
		<uni-easyinput ref="uipt" @confirm="goComment" suffixIcon="paperplane"  v-model="replyContent" :placeholder="placeholder"  @iconClick="goComment"></uni-easyinput>
			</view>
	</view>
</template>

<script>
	export default {
		props:{
			"isShowSu":{
				type:Boolean,
				default(){
					return true
				}
			},
			"isshowMseeage":{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data() {
			return {
				placeholder: '新增一项待办吧~',
				autoClose: false,
				isImportant: false,
				replyContent:"",
				options: [{
					text: '重要',
					style: {
						backgroundColor: '#ffbe5b',
						marginLeft: '10'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				fabuDate: '',
				selectItem:[],
				selectItemIndex:'',
				obj:{},
				weiItemArr: [
					{
						name:"这是一条测试事项，右滑删除",
						fabuDate:"2023-01-15 18:26:21",
						checked:false,
						isImportant:false
					}
				],
				yiItemArr: [
					{
						name:"这是一条测试事项，右滑删除",
						fabuDate:"2023-01-15 18:26:21",
						checked:true,
						isImportant:false
					}
				],
				inputobj:{
					name:"",
					fabuDate:"",
					checked:false,
					isImportant:false
				}
			}
		},
		methods: {
			check(item,e){
				this.weiItemArr.splice(e,1)
				this.yiItemArr.push(item)
					this.localStorage()
					this.weiItemArr = uni.getStorageSync('weiItemArr')
			},
			check1(item,e){
				this.yiItemArr.splice(e,1)
				this.weiItemArr.push(item)
				this.localStorage()
			},
			swipeChange(){
				
			},
			onClick(e) {
					// 重要显示
					if(e.content.text=='重要'){
						this.selectItem.isImportant = !this.selectItem.isImportant
						// 数组重要变为第一项
						this.weiItemArr.forEach((item,index)=>{
							if(item==this.selectItem){
								this.obj = item
								this.weiItemArr.splice(index,1)
								return
							}
						})
						this.weiItemArr.unshift(this.obj)
						this.localStorage()
					}else if(e.content.text=='删除'){
						this.weiItemArr.splice(this.selectItemIndex,1)
						this.localStorage()
					}
					
			},
			onClick1(e){
				// 重要显示
				if(e.content.text=='重要'){
					this.selectItem.isImportant = !this.selectItem.isImportant
					// 数组重要变为第一项
					this.yiItemArr.forEach((item,index)=>{
						if(item==this.selectItem){
							this.obj = item
							this.yiItemArr.splice(index,1)
							return
						}
					})
					this.yiItemArr.unshift(this.obj)
					this.localStorage()
				}else if(e.content.text=='删除'){
					this.yiItemArr.splice(this.selectItemIndex,1)
					this.localStorage()
				}
			},
			swipeChange(e,item, index) {
				this.selectItem = item
				this.selectItemIndex = index
			},
			// 存储本地
			localStorage(){
				uni.setStorageSync('weiItemArr', this.weiItemArr);
				uni.setStorageSync('yiItemArr', this.yiItemArr);
			},
			goComment(){
				//获取当前时间
				var timestamp=new Date().getTime()
				this.happenTimeFun(timestamp)
				if(this.replyContent==''){
					uni.showToast({
						title:'输入不能为空哦！',
						icon:"none"
					})
					return
				}
					this.inputobj = {name:"",
					fabuDate:"",
					checked:false,
					isImportant:false}
				this.inputobj.name = this.replyContent
				this.inputobj.fabuDate = this.fabuDate
				this.weiItemArr.unshift(this.inputobj)
				// this.weiItemArr.splice(0,0,this.inputobj)
				 this.replyContent=[]
				this.localStorage()
			},
			happenTimeFun(num){//时间戳数据处理
				let date = new Date(num);
				 //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;//月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;//天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;//小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;//分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;//秒补0
				this.fabuDate = `${y}-${MM}-${d} ${h}:${m}:${s}`
				return y + '-' + MM + '-' + d + ' ' + h + ':' + m+ ':' + s;
			},
		},
		created() {
			if(this.isshowMseeage){
				this.placeholder = '添加一个快递单号吧~~'
			}
			this.weiItemArr = uni.getStorageSync('weiItemArr', this.weiItemArr);
			this.yiItemArr = uni.getStorageSync('yiItemArr', this.yiItemArr);
			if(this.weiItemArr.length == 0||this.yiItemArr.length == 0){
				this.localStorage()
				this.weiItemArr = [
					{
						name:"这是一条测试事项，右滑删除",
						fabuDate:"2023-01-15 18:26:21",
						checked:false,
						isImportant:false
					}
				]
				this.yiItemArr = [
					{
						name:"这是一条测试事项，右滑删除",
						fabuDate:"2023-01-15 18:26:21",
						checked:true,
						isImportant:false
					}
				]
			}

		}
	}
</script>

<style lang="scss">
	/deep/ uni-swipe-action-item{
		width: 100%;
	}
	uni-text {
		color: #3574ff;

	}
	.text{
		display: block;
		padding: 40rpx 58rpx;
	}
.wrapper1{
	width: 100%;
	background: #fff;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 100;
}
	.wrapper {
		width: 100%;
		height: calc(100vh - 47px);
		background-color: #fffae5;

		.dai {
			.wei-item {
				width: 85%;
				margin: 0 auto;
				margin-bottom: 20rpx;
				background-color: #fff;
				display: flex;
				.uni-swipe {
					width: 100%;
					height: auto;
					background-color: #fff;
					margin: 0 auto;
					border-radius: 15rpx;
					.item {
						width: 100%;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						border-radius: 15rpx;
						align-items: center;
						height: auto;
						min-height: 80rpx;
						padding: 10rpx 20rpx;

						.itemName {
							letter-spacing: 1px;
							margin-left: 10rpx;
							flex: 1;
							margin-right: 10rpx;
							word-break: break-all;
							word-wrap: break-word;
						}
						
					}
				}
			}
		}

		.yi {
			.wei-item {
				width: 85%;
				margin: 0 auto;
				margin-bottom: 20rpx;
				background-color: #fff;
				display: flex;
				.uni-swipe {
					width: 100%;
					height: auto;
					background-color: #fff;
					margin: 0 auto;
					border-radius: 15rpx;
					
					.item {
						width: 100%;
						display: flex;
						box-sizing: border-box;
						justify-content: space-between;
						border-radius: 15rpx;
						align-items: center;
						height: auto;
						min-height: 80rpx;
						padding: 10rpx 20rpx;
						.itemName {
							letter-spacing: 1px;
							flex: 1;
							margin-left: 10rpx;
								text-decoration:line-through;
								color: #cecece;
						}
					}
				}
			}
		}
	}
</style>
