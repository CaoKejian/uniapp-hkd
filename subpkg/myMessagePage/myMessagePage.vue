<template>
	<view class="wrapper">
		<view class="item-f">
			<view class="item " :class="current==index?'active':''" v-for="item,index in items" :key="index"
				@click="clickIndex(index)">
				<image :src='item.imgsrc' mode=""></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="container" v-if="current==0">
			<view class="item" v-for="item,index in userId" :key="index" @click="gotoDetail(item.article_id)">
				<view class="info">
					<view class="left">
						<image :src="item.user_touxiang"  mode="aspectFill"></image>
						<uni-dateformat :date="item.publish_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
							</uni-dateformat>
					</view>
					<view class="right">
						<text class="name">{{item.user_nicheng}}</text>
						<text class="some">赞了你的长文</text>
					</view>
				</view>
				<view class="pic">
					<image v-if="item.articlePic.length!==0"  @error="imageError1($event, index, i)" :src="isShowTitle1?truePic1:item.articlePic[0]"  mode="aspectFill"></image>
					<text  v-if="item.articlePic.length==0">{{item.articleTitle}}</text>
				</view>
			</view>
		</view>
		<view class="container" v-if="current==1">
			<view class="item" v-for="item,index in commentArr" :key="index" >
				<view class="info">
					<view class="left">
						<image :src="item.user_touxiang"  mode="aspectFill"></image>
						<uni-dateformat :date="item.comment_date" format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
							</uni-dateformat>
					</view>
					<view class="right">
						<text class="name">{{item.user_nicehng||item.user_id}}
							<text class="name-bottom" v-if="!item.reply_user_id">评论：</text>
							<text class="name-bottom" v-if="item.reply_user_id">回复：</text>
							<text v-if="item.reply_user_id">@{{item.reply_user_id}}</text></text>
						<text class="some">{{item.comment_content}}</text>
					</view>
				</view>
				<view class="pic" >
					<image v-show="item.artPicurls.length!==0"  :src="isShowTitle?truePic:item.artPicurls[0]"  @error="imageError($event, index, i)" mode="aspectFill"></image>
					<text v-show="item.artPicurls.length==0">{{item.artTitle}}</text>
					<text v-if="!item.artPicurls&&!item.artTitle">{{item.comment_content}}</text>
				</view>
			</view>
		</view>
		<view class="boss" v-if="current==2">
			<view class="boss-item">
				<text>暂无通知</text>
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
				items:[
					{name:'赞我的',imgsrc:require('../../static/message/Heart 2.png')},
						{name:'评论我的',imgsrc:require('../../static/message/chat-1-line 6.png')},
						{name:'官方通知',imgsrc:require('../../static/message/notification-2-line.png')}
				],
				current: 0,
				article: [],
				userId: [],
				oldArr1: [],
				// 第二模块
				article1:[],
				commentArr:[],
				isShowTitle:false,
				isShowTitle1:false,
				truePic:'',
				truePic1:''
			};
		},
		methods: {
			//imageError
			imageError(e,index,i){
				console.log(e,index,i);
				if(e.type=='error'){
					// 显示默认图片
					this.isShowTitle = true
					this.truePic = '../../static/morentouxiang.jpg'
					this.commentArr[index].artPicurls[0]==this.truePic
					console.log(this.commentArr[index].artPicurls[0]);
				}
				
			},
			imageError1(e,index,i){
				console.log(e,index);
				// morentouxiang
				if(e.type=='error'){
					this.isShowTitle1= true
					this.truePic1 = '../../static/morentouxiang.jpg'
					console.log(this.userId[index]);
					this.userId[index].artPicurls[0]==this.truePic
				}
			},
			clickIndex(index) {
				this.current = index
			},
			// 跳转
			gotoDetail(id){
				uni.navigateTo({
					url:'/subpkg/blogDetail/blogDetail?id='+id
				})
			},
			// 获取点赞用户
			// 1.统计你发布的所有文章
			// 2.获取每一篇文章点赞的用户user_Id
			// 3.拼接数组
			getLikeUser() {
				const name = uni.getStorageSync('name').name
				db.collection('article').where(`user_id=='${name}'`).field('_id,title,picurls,touxiang,user_nicheng,user_touxiang').get().then(async res => {
					console.log(res.result.data);
					this.article = res.result.data
					const idArr = this.article.map(item => {
						return item._id
					})
					for (let i = 0; i < idArr.length; i++) {
						console.log(idArr[i]);
						const likeRed1 = await db.collection('articlelike').where(`article_id=='${idArr[i]}'`).orderBy('publish_date desc')
							.get()
						const oldArr = likeRed1.result.data
						this.userId = [...oldArr, ...this.userId]
					}
					console.log("对比", this.userId);
				})
			},
		
			// 获取评论我的
			// 1.我发布的文章下边的评论
			// 2.二级评论我的
			getCommentUser(){
				const name = uni.getStorageSync('name').name
				db.collection('article').where(`user_id=='${name}'`).field('_id,title,picurls,touxiang,user_nicheng,user_touxiang').get().then(async res=>{
					this.article1 = res.result.data
					console.log(this.article1);
					const newId = this.article1.map(item=>{
						return item._id
					})
					console.log(newId);
					for (let i = 0; i < newId.length; i++) {
						const newComment = await db.collection('articleComment').where(`article_id=='${newId[i]}'`).field(`comment_content,_id,user_id,user_touxiang,comment_date,comment_type,reply_user_id,reply_comment_id,artTitle,artPicurls`).orderBy('comment_date desc').get()
						const oldArr = newComment.result.data
						this.commentArr = [...oldArr,...this.commentArr]
						console.log(this.commentArr);
					}
				})
			}
		},
		onLoad() {
			this.getLikeUser()
			this.getCommentUser()
			
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
	.wrapper {
		width: 100%;
		// height: 100vh;
		height: auto;
		min-height: 100vh;
		background-color: #fffae5;
		padding-bottom: 30rpx;

		.item-f {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.active {
				border-bottom: 2px solid #E7B203;
			}

			.item {
				text-align: center;
				margin-top: 30rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: -15%;
				}

				text {
					margin-left: 10rpx;
				}
			}
		}
		.container{
			width: 90%;
			margin: 0 auto;
			margin-top: 50rpx;
			border-radius: 30rpx;
			background-color: #fff;
			.item{
				width: auto;
				padding: 50rpx 40rpx;
				display: flex;
				justify-content: space-between;
				padding-bottom: 30rpxs;
				// border-top-left-radius: 30rpx;
				// border-top-right-radius: 30rpx;
				.info{
					display: flex;
					.left{
						display: flex;
						flex-direction: column;
						color: #B0ADAB;
						image{
							margin-bottom: 25rpx;
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
						}
						
					}
					.right{
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 40rpx;
						.name{
							color: #9E6D38;
							font-size: 16px;
							margin-bottom: 30rpx;
							.name-bottom{
								margin-left: 10rpx;
							}
						}
						.some{
							color: #3D3D3D;
							letter-spacing: 1px;
						}
					}
				}
				.pic{
					width: 140rpx;
					height: 140rpx;
					background-color: #efefef;
					border-radius: 25rpx;
					position: relative;
					text{
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
						// line-height: 140rpx;
						color: #706E6B;
						font-size: 14px;
						margin:0 10rpx;
					}
					image{
						width: 140rpx;
						height: 140rpx;
						border-radius: 25rpx;
					}
				}
			}
		}
	}
	.boss{
		width: 100%;
		padding-top: 50rpx;
		&-item{

			width: 95%;
			height: 400rpx;
			margin: 0 auto;
			text-align: center;
			line-height: 400rpx;
			border-radius: 30rpx;
			background-color: #fff;
			text{
				color: #D3CECE;
				font-size: 22px;
				letter-spacing: 1px;
			}
		}
	}
</style>
