<template>
	<view class="reply">
		<view class="top">
			<my-commentItem :closeBtn="true" :childState="true" :item="replyItem"></my-commentItem>
		</view>
		<view class="list">
			<view class="row" v-for="item in childReply">
				<my-commentItem :childState="true"   @removeEnv='removeEnv' :item="item"></my-commentItem>
			</view>
			<view class="">
				<uni-load-more :status="uniloading"></uni-load-more>
			</view>
		</view>
		<view class="">
			<my-comment 
				@commentEnv="commentEnv"
			:commentObj="commentObj" :placeholder="`回复：${reply}`"></my-comment>
		</view>
		
	</view>
</template>

<script>
	const db = uniCloud.database()
	export default {
		data() {
			return {
				replyItem:null,
				placeholder:'',
				reply:'',
				commentObj:{
					article_id:"",
					comment_type:1,
					reply_user_id:'',
					reply_comment_id:""
				},
				childReply:[],
				uniloading:"more",
			};
		},
		onReachBottom() {
			this.uniloading='loading'
			this.getComment()
		},
		methods:{
			//获取评论
			getComment(){
				db.collection('articleComment').where(`article_id=='${this.commentObj.article_id}' && comment_type==1 && reply_comment_id=='${this.commentObj.reply_comment_id}'`).orderBy('comment_date desc').skip(this.childReply.length).limit(5).get().then(res=>{
					let oldArr=this.childReply
					let redDataArr=[...this.childReply,...res.result.data]
					if(res.result.data.length==0){
						this.uniloading='noMore'
					}
					this.childReply = redDataArr
				})
			},
			//评论成功后刷新
			commentEnv(){
				this.childReply=[]
				this.getComment()
			},
			// 评论删除
			removeEnv(){
				this.childReply=[]
				this.getComment()
			}
		},
		onLoad() {
			const replyItem = uni.getStorageSync('replyItem')
			this.replyItem = replyItem
			if(!this.replyItem) return uni.navigateBack()
			this.reply = replyItem.user_id
			this.commentObj.article_id = replyItem.article_id
			this.commentObj.reply_user_id = replyItem.user_id //昵称
			this.commentObj.reply_comment_id = replyItem._id
			this.getComment()
		},
		onUnload() {
			uni.removeStorageSync('replyItem')
		}
	}
</script>

<style lang="scss">
.reply{
	.top{
		padding: 30rpx;
		border-bottom: 15rpx solid #eee;
	}
	.list{
		padding: 30rpx;
		padding-bottom: 120rpx;
		.row{
			padding-bottom: 15rpx;
		}
	}
}
.uni-input-placeholder {
	letter-spacing: 1px;
}
</style>
