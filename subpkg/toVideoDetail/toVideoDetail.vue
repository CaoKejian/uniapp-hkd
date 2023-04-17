<template>
	<view class="wrapper">
		<view class="item-f" v-for="item,index in videoItem" :key="index">
			<uni-section class="mb-10" :title="item.title" :sub-title="item.from" type="line"></uni-section>
			<video :src="item.address" :poster="item.img" show-mute-btn=true @loadeddata='loadeddata'
				custom-cache='false' class="video"></video>
			<view class="info">
				<text>发布时间：
					<uni-dateformat :date=item.publishData format="MM月dd hh:mm" :threshold="[60000,3600000*24*30]">
					</uni-dateformat>
				</text>
				<text>观看量：{{item.view_coun}}</text>
			</view>
		</view>
		<view class="" v-show="videoItem.length" v-if="isshowInput">
			<my-issus :isshowMseeage='isshowMseeage' :isShowSu="isShowSu"></my-issus>
		</view>
		<view class="selectContent" v-show="videoItem.length" v-if="isshowSelect">
			<span v-if="showSelected">恭喜!抽中了<span style="color: #CE5353;margin:0 18rpx;font-size:22px;font-weight: bold;">{{selected}}</span>!</span>
			<span v-if="showIng">正在抽奖...</span>
			<span v-if="showStart">点开始按钮抽奖</span>
		</view>
		<view class="ul" v-show="videoItem.length" v-if="isshowSelect">
			<li :class="index<4?`li${index+1}`:
									index==4?`start`:
									`li${index}`" 
				v-for="item,index in selectContent" :key="item" 
				@click="handleClick(index)"
>{{selectContent[index]}}</li>
		</view>
			<uni-popup ref="inputDialog" type="dialog">
				<uni-popup-dialog mode="input" placeholder="填写你想选择的事件名!" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
			</uni-popup>
	</view>
</template>

<script>
	const utilsObj = uniCloud.importObject('utilsObj', {
		customUI: true
	})
	export default {
		data() {
			return {
				videoId: "",
				videoItem: '',
				isshowMseeage: true,
				isShowSu: false,
				isshowInput:false,
				isshowSelect:false,
				// 抽奖
				disabled:false,
				selectContent:['螺蛳粉','臭豆腐','花甲粉','烤鱼饭','开始','上汤上面','鸡扒饭','重庆小面','火锅'],
				content:'',
				selected:'',
				showSelected:false,
				showIng:false,
				showStart:true,
				rollTime:null,
				times:0,
				time:0,
				index:undefined
			};
		},
		methods: {
			dialogInputConfirm(){
				this.$refs.inputDialog.open()
			},
			// 加载时触发
			loadeddata() {
				uni.showLoading({
					title: '正在加载'
				})
			},
			getData() {
				uniCloud.database().collection('videoClass').where(`_id=='${this.videoId}'`).get().then(res => {
					this.videoItem = res.result.data
				})
			},
			readUpdata() {
				utilsObj.operation('videoClass', "view_coun", this.videoId, 2).then(res => {
				})
			},
			// 抽奖
			handleClick(index){
				if(this.disabled) return
				this.index = index
				this.content =''
				if(index==4){
					if(!this.disabled){
						this.start()
					}
				}else{
					this.dialogInputConfirm()
				}
			},
			confirm(e){
				this.content = e
				if(e!==''){
					this.selectContent.splice(this.index,1,this.content)
				}
				this.$refs.inputDialog.close()
			},
			close(){
				this.$refs.inputDialog.close()
			},
			start(){
				this.disabled = true
				this.selected = ''
				if(this.index!==undefined){
					document.querySelector(`.li${this.index}`).classList.remove("active")
				}
				this.showSelected=false,
				this.showIng = true
				this.showStart = false
				this.times = parseInt(Math.random() * (20 - 30 + 1) + 20, 10)
				this.rolling();
			},
			rolling(){
				this.time++
				clearTimeout(this.rollTime);
				  this.rollTime = setTimeout(() => {
					window.requestAnimationFrame(this.rolling); // 进行递归动画
				}, 250);
				  if(this.time>8){
				    this.index=this.time%8;
				    if(this.index==0){
				      this.index=8
				    }
				  }else{
				    this.index=this.time
				  }
					document.querySelector(`.li${this.index}`).classList.add("active")
					if(this.index>1){
						document.querySelector(`.li${this.index - 1}`).classList.remove("active")
					}else if(this.index == 1){
						document.querySelector(`.li8`).classList.remove("active")
					}
				  // time > times 转动停止
				  if (this.time > this.times) {
				    clearInterval(this.rollTime);
						 this.disabled = false
						this.showIng = false
						this.showSelected = true
				    this.time = 0;
						this.selected =  document.querySelector(`.li${this.index}`).textContent
				    return;
				  }
			}
		},
		mounted() {
			const a =document.querySelector('.start').style.background='#f3d163'
		},
		onLoad(e) {
			this.videoId = e.id
				this.readUpdata()
			this.getData()
			if(!this.videoItem){
				this.isshowInput = false
			}
			if (e.even === '1') {
				this.isshowInput = true
			}else if(e.even === '0'){
				this.isshowSelect = true
			}
		}
	}
</script>

<style lang="scss">
	.uni-section {
		// 组件
		background-color: #fffae5;
	}
	.uni-section .uni-section-header__decoration[data-v-f7ca1098] {
	    margin-right: 6px;
	    background-color: #f4ffbe;
	}
	.wrapper {
		width: 100%;
		height: 100vh;
		background-color: #fffae5;
	
	.item-f {
			width: 100%;

			.video {
				width: 100%;
			}

			.info {
				padding: 20rpx 30rpx;
				display: flex;
				justify-content: space-between;
			}
		}
	}
	// 抽奖
	.select{
		width: 90%;
		height: 600rpx;
		margin: 0 auto;
		background-color: #fff;
		box-sizing: border-box;
	}
	.ul {
		margin-top: 20rpx;
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
		width: 100%;
		height: auto;
		align-items: center;
	}
	li {
		width: 25%;
		height: 25%;
	}
	
	.ul li {
	  box-sizing: border-box;
	  margin: 10px;
	  list-style: none;
	  line-height: 100px;
	  text-align: center;
	  font-size: 18px;
	  border-radius: 10px;
	  cursor: pointer;
		background: #ffeb99;
	  // background: linear-gradient(90deg, #72a8f8 0%, #3e93d3 50%, #5385e2 100%);
	  // text-shadow: 5px 5px 5px #1004ad;
	  color: #9E6D38;
		font-weight: bold
	}
	.ul li.active {
	  background: #deefff;
	  color: #9E6D38;
	}
	.selectContent{
		width: 95%;
		height: 80rpx;
		background-color: #edc00c;
		margin: 0 auto;
		border-radius: 8rpx;
		text-align: center;
		line-height: 80rpx;
		color: #9E6D38;
		font-size: 18px;
	}

</style>


