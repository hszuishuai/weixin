<template>
    <div>
        <button @click="weixinPay">支付</button>
    </div>
</template>
<script>
// import {httpServer} from "@/api/util"
export default {
    name: "Pay",
    methods: {
        weixinPay() {
            let para = {
                method: "post",
                url: "/api/wxPayCB/h5Pay",
                data: {}
            };
            this.$http.post(para.url,para.data).then(resm => {
                console.log(
                    "生成结果h5！！！！！！！！！！！！！！！！！！",
                    resm
                );
                WeixinJSBridge.invoke("getBrandWCPayRequest", resm, function(
                    res
                ) {
                    console.log(res);
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // success
                        console.log("success");
                    }
                });
            });
        }
    }
};
</script>