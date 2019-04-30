<template>
    <transition name="dialog" @after-leave="afterLeave">
        <div class="dialog-layer" v-show="visiable">
            <div class="dialog-wrapper">
                <component :is="dialog" @close="close" :id="id"></component>
                <span v-if="!dialog">dialog...</span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name:'dialog',
        data(){
            return {
                visiable:false
            }
        },
        mounted() {
            // console.log(this.visiable)
        },
        methods:{
            afterLeave(){
                console.log('aaaaaaaaa')
                this.$emit('afterLeave')
            },
            close(){
                // this.$dialog().visiable = false;
                // this.$dialog().close()
                this.visiable = false
                console.log(this.visiable)
            }
        }
    }
</script>

<style lang="scss" scoped>
.dialog-layer{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 999999999;
    display: block!important;
}
.dialog-layer .dialog-wrapper{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16rem;
    height: 14rem;
    text-align: center;
    background: #fff;
    transform: translate3d(-50%,-50%,0);
    border-radius: 10px;
    display: flex;
}
.dialog{
    opacity: 0;
}
.dialog-to{
    opacity: 1;
}
.dialog-active{
    transition: opacity 2s linear;
}
.dialog-leave{
    opacity: 1;
}
.dialog-leave-to{
    opacity: 0;
}

</style>