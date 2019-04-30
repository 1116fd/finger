<template>
    <div class="sucs" v-show="isshow">{{success}}</div>
</template>
<script>
export default {
    data(){
        return{
            //isshow:false
        }
    },
    props:{
        success:{
            type:String
        },
        isshow:{
            type:Boolean
        }
    }
}
</script>
<style lang="scss" scoped>
    .sucs{
        padding: 5px 5px;
        height: 5%;
        position: fixed;
        left: 50%;
        top: 15%;
        transform: translateX(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.7);
        color: #fff;
        border-radius: 10px;
    }
</style>
