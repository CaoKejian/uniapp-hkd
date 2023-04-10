<template>
	<view class="wrapper">
		<view class="drop" v-if="isshowZhuce">
			<view class="top1">
				<uni-icons type="left" size="20" @click="back"></uni-icons>
				<text class="login-logo" @click="login">Login</text>
			</view>
			<view class="validate">
				<input type="text" v-model="inputContent" :class="isTrue1?'active':'active-no'" @input="inputname" placeholder="用户名">
				<text class="text1"></text>
				<input type="text" v-model="inputContent2" :class="isTrue2?'active':'active-no'" @input="inputpassword" placeholder="密码">
				<text class="text2"></text>
			</view>
			<button class="login" @click="submit">Login</button>
			<view class="sign">
				<text>还没有注册？</text>
				<text @click="dianji" class="dianji">点击注册</text>
			</view>
		</view>
		<!-- 注册 -->
		<view class="drop" v-else>
			<view class="top">
				<text class="login-logo">enroll</text>
				<uni-icons type="closeempty" size="20" @click="close"></uni-icons>
			</view>
			<view class="validate">
				<input type="text" :class="isTrue11?'active':'active-no'" @input="Inusername" placeholder="用户名">
				<text class="text1" v-show="isText1">{{text1}}</text>
				<input type="text" :class="isTrue22?'active':'active-no'" @input="Inpassword" placeholder="密码">
				<text class="text2" v-show="isText2">{{text2}}</text>
			</view>
			<button class="login" @click="enroll" v-show="isShowEnroll">enroll</button>
			<button class="login" @click="gotologin" v-show="!isShowEnroll">去登陆</button>
			<text class="try">账号/密码忘记？请联系管理员vx：YYik021</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 登录
				inputContent:'',
				inputContent2:'',
				isTrue1: false,
				isTrue2: false,
				text1: "用户名为3-6个字符",
				text2: "密码最少为6个字符",
				isText1: false,
				isText2: false,
				isshowZhuce: true,
				loginUsername: '',
				loginPassword: "",
				newpassword:"",
				// 注册
				isTrue11: false,
				isTrue22: false,
				username: '',
				password: '',
				enrollinfo: 'enroll',
				isShowEnroll: true,
				newslist:[ "",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				"",
				""],
			}
		},
		methods: {
			back(){
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
			close(){
				this.isshowZhuce = !this.isshowZhuce
			},
			submit() {
				if(this.inputContent==""){
					uni.showToast({
						title:"用户名不能为空",
						icon:"none"
					})
					this.isTrue1=true
					return
				}
				if(this.inputContent2==''){
					uni.showToast({
						title:"密码不能为空",
						icon:"none"
					})
					return
				}
				uniCloud.database().collection('userinfo').where({
					name:this.inputContent
				}).get().then(res=>{
					console.log("查询结果",res.result);
					this.newpassword = res.result.data[0].password
					if(this.newpassword ==this.inputContent2){
						uni.showToast({
							title:'登录成功！',
							icon:"none"
						})
						uni.showLoading({
							title:'正在登录'
						})
						const _this = this
						setTimeout(()=>{
							uni.hideLoading()
							const id = 1
							uni.reLaunch({
								url:'/pages/my/my?name='+ this.inputContent,
							})
						},1000)
						
					}else{
						uni.showToast({
							title:"密码错误!",
							icon:"none"
						})
						this.isTrue2 = true
					}
				}).catch(err=>{
					uni.showToast({
						title:"账号不存在",
						icon:"none"
					})
				})
			},
			gotologin() {
				 this.inputContent = this.username
				  this.inputContent2 = this.password
				this.isshowZhuce = !this.isshowZhuce
			},
			enroll() {
				// 注册
				if (this.username == '') {
					this.isTrue11 = true
					uni.showToast({
						title: "用户名不能为空",
						icon: "none"
					})
					return
				}
				if (this.password == '') {
					this.isTrue22 = true
					uni.showToast({
						title: "密码不能为空",
						icon: "none"
					})
					return
				}
				if (this.isTrue11 == false && this.isText1 == false && this.isTrue22 == false && this.isText2 == false) {
					uniCloud.database().collection('userinfo').where({
						name: this.username
					}).get().then(res => {
						if (res.result.data[0].name == this.username) {
							this.isTrue11 = true
							uni.showToast({
								title: "这个账号已经注册过了",
								icon: "none"
							})
						}
					}).catch(err => {
						this.isTrue11 = false
					
						uniCloud.callFunction({
							name: "enroll",
							data: {
								// 默认添加的字段
								name: this.username,
								password: this.password,
								course:this.newslist,
								touxiang:'https://mp-eaea5aba-f234-4a78-9bab-fac0fbaedf79.cdn.bspapp.com/cloudstorage/4dd9cac3-b07f-4942-a976-6f64fe37755d.jpg'
							}
						}).then(res => {
							console.log(res);
							uni.showToast({
								title: '注册成功'
							})
							this.isShowEnroll = false
						})
					})
				}
			},
			// 监听事件
			Inusername(e) {
				this.username = e.detail.value
				if (e.detail.value.length < 2 || e.detail.value.length > 6) {
					this.isTrue11 = true
					this.isText1 = true
					return
				} else if (e.detail.value.length >= 2 || e.detail.value.length <= 6 || e.detail.value.length == 0) {
					this.isTrue11 = false
					this.isText1 = false
				}
			},
			inputname(e) {
				this.inputContent = e.detail.value
				// this.loginUsername = e.detail.value
				if(e.detail.value.length!==0){
					this.isTrue1=false
				}
			},
			inputpassword(e) {
				this.inputContent2 = e.detail.value
				// this.loginPassword = e.detail.value
				if(e.detail.value.length==0){
					this.isTrue2=false
				}
			},
			Inpassword(e) {
				if (e.detail.value == '') {
					this.isTrue22 = false
					this.isText2 = false
				}
				if (e.detail.value.length > 5) {
					this.isText2 = false
					this.isTrue22 = false
				} else {
					this.isText2 = true
					this.isTrue22 = true
				}
				this.password = e.detail.value
			},
			dianji() {
				this.inputContent = ''
				this.inputContent2 = ''
				this.isshowZhuce = !this.isshowZhuce
			}
		},
	}
