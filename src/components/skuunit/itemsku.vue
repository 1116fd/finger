<template>
    <li><input type="text" v-model="item_name" @blur="getitemvalue">
        <span @click="additem" v-if="this.isjia">+</span>
        <span @click="removeitem" v-else>-</span>
    </li>
</template>
<script>
export default {
    data(){
        return{
            item_name:""
        }
    },
    props:{
        isjia:{
            type:Boolean
        },
        itemid:{
            type:[String,Number]
        }
    },
    methods:{
        additem(){
            this.$parent.itemcount++;
            this.$parent.itemarr.push({id:this.$parent.itemcount})
        },
        removeitem(){
            let ipts=this.$parent.itemarr.filter(item=>{
                return item.id!==this.itemid
            })
            this.$parent.itemarr=ipts
        },
        getitemvalue(){
           this.$parent.itemarr=this.$parent.itemarr.map((item,i)=>{
                if(item.id==this.itemid){
                    item.value=this.item_name
                }
                return item
            })
        }
    }
}
</script>
<style lang="">
    
</style>