<template>
    <div class="start">
        <button @click="tomy">我的</button>
        <button @click="storeselect">店铺选择</button>
    </div>
</template>

<script>
    export default {
        name:'page',
        methods:{
            tomy(){
                this.$router.push("/storemy");
            },
            storeselect(){
                this.$router.push("/storelist");
            }
        }
    }
</script>

<style lang="scss" scoped>
.start{
    width: 100%;
    height: 100%;
}
button{
    background: skyblue;
    width: 40%;
    height: 40px;
    margin: 100px 5%;
    border: 0;
    outline: none;
}
</style>