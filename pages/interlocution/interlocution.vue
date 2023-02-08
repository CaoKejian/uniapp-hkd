<template>
	<view class="wrapper">
		<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
			@clickItem="onClickItem" />
			<uni-search-bar @confirm="search" @input="input" @clear="clear" radius="20" bgColor="#eeeeee" cancelButton="none"></uni-search-bar>

		<view class="content">
			<view v-if="current === 0">
				<view class="container">
					<view v-if="!IssearchArr"  class="item" v-for="(item,index) in dataList" :key="index">
						<my-blogItem :item="item" v-if="forceRefresh" :isLike.sync="item.isLike" :like_count.sync="item.like_count"></my-blogItem>
					</view>
					<view class="wrapper1" v-if="IssearchArr">
						<view  class="item" v-for="(item,index) in searchArr" :key="index">
							<my-blogItem :item="item" v-if="forceRefresh" :isLike.sync="item.isLike" :like_count.sync="item.like_count"></my-blogItem>
						</view>
					</view>
					
				</view>
				<view class="">
					<uni-load-more :status="uniloading"></uni-load-more>
				</view>
			</view>
			
			<view v-if="current === 1">
				<view class="container">
					<view class="item" v-for="(item,index) in zuirelist" :key="index">
						<my-blogItem :item="item" v-if="forceRefresh" :isLike.sync="item.isLike" :like_count.sync="item.like_count"></my-blogItem>
					</view>
				</view>
				<view class="">
					<uni-load-more :status="uniloading"></uni-load-more>
				</view>
			</view>
			
		</view>
		<uni-fab :pattern="pattern"  horizontal="right" vertical="bottom" direction="horizontal"
			:popMenu="true" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				items: ['最新', '最热'],
				current: 0,
				activeColor: '#007aff',
				styleType: 'text',
				title: 'uni-fab',
				directionStr: '垂直',

				pattern: {
					color: 'gray',
					backgroundColor: '#FFFFFF',
					selectedColor: '#007AFF',
					buttonColor: 'orange'
				},
				dataList:[],
				zuirelist:[],
				uniloading:"more",
				uniloading2:"more",
				forceRefresh :true,
				IssearchArr:false,
				searchArr:[]
			};
		},
		onReachBottom() {
			this.uniloading='loading'
			this.getData()
		},
		methods: {
			onClickItem(e) {
				
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			 getData(){
				 uni.showLoading({
				 	title:'正在加载'
				 })
				db.collection('article').field('title,user_id,user_nicheng,user_touxiang,description,picurls,comment_count,like_count,view_count,publish_date').orderBy('publish_date desc').skip(this.dataList.length).limit(5).get().then( async res=>{
					uni.hideLoading()
						// 比较 看谁点过赞 高亮显示
							let idArr = []
							let oldArr=this.dataList
							if(res.result.data.length==0){
								this.uniloading='noMore'
							}
							let redDataArr=[...this.dataList,...res.result.data]
							if(this.name){
							redDataArr.forEach(item=>{
								idArr.push(item._id)
							})
							const likeRes = await db.collection('articlelike').where({
								article_id:dbCmd.in(idArr),
								user_id:this.name
							}).get()
							likeRes.result.data.forEach(item=>{
								let findIndex = redDataArr.findIndex(find=>{
									return item.article_id == find._id
								})
								redDataArr[findIndex].isLike = true
							})
						}
					
					this.dataList = redDataArr
				})
				db.collection('article').field('title,user_id,user_nicheng,user_touxiang,description,picurls,comment_count,like_count,view_count,publish_date').orderBy('view_count desc').skip(this.zuirelist.length).limit(5).get().then(async res=>{
					uni.hideLoading()
					let oldArr=this.zuirelist
					let idArr = []
					if(res.result.data.length==0){
						this.uniloading='noMore'
					}
					let redDataArr=[...this.zuirelist,...res.result.data]
					// 比较 看谁点过赞 高亮显示
					if(this.name){
						redDataArr.forEach(item=>{
							idArr.push(item._id)
						})
						const likeRes = await db.collection('articlelike').where({
							article_id:dbCmd.in(idArr),
							user_id:this.name
						}).get()
						likeRes.result.data.forEach(item=>{
							let findIndex = redDataArr.findIndex(find=>{
								return item.article_id == find._id
							})
							redDataArr[findIndex].isLike = true
						})
					}
					this.zuirelist = redDataArr
				})
			},
			fabClick() {
				uni.$showLogin()
				uni.navigateTo({
					url:'/subpkg/edit/edit'
				})
			},
			// 搜索
			search(e){
				if(e.value===""){
					uni.showToast({
						title:"搜索不能为空",
						icon:"none"
					})
					return
				}
				uni.showLoading({
					title:"正在搜索",
				})
				const db = uniCloud.database()
				db.collection('article').where({
					content:new RegExp(e.value,"ig")
				}).get().then(res=>{
					console.log(res);
					if(res.result.data.length==0){
						uni.showToast({
							title:"查不到搜索内容",
							icon:"none"
						})
						return
					}
					this.IssearchArr = true
					this.searchArr=res.result.data
					uni.hideLoading()
				})
			},
			// 清除
			clear(){
				this.IssearchArr = false
			},
			input(e){
				if(e==""){
					this.IssearchArr = false
				}
			}
			
		},
	
		onShow() {
			this.name = uni.getStorageSync('name').name
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
			uni.stopPullDownRefresh()
		}

	}
</script>

<style lang="scss">
	.wrapper{
	background-color: #fffae5;
	}
	// .uni-searchbar{
	// 	float: right;
	// 	top: 0;
	// 	right: 10rpx;
	// 	width: 70%;
	// 	position: relative;
	// }
	.segmented-control {
		height: 50px;
		padding-top: 10rpx;
	}
	.segmented-control {
		width: 20%;
	}
	.content{
		padding: 25rpx;
		.container{
			.wrapper1{
				height: 100vh;
			}
		}
		
		.item{
			border-radius: 10rpx;
			padding: 30rpx;
			background-color: #fff;
			border-radius: 30rpx;
			margin-bottom: 35rpx;
		}
	}

</style>
