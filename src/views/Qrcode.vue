<template>
    <div class="invitePosterPage">
        <!-- 这里是你生成完成的海报，背景图+二维码 -->
        <img v-if="posterDataUrl" :src="posterDataUrl" class="poster-bg" />
        <div v-else id="poster" class="flex-row" style="position: relative">
            <img class="poster-bg" src="../assets/logoApp.png" />
            <!-- canvas里是你的二维码 -->
            <div class="qr-content">
                <canvas class="qr" id="qrCode-canvas"></canvas>
                <div class="qr-right">
                    <span>app二维码</span>
                    <span>推荐你加入，扫码获取奖励。</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";
import html2canvas from "html2canvas";
export default {
    name: "Poster",
    data() {
        return {
            posterDataUrl: ""
        };
    },

    async mounted() {
        this.createQRCode();
    },

    methods: {
        createQRCode() {
            //先用 QRCode 生成二维码 canvas，然后用 html2canvas 合成整张海报并转成 base64 显示出来
            let canvas = document.getElementById("qrCode-canvas");
            QRCode.toCanvas(canvas, "http://www.baidu.com", error => {
                if (error){
                    return false;
                } else {
                    //qrcode 生成的二维码会带有一些默认样式，需要调整下
                    canvas.style.width = "4rem";
                    canvas.style.height = "4rem";
                    let poster = document.getElementById("poster");
                    html2canvas(poster).then(canvas => {
                        this.posterDataUrl = canvas.toDataURL();
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.poster-bg {
    position: relative;
    height: 300px;
    width: 100%;
}
.qr {
    height: 1rem;
}
.qr-content {
    position: absolute;
    bottom: 0.5rem;
    left: 1.4rem;
    display: flex;
    align-items: center;
}
.qr-right {
    display: flex;
    flex-direction: column;
}
.qr-right > span:nth-child(1) {
    text-align: left;
}
</style>