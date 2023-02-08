<template>
	<view class="detail">
		<view class="container">

			<view v-if="loadingstatus">
				<uni-load-more status="loading" iconType="auto"></uni-load-more>
			</view>
			<view v-else>
				<view class="title">{{detailObj.title}}</view>
				<view class="userinfo">
					<view class="avatar">
						<image :src="detailObj.user_touxiang?detailObj.user_touxiang:'../../static/touxiang.png'"
							mode="aspectFill"></image>
					</view>
					<view class="text">
						<view class="name">{{detailObj.user_nicheng||detailObj.user_id}}</view>
						<view class="small">
							<uni-dateformat :date="detailObj.publish_date" format="yyyy年MM月dd hh:mm:ss">
							</uni-dateformat>前 · 发布于{{detailObj.province}}
						</view>
					</view>
				</view>
				<view class="content">
					<rich-text class="rich-text" :nodes="detailObj.content|formatRichText"></rich-text>
				</view>

				<view class="like">
					<view class="btn" :class="detailObj.isLike ?'active':''" @click="clickLike">
						<text class="iconfont icon-good-fill"></text>
						<text>{{detailObj.like_count?detailObj.like_count:''}}</text>
					</view>
					<view class="users">
						<template v-for="item in likeUserArr" >
							<image v-if="item.user_touxiang" :src="item.user_touxiang" mode="aspectFill"></image>
						</template>
					</view>
					<view class="text"><text class="num">{{detailObj.view_count}}</text>人看过</view>
				</view>
			</view>
		</view>
	
		<view class="comment">
			<view class="zanwu" v-if="!commentList.length">暂无评论</view>
			<view class="content" v-if="commentList.length">
				<view class="item" v-for="item in commentList" :key="item.id">
					<my-commentItem :item="item"  :commentObj="commentObj" @removeEnv="removeEnv"></my-commentItem>
				</view>
				<uni-load-more :status="uniloading"></uni-load-more>
			</view>
		</view>
	<my-comment :commentObj="commentObj" @commentEnv="commentEnv" :pushPicurls='pushPicurls' :pushTitle="pushTitle"></my-comment>
	</view>
</template>

