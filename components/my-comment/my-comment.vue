<template>
	<view class="wrapper">
		
<uni-easyinput ref="uipt" @confirm="goComment" suffixIcon="paperplane"  v-model="replyContent" :placeholder="placeholder"  @iconClick="goComment"></uni-easyinput>
	</view>
</template>

<script>
	import {getProvince} from '@/utils/tools.js'
	const db = uniCloud.database()
	const utilsObj=uniCloud.importObject("utilsObj",{
		customUI:true
	})
	export default {
		name:"my-comment",
		props:{
			commentObj:{
				type:Object,
				default:()=>{
					return{
						
					}
				}
			},
			placeholder:{
				type:String,
				default:"评论点什么吧"
			},
			pushTitle:{
				type:String,
				default:""
			},
			pushPicurls:{
				type:Array,
				default:[]
			}
		},
		data() {
			return {
				replyContent:"",
			};
		},
		methods:{
			getProvince,
			async goComment(){
				const name = uni.getStorageSync('name').name
				if(!name){
					uni.$showLogin()
					return
				}
				let province =await getProvince()
				if(!this.replyContent){
					uni.showToast({
						title:"内容不能为空哦"
					})
					return
				}
				db.collection('articleComment').add({
					"comment_content":this.replyContent,
					"user_id":this.user_nicheng||this.user_id,
					"user_touxiang":this.touxiang,
					"province":province,
					"artTitle":this.pushTitle,
					"artPicurls":this.pushPicurls,
					...this.commentObj
				}).then(res=>{
					uni.showToast({
						title:'评论成功'
					})
					this.$emit('commentEnv',{_id:res.result.id,comment_content:this.replyContent,province:province,user_id:this.user_id||this.user_nicheng,user_touxiang:this.touxiang,comment_date:Date.now()})
					this.replyContent=""
					utilsObj.operation('article',"comment_count",this.commentObj.article_id,1)
				})
			}
		},
		created(e) {
			this.user_id =uni.getStorageSync('name').name
			this.user_nicheng =uni.getStorageSync('name').nicheng
			uniCloud.database().collection('userinfo').where(`name=='${this.user_id}'`).field('touxiang').get().then(res=>{
				this.touxiang = res.result.data[0].touxiang
			})
		},
	}
</script>

<style lang="scss">
.wrapper{
	width: 100%;
	background: #fff;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 100;
}
</style>