<template>
	<view class="edit">
		<view class="title">
			<input type="text" v-model="artObj.title" placeholder="请输入完整的标题" placeholder-class="placeholderClass">
		</view>
		<view class="content">
			<editor placeholder="写点什么吧" class="myEdit"
				show-img-resize
				show-img-size
				show-img-toolbar
				@ready="onEditReady"
				@focus="onFocus"
				@statuschange="onStatuschange"
			></editor>
		</view>
		<view class="btnGroup">
			<button @click="onSubmit" type="primary" :disabled="!artObj.title.length">确认发表</button>
		</view>
		<view class="tools" v-if="toolshow">
			<view class="item" @click="clickHead"><text class="iconfont icon-zitibiaoti" :class="headShow?'active':''"></text></view>
			<view class="item" @click="clickBold"><text class="iconfont icon-zitijiacu" :class="boldShow?'active':''"></text></view>
			<view class="item" @click="clickItalic"><text class="iconfont icon-zitixieti" :class="italicShow?'active':''"></text></view>
			<view class="item" @click="clickDivider"><text class="iconfont icon-fengexian" ></text></view>
			<view class="item" @click="clickInsertImage"><text class="iconfont icon-charutupian" ></text></view>
			<view class="item" @click="editok"><text class="iconfont icon-duigou_kuai" ></text></view>
		</view>
	</view>
</template>

<script>
	import {getImgSrc,getProvince} from '@/utils/tools.js'
	const db = uniCloud.database()
	export default {
		data() {
			return {
				toolshow:false,
				headShow:false,
				boldShow:false,
				italicShow:false,
				artObj:{
					title:"",
					content:"",
					description:"",
					picurls:"",
					province:"",
					user_id:"",
					user_nicheng:"",
					user_touxiang:""
				}
			};
		},
		onLoad() {
			this.artObj.user_id = uni.getStorageSync('name').name
			this.artObj.user_nicheng = uni.getStorageSync('name').nicheng
			uniCloud.database().collection('userinfo').where(`name=='${this.artObj.user_id}'`).get().then(res=>{
				this.artObj.user_touxiang = res.result.data[0].touxiang
				console.log("头像",this.artObj.user_touxiang);
			})
			getProvince().then(res=>{
				this.artObj.province = res
			})
		},
		methods:{
			// 点击提交
			onSubmit(){
				this.editorCtx.getContents({
					success:res=>{
						console.log(res);
						this.artObj.description = res.text.slice(0,50)
						this.artObj.content = res.html
						this.artObj.picurls = getImgSrc(res.html)
						uni.showLoading({
							title:"发布中..."
						})
						console.log(this.artObj);
						this.addData()
					}
				})
			},
			// 保存数据库
			addData(){
				db.collection('article').add({
					...this.artObj
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:"发布成功"
					})
					setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/interlocution/interlocution'
						},800)
					})
				}).catch(err=>{
					console.log(err);
				})
			},
			// 显示与隐藏
			onFocus(){
				this.toolshow = true
			},
			// 获得焦点
			onEditReady(){
				uni.createSelectorQuery().in(this).select('.myEdit').fields({
						size:true,
						context:true
				},res=>{
					console.log(res);
					this.editorCtx = res.context
				}).exec()
			},
			// 检查状态改变
			checkStatus(name,detail,obj){
				if(detail.hasOwnProperty(name)){
					this[obj] = true
				}else{
					this[obj] = false
				}
			},
			// 当阳市发生改变的时候
			onStatuschange(e){
				let detail = e.detail
				this.checkStatus("header",detail,this.headShow)
				this.checkStatus("bold",detail,this.boldShow)
				this.checkStatus("italic",detail,this.italicShow)
			},
			// 添加分割线
			clickDivider(){
				this.editorCtx.insertDivider()
			},
			// 添加大标题
			clickHead(){
				this.headShow = !this.headShow
				this.editorCtx.format("header",this.headShow?'h2':false)
			},
			// 加粗
			clickBold(){
				this.boldShow = !this.boldShow
				this.editorCtx.format("bold")
			},
			// 倾斜
			clickItalic(){
				this.italicShow = !this.italicShow
				this.editorCtx.format("italic")
			},
			// 添加图像
			clickInsertImage(){
				uni.chooseImage({
					success:async res=>{
						uni.showLoading({
							title:"上传中请稍后",
							mask:true
						})
						for (let item of res.tempFiles) {
							let suffix = item.path.substring(item.path.lastIndexOf("."))
							let randomName = Date.now() + '' +  String(Math.random()).substr(3,6) + suffix
							let res = await uniCloud.uploadFile({
								filePath:String(item.path),
								cloudPath:String(item.name) || String(randomName)
							})
							this.editorCtx.insertImage({
								src:res.fileID
							})
						}
						uni.hideLoading()
					}
				})
			},
			// 完成
			editok(){
				this.toolshow = false
			},
			
		}
	}
</script>

<style lang="scss">
	/deep/ .ql-blank::before{
		font-style: normal;
		color: #e0e0e0;
	}
.edit{
	padding: 30rpx;
	.title{
		input{
			font-size: 46rpx;
			height: 120rpx;
			border-bottom: 1px solid #e4e4e4;
			margin-bottom: 30rpx;
			color: #666;
		}
		.placeholderClass{
			color: #e0e0e0;
		}
	}

	.content{
		.myEdit{
					height: calc(100vh - 500rpx);
					margin-bottom:30rpx;
				}	
	}
	.tools{
		width: 100%;
		height: 80rpx;
		background: #fff;
		border-top: 1px solid #f4f4f4;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-bottom: 30px;
		.iconfont{
			font-size: 36rpx;
			color: #333;
			&.active{
				color:#0199fe;
			}
		}
	}
}
</style>
