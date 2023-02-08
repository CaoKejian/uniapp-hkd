<template>
	<view class="content">
		<view class="top">
			<button @click="clickSelect">{{title}}</button>
		</view>
		<jpCharts v-if="list.length>1" :setTrue='setTrue' :selectColor="Charts.selectColor" :list="list" :Y="Charts.Y"
			:X="Charts.X" :keyId="Charts.keyId" :width="Charts.width" :bgColor="Charts.bgColor" :height="Charts.height"
			:canClick="Charts.canClick" :x_width="Charts.x_width" :items="items" :proportion="Charts.proportion"
			:checkedColor="Charts.checkedColor" :scrollLeft="100" :showZ="Charts.showZ" :radius="Charts.radius" @cancel="getIndex">
		</jpCharts>
		<view class="bottom" v-if="isShowWrite">
			<view class="box">
				<image src="../../static/记录一次体重.png" mode=""></image>
				<view class="center">
					<input type="text" @input="kg" v-model="writeKg">
					<text>斤</text>
				</view>
				<button @click="write1">记录</button>
			</view>
			<view class="box">
				<image src="../../static/修改理想体重.png" mode=""></image>
				<view class="center">
					<input type="text" v-model="one">
					<text>斤</text>
				</view>
				<button @click="write2">记录</button>
			</view>
		</view>
		<view class="bottom2" v-else>
			<view class="box1-f">
				<view class="jianjv box1">
					<text>调整宽度占比</text>
					<picker class="picker" mode="selector" :range="array" @change="picker1" :value="index">
						<view>{{array[index]}}</view>
					</picker>
				</view>
				<view class="radius box1">
					<text @click="radius">调整图形宽度</text>
					<picker class="picker" mode="selector" :range="array1" @change="picker2" :value="index2">
						<view>{{array1[index2]}}</view>
					</picker>
				</view>
			</view>
			<view class="box2-f">
				<view class="value box2">
					<text>显示值</text>
					<checkbox checked='false' @click="value"></checkbox>
				</view>
				<view class="x box2">
					<text>显示横坐标</text>
					<checkbox checked='false' @click="x"></checkbox>
				</view>
				<view class="z box2">
					<text>显示横坐标底线</text>
					<checkbox checked='false' @click="z"></checkbox>
				</view>
			</view>
			<view class="box3-f">
				<view class="color box3">
					<text >选择低于理想值的颜色</text>
					<t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker>
					<view @click="open" class="border-radius" :style="'background-color: '+Charts.selectColor.color1"></view>
				</view>
				<view class="color box3">
					<text >选择高于理想值的颜色</text>
					<t-color-picker ref="colorPicker2" :color="color2" @confirm="confirm2"></t-color-picker>
					<view @click="open2" class="border-radius" :style="'background-color: '+Charts.selectColor.color2"></view>
				</view>
				<view class="color box3">
					<text >选择等于理想值的颜色</text>
					<t-color-picker ref="colorPicker3" :color="color3" @confirm="confirm3"></t-color-picker>
					<view @click="open3" class="border-radius" :style="'background-color: '+Charts.selectColor.color3"></view>
				</view>
			</view>
		</view>
		<!-- <button @click="remove">删除</button> -->
	</view>
