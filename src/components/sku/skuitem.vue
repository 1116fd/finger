<template>
    <li>
        <input type="text" v-model="group_item">
        <span @click="addVal" v-if="islast" class="add">+</span>
        <span @click="addVal" v-else  class="add">-</span>
    </li>
</template>

<script>
    export default {
        name:'skuitem',
        props:{
            islast:{
                type:Boolean,
                idRequired:true
            }
        },
        data(){
            return {
                group_item:''
            }
        },
        methods:{
            remove(){
                this.$emit('remove')
            },
            addVal(){
                this.$parent.vidCount ++;
                this.$parent.arr.push({vid:this.vidCount})
            }
        }
    }
</script>

<style lang="scss" scoped>
*{
    box-sizing: border-box;
}
li{
    margin: 20px;
    width: 100%;
    padding: 0 10px;
}
input{
    margin:10px;
    outline: none;
    height: 30px;
    padding-left: 3px;
}
.add{
    font-size: 25px;
}
</style>