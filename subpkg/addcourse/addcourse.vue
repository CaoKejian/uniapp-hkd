<template>
	<view>
		<view class="first">
			<text>编辑的你课程表信息</text>

			<view class="select">
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
					activeColor="#5e96c0"></uni-segmented-control>
				<view class="content">
					<view class="wenzi" v-show="current === 0">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('0')">编辑内容</button>
						<uni-popup ref="popup" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm"></uni-popup-dialog>
						</uni-popup>
					</view>

					<view class="wenzi" v-show="current === 1">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('1')">编辑内容</button>
						<uni-popup ref="popup1" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm1"></uni-popup-dialog>
						</uni-popup>
					</view>
					<view class="wenzi" v-show="current === 2">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('2')">编辑内容</button>
						<uni-popup ref="popup2" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm2"></uni-popup-dialog>
						</uni-popup>
					</view>
					<view class="wenzi" v-show="current === 3">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('3')">编辑内容</button>
						<uni-popup ref="popup3" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm3"></uni-popup-dialog>
						</uni-popup>
					</view>
					<view class="wenzi" v-show="current === 4">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('4')">编辑内容</button>
						<uni-popup ref="popup4" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm4"></uni-popup-dialog>
						</uni-popup>
					</view>
					<view class="wenzi" v-show="current === 5">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('5')">编辑内容</button>
						<uni-popup ref="popup5" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm5"></uni-popup-dialog>
						</uni-popup>
					</view>
					<view class="wenzi" v-show="current === 6">
						<text class="text">编写格式为：
							<text class="geshi">
								数学，语文，，，acm
							</text>
						</text>
						<button @click="open('6')">编辑内容</button>
						<uni-popup ref="popup6" type="dialog">
							<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true"
								confirmText="保存" title="对应早上到晚上共五节课，没课的空起来,用逗号区分" @close="close" placeholder="请输入本天的安排"
								@confirm="confirm6"></uni-popup-dialog>
						</uni-popup>
					</view>
				</view>
			</view>
		</view>
		<button @click="submit" class="button" type="default">
			<uni-icons type="checkmarkempty" size="20"></uni-icons>上传
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
				current: 0,
				// txt:`"","","","","",""`,
				timer: null,
				kw: [],
				monlist: [],
				tuelist: [],
				wedlist: [],
				thrlist: [],
				frilist: [],
				satlist: [],
				sunlist: [],
				nickName: "",
			};
		},
		methods: {
			// 优化  先删除这个kw 在增加 
			// ···············待优化·······
			refresh() {

			},
			submit() {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '更新数据前会删除您之前的数据，您确定吗',
					success: function(res) {
						if (res.confirm) {
							// const db =uniCloud.database()
							// db.collection('course').where({
							// 	name:"123"
							// }).remove().then(res=>{
							// 	console.log(res,"删除成功");
							// })
							// if(_this.monlist!==[]){
							// 	console.log("不空");
							// 	console.log(_this.monlist);
							// }
							if(_this.monlist.length==false){
								console.log("空了");
								const value = ",,,,"
								_this.monlist = value.split(',')
								console.log('_this.monlist',_this.monlist);
							}
							if(_this.tuelist.length==false){
								const value = ",,,,"
								_this.tuelist = value.split(',')
							}
							if(_this.wedlist.length==false){
								const value = ",,,,"
								_this.wedlist = value.split(',')
							}
							if(_this.thrlist.length==false){
								const value = ",,,,"
								_this.thrlist = value.split(',')
							}
							if(_this.frilist.length==false){
								const value = ",,,,"
								_this.frilist = value.split(',')
							}
							if(_this.satlist.length==false){
								const value = ",,,,"
								_this.satlist = value.split(',')
							}
							if(_this.sunlist.length==false){
								const value = ",,,,"
								_this.sunlist = value.split(',')
							}
							_this.kw = [..._this.monlist, ..._this.tuelist, ..._this.wedlist, ..._this.thrlist,
								..._this.frilist, ..._this.satlist, ..._this.sunlist
							]
							console.log("kw",_this.kw);
							uniCloud.database().collection('course').where({
								name: _this.nickName
							}).get().then(res => {
								console.log(res.result.data);
								if(res.result.data==''){
									uniCloud.callFunction({
										name:'addmycourse',
										data:{
											data:_this.kw,
											name:_this.nickName
										}
									}).then(res=>{
										console.log(res);
									})
									uni.showToast({
										title:"添加完成！",
										icon:"none"
									})
								}else{
									uniCloud.callFunction({
										name: "updateCourse",
										data: {
											refreshName: _this.nickName,
											refreshData: _this.kw
										}
									}).then(res => {
										uni.showToast({
											title:"更新完成！",
											icon:"none"
										})
									})
								}
							}).catch(err => {
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '取消更新',
								icon: "none"
							})
						}
					}
				});

			},
			onClickItem(e) {
				if (this.current != e.currentIndex) {
					this.current = e.currentIndex;
				}
			},
			open(e) {
				if (e === '0') {
					this.$refs.popup.open()
				} else if (e === '1') {
					this.$refs.popup1.open()
				} else if (e === '2') {
					this.$refs.popup2.open()
				} else if (e === '3') {
					this.$refs.popup3.open()
				} else if (e === '4') {
					this.$refs.popup4.open()
				} else if (e === '5') {
					this.$refs.popup5.open()
				} else if (e === '6') {
					this.$refs.popup6.open()
				}
			},
			close() {
				this.$refs.popup.close()
				this.$refs.popup1.close()
				this.$refs.popup2.close()
				this.$refs.popup3.close()
				this.$refs.popup4.close()
				this.$refs.popup5.close()
				this.$refs.popup6.close()
			},
			confirm(value) {
				if (!value) {
					const value = ",,,,"
					this.monlist = value.split(',')
					console.log(this.monlist);
				} else {
					this.monlist = []
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.monlist = newvalue.split(',')
					console.log("monlist", this.monlist);
				}
				this.$refs.popup.close()
			},
			confirm1(value) {
				if (!value) {
					const value = ",,,,"
					this.tuelist = value.split(',')
					console.log(this.tuelist);
				} else {
					this.tuelist = []
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.tuelist = newvalue.split(',')
					console.log("tuelist", this.tuelist);
				}
				this.$refs.popup1.close()
			},
			confirm2(value) {
				if (!value) {
					const value = ",,,,"
					this.wedlist = value.split(',')
					console.log(this.wedlist);
				} else {
					this.wedlist = []
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.wedlist = newvalue.split(',')
					console.log("wedlist", this.wedlist);
				}
				this.$refs.popup2.close()
			},
			confirm3(value) {
				if (!value) {
					const value = ",,,,"
					this.thrlist = value.split(',')
					console.log(this.thrlist);
				} else {
					this.thrlist = []
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.thrlist = newvalue.split(',')
					console.log("thrlist", this.thrlist);
				}
				this.$refs.popup3.close()
			},
			confirm4(value) {
				if (!value) {
					const value = ",,,,"
					this.frilist = value.split(',')
					console.log(this.frilist);
				} else {
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.frilist = []
					this.frilist = newvalue.split(',')
					console.log("frilist", this.frilist);
				}
				this.$refs.popup4.close()
			},
			confirm5(value) {
				if (!value) {
					const value = ",,,,"
					this.satlist = value.split(',')
					console.log(this.satlist);
				} else {
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.satlist = []
					this.satlist = newvalue.split(',')
					console.log("satlist", this.satlist);
				}
				this.$refs.popup5.close()
			},
			confirm6(value) {
				if (!value) {
					const value = ",,,,"
					this.sunlist = value.split(',')
					console.log(this.sunlist);
				} else {
					const newvalue = value.replace(/[\uff0c]/g, ",")
					this.sunlist = []
					this.sunlist = newvalue.split(',')
					console.log("sunlist", this.sunlist);
				}
				this.$refs.popup6.close()
			}
		},
		onLoad(e) {
			this.nickName = e.name
			// uniCloud.callFunction({
			// 	name:"mycourse",
			// }).then(res=>{
			// 	console.log(res);
			// })
		}

	}
</script>

<style lang="scss">
	#textarea {
		width: 100%;
		border: 2px solid #d0d0d0;
		margin: 60rpx auto;
		font-size: 18px;
		font-weight: 100;
		height: 100rpx;
	}

	.button {
		font-size: 14px;
		width: 300rpx;

	}

	.wenzi {
		margin-top: 70rpx;
	}

	.first {
		display: flex;
		flex-direction: column;

		.select {
			width: 90%;
			margin: 20% auto;

			.content {
				font-size: 14px;

				button {
					margin-top: 20px;
				}

				.geshi {
					color: red;
				}
			}
		}
	}
</style>