</template>
<script>
	import jpCharts from '../../components/jp-charts/index.vue';
	import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	export default {
		components: {
			jpCharts,
			tColorPicker
		},
		data() {
			return {
				isShowWrite: true,
				writeKg: "",
				one: '',
				array: [20, 30, 40, 50, 60, 70, 80, 90, 100],
				array1: [50, 60, 70, 80, 90, 100, 110],
				arrIndex1: "",
				arrIndex2: "",
				index: 0,
				index2: 0,
				title: "自定义",
				newItem: [{
					keyw: '0',
					value: '100'
				}],
				oldItem: {
					keyw: '',
					value: ''
				},
				newItemIndex: 0,
				keyw1: "",
				value1: "",
				setTrue: 0,
				color: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
				color2: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},
				color3: {
					r: 255,
					g: 0,
					b: 0,
					a: 0.6
				},

				Charts: { //y轴配置 value在list中的键 showY是否一直显示数据 size字大小 units文字后缀
					Y: {
						value: 'value',
						showY: true,
						size: 20,
						units: '',
					},
					X: {
						value: 'keyw',
						showX: true,
						size: 20,
						units: ''
					},
					keyId: 'keyw',
					radius: 20,
					list: [],
					items: {},
					selectColor: {
						color1: '#ffeb99',
						color2: '#edc00c',
						color3: '#34ffa0'
					},
					width: 750,
					height: 500,
					x_width: 80,
					proportion: 70, //宽度占比
					showZ: true, //是否显示线条
					// checkedColor: '#007aff',
					canClick: true, //不可以点击
					// bgColor: '#c2d3ff',
					scrollLeft: 0
				},
				list: [{
						keyw: '1',
						value: 67
					}, {
						keyw: '2',
						value: 79
					}, {
						keyw: '3',
						value: 90
					},
					{
						keyw: '4',
						value: 69
					}, {
						keyw: '5',
						value: 79
					}, {
						keyw: '6',
						value: 64
					},
					{
						keyw: '7',
						value: 67
					}, {
						keyw: '8',
						value: 79
					}, {
						keyw: '9',
						value: 64
					},
					{
						keyw: '10',
						value: 67
					}, {
						keyw: '11',
						value: 79
					}, {
						keyw: '12',
						value: 64
					},
					{
						keyw: '13',
						value: 67
					}, {
						keyw: '14',
						value: 79
					}, {
						keyw: '15',
						value: 64
					},
					{
						keyw: '次数',
						value: ''
					}

				],
				items: {
					keyw: '0',
					value: 100
				},
			}
		},
		methods: {
			remove(){
				uni.showModal({
					title:'确认删除吗',
					content: '提示：这将会删除你记录的数据，请备份',
					success:res=>{
						if(res.confirm){
							uni.removeStorageSync('weightArr')
							this.fresh()
						}
					}
				})
			},
			localstorage() {
				uni.setStorageSync('weightArr', this.newItem)
			},
			clickSelect() {
				this.isShowWrite = !this.isShowWrite
				this.title = this.isShowWrite ? '自定义' : '保存返回'
			},
			kg(e) {
				this.newItem = uni.getStorageSync('weightArr')
				this.newItemIndex = this.newItem.length
				this.value1 = this.writeKg
				this.keyw1 = this.newItem.length
			},
			write1() {
				if (this.writeKg == '') {
					uni.showToast({
						title: '输入不能为空',
						icon: 'none'
					})
					return
				}
				this.newItem = uni.getStorageSync('weightArr')
				this.oldItem.keyw = this.keyw1
				this.oldItem.value = Number(this.value1)
				this.newItem.splice(this.newItemIndex, 0, this.oldItem)
				this.localstorage()
				this.writeKg = ''
				// 热更新
				this.list = uni.getStorageSync('weightArr')
				if (this.setTrue) {
					this.list[0].value = this.setTrue
				}
			},
			write2() {
				if (this.one == "") {
					uni.showToast({
						title: '输入不能为空',
						icon: 'none'
					})
					return
				}
				this.setTrue = Number(this.one)
				uni.setStorageSync('setTrue', this.setTrue)
				// 热更新
				this.list = uni.getStorageSync('weightArr')
				if (this.setTrue) {
					this.list[0].value = this.setTrue
				}
				this.one = ''
			},
			picker1(e) {
				this.arrIndex1 = e.detail.value
				this.Charts.proportion = this.array[this.arrIndex1]
				this.index = this.arrIndex1
			},
			picker2(e) {
				this.arrIndex2 = e.detail.value
				this.Charts.x_width = this.array1[this.arrIndex2]
				this.index2 = this.arrIndex2
			},
			value() {
				this.Charts.Y.showY = !this.Charts.Y.showY
			},
			x() {
				this.Charts.X.showX = !this.Charts.X.showX
			},
			z() {
				this.Charts.showZ = !this.Charts.showZ
			},
			fresh() {
				// 热更新
				this.list = uni.getStorageSync('weightArr')
				if (this.setTrue) {
					this.list[0].value = this.setTrue
				}
			},
			open(item) {
				// 打开颜色选择器
				this.$refs.colorPicker.open();
			},
			open2(item) {
				this.$refs.colorPicker2.open();
			},
			open3(item) {
				this.$refs.colorPicker3.open();
			},
			confirm(e) {
				const colorSelect = JSON.stringify(e)
				this.Charts.selectColor.color1 = JSON.parse(colorSelect).hex
				this.fresh()
			},
			confirm2(e) {
				const colorSelect = JSON.stringify(e)
				this.Charts.selectColor.color2 = JSON.parse(colorSelect).hex
				this.fresh()
			},
			confirm3(e) {
				const colorSelect = JSON.stringify(e)
				this.Charts.selectColor.color3 = JSON.parse(colorSelect).hex
				this.fresh()
			}

		},
		onLoad() {
			const name = uni.getStorageSync('name').name
			if (!name) {
				if (this.setTrue) {
					this.list[0].value = this.setTrue
				}
			} else if (name) {
				this.list = uni.getStorageSync('weightArr')
				console.log(this.list.length);
				console.log(this.list);
				if(!this.list.length==0){
					this.list.push({
						keyw: '次数',
						value: ''
					})
				}else{
					console.log(123);
					this.list=[{
						keyw: '理想值',
						value: ''
					}]
					this.newItem = this.list
					this.localstorage()
				}
				const setTrue = uni.getStorageSync('setTrue')
				if (setTrue) {
					this.setTrue = setTrue
				}
				if (this.setTrue) {
					this.list[0].value = this.setTrue
					uni.setStorageSync('setTrue', this.list[0].value)
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		background-color: #fffae5;
		height: 100vh;

		.top {
			padding-top: 40rpx;
			position: relative;
			z-index: 100;
			right: 30rpx;
			width: 100%;

			button {
				width: 30%;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 14px;
				letter-spacing: 1px;
				color: #9E6D38;
				background-color: #ffe478;
				border-radius: 30rpx;
				float: right;
				box-shadow: 2px 2px 3px #d8d8d8;
			}
		}

		.bottom2 {
			margin-top: 100rpx;
			.box1-f{
				.box1{
					width: 90%;
					padding: 30rpx 0;
					margin: 0 auto;
					display: flex;
					justify-content: space-around;
					.picker{
						flex: 1;
						margin-left: 50rpx;
						text-align: center;
						border-bottom: 1px solid;
					}
				}

			}
			.box2-f{
				.box2{
					width: 90%;
					padding: 30rpx 0;
					margin: 0 auto;
					display: flex;
					justify-content: space-between;
				}
			}
			.box3-f{
				.box3{
					width: 90%;
					padding: 30rpx 0;
					margin: 0 auto;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					.border-radius{
						width: 40rpx;
						height: 40rpx;
						border-radius: 50%;
						// background-color: red;
					}
				}
			}
			.box1-f,.box2-f,.box3-f{
				width: 90%;
				margin: 0 auto;
				background-color: #fff;
				border-radius: 30rpx;
				margin-bottom: 50rpx;
				color: #9E6D38;
			}
			

			.color {
				display: flex;
				flex-direction: column;
			}
		}

		.bottom {
			width: 80%;
			height: auto;
			margin: 0 auto;
			padding-top: 50rpx;

			.box {
				border-radius: 40rpx;
				margin-top: 60rpx;
				width: 100%;
				height: 300rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;

				.center {
					display: flex;
					justify-content: center;

					input {
						width: 50%;
						text-align: center;
						border-bottom: 1px solid #9E6D38;
					}

					text {
						color: #9E6D38;
					}

				}

				button {
					height: 60rpx;
					width: 200rpx;
					line-height: 60rpx;
					background-color: #fff5ca;
					color: #9E6D38;
					font-size: 14px;
					letter-spacing: 1px;
				}

				image {
					width: 50%;
					height: 50rpx;
				}
			}
		}
	}
</style>
