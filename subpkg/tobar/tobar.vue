<template>
	<view>
		<my-suggess v-show="isSuggess" :list1="list1" :list2="list2" :list3="list3" :list4="list4" :list5="list5" :list6="list6"></my-suggess>
		<my-test v-show="isTest" :testid="testid" :testList="testList"></my-test>
		<my-course v-show="isCourse"></my-course>
		<my-consult :lbraryOne="lbraryOne" v-show="isBody"></my-consult>
		<my-public v-show="isPublic" :publicArr="publicArr"></my-public>
		<my-issus v-show="isIssus"></my-issus>
		<my-club v-show="isClub" :clubList="clubList" :nickName="nickName"></my-club>
		<my-schoollife v-show="isSchoollife" :videoClass='videoClass'></my-schoollife>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isSuggess: false,
				isTest: false,
				isCourse: false,
				isBody: false,
				isPublic: false,
				isIssus: false,
				isClub: false,
				isSchoollife: false,
				testid:3,
				testList:[],
				clubList:[],
				nickName:'',
				
				
				list1:[],
				list2:[],
				list3:[],
				list4:[],
				list5:[],
				list6:[],
				
				publicArr:[],
				
				videoClass:[],
				
				lbraryOne:[]
			};
		},
		methods:{
			getTest(){
				uni.showLoading({
					title:"正在加载"
				})
				uniCloud.callFunction({
					name:'getTest',
					data:{
						skip:this.testList.length
					}
				}).then(res=>{
					uni.hideLoading()
					let oldlist = this.testList
					let nslist = [...oldlist,...res.result.data]
					this.testList = nslist
				})
			},
		},
		onShow() {
						// uni.$showLogin()
		},
		onLoad(e) {
			if (e.id == 2) {
				this.isSuggess = true
				uniCloud.callFunction({
					name: "getMajor"
				}).then(res => {
					this.list1 = res.result.data
				})
				uniCloud.database().collection('major').where({
					main: "应用技术学院本科专业"
				}).get().then(res => {
					this.list2 = res.result.data
				})
				uniCloud.database().collection('major').where({
					main: "专升本专业"
				}).get().then(res => {
					this.list3 = res.result.data
				})
				uniCloud.database().collection('major').where({
					main: "普通专科专业"
				}).get().then(res => {
					this.list4 = res.result.data
				})
				uniCloud.database().collection('major').where({
					main: "合作办学专科专业"
				}).get().then(res => {
					this.list5 = res.result.data
				})
				uniCloud.database().collection('major').where({
					main: "双学位专业"
				}).get().then(res => {
					this.list6 = res.result.data
				})
				return
			} else if (e.id == 1) {
				uniCloud.database().collection('videoClass').get().then(res=>{
					console.log(res);
					this.videoClass = res.result.data
				})
				this.isSchoollife = true
				return
			} else if (e.id == 3) {
				this.isTest = true
				this.getTest()
				return
			} else if (e.id == 4) {
				uni.navigateTo({
					url:'/subpkg/body/body'
				})
				// this.isCourse = true
				return
			} else if (e.id == 5) {
				this.isBody = true
				uniCloud.database().collection('libraryA').field('id,title').get().then(res => {
					this.lbraryOne = res.result.data
				})
				return
			} else if (e.id == 6) {
				this.isPublic = true
				uniCloud.database().collection('public').get().then(res=>{
					console.log(res)
					this.publicArr = res.result.data
				})
				return
			} else if (e.id == 7) {
				this.isIssus = true
				return
			} else if (e.id == 8) {
				this.isClub = true
				uniCloud.callFunction({
					name:'getClubInfo'
				}).then(res=>{
					this.clubList = res.result.data
				})
				this.nickName = uni.getStorageSync('name')
				return
			}
		},
	
	}
</script>

<style lang="scss">

</style>
