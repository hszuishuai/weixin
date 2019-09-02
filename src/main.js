import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import './permission.js'
import wechatAuth from './api/wxAuth' // 微信登录插件
// 设置appid
Vue.use(wechatAuth, {
  appid: "wxee032ba0ed2d5f6e"
})
Vue.config.productionTip = false
Vue.prototype.$http = axios;
// 手机端调试工具
import VCconsole from 'vconsole'
let vConsole = new VCconsole() 
Vue.use(vConsole)
// router.beforeEach((to,from,next)=>{
//   if(to.path ==="/" ){
//     getCodeApi("123")
//     console.log(1)
//   }
//   next();
// })


// function getCodeApi(state) {
//   //获取code
//   let urlNow = encodeURIComponent(window.location.href);
//   // let urlNow = '192.168.0.116:9000/home'
//   let scope = "snsapi_userinfo"; //snsapi_userinfo   //静默授权 用户无感知
//   let appid = "wxee032ba0ed2d5f6e";
//   let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=${scope}&state=${state}&connect_redirect=1#wechat_redirect`;
//   window.location.href = url;
// }


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
