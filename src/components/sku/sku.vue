<template>
    <div class="group">
        <div class="title">
            <span>group</span>
            <input type="text" v-model="group_name">
            <span @click="remove" class="add">-</span>
        </div>
        <div class="values">
            <span>values</span>
            <ul>
                <sku-item v-for="(v,i) in arr" :key="v.vid" :islast="i==arr.length-1"></sku-item>
            </ul>
        </div>
    </div>
</template>

<script>
import skuitem from './skuitem.vue'
    export default {
        name:'sku',
        props:{
            id:{
                type:[String,Number],
                idRequired:true
            }
        },
        data(){
            return {
                group_name:'',
                arr:[{vid:0}],
                vidCount:1
            }
        },
        components:{
            'sku-item':skuitem
        },
        methods:{
            remove(){
                this.$emit('remove',this.id)
            }
        }
    }
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
ul,li{
    padding: 0;
    margin: 0;
}
input{
    margin:10px;
    outline: none;
    height: 30px;
    padding-left: 3px;
}
.group{
    width: 100%;
    .title{
        width: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        margin: 15px;
        .add{
            font-size: 25px;
        }
    }
    .values{
        width: 80%;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin: 15px;
        align-items: center;
        span{
            padding: 0 10px;
            height: 100%;
        }
        ul{
            flex: 1;
            
        }
    }
}
</style>