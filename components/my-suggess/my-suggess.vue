<template>
	<view class="wrapper">
		<uni-search-bar placeholder="请输入你要搜索的专业名称" bgColor="#EEEEEE" @input="input" @confirm="search" @cancel="cancel" @clear="clear"/>
		<view class="item-search" v-show="!istrue">
			<view class="item" v-for="(item,index) in newlist" :key="index">
				<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item-list">{{item.major}}---{{item.main}}</navigator>
			</view>
		</view>
		<view class="biglist-item" v-show="istrue" :key="componentsKey">
			<uni-collapse accordion>
				<uni-collapse-item :show-animation="true" title="普通本科专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list1" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
				<uni-collapse-item :show-animation="true" title="应用技术学院本科专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list2" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
				<uni-collapse-item :show-animation="true" title="专升本专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list3" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
				<uni-collapse-item :show-animation="true" title="普通专科专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list4" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
				<uni-collapse-item :show-animation="true" title="合作办学专科专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list5" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
				<uni-collapse-item :show-animation="true" title="双学位专业">
					<navigator :url="'/subpkg/suggestItem/suggestItem?id='+item.id" class="item" v-for="(item,index) in list6" :key="index">
						<view class="">{{item.major}}</view>
					</navigator>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-suggess",
		props:['list1','list2','list3','list4','list5','list6'],
		data() {
			return {
				componentsKey:0,
				newlist: [],
				istrue: true,
				timer: null
			};
		},
		methods: {
			search(res) {
				if(res.value==''){
					uni.showToast({
						title:"搜索不能为空",
						icon:"None"
					})
				}
			},
			gotosearch() {

			},
			getinfo() {
				uniCloud.getTempFileURL({
						fileList: [
							'https://mp-eaea5aba-f234-4a78-9bab-fac0fbaedf79.cdn.bspapp.com/cloudstorage/b6f7b2b1-8ab0-4bb1-9d97-8275ced40c5f.txt'
						]
					})
					.then(res => {
						console.log(res);
					});
			},
			clear(e){
				this.cancel()
			},
			cancel(e){
				this.newlist = []
				this.istrue = true
				 this.componentsKey += 1;  
			},
			input(e) {
				if (e) {
					clearTimeout(this.timer)
					this.timer = setTimeout(() => {
						uni.showLoading({
							title: "正在加载"
						})
						const db = uniCloud.database()
						db.collection('major').where({
							major: new RegExp(e, "ig")
						}).get().then(res => {
							uni.hideLoading()
							if (res.result.data.length !== 0) {
								console.log("模糊查询的", res.result.data);
								this.istrue = false
								this.newlist = res.result.data
							}
						}).catch(err => {
							console.log(err);
						})
					}, 500)
					return
				} 
			}
		},
		onShow() {
			if(this.newlist!==''){
				console.log(123);
			}
		},
		created() {

		},

	}
</script>

<style lang="scss">
.wrapper{
	background-color: #fffae5;
	height: 100vh;
}
.item-search{
	.item{
		.item-list{
			width: 90%;
			margin: 0 auto;
			border: 1px solid #e7e7e7;
			background-color: #fff;
			padding: 8px 10px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
	.biglist-item{
		.item{
			width: 100%;
			height: 100rpx;
			text-align: center;
			background-color: #f3f1ea;
			margin-bottom: 1px;
			line-height: 100rpx;
			color: #93918c;
		}
	}
	
</style>