</script>

<style lang="scss">
	.text1,
	.text2 {
		font-size: 12px;
		color: red;
	}

	.active {
		border-bottom: 1px solid red;
	}

	.wrapper {
		width: 100%;
		height: 100vh;
		background: linear-gradient(to right, #ffeb99, #a6c1ee);

		.drop {
			width: 80%;
			height: 50vh;
			background-color: #fff;
			transform: translateY(40%);
			margin: 0 auto;
			border-radius: 30rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			.top1{
				width: 50%;
				transform: translateX(-38%);
				display: flex;
				justify-content: space-between;
			}
			.top{
				width: 50%;
				transform: translateX(38%);
				display: flex;
				justify-content: space-between;
			}
			.login-logo {
				font-size: 24px;
				font-weight: bold;
			}

			.validate {
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				width: 80%;

				.active-no {
					border-bottom: 1px solid #000;
				}

				input {
					margin-top: 10px;
					margin-bottom: 10px;
					width: 100%;
					height: 60rpx;
					font-size: 12px;
					padding-left: 10px;

				}
			}

			.try {
				font-size: 14px;
			}

			.login {
				width: 80%;
				text-align: center;
				color: #fff;
				border-radius: 20rpx;
				background: linear-gradient(to right, #a6c1ee, #ffeb99,);
			}

			.sign {
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 14px;

				.dianji {
					color: #afb4d1;
				}
			}
		}
	}

	.drop-new {
		width: 80%;
		height: 50vh;
		background-color: #fff;
		transform: translateY(40%);
		margin: 0 auto;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
</style>
