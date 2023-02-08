<template>
	<view>
		<web-view :src='path'></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				path: ''
			};
		},
		// onLoad: function(options) {
		// 	console.log(options)
		// 	var webview = options.webview;
		// 	this.path =  webview
		// },
		onLoad(options) {
			setTimeout(()=>{
				// this.path = options.webview
				this.path = decodeURIComponent(options.webview);
			},600)
		},
	}
</script>

<style lang="scss">

</style>
