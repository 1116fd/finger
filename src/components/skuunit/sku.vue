<template>
    <div class="group">
        <div class="title">
            <span>group</span><br/>
            <input type="text" v-model="group_name">
            <span @click="remove">-</span>
        </div>
        <div class="values">
            <span>values</span>
            <ul>
                <Itemsku v-for="(item,i) in itemarr" :key="item.id" :itemid="item.id" :isjia="i==itemarr.length-1"/>
                <!-- <li><input type="text" v-model="item_name"><span>+</span></li> -->
            </ul>
        </div>
    </div>
</template>
<script>
import Itemsku from './itemsku.vue'
export default {
    data(){
        return {
            group_name:"",
            itemarr:[{id:1}],
            itemcount:1
        }
    },
    props:{
        id:{
            type:[String,Number]
        }
    },
    components:{
        Itemsku
    },
    methods:{
        remove(){
            this.$emit("removenum",this.id)
        }
    }
}
</script>
<style lang="scss" scoped>
    .group{
        width: 100%;
        height: auto;
        background: #ccf;
        margin-bottom: 20px;
    }
</style>