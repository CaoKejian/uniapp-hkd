<template>
	<view>
		<scroll-view class="scroll-view_H jp_charts" scroll-x="true" :style="'width:'+width+'rpx;height:'+height+'rpx'"
			@scroll="scroll" :scroll-left="scrollLeft">
			<view class="jp_charts" :style="'width:'+widths+'rpx;height:'+height+'rpx'">
				<view class="charts">
					<view class="charts_h" v-for="(item,index) in list" :key="index" :style="'width:'+x_width+'rpx'">
						
						<view class="charts_hx" @tap="oclik(item,index)">
							<text style="height: 50rpx;" :style="'font-size:'+Y.size+'rpx;color:'+Y.color"
								v-if="Y.showY">{{item[Y.value]+Y.units}}</text>
							<text v-else style="height: 50rpx;"><text v-if="item[keyId]==items_[keyId]"
									:style="'font-size:'+Y.size+'rpx;color:'+Y.color">{{item[Y.value]+Y.units}}</text></text>
							<view
								:style="'width:'+proportion+'%;margin-left:'+((100-proportion)/2)+'%;'+'height:'+item.jpHeightCalculation/1.5+'%'"
								style="height: 100%;display: flex; justify-content: flex-end; flex-direction: column;">
								<view class="charts_hxs" :class="radius?'border_adiuss':''" style="height: 100%;background-color: #fff; "
									:style="'background-color:'+item.bgColor"
									>
								</view>
							</view>
							<view class="line" :style="'border-top: 1px dashed #B0ADAB;position: relative;width: 100%;bottom:'+setOne+'%'">
							</view>
							
						</view>
						<view class="showz" v-if="showZ" style="height: 2px;width: 100%;background-color: #9e6d38;"></view>
						<view class="bottom-text" style="text-align: center;" :style="'font-size:'+X.size+'rpx;color:'+X.color"
							v-if="X.showX">
							{{item[X.value]+X.units}}
							</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	// :style="[arrowStyle(item)]"   p18
	export default {
		components: {},
		props: {
			Y: { //y轴配置 value在list中的键   showY是否一直显示数据   size字大小   units文字后缀
				type: Object,
				default () {
					return {
						value: 'Y',
						showY: true,
						size: 22,
						units: '',
						color: '#333'
					}
				}
			},
			X: { //多选初始值
				type: Object,
				default () {
					return {
						value: 'X',
						showX: true,
						size: 22,
						units: '',
						color: '#333'
					}
				}
			},
			list: { //数据
				type: Array,
				default () {
					return []
				}
			},
			items: { //默认值
				type: Object,
				default () {
					return {}
				}
			},
			width: { //宽
				type: Number,
				default () {
					return 750
				}
			},
			height: { //高
				type: Number,
				default () {
					return 500
				}
			},
			proportion: { //宽度占比
				type: Number,
				default () {
					return 20
				}
			},
			x_width: { //宽度
				type: Number,
				default () {
					return 300
				}
			},
			scrollLeft: {
				type: Number,
				default () {
					return 0
				}
			},
			showZ: { //是否显示线条
				type: Boolean,
				default () {
					return true
				}
			},
			keyId: { //数据唯一值
				type: String,
				default () {
					return 'id'
				}
			},
			canClick: {
				type: Boolean,
				default () {
					return true
				}
			},
			checkedColor: {
				type: String,
				default () {
					return '#AC1E34'
				}
			},
			selectColor:{
				type: Object,
				default(){
					return 
				}
			},
			bgColor: {
				type: String,
				default () {
					return '#edc00c'
				}
			},
			btColor: {
				type: String,
				default () {
					return '#edc00c'
				}
			},
			btcheckedColor: {
				type: String,
				default () {
					return '#eee'
				}
			},
			radius: {
				type: Number,
				default () {
					return 10
				}
			},
			setTrue:{
				type:Number,
				default(){
					return 100
				}
			}
		},
		data() {
			return {
				items_: {},
				nus: '',
				widths: 750,
				setOne: "",
				
			}
		},
		mounted() {
			this.items_ = this.items
			this.widths = (this.width > this.x_width * this.list.length) ? this.width : (this.x_width * this.list.length)
			this.setHeight()
		},
		watch: {
			list() {
				this.items_ = this.items
				this.widths = (this.width > this.x_width * this.list.length) ? this.width : (this.x_width * this.list
					.length)
				this.setHeight()
			}
		},
		methods: {
			scroll(e) {
				this.$emit('scroll', e);
			},
			setHeight() {
				let h = 0
				this.list.forEach((el, index) => {
					if (el[this.Y.value] > h) {
						h = el[this.Y.value]
					}
				})
				// 找出大于this.setOne 的每一项 改变颜色
				this.list.forEach((el, index) => {
					if (el[this.Y.value] < this.setTrue) {
						el.bgColor = this.selectColor.color1||'#ffeb99'
					}else if(el[this.Y.value]==this.setTrue){
						el.bgColor =this.selectColor.color3||'#34ffa0'
					}else {
						el.bgColor= this.selectColor.color2||this.btColor
					}
				})
				console.log(this.list);
				console.log(h);
				const linshi =this.setTrue / h * 100 +1
				this.setOne = linshi/1.5 
				console.log(this.setOne);

				this.list.forEach((el, index) => {
					if (el[this.Y.value] > 0) {
						el.jpHeightCalculation = ((el[this.Y.value] / h) * 100) +1
					} else {
						el.jpHeightCalculation = 1
					}
				})
			},
			oclik(item,index) {
				// uni.showModal({
				// 	title:'确认删除吗',
				// 	content: '提示：将会删除这次记录',
				// 	success:res=>{
				// 		if(res.confirm){
				// 			this.$emit('cancel',index)
				// 		}
				// 	}
				// })
				// 点击高亮
				// if (this.canClick) {
				// 	this.items_ = item
				// 	this.$emit('checked', item);
				// }
			},
			arrowStyle(item) {
				let style = {}
				
				if (this.bgColor) {
					style = {
						'background':this.btColor
						// 'background': `-webkit-linear-gradient(top, ${this.btColor}, ${this.bgColor})`,
						// /* Safari 5.1 - 6.0 */
						// 'background': `-o-linear-gradient(top, ${this.btColor}, ${this.bgColor})`,
						// /* Safari 5.1 - 6.0 */
						// 'background': `-moz-linear-gradient(top,${this.btColor}, ${this.bgColor})`,
						// /* Safari 5.1 - 6.0 */
						// 'background': `linear-gradient(to top, ${this.btColor}, ${this.bgColor})`
					}
				}
			
				if (item[this.keyId] === this.items_[this.keyId]) {
					style = {
						'background': `-webkit-linear-gradient(top,${this.btcheckedColor}, ${this.checkedColor})`,
						/* Safari 5.1 - 6.0 */
						'background': `-o-linear-gradient(top, ${this.btcheckedColor}, ${this.checkedColor})`,
						/* Safari 5.1 - 6.0 */
						'background': `-moz-linear-gradient(top, ${this.btcheckedColor}, ${this.checkedColor})`,
						/* Safari 5.1 - 6.0 */
						'background': `linear-gradient(to top, ${this.btcheckedColor}, ${this.checkedColor})`
					}
				}
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jp_charts {
		background-color: #fffae5;
		height: 260px;
		
		.charts {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: flex-start;



			.charts_h {
				text-align: center;
				height: 100%;
				
				.charts_hx {
					height: calc(100% - 50rpx);
					display: flex;
					justify-content: flex-end;
					flex-direction: column;
					.line{
						border-top: 1px dashed #B0ADAB;
					}
					.charts_hxs {
						background-color: #1CBBB4;
						width: 100%;
						display: inline-block;
					}

					.border_adiuss {
						border-top-left-radius: 10rpx;
						border-top-right-radius: 10rpx;
					}

				}
			}
		}
	}
	.showz{
		position: relative;
		top: -1px;
	}
</style>
