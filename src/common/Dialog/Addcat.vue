<template>
    <span class="my-dialog">
        <h4>填写分类名称</h4>
        <input type="text" placeholder="填写分类名称" v-model="name">
        <div class="footbtn"><button class="cancel" @click="cancel">取消</button><button class="save" @click="save">保存</button></div>
    </span>
</template>

<script>
import bus from '@/utils/bus.js'
    export default {
        name:'Addcat',
        data(){
            return {
                name:'',
                store_id:''
                // dialog:null
            }
        },
        created(){
            var url= window.location.search;
            if(url){
                var index = url.split('=')[1];
                this.store_id = index
            }
            
        },
        methods:{
            cancel(){
                this.$emit('close');
            },
            save(){
                console.log('保存',this.name)
                this.$http.put('/store/goods/cat.add',{
                    store_id:this.store_id,
                    cat_name:this.name
                }).then(res=>{
                    console.log(res);
                    if(res.code===1){
                        bus.$emit('update')
                        this.$emit('close');
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.my-dialog{
    width: 100%;
    height: 100%;
    position: relative;
    h4{
        text-align: center;
        line-height: 40px;
        margin-top: 20px;
    }
    input{
        background: #eee;
        height: 40px;
        line-height: 40px;
        width: 80%;
        margin: 20px auto;
        outline: none;
        border: 0;
        padding-left: 5px;
    }
    .footbtn{
        display: flex;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        button{
            flex: 1;
            height: 45px;
            outline: none;
            background: none;
            border-bottom: 0;
            border-right: 0;
        }
        .cancel{
            border-left: 0;
        }
        .save{
            color: orange;
        }
    }
}
</style>