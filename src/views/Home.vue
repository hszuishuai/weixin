<template>
    <div class="home">
        <div class="head">
            <div class="head-left">
                <img src="../assets/logo.png" />
                <span>Vue</span>
            </div>
            <div @click="goTodownload" class="download-button">下载APP</div>
        </div>
        <div class="content">
            <img src="../assets/logoApp.png" alt="log" />
        </div>
        <div class="footer">
            <div class="test-button">试听</div>
            <div class="shop-button" @click="$router.push({name:'pay'})">购买</div>
        </div>
        <div>{{userinfo}}</div>
        <button @click="logout">清空vuex</button>
    </div>
</template>

<script>
// @ is an alias to /src
import {mapState,mapActions} from "vuex"

export default {
    name: "home",
    created() {
        // this.getCode();
    },
    computed:{
        ...mapState({
            userinfo:state => state.userinfo
        })
    },
    methods: {
        ...mapActions(['fedLogOut']),
        goTodownload() {
            // console.log(this.$router);
            this.$router.push({ name: "about" });
        },
        logout(){
            this.fedLogOut()
        }
    }
};
</script>
<style scoped>
.home {
    width: 100%;
}
.head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    height: 60px;
    justify-content: space-between;
}
.head-left {
    display: flex;
    align-items: center;
}
.head > .head-left > img {
    width: 25px;
    height: 25px;
    padding: 0 10px;
}
.download-button {
    padding: 5px 5px;
    border: 1px solid #42b983;
    border-radius: 10px;
    font-size: 12px;
    color: #42b983;
}
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
.content > img {
    margin-top: 60px;
    width: 100%;
    height: 200px;
}
.test-button {
    float: left;
    width: 40%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #42b983;
}
.shop-button {
    float: left;
    width: 60%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color: #42b983;
}
</style>
