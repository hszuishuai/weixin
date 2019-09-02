import Vue from 'vue'
import Vuex from 'vuex'
import {
  saveLoginStatus,
  loadLoginStatus,
  loadToken,
  loadUserInfo,
  saveUserInfo,
  removeToken,
  removeUserInfo,
  removeLoginStatus

} from '@/api/cache.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginStatus: loadLoginStatus(),
    token:loadToken(),
    userinfo:loadUserInfo() || ''

  },
  mutations: {
    SET_LOGIN_STATUS: (state, loginStatus) => {
      state.loginStatus = loginStatus
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO:(state,userinfo)=>{
      state.userinfo = userinfo
    }
  },
  actions: {
    setLoginStatus({ commit }, query) {
      if (query === 0 || query === 1) {
        // 上线打开注释，本地调试注释掉，保持信息最新
        removeToken()
        removeUserInfo()
      }
      // 设置不同的登录状态
      console.log("query"+query)
      commit('SET_LOGIN_STATUS', saveLoginStatus(query))
    },
    setWxUserinfo({commit},userinfo){ 
      commit("SET_USERINFO",saveUserInfo(userinfo))
    },
    fedLogOut() {
      // 删除token，用户信息，登陆状态
      //removeToken()
      console.log("1")
      removeUserInfo()
      removeLoginStatus()
    }
  },
  getters:{
    loginStatus: state => state.loginStatus,
    token: state => state.token,
    userinfo: state => state.userinfo

  },

})
