<template>
    <span class="my-dialog">
        <h4>确定取消订单</h4>
        <div class="footbtn"><button class="cancel" @click="cancel">我要取消</button><button class="save" @click="save">继续支付</button></div>
    </span>
</template>

<script>
import bus from '@/utils/bus.js'
    export default {
        name:'Confirm',
        props:{
            id:{
                type:[String,Number]
            }
        },
        data(){
            return {
            }
        },
        methods:{
            cancel(){
                this.$emit('close');
                bus.$emit('backcar');
            },
            save(){
                this.$emit('close');
                bus.$emit('continues');
                    
            }
        }
    }
</script>

<style lang="scss" scoped>
.my-dialog{
    width: 100%;
    height: 100%;
    position: relative;
    h4{
        text-align: center;
        line-height: 40px;
        margin-top: 20px;
    }
    .footbtn{
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        button{
            flex: 1;
            height: 45px;
            outline: none;
            background: none;
            border-bottom: 0;
            border-right: 0;
        }
        .cancel{
            border-left: 0;
            color: #ccc;
        }
        .save{
            color: orange;
        }
    }
}
</style>