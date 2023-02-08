<template>
	<view class="container">
		<view class="title">
			<slot name="title"></slot>
		</view>
		<view class="image">
			<slot name="image"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-navbar",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
.container{
	// position: sticky;
	// top: 0;
	// z-index: 999;
	padding-left: 10px;
	display: flex;
	justify-content: flex-start;
	align-items: cneter;
}

	.image {
		image {
			margin-left: 5px;
			width: 20px;
			height: 20px;
		}
	}
</style>