<script>
	const db = uniCloud.database()
	const utilsObj = uniCloud.importObject('utilsObj', {
		customUI: true
	})
	export default {
		data() {
			return {
				artid: "",
				loadingstatus: true,
				detailObj: "",
				user_id: "",
				user_nicheng: "",
				user_touxaing:"",
				pushPicurls:'',
				pushTitle:"",
				likeUserArr:[],
				isComment:true,
				commentObj:{
					article_id:"",
					comment_type:0
				},
				commentList:[],
				commentinfo:[],
				uniloading:"more",
			};
		},
		filters: {
			/**
			 * 处理富文本里的图片宽度自适应
			 * 1.去掉img标签里的style、width、height属性
			 * 2.img标签添加style属性：max-width:100%;height:auto
			 * 3.修改所有style里的width属性为max-width:100%
			 * 4.去掉<br/>标签
			 * @param html
			 * @returns {void|string|*}
			 */
			formatRichText(html) { //控制小程序中图片大小
				let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
					match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					return match;
				});
				newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
					match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi,
						'max-width:100%;');
					return match;
				});
				newContent = newContent.replace(/<br[^>]*\/>/gi, '');
				newContent = newContent.replace(/\<img/gi,
					'<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
				return newContent;
			}
		},
			methods: {
				// 错误
				error() {
					uni.showToast({
						title: "参数有误",
						icon: "none"
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/interlocution/interlocution'
						})
					}, 800)
				},
				// 评论成功 回调
				commentEnv(e){
					this.commentList.unshift({
						...this.commentObj,
						...e
					})
				},
				// 删除评论
				removeEnv(e){
					let index = this.commentList.findIndex(item=>{
						return item._id==e.id
					})
					this.commentList.splice(index,1)
				},
				//获取评论
				async getComment(){
					let res = await db.collection('articleComment').where(`article_id=='${this.artid}' && comment_type==0`).orderBy('comment_date desc').skip(this.commentList.length).limit(5).get()
					// 分页
					let oldArr = this.commentList
					let redDataArr=[...this.commentList,...res.result.data]
					if(res.result.data.length==0){
						this.uniloading='noMore'
					}
					
					let idArr = redDataArr.map(item=>{
						return item._id
					})
					const replyArr = await db.collection('articleComment').where({
						reply_comment_id:db.command.in(idArr)
					}).groupBy('reply_comment_id')
					.groupField('count(*) as totalReply').get()
					
					redDataArr.forEach(item=>{
						let index =replyArr.result.data.findIndex(find=>{
							return find.reply_comment_id == item._id
						})
						if(index>-1){
							item.totalReply = replyArr.result.data[index].totalReply
						}
					})
						this.commentList = redDataArr
						console.log(this.commentList);
						uni.hideLoading()
				},
				getData() {
					let likeTemp = db.collection('articlelike').where(`user_id=='${this.user_id}'`).getTemp()
					let artTemp = db.collection('article').where(`_id=="${this.artid}"`).getTemp()
					
					db.collection(artTemp, likeTemp).get({
						getOne: true
					}).then(res => {
						console.log("文章title",res.result.data.picurls
);
							this.pushPicurls =res.result.data.picurls
							this.pushTitle =res.result.data.title
						let isLike = false
						if(this.user_id)	isLike = res.result.data._id.articlelike.length ? true : false;
						
						res.result.data.isLike = isLike;
						this.detailObj = res.result.data
						this.loadingstatus = false
						uni.setNavigationBarTitle({
							title: this.detailObj.title
						})
					})

				},
				// 修改阅读量
				readUpdata() {
					utilsObj.operation('article', "view_count", this.artid, 2).then(res => {
					})
				},
				// 获取点赞用户
				getLikeUser(){
					let likeTemp = db.collection('articlelike').where(`article_id == '${this.artid}'`).getTemp()
					let userTemp = db.collection('article').field('_id,user_touxiang').getTemp()
					db.collection(likeTemp,userTemp).orderBy('publish_date desc').limit(5).get().then(res=>{
						res.result.data=res.result.data.reverse()
						this.likeUserArr = res.result.data
					})
				},
				// 点赞操作
				async clickLike() {
					if(!this.user_id){
						uni.showModal({
							title:"是否前往登录",
							success:res=>{
								if(res.confirm){
									uni.navigateTo({
										url:'/subpkg/signin/signin'
									})
								}
							}
						})
						return 
					}
					let time = Date.now()
					if (time - this.likeTime < 2000) {
						uni.showToast({
							title: "您的操作太频繁了",
							icon: "none"
						})
						return
					}
				 this.likeTime = time
					this.detailObj.isLike ? this.detailObj.like_count-- : this.detailObj.like_count++
					this.detailObj.isLike = !this.detailObj.isLike
					// 查询有没有点过赞
					let count = await db.collection('articlelike').where(
						`article_id=='${this.artid}' &&user_id =='${this.user_id}'`).count()
					if (count.result.total) {
						db.collection('articlelike').where(`article_id=='${this.artid}' &&user_id =='${this.user_id}'`)
							.remove()
						utilsObj.operation('article', "like_count", this.artid, -1)
					} else {
						db.collection("articlelike").add({
							article_id: this.artid,
							user_id: this.user_id,
							user_nicheng: this.user_nicheng,
							user_touxiang:this.user_touxiang,
							articleTitle:this.detailObj.title,
							articlePic:this.detailObj.picurls,
						})
						utilsObj.operation('article', "like_count", this.artid, 1)
					}

				}
			},
			onReachBottom() {
				this.uniloading='loading'
				uni.showLoading({
					title:"评论正在加载"
				})
				this.getComment()
			},
		onLoad(e) {
			if (!e.id) {
				this.error()
				return
			}
			this.user_id = uni.getStorageSync('name').name
			this.user_nicheng = uni.getStorageSync('name').nicheng
			this.user_touxiang = uni.getStorageSync('name').headerUrl
			uniCloud.database().collection('userinfo').where(`name=="${this.user_id}"`).field("touxiang").get().then(res=>{
				this.user_touxaing = res.result.data[0].touxiang
			})
			this.artid = e.id
			this.commentObj.article_id =e.id
			this.getComment()
			this.getData()
			this.readUpdata()
			this.getLikeUser()
			
		}
	}
</script>

<style lang="scss">
	.rich-text img {
		max-width: 100%;
	}

	.detail {
		background: #f8f8f8;
		min-height: calc(100vh - var(--window-top));

		.container {
			padding: 30rpx;
			background: #fff;

			.title {
				font-size: 46rpx;
				color: #333;
				line-height: 1.4em;
				font-weight: 600;
			}

			.userinfo {
				padding: 20rpx 0 50rpx;
				display: flex;
				align-items: center;

				.avatar {
					width: 60rpx;
					height: 60rpx;
					padding-right: 15rpx;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.text {
					font-size: 28rpx;
					color: #555;

					.small {
						font-size: 20rpx;
						color: #999;
					}
				}
			}

			.content {
				width: 100%;

				uni-rich-text img {
					max-width: 100% !important;
				}

				.rich-text img {
					max-width: 100%;
				}
			}

			.like {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 80rpx 50rpx 50rpx;

				.btn {
					width: 260rpx;
					height: 120rpx;
					background: #e4e4e4;
					border-radius: 100rpx;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					.iconfont {
						font-size: 50rpx;
					}

					&.active {
						background: #0199FE;
					}
				}

				.text {
					font-size: 26rpx;
					color: #666;

					.num {
						color: #0199FE
					}

					.spot {
						padding: 0 10rpx;
					}
				}

				.users {
					display: flex;
					justify-content: center;
					padding: 30rpx 0;

					image {
						width: 50rpx;
						height: 50rpx;
						border-radius: 50%;
						border: 3px solid #fff;
						margin-left: -20rpx;
					}
				}
			}

		}
	
		.comment{
			padding: 30rpx;
			padding-bottom: 120rpx;
		}
	}
</style>
