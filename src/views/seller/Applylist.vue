<style lang="scss" scoped>
table {
border-collapse: collapse;
border-spacing: 0;
border: 0;
text-align: center;
margin-top:20px;
width:100%;
}
th, td {
    border: 1px solid #CADEFF;
    font-size: 14px;
}
th {
    background: #e2f2ff;
    border-top: 3px solid #a7cbff;
    height: 30px;
}
td {
    padding: 10px;
    color: #444;
    a{
        width: 100%;
        height: 100%; 
    }
}
</style>

<template>
   <div>
       <Storehead v-bind:title="title" />
       <table class="table">
        <thead>
            <tr>
                <th><input type="checkbox" v-model="checkAll.check" @change="checkAllChange()"></th>
                <th>商品编号</th>
                <th>商品名称</th>
                <th>重量</th>
                <th>售价</th>
                <th>操作</th>
                <th>删除</th>
            </tr>
        </thead>
        <tbody class="tbody">
            <tr v-for="(item,i) in lists" :key="i">
                <td><input type="checkbox" v-model="item.check"  @change="curChange()"></td>
                <td>{{item.serial_number}}</td>
                <td>{{item.goods_name}}</td>
                <td>{{item.weight?item.weight:"无"}}</td>
                <td>{{item.price}}</td>
                <td>{{item.status?"上架":"下架"}}</td>
                <td @click="deleteitem(item)">删除</td>
            </tr>
          </tbody>
      </table>
      <button>同意上架</button>
   </div>
</template>

<script>
import Storehead from '../../components/common/Storehead.vue' 
export default {
    name:'applylist',
    components: {
        Storehead
    },
    data(){
     return {
        title:"申请列表",
        num:0,
        checkAll: { name: '全选', check: false },
        storeid:"",
        lists: []
     }
    },
    mounted(){
        this.storeid=this.$route.query.storeid
        this.$http.get('/store/goods/totallist').then(res=>{
            res.result.map(item=>{
                if(item.status){
                    this.lists.push(item)
                    return this.lists
                }
            })
            console.log(this.lists)
            
        })
    },
    methods: {
        checkAllChange: function () {
            //使用箭头函数 this的作用域指当前实例化对象
            this.lists.forEach(item => {
                
                item.check = this.checkAll.check;
            });
        },
        curChange:function(){

            //过滤check为true的
            var curTrue=this.lists.filter(function(item){

                return item.check==true;
            });

            //判断选中的状态与总长度比较  当选中的项与总长度相等时 自动 勾选 “全选”
            // 不相等时 取消 全选 
            if(curTrue.length==this.lists.length){
                this.checkAll.check=true;
            }else{
                this.checkAll.check=false;
            }
        },
        deleteitem(item){
            if(item.check){
                this.$http.delete('/store/goods/delete',{
                    data:{
                        goods_id:item.goods_id
                    }
                }).then(res=>{
                    console.log(res)
                })
            } 
        }
    }
}
</script>
