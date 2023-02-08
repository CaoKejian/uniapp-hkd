
// #ifndef VUE3
import Vue from 'vue'
import App from './App'



uni.$showLogin = function(title="请先登录！"){
	const name = uni.getStorageSync('name').name
	if (!name) {
		uni.showToast({
			title,
			image:"../../static/加载.png",
			icon:"none"
		})
		setTimeout(() => {
			uni.navigateTo({
				url: '/subpkg/signin/signin',
			})
		}, 500)
		return
	}
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif