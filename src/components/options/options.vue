<template>
<div class="selects" v-show="show" @click="hidesel">
    <ul class="uls">
        <li v-for="(item,i) in optionsarr" :key="i" @click="itemclick(item)">{{item.cat_name?item.cat_name:item}}</li>
    </ul>
</div>  
</template>
<script>
export default {
    name:"select",
    props:{
        show:{
            type:Boolean,
            required:true
        },
        optionsarr:{
            type:Array,
             required:true
        }
    },
    data(){
        return {
            
        }
    },
    methods:{
        itemclick(goods){
            this.$emit("goods",goods)
        },
        hidesel(){
            this.$emit("hide")
        }
    },
    mounted() {
    },
}
</script>
<style scoped  lang="scss">
.selects{
    width: 100% ;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    background: rgba(0,0,0,.5);
    z-index: 999;
}
.uls{
    width: 100%;
    max-height: 50%;
    background: #fff;
    overflow: hidden;
    overflow-y: scroll;
     position: fixed;
     bottom: 0;
     left: 0;
}
.uls li{
    line-height: 40px;
    text-align: center;
}
</style>