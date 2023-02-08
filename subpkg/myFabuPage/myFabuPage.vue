<template>
	<view class="content">
		<view class="container">
			<view class="total">
				<text>我共发布了<text class="total-num">{{myList.length}}</text>篇长文,共获赞<text class="total-num">{{artLike}}</text></text>
			</view>
			<view  class="item" v-for="(item,index) in myList">
				<my-blogItem :item="item"  :isLike.sync="item.isLike" :like_count.sync="item.like_count"></my-blogItem>
			</view>
		</view>
	</view>
	
</template>

<script>
	const db = uniCloud.database()
	const dbCmd = db.command
	export default {
		data() {
			return {
				myList:[],
				item:[],
				artNum:0,
				artLike:0
			};
		},
		methods:{
			async getTotal(){
				// 统计
				const name = uni.getStorageSync('name').name
				let likeCount = await db.collection('article').where(`user_id=="${name}"`).groupBy('user_id').groupField('sum(like_count) as totalScore').get()
				if(likeCount.result.data.length==0){
					this.artLike = 0
				}else if(likeCount.result.data.length!==0){
					this.artLike = likeCount.result.data[0].totalScore
				}
			},
			async islike(){
				let count = await db.collection('articlelike').where(
					`article_id=='${this.item._id}' &&user_id =='${this.user_id}'`).count()
				console.log("???",count);
			},
			// ceshi 
			getdate(){
				const name = uni.getStorageSync('name').name
				db.collection('article').where(`user_id=="${name}"`).orderBy('publish_date desc').skip(this.myList.length).limit(5).get().then( async res=>{
					console.log("ceshi",res);
					uni.hideLoading()
						// 比较 看谁点过赞 高亮显示
							let idArr = []
							let oldArr=this.myList
							if(res.result.data.length==0){
								this.uniloading='noMore'
							}
							let redDataArr=[...this.myList,...res.result.data]
							if(name){
							redDataArr.forEach(item=>{
								idArr.push(item._id)
							})
							console.log(idArr);
							const likeRes = await db.collection('articlelike').where({
								article_id:dbCmd.in(idArr),
								user_id:name
							}).get()
							console.log(likeRes);
							likeRes.result.data.forEach(item=>{
								let findIndex = redDataArr.findIndex(find=>{
									return item.article_id == find._id
								})
								console.log(findIndex);
								redDataArr[findIndex].isLike = true
							})
						}
					
					this.myList = redDataArr
				})
			}
		},
		onLoad() {
			const name = uni.getStorageSync('name').name
			this.getTotal()
			this.getdate()
			this.islike()
		},
		onShow() {
			const name = uni.getStorageSync('name').name
			if(!name){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style lang="scss">

// `````````````````
.content{
	background-color: #fffae5;
	height: 100vh;
		padding: 25rpx;
		.container{
			.wrapper1{
				height: 100vh;
			}
			.total{
				text-align: center;
				padding: 30rpx;
				font-size: 16px;
				letter-spacing: 1px;
				.total-num{
					color: #CE5353;
					font-size: 22px;
					margin: 0 10rpx;
				}
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
