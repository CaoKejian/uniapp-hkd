<template>
	<view>
		<view class="ceshi" v-for="(item,index) in arr" :key="index" @click="ceshi(index)">
			{{item}}
		</view>
		<input type="text" @input="count" name="count1">
		<input type="number" @input="a">
		<input type="number" @input="b">
			<button @click="refresh">更改</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:['1','2','3','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']
			};
		},
		methods:{
			ceshi(index){
				console.log(index);
				const content = "瑶瑶大坏蛋"
				const arr = this.arr.splice(index,1,content)
			},
			refresh(){
				const arr = this.arr.splice(1,1,55)
				console.log(arr);
			},
			count(e){
				console.log(e);
			},
			a(e){
				
			},
			b(e){
				
			}
		},
		onLoad() {
		}
	}
</script>

<style lang="scss">
	view{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
.ceshi{
	width: calc((100% / 7) - 2px) ;
	height: 100px;
	background: pink;
	margin-bottom: 1px;
}
input{
	border: 1px solid #000;
}
</style>
