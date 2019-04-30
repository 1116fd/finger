<template>
    <div :class="flag?'actionsheet fixed':'actionsheet' ">
        <transition name="mask-fade">
            <div class="masker" v-show="flag" @click="hideActionsheet"></div>
        </transition>
        <transition name="content-slide">
            <div class="as-content" v-show="flag" @click="hideActionsheet">
                <p v-for="(item,index) in actions" :key="index" @click="select(item)">{{item}}</p>   
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name:'actionsheet',
        props:{
            flag:{
                type:Boolean,
                required:true
            },
            actions:{
                type:Array,
                required:true
            }
        },
        methods: {
            hideActionsheet(){
                this.$emit('select');
            },
            select(data){
                this.$emit('select',data);
            }
        },
    }
</script>

<style lang="scss" scoped>
.fixed{
    position: fixed;
    width: 100%;
    height: 100%;
}
.actionsheet{
    // 
    left: 0;
    right: 0;
   
}
.masker{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0,.7);
}
.as-content{
    position: absolute;
    width: 100%;
    max-height: 50%;
    left: 0;
    bottom: 0;
    background: #fff;
    p{
        line-height: 30px;
        text-align: center;
    }
}
.mask-fade-enter{
    opacity: 0;
}
.mask-fade-enter-to{
    opacity: 1;
}
.mask-fade-enter-active,.mask-fade-leave-active{
    transition: opacity 1s ease-out;
}
.content-slide-enter,.content-slide-leave-to{
    transform: translate3d(0,100%,0);
}
.content-slide-enter-to,.content-slide-leave{
    transform: translate3d(0,0,0);
}
.content-slide-enter-active,.content-slide-leave-active{
    transition: transform 1s ease-out;
}
</style>