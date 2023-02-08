<template>
	<view class="wrapper">
		<view class="item">
			<view class="item_top">
				当前昵称：<text class="item_name">{{newName||nickName}}</text>
			</view>
			<button @click="open" >修改昵称</button>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog mode="input" title='修改昵称' confirmText='保存' message="成功消息" :duration="2000"
				:before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<hr></hr>
		<view class="item item2">
			<view class="item_top">当前头像：</view>
			<view class="pic">
				<image :src="content" mode="aspectFill"></image>
			</view>
			<button @click="subpic">更改头像</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName: "",
				newName:"",
				content:""
			};
		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			confirm(value) {
				this.nicheng= uni.getStorageSync('name').nicheng
				this.newName = value
				uni.setStorage({
					key:'name',
					data:{
						name:this.nickName,
						nicheng:this.newName
					}
				})
				uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).update({
					nickName:this.newName
				}).then(res=>{
					console.log(res);
				})
				
				uniCloud.database().collection('article').where(`user_id=='${this.nickName}'`).update({
					user_nicheng:this.newName
				}).then(res=>{
					console.log(res);
				})
				
				uniCloud.database().collection('articleComment').where(`user_id=='${this.nicheng}'`).update({
					user_id:this.newName
				}).then(res=>{
					console.log(res);
				})
				
				uniCloud.database().collection('articlelike').where(`user_id=='${this.nickName}'`).update({
					user_nicheng:this.newName
				}).then(res=>{
					console.log(res);
				})
				
				this.$refs.popup.close()
			},
			subpic(){
				uni.chooseImage({
					count:1,
					crop:{
						width:1000,
						height:1000,
					},
					success:async res=>{
						uni.showLoading({
							title:"上传中请稍后",
							mask:true
						})
						for (let item of res.tempFiles) {
							let res = await uniCloud.uploadFile({
								filePath:item.path,
								cloudPath:String(item.name)
							})
							console.log(res);
							console.log("头像",res.fileID);
							this.content = res.fileID
							uni.setStorage({
								key:'name',
								data:{
									name:this.nickName,
									nicheng:this.newName,
									headerUrl:this.content
								}
							})
							console.log('存储了');
						}
						
						uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).update({
							touxiang:this.content
						}).then(res=>{
							console.log(res);
						})
						
						uniCloud.database().collection('article').where(`user_id=='${this.nickName}'`).update({
							user_touxiang:this.content
						}).then(res=>{
							console.log(res);
						})
						
						uniCloud.database().collection('articleComment').where(`user_id=='${this.newName}'`).update({
							user_touxiang:this.content
						}).then(res=>{
							console.log(res);
						})
						
						uniCloud.database().collection('articlelike').where(`user_id=='${this.nickName}'`).update({
							user_touxiang:this.content
						}).then(res=>{
							console.log(res);
						})
						uni.hideLoading()
					}
				})
			}
		},
		onLoad() {
			this.newName = uni.getStorageSync('name').nicheng
			this.nickName = uni.getStorageSync('name').name
			uniCloud.database().collection('userinfo').where(`name=='${this.nickName}'`).get().then(res=>{
				console.log(res);
				this.content = res.result.data[0].touxiang
			}).catch(err=>{
				console.log(err);
			})
		}
	}
</script>

<style lang="scss">
	hr{
		margin: 100rpx 0;
	}
.wrapper{
	background-color: #fffae5;
	width: 100%;
	height: 100vh;
	.item{
		width: 100%;
		height: 160rpx;
		font-size: 18px;
		padding-top: 60rpx;
		.item_top{
			margin-left: 40rpx;
			margin-bottom: 40rpx;
		}
		.item_name{
			color: #9E6D38;
		}
		button{
			width: 70%;
			color: #fff;
			background-color: #e7b203;
		}
	}
	.item2{
		padding: 0;
	}
	.item{
		width: 100%;
		height: 160rpx;
		font-size: 18px;
		.pic{
			width: 260rpx;
			height: 260rpx;
			margin: 0 auto;
			margin-bottom: 60rpx;
			image{
				width: 260rpx;
				height: 260rpx;
				border-radius: 50%;
			}
		}
		.item_top{
			margin-left: 40rpx;
			margin-bottom: 40rpx;
		}
		.item_name{
			color: #9E6D38;
		}
		button{
			width: 70%;
			color: #fff;
			background-color: #e7b203;
		}
	}
	
}
</style>
