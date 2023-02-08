<template>
    <view class="content" style="margin: 20px auto 40px auto;">
        <view class="flip-container">
            <view class="flip-items" v-for="(unit,unitIndex) of timeArr" :key="unitIndex">
                <view class="item" v-for="(item,index) of unit.max + 1" :key="index" :class="{current: unit.current == index, past: unit.current + 1 == index || index==unit.max&&unit.current==0}">
                    <view class="up">
                        <view class="inner">{{index}}</view>
                        <view class="shadow"></view>
                    </view>
                    <view class="down">
                        <view class="inner">{{index}}</view>
                        <view class="shadow"></view>
                    </view>
                </view>
				<view class="type">
					{{unit.type}}
				</view>
            </view>
        </view>
    </view>
</template>

<script>

export default {
    name: 'flipCountdown',
    props: {
        deadline: {
            type: String,
        },
        
    },
    data() {
    	return {
            timeStr:this.getTimeStr(),
            timeRunner:'',
    		endTime:this.deadline
    	}
    },
    computed:{
        timeArr(){
            return [...this.timeStr].map((unit,index)=>{
                let max;
    			let type;
                if(index&1==1){     //时分秒的个位
                    max = 9 
    				type = ''
                }else if(index==0){ //天十位
                    max = 9
    				type = 'Days'
                }else if(index==2){ //时十位
                    max = 5
    				type = 'Hours'
                }else if(index==4){ //分十位
                    max = 5
    				type = 'Minutes'
                }else if(index==6){ //秒十位
                    max = 5
    				type = 'Seconds'
                }
                return {
                    max,
    				type,
                    current:Number(unit),
                }
            })
        }
    },
    methods:{
        setTimeRunner(){
            this.timeRunner = setInterval(()=>{
                this.timeStr = this.getTimeStr()
            },1000)
        },
    	getTimeStr(){
    		var date =  new Date(new Date());
    		var y = 1900+date.getYear();
    		var m = "0"+(date.getMonth()+1);
    		var d = "0"+date.getDate();
    		let hour = ('00' + date.getHours()).slice(-2)
    		let minute = ('00' + date.getMinutes()).slice(-2)
    		let second = ('00' + date.getSeconds()).slice(-2)
    		var startTime = y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length)+' '+hour+":"+minute+":"+second
    		
    		var returnVal = this.twoTimeInterval(startTime,'2022-08-16 12:00:00')
    	    return returnVal
    	},
    	twoTimeInterval(startTime,endTime) {
    	  // 开始时间
    	  let d1 = startTime.replace(/\-/g, "/");
    	  let date1 = new Date(d1);
    	 
    	  // 结束时间
    	  let d2 = endTime.replace(/\-/g, "/");
    	  let date2 = new Date(d2);
    	 
    	  // 时间相差秒数
    	  let dateDiff = date2.getTime() - date1.getTime();
    	 
    	  // 计算出相差天数
    	  let days = Math.floor(dateDiff / (24 * 3600 * 1000)).toString();
    	 
    	  // 计算出小时数
    	  let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    	  let hours = Math.floor(residue1 / (3600 * 1000)).toString();
    	 
    	  // 计算相差分钟数
    	  let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    	  let minutes = Math.floor(residue2 / (60 * 1000)).toString();
    	 
    	  // 计算相差秒数
    	  let residue3 = residue2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
    	  let seconds = Math.round(residue3 / 1000).toString();
    	  let returnVal =
    	    ((days  < 10) ? "0"+days : days) +
    	    ((hours < 10) ? "0"+hours : hours) +
    	    ((minutes < 10) ? "0"+minutes : minutes) +
    	    ((seconds < 10) ? "0"+seconds : seconds);
    	  return returnVal;
    	 
    	}
    },
    created() {
        this.setTimeRunner()
    },
    beforeDestroy() {
        clearInterval(this.timeRunner)
    },
};
</script>
<style lang="stylus">
    $width = 50rpx;
    $backgroundColor = #222
    $color = #ccc
    $time = 1s
    $height = $width * 1.5;
    $fontSize = $width * 1.3;
    $lineWidth = ($width / 60);
    $radius = ($width / 10);
    $perspective = $width * 5;
    $gap= $width * 0.2

    .flip-container
        display flex
        justify-content center
        padding 0 20rpx
        position relative
        .flip-items
            // margin 50rpx auto
            position relative
            width $width
            height $height
            font-size $fontSize
            font-weight bold
            border-radius $radius
            box-shadow: 0 2rpx 18rpx rgba(0, 0, 0, 0.7)
            &:nth-of-type(2n+1)
                margin-right $gap
            &:nth-of-type(2),&:nth-of-type(4),&:nth-of-type(6)
                margin-right $gap * 3
                &::after,&::before
                    position absolute
                    right -(@margin-right / 2)
                    content ''
                    transform translateX(50%)
                    width ($gap / 1.5)
                    height @width
                    border-radius 50%
                    background-color $backgroundColor
                &::before
                    top 25%
                &::after
                    bottom 25%
			
            .item
                z-index 1
                position absolute
                top 0
                left 0
                right 0
                bottom 0
                perspective $perspective
                &:before
                    content: ''
                    position absolute
                    top (($height - $lineWidth) / 2)
                    left 0
                    z-index 9
                    width: 100%
                    height: $lineWidth
                    min-height 2px
                    background-color rgba(0, 0, 0, 0.6)
                    // background-color $backgroundColor
                .up,.down
                    position absolute;
                    left 0;
                    right 0
                    height 50%;
                    overflow hidden
                .up
                    transform-origin 50% 100%
                    top 0
                .down
                    transform-origin 50% 0%
                    bottom 0
                .inner 
                    position: absolute;
                    left: 0;
                    width: 100%;
                    height: $height
                    line-height $height
                    color: $color;
                    text-shadow: 0 2rpx 4rpx #000
                    text-align: center;
                    background-color: $backgroundColor
                    border-radius: $radius
                .up .inner 
                    top 0
                .down .inner 
                    bottom 0
                .up .shadow
                    border-top-left-radius $radius
                    border-top-right-radius $radius
                .down .shadow
                    border-bottom-left-radius $radius
                    border-bottom-right-radius $radius
        .flip-items .item
            &.past {
              z-index: 3;
            }
            &.current {
              //反转到中间时候当前秒层级最大
              animation: highter-level ($time/2) ($time/2) linear forwards;
              z-index: 2;
            }
            &.past .up {
              animation: flip-past-up ($time/2) linear both;
            }
            &.current .down {
              animation: flip-current-down ($time/2) ($time/2) linear both;
            }
            @keyframes flip-current-down {
              from{
                transform: rotateX(90deg);
              }
              to {
                transform: rotateX(0deg);
              }
            }
            @keyframes flip-past-up {
              from{
                transform: rotateX(0deg);
              }
              to {
                transform: rotateX(-90deg);
              }
            }    
            @keyframes highter-level {
              from{
                z-index: 4;
              }
              to {
                z-index: 4;
              }
            }
		.flip-items .type{
			margin-top: 100rpx;
			font-size: 26rpx
		}
				
        // 控制阴影
        .flip-items .item
            .shadow {
              position: absolute;
              width: 100%;
              height: 100%;
            }
            &.past .up .shadow {
              background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
              animation: show ($time/2) linear both;
            }
            &.past .down .shadow {
              background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
              animation: show ($time/2) linear both;
            }
            &.current .up .shadow {
              background: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 1) 100%);
              animation: hide ($time/2) 0.3s linear both;
            }
            &.current .down .shadow {
              background: linear-gradient(rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.1) 100%);
              animation: hide ($time/2) 0.3s linear both;
            }
        
        @keyframes show {
          from{
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes hide {
          from{
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
    .other
        position absolute
        font-size 26px
        left 50%
        transform translateX(-50%)
        bottom 50rpx
</style>
