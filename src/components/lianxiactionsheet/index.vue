<template>
    <div class="actionsheet">
        <transition name="mask-fade">
            <div class="masker" v-show="flag" @click="hideselect"></div>
        </transition>
        <transition name="content-slide">
            <div class="as-content" v-show="flag">
                <p v-for="(item,i) in optionsarr" :key="i" @click="getval(item)">{{item.name}}</p>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    props:{
        flag:{
            type:Boolean,
            required:true
        },
        optionsarr:{
            type:Array,
            required:true
        }
    },
    methods: {
        hideselect(){
            this.$emit("select")
        },
        getval(data){
            this.$emit("selects",data)
        }
    },
}
</script>
<style lang="scss" scoped>
    .actionsheet{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
        height: 50%;
    }
    .masker{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0,.7);
        position: fixed;
        left: 0;
        top:0;
    }
    .as-content{
        width: 100%;
        max-height: 50%;
        position: absolute;
        bottom:0px;
        left: 0px;
        background: #fff;
    }
    .as-content p{
        line-height: 40px;
    }
    .mask-fade-enter,.mask-fade-leave-to{
        opacity: 0;
    }
    .mask-fade-enter-to,.mask-fade-leave{
        opacity: 1;
    }
    .mask-fade-enter-active,.mask-fade-leave-active{
        transition: opacity 1s ease-out;
    }
    .content-slide-enter,.content-slide-leave-to{
        transform:translate3d(0,100%,0);
    }
    .content-slide-enter-to,.content-slide-leave{
        transform:translate3d(0,0,0);
    }
     .content-slide-enter-active,.content-slide-leave-active{
        transition: transform 1s ease-out;
    } 
</style>