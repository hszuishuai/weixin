<template>
    <div class="about">
        <img src="../assets/logoApp.png" />
        <a  v-if="isAndroid_ios === 'ios'" href="itms-appss://apps.apple.com/cn/app/bo-yafm-ba-shi-jie-shuo-gei/id1470359900"
        >前往appstore</a>
        <br>
        <button  v-if="isAndroid_ios === 'android'" @click="androidLoad">安卓下载</button>
        <div class="andirod" v-if="isWeiXin && isAndroid_ios === 'android'">
             <div class="ties">请右上角在浏览器中打开本页面</div>
             <div class="bg"></div>
        </div>
        
    </div>
</template>
<script>
export default {
    name: "about",
    data() {
        return {
            deviceType: "ios",
            // isWeiXin:true
        };
    },
    computed:{
      //判断是否是微信
      isWeiXin(){
          if (/MicroMessenger/gi.test(navigator.userAgent)) {
                return  true;
            } else {
                return  false;
            }
      },
      isAndroid_ios() {
            let u = navigator.userAgent,
                app = navigator.appVersion;
            let isAndroid =
                u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            return isAndroid == true ? this.deviceType = "android" : this.deviceType = "ios";
        },
    },
    methods: {    
        //判断是否是ios  andriod
        androidLoad(){
          window.location.href = "http://192.168.0.116:4000/test.apk";
        }
    }
};
</script>

<style scoped>
  .arduino{
    
  }
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    opacity: 0.4;
    z-index: 20;
  }
  .ties{
    z-index: 30;
    position: absolute;
    top: 2rem;
    right: 20px;
    padding: 20px 20px;
    color: #fff;
  }
</style>

