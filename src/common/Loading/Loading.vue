<template>
    <transition name="loading" @after-leave="afterLeave">
        <div class="loading-layer" v-show="visiable">
            <div class="loading-wrapper">
                <component :is="loading"></component>
                <span v-if="!loading">loading...</span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name:'loading',
        data(){
            return {
                visiable:false
            }
        },
        mounted() {
        },
        methods:{
            afterLeave(){
                this.$emit('afterLeave')
            }
        }
    }
</script>

<style lang="scss" scoped>
.loading-layer{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 999999999;
    display: block!important;
}
.loading-layer .loading-wrapper{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 10rem;
    height: 10rem;
    line-height: 10rem;
    text-align: center;
    background: #fff;
    transform: translate3d(-50%,-50%,0);
    border-radius: 20px;
}
.loading{
    opacity: 0;
}
.loading-to{
    opacity: 1;
}
.loading-active{
    transition: opacity 2s linear;
}
.loading-leave{
    opacity: 1;
}
.loading-leave-to{
    opacity: 0;
}

</style>