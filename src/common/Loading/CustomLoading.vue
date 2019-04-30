<template>
    <span class="my-loading">
        <img src="../../assets/img/timg.gif" alt="">
    </span>
</template>

<script>
    export default {
        name:'CustomLoading'
    }
</script>

<style lang="scss" scoped>
.my-loading{
    width: 6rem;
    height: 6rem;
    img{
        width: 100%;
        height: auto;
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>