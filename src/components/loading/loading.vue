<style lang="scss">
    .loading-enter{
        opacity: 0;
    }
    .loading-enter-to{
        opacity: 1;
    }
    .loading-enter-active,.loading-leave-active{
        transition: opacity 2s linear;
    }
    .loading-leave{
        opacity: 0;
    }
    .loading-eleave-to{
        opacity: 1;
    }
    .loading-mask{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.5);
        position: fixed;
        left: 0;
        top:0;
    }
    .loading-wrap{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        background: #fff;
    }
</style>
<template>
    <transition name="loading">
        <div class="loading-mask" v-show="visitable">
            <div class="loading-wrap">this is loading component</div>
        </div>
    </transition>
</template> 
<script>
export default {
    data(){
        return {
            visitable :false
        }
    }
}
</script>   