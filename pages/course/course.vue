<template>
	<view class="wrapper">
	<!-- 	<my-navbar>
			<template v-slot:title>
				<text>课程列表</text>
			</template>
		</my-navbar> -->
		<view class="schedule-table">
				<my-week :newslist='newslist' :nickName="nickName" v-if="forceRefresh" :key="componentsKey"></my-week>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newObj:{},
				newslist:[],
				nickName:"",
				componentsKey:0,
				forceRefresh:true
			};
		},
		methods:{
			getcourse(name){
				uniCloud.database().collection('userinfo').where({
					name:name
				}).get().then(res=>{
					uni.hideLoading()
					this.newslist = res.result.data[0].course
				})
			},
		},
		onLoad() {
			this.nickName = uni.getStorageSync('name').name
			if(this.nickName!==''){
				const name = this.nickName
				this.getcourse(name)
			}
			if(this.nickName==''){
				uni.showToast({
					title:"暂无课表信息！",
					icon:"none"
				})
			}
		},
		onShow() {
			uni.$showLogin()
		},
		onPullDownRefresh() {
			this.nickName = uni.getStorageSync('name')
			if(this.nickName!==''){
				const name = this.nickName
				this.getcourse(name)
			this.forceRefresh= false
					this.$nextTick(function(){
						this.forceRefresh= true
					})
				this.componentsKey++
			}
			if(this.nickName==''){
				uni.showToast({
					title:"暂无课表信息！",
					icon:"none"
				})
				this.newslist=[]
				this.forceRefresh= false
						this.$nextTick(function(){
							this.forceRefresh= true
						})
				this.componentsKey++
			}
			uni.stopPullDownRefresh();
		}
	}
</script>

<style lang="scss">
.wrapper{
	width: 100%;
}
</style>
